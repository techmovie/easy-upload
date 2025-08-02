import { registry, InfoExtractor } from './registry';
import { BaseExtractor } from './base/base-extractor';
import {
  formatTorrentTitle,
  extractDetailsFromMediaInfo,
  getMediaTags,
  getVideoCodecFromSourceAndVideoType,
  getVideoTypeFromSource,
  getVideoSourceFromTitle,
} from '@/source/helper/index';
import { IMDbInfo, TorrentDetailInfo } from '@/types/mt';
import { CONFIG } from '@/source/config';
import { CURRENT_SITE_INFO, PT_SITE } from '@/const';
import {
  getAudioCodecFromSource,
  parseMedia,
  createFormData,
  GMFetch,
} from '@/common';

class MTExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;
  torrentId: string = '';

  canHandle(siteName: string): boolean {
    return siteName === 'MTeam';
  }

  extractTitle(title: string) {
    this.info.title = formatTorrentTitle(title);
  }

  extractMTResolution(standardId: keyof typeof CONFIG.MT_SPECS_MAP.standard) {
    this.info.resolution = CONFIG.MT_SPECS_MAP.standard[standardId];
  }

  extractSource(sourceId: keyof typeof CONFIG.MT_SPECS_MAP.source) {
    let sourceName = CONFIG.MT_SPECS_MAP.source[sourceId];
    if (!sourceName) {
      sourceName = getVideoSourceFromTitle(this.info.title);
    } else if (sourceName === 'bluray' && this.info.resolution === '2160p') {
      sourceName = 'uhdbluray';
    }
    this.info.source = sourceName;
  }

  extractVideoType(mediumId: keyof typeof CONFIG.MT_SPECS_MAP.medium) {
    const { resolution, title } = this.info;
    if (!mediumId) {
      this.info.videoType = getVideoTypeFromSource(title);
      return;
    }
    const videoType = CONFIG.MT_SPECS_MAP.medium[mediumId];

    if (videoType === 'bluray' && resolution === '2160p') {
      return 'uhdbluray';
    } else if (videoType === 'dvd' && title.match(/dvdrip/i)) {
      return 'dvdrip';
    }
    this.info.videoType = videoType;
  }

  extractCategory(categoryId: string) {
    const catMap = PT_SITE.MTeam.category.map;
    for (const [key, value] of Object.entries(catMap)) {
      if (value.includes(categoryId)) {
        this.info.category = key;
      }
    }
  }

  extractCodec() {
    const { title, videoType } = this.info;
    this.info.videoCodec = getVideoCodecFromSourceAndVideoType(
      title,
      videoType,
    );
    this.info.audioCodec = getAudioCodecFromSource(title);
  }

  extractMediaDetails() {
    if (!this.info.mediaInfos?.[0]) {
      return;
    }
    const mediaInfo = parseMedia(
      this.info.mediaInfos?.[0],
      this.isVideoTypeBluray(),
    );
    if (!mediaInfo) {
      return;
    }
    const mediaDetail = extractDetailsFromMediaInfo(mediaInfo);
    if (!mediaDetail) {
      return;
    }
    this.info.videoCodec = mediaDetail.videoCodec;
    this.info.audioCodec = mediaDetail.audioCodec;
    this.info.resolution = mediaDetail.resolution;
    this.info.tags = getMediaTags(mediaDetail);
  }

  extractDescription(descr: string) {
    this.info.description = descr.replace(/!\[\]\((.+?)\)/g, '[img]$1[/img]');
  }

  isVideoTypeBluray() {
    return /bluray/i.test(this.info.videoType);
  }

  getMovieInfo(data: IMDbInfo) {
    const { title, photo, year } = data;
    this.info.year = year;
    this.info.movieName = title;
    this.info.poster = photo;
  }

  setRequestHeaders() {
    const version = CONFIG.MT_REQUEST_VERSION;
    const webVersion = `${version.replace(/\./g, '')}0`;
    const ts = `${Math.floor(Date.now() / 1e3)}`;
    const auth = localStorage.getItem('auth') || '';
    const visitorId = localStorage.getItem('visitorId') || '';
    const dId = localStorage.getItem('did') || '';
    return {
      Authorization: auth,
      'User-Agent': navigator.userAgent,
      Did: dId,
      Visitorid: visitorId,
      ts,
      version,
      webVersion,
    };
  }

  async getIMDbDataFromAPI() {
    const { imdbUrl } = this.info;
    const formdata = createFormData({
      code: imdbUrl,
    });

    const res = await GMFetch<{
      data: IMDbInfo;
      code: string;
      message: string;
    }>(`${CONFIG.MT_BASE_API_URL}/media/imdb/info`, {
      data: formdata,
      method: 'POST',
      responseType: 'json',
      headers: this.setRequestHeaders(),
    });
    if (res.code !== '0') {
      throw new Error(res.message);
    }
    return res.data;
  }

  async getTorrentURLFormAPI() {
    const res = await GMFetch<{
      code: string;
      message: string;
      data: string;
    }>(`${CONFIG.MT_BASE_API_URL}/torrent/genDlToken`, {
      method: 'POST',
      data: createFormData({
        id: this.torrentId,
      }),
      responseType: 'json',
      headers: this.setRequestHeaders(),
    });
    if (res.code === '0') {
      CURRENT_SITE_INFO.torrentLink = res.data;
    }
  }

  async getTorrentDetailFromAPI() {
    const formdata = createFormData({
      id: this.torrentId,
    });
    const res = await GMFetch<{
      data: TorrentDetailInfo;
      code: string;
      message: string;
    }>(`${CONFIG.MT_BASE_API_URL}/torrent/detail`, {
      data: formdata,
      method: 'POST',
      responseType: 'json',
      headers: this.setRequestHeaders(),
    });
    if (res.code !== '0') {
      throw new Error(res.message);
    }
    return res.data;
  }

  async extract(): Promise<TorrentInfo.Info> {
    const torrentId = location.pathname.match(/detail\/(\d+)/)?.[1];
    if (!torrentId) {
      return this.info;
    }
    this.torrentId = torrentId;
    const torrentDetail = await this.getTorrentDetailFromAPI();
    const {
      name,
      imdb,
      douban,
      category,
      source,
      medium,
      standard,
      size,
      mediainfo,
      descr,
      smallDescr,
    } = torrentDetail;
    this.extractTitle(name);
    this.extractYear();
    this.extractMTResolution(standard);
    this.extractDescription(descr);
    this.extractSource(source);
    this.extractVideoType(medium);
    this.extractCodec();
    this.extractCategory(category);
    this.info.subtitle = smallDescr;
    this.info.size = parseInt(size, 10);

    if (imdb) {
      this.info.imdbUrl = imdb;
      const imdbData = await this.getIMDbDataFromAPI();
      if (imdbData) {
        this.getMovieInfo(imdbData);
      }
    }
    this.info.doubanUrl = douban;
    this.extractScreenshots();
    this.info.mediaInfos = [mediainfo];
    this.extractMediaDetails();
    this.extractArea();
    await this.getTorrentURLFormAPI();
    return this.info;
  }
}

registry.register(new MTExtractor());
