import { convertSizeStringToBytes, GMFetch, getAreaCode } from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getCategoryFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class HDSpaceExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDSpace';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractSize();
    this.extractResolution();
    this.extractCategory();
    this.extractMetaInfo();
    await this.extractMovieDetails();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    this.extractScreenshots();

    return this.info;
  }

  private getTdTextByKey(key: string) {
    return $(`#mcol td.header:contains("${key}")`).eq(0).next().text().trim();
  }

  extractTitle() {
    const title = this.getTdTextByKey('Name');
    this.info.title = formatTorrentTitle(title);
  }

  extractSize() {
    const size = this.getTdTextByKey('Size');
    this.info.size = convertSizeStringToBytes(size);
  }

  extractCategory() {
    const categoryValue = this.getTdTextByKey('Category');
    const category = getCategoryFromSource(categoryValue) || 'movie';
    this.info.category = refineCategory(this.info, category);
  }

  protected async extractMovieDetails() {
    const imdbId =
      $('#imdb')
        .next('script')
        .text()
        ?.match(/mid=(\d+)/)?.[1] ?? '';
    const imdbData = await GMFetch<string>(`/getimdb.php?mid=${imdbId}`);
    const imdbDom = new DOMParser().parseFromString(imdbData, 'text/html');
    const imdbUlrDom = $('a[href*="imdb.com/title"]', imdbDom);
    const imdbUrl = imdbUlrDom.attr('href');
    const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, '');
    const year = imdbUlrDom.text().match(/\((\d{4})\)/)?.[1] ?? '';
    const country = $('td:contains("Country")', imdbDom).next('td').text();
    this.info = {
      ...this.info,
      imdbUrl,
      movieName,
      year,
      area: getAreaCode(country),
    };
  }

  protected extractDescription() {
    const descriptionDom = $('#mcol td.header:contains("Description")').next();
    const descriptionContent = descriptionDom.clone();
    $(descriptionContent).find('#slidenfo,a[href*="#nfo"]').remove();
    const descriptionBBCode = getFilterBBCode(descriptionContent[0]);
    this.info.description = descriptionBBCode;
  }
}

registry.register(new HDSpaceExtractor());
