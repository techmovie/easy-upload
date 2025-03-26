import { registry } from './registry';
import { Unite3DExtractor } from './base/unit3d-base';
import { BasicInfo } from '@/source/types/unit3d';
import { CONFIG } from '@/source/config';
import { convertSizeStringToBytes } from '@/common';
import {
  getFilterBBCode,
  refineCategory,
  getVideoTypeFromSource,
  getCategoryFromSource,
  formatTorrentTitle,
} from '@/source/helper/index';
import { CURRENT_SITE_NAME } from '@/const';

class LegacyUnit3DExtractor extends Unite3DExtractor {
  priority = 5;

  canHandle(siteName: string, siteType: string): boolean {
    return siteType === 'UNIT3D-Legacy';
  }

  extractTitle() {
    let { title } = this.info;
    if (CURRENT_SITE_NAME === 'HDPOST') {
      const englishTitle = title.match(/[\s\W\d]+(.+)/)?.[1] ?? '';
      this.info.subtitle = title.replace(englishTitle, '')?.trim();
      title = englishTitle;
    }

    if (CURRENT_SITE_NAME === 'ACM') {
      title = title.replace(/\/\s+\W+/, '');
    }

    if (CURRENT_SITE_NAME === 'MDU') {
      title = $('h1.text-center').text().trim();
      this.info.subtitle = $('h2.text-center').text().trim();
    }

    this.info.title = title;
  }

  protected extractBasicInfo() {
    const basicInfo: BasicInfo = {
      category: '',
      type: '',
      size: '',
      resolution: '',
      name: '',
    };
    const lineSelector = $(
      '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr',
    );
    lineSelector.each((_, element) => {
      const keyText = $(element).find('td:first').text().replace(/\s|\n/g, '');
      for (const [key, value] of Object.entries(CONFIG.UNIT3D_BASIC_KEY_MAP)) {
        if (value.includes(keyText)) {
          let value = $(element).find('td:last').text();
          if (key === 'name') {
            value =
              $(element).find('td:last')[0]?.firstChild?.textContent ?? '';
          }
          basicInfo[key as keyof BasicInfo] = value.replace(/\n/g, '').trim();
        }
      }
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
    this.info.title = formatTorrentTitle(basicInfo?.name ?? '');
  }

  extractYear() {
    const year = $('.movie-heading span:last').text();
    this.info.year = year.replace(/\(|\)|\s/g, '');
  }

  extractMovieNames() {
    const movieName = $('.movie-heading span:first').text();
    this.info.movieName = movieName;
  }

  extractImdbUrl() {
    const imdbUrl = $('.movie-details a:contains(IMDB)').attr('href');
    this.info.imdbUrl = imdbUrl;
  }

  extractPoster() {
    const poster = $('.movie-poster img').attr('src');
    this.info.poster = poster;
  }

  protected extractMediaInfos(): void {
    const mediaInfo = $('.decoda-code code').text();
    this.info.mediaInfos = [mediaInfo];
  }

  protected extractDescription() {
    const descriptionDom = $('.fa-sticky-note')
      .parents('.panel-heading')
      .siblings('.table-responsive')
      .find('.panel-body')
      .clone();
    descriptionDom.find('#collection_waypoint').remove();
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    if (this.info.mediaInfos.length > 0) {
      descriptionBBCode = `\n[quote]${this.info.mediaInfos[0]}[/quote]${descriptionBBCode}`;
    }
    this.info.description = descriptionBBCode;
  }
}

registry.register(new LegacyUnit3DExtractor());
