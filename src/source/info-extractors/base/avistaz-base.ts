import {
  convertSizeStringToBytes,
  extractImgsFromBBCode,
  getAreaCode,
} from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getVideoTypeFromSource,
  getVideoSourceFromTitle,
  getTagsFromSource,
} from '@/source/helper/index';
import { InfoExtractor } from '../registry';
import { BaseExtractor } from './base-extractor';
import { CONFIG } from '@/source/config';
import $ from 'jquery';

export abstract class AvistaZExtractor
  extends BaseExtractor
  implements InfoExtractor {
  priority = 10;

  abstract canHandle(siteName: string, siteType: string): boolean

  async extract (): Promise<TorrentInfo.Info> {
    this.extractBasicInfo();
    this.extractImdbUrl();
    this.extractSource();
    this.extractTags();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    await this.extractScreenshots();
    this.extractMovieNameAndYear();
    this.determineIfIsForbidden();
    this.extractComparisonsScreenshots();
    this.extractArea();
    this.enhanceInfo();

    return this.info;
  }

  protected extractBasicInfo () {
    const basicInfo = {
      category: '',
      videoType: '',
      size: '',
      resolution: '',
      title: '',
    };
    $('#content-area .block:last table:first>tbody>tr').each((_, element) => {
      const pageKey = $(element).find('td:first').text() as keyof typeof CONFIG.AVISTAZ_BASIC_KEY_MAP;
      const value = $(element).find('td:last').text();
      const infoKey = CONFIG.AVISTAZ_BASIC_KEY_MAP[pageKey] as keyof typeof basicInfo;
      basicInfo[infoKey] = value.replace(/\n/g, '').trim();
    });
    this.info.title = formatTorrentTitle(basicInfo.title);
    const category = basicInfo.category?.toLowerCase().replace('-', '');
    this.info.category = refineCategory(this.info, category);
    this.info.size = convertSizeStringToBytes(basicInfo.size.replace(/\s/g, ''));
    this.info.resolution = basicInfo.resolution;
    this.info.videoType = getVideoTypeFromSource(
      basicInfo.videoType,
      this.info.resolution,
    );
  }

  protected extractYear () {
    const year = $('.meta__title').text().match(/\((\d{4})\)/)?.[1] ?? '';
    this.info.year = year;
  }

  protected extractImdbUrl () {
    this.info.imdbUrl = $('.badge-extra a[href*="www.imdb.com/title"]').attr('href')?.split('?')?.[1] ?? '';
  }

  protected extractMediaInfos () {
    const mediaInfo = $('#collapseMediaInfo pre').text();
    this.info.mediaInfos = [mediaInfo];
  }

  protected extractDescription () {
    const descriptionBBCode = getFilterBBCode($('.torrent-desc')[0]);
    const mediaInfoQuote = this.info.mediaInfos.length > 0 ? `[quote]${this.info.mediaInfos[0]}[/quote]` : '';
    this.info.description = mediaInfoQuote + descriptionBBCode;
  }

  protected async extractScreenshots () {
    const screenshotsBBCode = $('#collapseScreens a').map(function () {
      return `[url=${$(this).attr('href')}][img]${$(this).find('img').attr('src')}[/img][/url]`;
    }).get();
    const screenshots = await extractImgsFromBBCode(screenshotsBBCode.join('\n'));
    this.info.screenshots = screenshots;
  }

  protected extractSource () {
    this.info.source = getVideoSourceFromTitle(this.info.title);
  }

  protected extractTags () {
    this.info.tags = {
      ...this.info.tags,
      ...getTagsFromSource(this.info.title),
    };
  }

  protected extractMovieNameAndYear () {
    const movieTitle = $('.block-titled h3 a').text();
    const movieName = movieTitle.split('(')[0].trim();
    const year = movieTitle.match(/\((\d+)\)/)?.[1] ?? '';
    this.info.movieName = movieName;
    this.info.year = year;
  }

  protected determineIfIsForbidden () {
    const { title, subtitle, description } = this.info;
    const combinedContent = title + subtitle + description;
    const isForbidden = CONFIG.FORBIDDEN_KEYWORDS.some((keyword) =>
      combinedContent.includes(keyword),
    );
    this.info.isForbidden = isForbidden;
  }

  protected extractArea () {
    const country = $('.fa-flag~.badge-extra:first a').text();
    const area = getAreaCode(country);
    this.info.area = area;
  }

  protected enhanceInfo () {}

  protected extractComparisonsScreenshots () {}
}
