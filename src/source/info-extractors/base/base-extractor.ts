import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import {
  getAreaCode,
  parseMedia,
  getAudioCodecFromSource,
  extractImgsFromBBCode,
} from '@/common';
import {
  extractDetailsFromMediaInfo,
  getMediaTags,
  getResolutionFromSource,
  getBDInfoOrMediaInfoFromBBCode,
  getVideoSourceFromTitle,
  getVideoTypeFromSource,
  getTagsFromSource,
  getVideoCodecFromSourceAndVideoType,
} from '@/source/helper/index';
import { torrentInfoStore } from '@/store/torrentInfoStore';

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
      sourceSiteType: CURRENT_SITE_INFO?.siteType,
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
    const { area, description, doubanInfo } = this.info;
    if (!area) {
      const areaMatch =
        (description + doubanInfo)?.match(
          /(产\s*地|国\s*家|地\s*区)】?\s*(.+)/,
        )?.[2] ?? '';
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

  protected extractMetaInfo() {
    const { title, resolution } = this.info;
    const source = getVideoSourceFromTitle(title);
    const videoType = getVideoTypeFromSource(title, resolution);
    const tags = getTagsFromSource(title);
    const videoCodec = getVideoCodecFromSourceAndVideoType(title, videoType);
    const audioCodec = getAudioCodecFromSource(title);
    this.info = {
      ...this.info,
      source,
      videoType,
      tags,
      videoCodec,
      audioCodec,
    };
  }

  protected extractScreenshots() {
    try {
      extractImgsFromBBCode(this.info.description).then((screenshots) => {
        this.info.screenshots = screenshots;
        torrentInfoStore.setInfo(this.info);
      });
    } catch (error) {
      console.log('Error extracting screenshots:', error);
    }
  }
}
