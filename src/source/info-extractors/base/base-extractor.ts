import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import { getAreaCode, parseMedia } from '@/common';
import {
  extractDetailsFromMediaInfo,
  getMediaTags,
  getResolutionFromSource,
  getBDInfoOrMediaInfoFromBBCode,
} from '@/source/helper/index';

export abstract class BaseExtractor {
  protected info: TorrentInfo.Info;

  constructor() {
    this.info = {
      title: '',
      year: '',
      description: '',
      screenshots: [],
      category: '',
      videoType: '',
      format: '',
      source: '',
      videoCodec: '',
      audioCodec: '',
      resolution: '',
      area: '',
      doubanInfo: '',
      doubanUrl: '',
      imdbUrl: '',
      movieAkaName: '',
      comparisons: [],
      movieName: '',
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      mediaInfos: [],
      tags: {},
      size: 0,
    };
  }

  protected extractYear() {
    const year = this.info.title.match(/(18|19|20)\d{2}/g) ?? [];
    this.info.year = year.length > 0 ? (year.pop() as string) : '';
  }

  protected extractArea() {
    const { area, description } = this.info;
    if (!area) {
      const areaMatch =
        description?.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)?.[2] ?? '';
      this.info.area = getAreaCode(areaMatch);
    }
  }

  protected extractMediaDetails() {
    const { mediaInfos, tags } = this.info;
    if (!mediaInfos?.[0]) {
      return;
    }
    const mediaInfo = parseMedia(mediaInfos?.[0], this.isVideoTypeBluray());
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
    this.info.tags = {
      ...tags,
      ...getMediaTags(mediaDetail),
    };
  }

  protected extractMediaInfos() {
    const { mediaInfo, bdInfo } = getBDInfoOrMediaInfoFromBBCode(
      this.info.description,
    );
    this.info.mediaInfos = this.isVideoTypeBluray() ? bdInfo : mediaInfo;
  }

  protected extractResolution() {
    this.info.resolution = getResolutionFromSource(this.info.title);
  }

  protected isVideoTypeBluray() {
    return /bluray/i.test(this.info.videoType);
  }
}
