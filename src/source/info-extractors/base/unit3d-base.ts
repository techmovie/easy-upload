import { convertSizeStringToBytes, extractImgsFromBBCode } from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getVideoTypeFromSource,
  getVideoSourceFromTitle,
  getTagsFromSource,
  getCategoryFromSource,
} from '@/source/helper/index';
import { InfoExtractor } from '../registry';
import { BaseExtractor } from './base-extractor';
import { CONFIG } from '@/source/config';
import { BasicInfo } from '@/source/types/unit3d';
import $ from 'jquery';

export abstract class Unite3DExtractor
  extends BaseExtractor
  implements InfoExtractor
{
  priority = 10;

  abstract canHandle(siteName: string, siteType: string): boolean;

  async extract(): Promise<TorrentInfo.Info> {
    this.extractBasicInfo();
    this.extractTitle();
    this.extractYear();
    this.extractImdbUrl();
    this.extractSource();
    this.extractTags();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    await this.extractScreenshots();
    this.extractMovieNames();
    this.determineIfIsForbidden();
    this.extractComparisonsScreenshots();
    this.extractArea();
    this.extractPoster();
    this.enhanceInfo();

    return this.info;
  }

  protected extractBasicInfo() {
    const basicInfo: BasicInfo = {
      category: '',
      type: '',
      size: '',
      resolution: '',
    };
    const formats = $('.torrent__tags li');
    formats.each((_, item) => {
      const className = $(item)
        .attr('class')
        ?.replace('torrent__', '') as keyof BasicInfo;
      basicInfo[className] = $(item).text().trim();
    });
    const category = getCategoryFromSource(basicInfo.category);
    this.info.category = refineCategory(this.info, category);
    this.info.size = convertSizeStringToBytes(
      basicInfo.size.replace(/\s/g, ''),
    );
    this.info.resolution = basicInfo.resolution;
    this.info.videoType = getVideoTypeFromSource(
      basicInfo.type,
      this.info.resolution,
    );
  }

  protected extractTitle() {
    const title = $('h1.torrent__name').text().trim();
    const formattedTitle = formatTorrentTitle(title);
    this.info.title = formattedTitle;
  }

  protected extractYear() {
    const year =
      $('.meta__title')
        .text()
        .match(/\((\d{4})\)/)?.[1] ?? '';
    this.info.year = year;
  }

  protected extractImdbUrl() {
    this.info.imdbUrl = $('.meta__imdb a').attr('href');
  }

  protected extractMediaInfos() {
    const mediaInfo = $('.bbcode-rendered code').text();
    this.info.mediaInfos = [mediaInfo];
  }

  protected extractDescription() {
    const description = getFilterBBCode($('.panel__body.bbcode-rendered')[0]);
    const mediaInfoQuote =
      this.info.mediaInfos.length > 0
        ? `[quote]${this.info.mediaInfos[0]}[/quote]`
        : '';
    this.info.description = mediaInfoQuote + description;
  }

  protected async extractScreenshots() {
    const screenshots = await extractImgsFromBBCode(this.info.description);
    this.info.screenshots = screenshots;
  }

  protected extractSource() {
    this.info.source = getVideoSourceFromTitle(this.info.title);
  }

  protected extractTags() {
    this.info.tags = {
      ...this.info.tags,
      ...getTagsFromSource(this.info.title),
    };
  }

  protected extractMovieNames() {
    const title = $('.meta__title').text();
    this.info.movieName = title.replace(/\(\d+\)/g, '').trim();
  }

  protected determineIfIsForbidden() {
    const { title, subtitle, description } = this.info;
    const combinedContent = title + subtitle + description;
    const isForbidden = CONFIG.FORBIDDEN_KEYWORDS.some((keyword) =>
      combinedContent.includes(keyword),
    );
    this.info.isForbidden = isForbidden;
  }

  protected extractPoster() {
    this.info.poster = $('.meta__poster-link img').attr('src');
  }

  protected enhanceInfo() {}

  protected extractComparisonsScreenshots() {}
}
