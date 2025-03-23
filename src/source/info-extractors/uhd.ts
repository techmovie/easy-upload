import { GazelleExtractor } from './base/gazelle-base';
import { registry } from './registry';
import { CURRENT_SITE_INFO } from '@/const';
import {
  GMFetch,
  extractImgsFromBBCode,
  convertSizeStringToBytes,
  getAudioCodecFromSource,
} from '@/common';
import $ from 'jquery';
import {
  getFilterBBCode,
  getTagsFromSource,
  getVideoCodecFromSourceAndVideoType,
  getVideoSourceFromTitle,
  getVideoTypeFromSource,
  formatTorrentTitle,
  refineCategory,
} from '@/source/helper/index';

class UHDExtractor extends GazelleExtractor {
  priority = 10;
  titleText = '';

  canHandle (siteName: string): boolean {
    return siteName === 'UHDBits';
  }

  async extract (): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    if (!this.torrentId) {
      return this.info;
    }
    this.getTorrentHeaderDom();
    this.extractTitle();
    await this.extractMediaInfos();
    this.extractMovieNames();
    this.extractYear();
    this.extractImdbUrl();
    this.extractTorrentLink();
    await this.extractMediaInfos();
    await this.extractDescription();
    await this.extractScreenshots();
    this.extractMetaInfo();
    this.extractTags();
    this.extractMediaDetails();

    return this.info;
  }

  getTorrentHeaderDom () {
    this.torrentHeaderDom = $(`#torrent${this.torrentId}`);
  }

  extractTitle () {
    const torrentFilePathDom = $(`#files_${this.torrentId} .filelist_path`);
    const torrentFileDom = $(`#files_${this.torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
    const torrentFileName = torrentFilePathDom.text()?.replace(/\//g, '') || torrentFileDom.text()?.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, '');
    this.info.title = formatTorrentTitle(torrentFileName);
  }

  async extractMediaInfos () {
    const url = `/torrents.php?action=mediainfo&id=${this.torrentId}`;
    const data = await GMFetch<string>(url);
    if (data) {
      this.info.mediaInfos = [data];
    }
  }

  extractMovieNames () {
    const titleText = $('#scontent h2').text();
    this.titleText = titleText;
    const [movieName = '', movieAkaName = ''] = titleText.match(/(.+?)\[/)?.[1].split('/') ?? [];
    this.info.movieAkaName = movieAkaName.trim();
    this.info.movieName = movieName.trim();
  }

  extractYear () {
    this.info.year = this.titleText.match(/\[(\d+)\]/)?.[1] ?? '';
  }

  extractImdbUrl () {
    this.info.imdbUrl = $('.imovie_title .tooltip.imdb_icon').attr('href') || '';
  }

  extractTorrentLink () {
    const torrentLink = this.torrentHeaderDom.find('a[href*="action=download"]').attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  async extractDescription () {
    return new Promise<void>(resolve => {
      this.getTorrentHeaderDom();
      const descriptionDom = $(`#torrent_${this.torrentId} #description`);
      let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
      descriptionBBCode = descriptionBBCode.replace(/https?:\/\/anonym\.to\/\?/g, '');
      this.info.description = `${descriptionBBCode}\n[quote]${this.info.mediaInfos[0]}[/quote]`;
      this.info.originalDescription = descriptionBBCode;
      resolve();
    });
  }

  async extractScreenshots () {
    this.info.screenshots = await extractImgsFromBBCode(this.info.description);
  }

  extractMetaInfo () {
    const { title } = this.info;
    const tags = getTagsFromSource(title);
    const source = getVideoSourceFromTitle(title);
    const category = title.match(/Season\s+\d+/) ? 'tv' : 'movie';
    const size = convertSizeStringToBytes($(`#torrent${this.torrentId} td`).eq(1).text());
    const infoArray = $(`#torrent${this.torrentId} td:first-child>a`).text().replace(/\s/g, '').split('/');
    const [resolution] = infoArray;
    const videoType = getVideoTypeFromSource(title);

    this.info.videoType = videoType;
    this.info.resolution = resolution;
    this.info.videoCodec = getVideoCodecFromSourceAndVideoType(title);
    this.info.audioCodec = getAudioCodecFromSource(title);
    this.info.tags = tags;
    this.info.source = source;
    this.info.size = size;
    this.info.category = refineCategory(this.info, category);
  }
}

registry.register(new UHDExtractor());
