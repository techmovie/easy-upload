import {
  convertSizeStringToBytes,
  parseMedia,
  extractImgsFromBBCode,
  getAudioCodecFromSource,
  getAreaCode,
} from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getVideoTypeFromSource,
  getVideoSourceFromTitle,
  getBDInfoOrMediaInfoFromBBCode,
  extractDetailsFromMediaInfo,
  getMediaTags,
  getTagsFromSource,
  getResolutionFromSource,
  getVideoCodecFromSourceAndVideoType,
  getCategoryFromSource,
} from '@/source/helper/index';
import { InfoExtractor } from '../registry';
import { BaseExtractor } from './base-extractor';
import { CONFIG } from '@/source/config';
import $ from 'jquery';

export abstract class NexusPHPExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;

  abstract canHandle (siteName: string, siteType: string): boolean

  async extract (): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractYear();
    this.extractDoubanInfo();
    this.extractDescription();
    this.extractImdbUrl();
    this.extractDoubanUrl();
    await this.extractScreenshots();
    this.extractSubtitle();
    this.extractSource();

    this.extractMediaDetails();
    this.extractMetaInfo();
    this.extractMediaInfos();
    this.extractMovieNames();
    this.extractTags();
    this.determineIfIsForbidden();

    return this.info;
  }

  protected extractTitle () {
    const title = $('#top').text().split(/\s{3,}/)?.[0]?.trim();
    const formattedTitle = formatTorrentTitle(title);
    this.info.title = formattedTitle;
  }

  protected extractSubtitle () {
    this.info.subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  }

  protected extractImdbUrl () {
    const imdbUrl = $('#kimdb>a').attr('href') ||
    this.info.description.match(/http(s)?:\/\/www\.imdb\.com\/title\/tt\d+/)?.[0] || '';
    this.info.imdbUrl = imdbUrl;
  }

  protected extractDoubanUrl () {
    const doubanUrl = this.info.description.match(/https:\/\/((movie|book)\.)?douban\.com\/subject\/\d+/)?.[0];
    this.info.doubanUrl = doubanUrl;
  }

  protected extractDescription () {
    const bbCode = getFilterBBCode($('#kdescr')[0]);
    this.info.description = bbCode.replace(/\u00A0\u3000/g, ' ');
  }

  protected extractYear () {
    this.info.year = this.info.title?.match(/(19|20)\d{2}/g)?.[0] ?? '';
  }

  protected extractMediaInfos () {
    const { mediaInfo, bdInfo } = getBDInfoOrMediaInfoFromBBCode(this.info.description);
    this.info.mediaInfos = this.isVideoTypeBluray() ? bdInfo : mediaInfo;
  }

  protected extractMediaDetails () {
    if (!this.info.mediaInfos?.[0]) {
      return;
    }
    const mediaInfo = parseMedia(this.info.mediaInfos?.[0], this.isVideoTypeBluray());
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

  protected async extractScreenshots () {
    const screenshots = await extractImgsFromBBCode(this.info.description);
    this.info.screenshots = screenshots;
  }

  protected extractSource () {
    this.info.source = getVideoSourceFromTitle(this.info.title);
  }

  protected extractTags () {
    const tagsContentFromPage = $("td.rowhead:contains('标签')").next().text();
    this.info.tags = {
      ...this.info.tags,
      ...getTagsFromSource(`${this.info?.subtitle}\n${tagsContentFromPage}`),
    };
  }

  protected extractMovieNames () {
    const { description } = this.info;
    const originalName = description.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
    const translateName = description.match(/(译\s+名)\s+(.+)/)?.[2] ?? '';
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      this.info.movieName = originalName;
    } else {
      this.info.movieName = translateName.match(/(\w|\s){2,}/)?.[0]?.trim() ?? '';
    }
  }

  protected getMetaInfoRules (): Record<string, RegExp> {
    return CONFIG.META_INFO_MATCH_RULES;
  }

  protected extractMetaInfo () {
    const result = {
      category: '',
      videoType: '',
      videoCodec: '',
      audioCodec: '',
      resolution: '',
      area: '',
      size: '',
    };
    const metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊'),.layui-table td:contains('基本信息')")
      .next().text().replace(/：/g, ':');
    const rules = this.getMetaInfoRules();
    for (const [key, regex] of Object.entries(rules)) {
      const matchValue = metaInfo.match(regex)?.[2] ?? '';
      if (matchValue) {
        const value = matchValue?.replace(/\s/g, '')?.trim()?.toLowerCase() ?? '';
        result[key as keyof typeof result] = value;
      }
    }
    console.log(result);
    const initialCategory = getCategoryFromSource(result.category || this.info.description);
    this.info.category = refineCategory(this.info, initialCategory);
    this.info.size = convertSizeStringToBytes(result.size);
    this.info.videoType = getVideoTypeFromSource(result.videoType || this.info.title);
    const areaMatch = this.info.description?.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)?.[2] ?? '';
    this.info.area = getAreaCode(result.area || areaMatch);
    if (!this.info.videoCodec) {
      this.info.videoCodec = getVideoCodecFromSourceAndVideoType(this.info.title || result.videoCodec, this.info.videoType);
    }
    if (!this.info.audioCodec) {
      this.info.audioCodec = getAudioCodecFromSource(result.audioCodec || this.info.title);
    }
    if (!this.info.resolution) {
      this.info.resolution = getResolutionFromSource(result.resolution || this.info.title);
    }
  }

  protected isVideoTypeBluray () {
    return /bluray/i.test(this.info.videoType);
  }

  protected determineIfIsForbidden () {
    const { title, subtitle, description } = this.info;
    const combinedContent = title + subtitle + description;
    const isForbidden = CONFIG.NEXUS_FORBIDDEN_KEYWORDS.some((keyword) => combinedContent.includes(keyword));
    this.info.isForbidden = isForbidden;
  }

  protected extractDoubanInfo () {

  }
}
