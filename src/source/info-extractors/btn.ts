import { convertSizeStringToBytes, getAreaCode, GMFetch } from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  getBDInfoOrMediaInfoFromBBCode,
  getVideoSourceFromTitle,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import $ from 'jquery';
import { GazelleExtractor } from './base/gazelle-base';
import { CURRENT_SITE_INFO } from '@/const';

class BTNExtractor extends GazelleExtractor implements InfoExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'BTN';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    this.getTorrentHeaderDom();
    this.extractTitle();
    this.extractTorrentLink();
    await this.getShowInfo();
    this.extractBasicInfo();
    this.extractYearAndCategory();
    await this.extractDescription();
    this.extractScreenshots();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractMovieName();
    this.extractSource();

    return this.info;
  }

  getTorrentHeaderDom() {
    this.torrentHeaderDom = $(`#torrent_${this.torrentId}`).prev();
  }

  extractTitle() {
    const torrentName = this.torrentHeaderDom
      .find('> td')
      .text()
      .replace(/»/, '')
      .trim();
    this.info.title = formatTorrentTitle(torrentName);
  }

  protected extractBasicInfo() {
    // MKV / H.264 / NFO / HDTV / 1080p / Scene
    // ISO / H.265 / BD50 / 2160p / Scene
    const specsDom = this.torrentHeaderDom.prev();
    const rawSpecs = specsDom
      .find('> td > a')
      .text()
      .replace(/»/, '')
      .split('/')
      .map((v) => v.trim());
    const specs = rawSpecs.filter((v) => !['NFO'].includes(v));
    const size = specsDom.find('> td').next('td').text().replace(/\s/g, '');
    this.info.size = convertSizeStringToBytes(size);
    this.info.videoType = this.getVideoType(specs[2]);
  }

  protected extractYearAndCategory() {
    const seasonTitle = $('#content > div > h2')
      .contents()
      .last()
      .text()
      .trim();
    const [season = '', year = ''] =
      seasonTitle?.match(/(.*) \[(\d+)\]/)?.slice(1) ?? [];
    this.info.year = year;
    const category = season.match(/season/i) ? 'tvPack' : 'tv';
    this.info.category = category;
  }

  protected extractTorrentLink(): void {
    const torrentLink = this.torrentHeaderDom
      .prev()
      .find('a[title="Download"]')
      .attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  protected extractMediaInfos() {
    const { mediaInfo, bdInfo } = getBDInfoOrMediaInfoFromBBCode(
      this.info.description,
    );
    this.info.mediaInfos = this.isVideoTypeBluray() ? bdInfo : mediaInfo;
  }

  protected extractDescription() {
    return new Promise<void>((resolve) => {
      const descriptionDom = $(
        `#torrent_${this.torrentId} > td > blockquote`,
      ).last()[0];
      const descriptionBBCode = getFilterBBCode(descriptionDom);
      this.info.description = descriptionBBCode;
      resolve();
    });
  }

  protected extractMovieName() {
    const movieName =
      $('#content > div > h2 > a > img')
        .attr('alt')
        ?.replace(/\(\d+\)/, '')
        ?.trim() ?? '';
    this.info.movieName = movieName;
  }

  extractSource() {
    this.info.source = getVideoSourceFromTitle(this.info.title);
  }

  async getShowInfo() {
    const seriesUrl = $('#content > .thin > h2 > a').prop('href');
    const html = await GMFetch<string>(seriesUrl);
    const infoHtml =
      html?.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)?.[1] ?? '';
    const infoDom = new DOMParser().parseFromString(infoHtml, 'text/html');
    const info = Object.fromEntries(
      Array.from(infoDom.querySelectorAll('tr')).map((tr) => {
        const tds = Array.from(tr.children);
        return [(tds[0] as HTMLTableCellElement).innerText.trim(), tds[1]];
      }),
    );
    const country = (info['Country:'] as HTMLTableCellElement).innerText;
    const imdbUrl = info['External Links:'].innerHTML.match(
      /https:\/\/www\.imdb\.com\/title\/tt\d+/,
    )?.[0];

    this.info.area = getAreaCode(country);
    this.info.imdbUrl = imdbUrl;
  }

  getVideoType(source: string) {
    if (this.info.title.match(/remux/i)) {
      return 'remux';
    } else if (['BD50', 'BD25'].includes(source)) {
      return 'bluray';
    } else if (['BD66', 'BD100'].includes(source)) {
      return 'uhdbluray';
    } else if (['WEB-DL'].includes(source)) {
      return 'web';
    } else if (['HDTV'].includes(source)) {
      return 'encode';
    }
    return '';
  }
}

registry.register(new BTNExtractor());
