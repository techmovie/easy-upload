import { GMFetch, htmlToBBCode } from '@/common';
import {
  formatTorrentTitle,
  getCategoryFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import $ from 'jquery';
import DOMPurify from 'dompurify';
import { GazelleExtractor } from './base/gazelle-base';
import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import { CONFIG } from '../config';

class GZMusicExtractor extends GazelleExtractor implements InfoExtractor {
  priority = 10;
  private _siteTorrentInfo: MusicJson.Torrent | null = null;
  private _siteGroupInfo: MusicJson.GroupInfo | null = null;

  private get siteGroupInfo(): MusicJson.GroupInfo {
    if (!this._siteGroupInfo) {
      throw new Error('siteGroupInfo is not initialized');
    }
    return this._siteGroupInfo;
  }

  private get siteTorrentInfo(): MusicJson.Torrent {
    if (!this._siteTorrentInfo) {
      throw new Error('siteTorrentInfo is not initialized');
    }
    return this._siteTorrentInfo;
  }

  canHandle(siteName: string): boolean {
    return siteName.match(/(DicMusic|Orpheus|RED)/) !== null;
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    this.getTorrentHeaderDom();
    const data = await this.getSiteTorrentInfoByAPI();
    if (!data) {
      return this.info;
    }
    this._siteGroupInfo = data.group;
    this._siteTorrentInfo = data.torrent;

    this.extractTitle();
    this.extractSubtitle();
    this.extractTorrentLink();
    this.extractCategory();
    this.extractDescription();
    await this.extractLogs();

    const { year, wikiImage, musicInfo, name, tags } = this.siteGroupInfo;
    this.info.year = `${year}`;
    this.info.poster = wikiImage;

    const { format, media, encoding, log } = this.siteTorrentInfo;
    this.info.videoCodec = media.toLowerCase().replace(/-/g, '');
    this.info.audioCodec = format.toLowerCase();

    this.info.musicInfo = {
      name,
      tags,
      artists: musicInfo.artists.map((item) => item.name),
      media,
      encoding,
      log,
    };
    this.info.musicJson = data;

    return this.info;
  }

  async getSiteTorrentInfoByAPI() {
    const { response, status } = await GMFetch<MusicJson.Info>(
      `/ajax.php?action=torrent&id=${this.torrentId}`,
      {
        responseType: 'json',
      },
    );
    if (
      status !== 'success' ||
      !response ||
      !response.group ||
      !response.torrent
    ) {
      return null;
    }
    if (CURRENT_SITE_NAME === 'DicMusic') {
      response.group.name = this.getUTF8String(response.group.name);
      const div = document.createElement('div');
      div.innerHTML = response.group.wikiBody;
      response.group.bbBody = htmlToBBCode(div);
    } else if (CURRENT_SITE_NAME === 'Orpheus') {
      response.group.bbBody = response.group.wikiBBcode || '';
    }
    return response;
  }

  getTorrentHeaderDom() {
    this.torrentHeaderDom = $(`#torrent${this.torrentId}`);
  }

  extractTitle() {
    const title = $('.header h2').text();
    this.info.title = formatTorrentTitle(title);
  }

  extractSubtitle() {
    const prev = this.torrentHeaderDom
      .prev()
      .find('strong')
      .contents()
      .last()
      .text()
      .trim();
    const post = this.torrentHeaderDom
      .find('td:first-child a[onclick*="$("]')
      .text();
    this.info.subtitle = `${prev} / ${post}`;
  }

  extractCategory() {
    this.info.category = getCategoryFromSource(this.siteGroupInfo.categoryName);
  }

  protected extractTorrentLink(): void {
    const torrentLink = this.torrentHeaderDom
      .prev()
      .find('a[title="Download"]')
      .attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  protected extractDescription() {
    const { wikiImage, wikiBody, bbBody } = this.siteGroupInfo;

    const div = document.createElement('div');
    div.innerHTML = wikiBody;
    let description = bbBody || htmlToBBCode(div) || '';
    description = `[img]${wikiImage}[/img]\n${description}`;
    description = DOMPurify.sanitize(description);
    const descSource = new DOMParser().parseFromString(
      description,
      'text/html',
    );

    if (descSource.documentElement.textContent) {
      description = descSource.documentElement.textContent
        .replace(/\[\/?artist\]/g, '')
        .replace(
          /\[url=https:\/\/redacted\.ch\/torrents\.php\?(taglist|recordlabel)=[a-zA-Z%0-9]*\]/g,
          '',
        )
        .replace(/(?<=(\[\/b\]|,)[\s\\.a-zA-Z]*)\[\/url\]/g, '');
    }
    this.info.description = description;
  }

  private async extractLogs() {
    const { logScore, ripLogIds } = this.siteTorrentInfo;
    const { media } = this.siteTorrentInfo;
    const logList = [];
    if (ripLogIds?.length > 0) {
      for (let i = 1; i < ripLogIds.length; i++) {
        const log = await this.getLogFromApi(
          logScore,
          this.torrentId,
          ripLogIds[i],
        );
        logList.push(log);
      }
    } else if (media === 'CD') {
      const logData = await this.getLogFromApi(logScore, this.torrentId, '0');
      if (logData) {
        logList.push(logData);
      }
    }
    this.siteTorrentInfo.log = logList;
  }

  private getUTF8String(entityString: string) {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = entityString;
    const utf8String = tempElement.value;
    return utf8String;
  }

  private async getLogFromApi(
    logScore: number,
    torrentId: string,
    ripLogId: string,
  ) {
    const apiUrlMap = CONFIG.MUSIC_LOG_API_MAP(logScore, torrentId, ripLogId);
    const response = await GMFetch<string>(
      apiUrlMap[CURRENT_SITE_NAME as keyof typeof apiUrlMap],
    );
    if (CURRENT_SITE_NAME.match(/DicMusic|RED/)) {
      const div = document.createElement('div');
      div.innerHTML = response;
      return $(div).find('pre').text() || '';
    } else if (CURRENT_SITE_NAME.match(/Orpheus|/)) {
      return response;
    }
    return '';
  }
}

registry.register(new GZMusicExtractor());
