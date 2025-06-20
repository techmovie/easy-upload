import {
  convertSizeStringToBytes,
  getAreaCode,
  getAudioCodecFromSource,
} from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getVideoTypeFromSource,
  getVideoSourceFromTitle,
  getVideoCodecFromSourceAndVideoType,
  getTagsFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class HDTExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDT';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractBasicInfo();
    this.extractResolution();
    this.extractImdbData();
    this.extractDescription();
    await this.extractScreenshots();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.enhanceInfo();
    return this.info;
  }

  extractTitle() {
    const title = document.title.replace(/HD-Torrents.org\s*-/gi, '').trim();
    this.info.title = formatTorrentTitle(title);
  }

  protected extractBasicInfo() {
    const { title } = this.info;
    const basicInfo: Record<string, string> = {
      Category: '',
      Size: '',
      Genre: '',
    };
    $('.detailsleft').each((_, element) => {
      const key = $(element).text().replace(/:/g, '').trim();
      const value = $(element).next('td').text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, '').trim();
      }
    });
    const { Category, Size, Genre } = basicInfo;
    let category = Category.toLowerCase().split(/\s|\//)[0];
    category = Genre.match(/Animation/i) ? 'cartoon' : category;
    this.info.category = refineCategory(this.info, category);
    this.info.size = convertSizeStringToBytes(Size);
    this.info.videoType = this.getVideoType(Category, title);
    this.info.source = getVideoSourceFromTitle(title);
  }

  protected extractImdbData() {
    const imdbInfoDom = $('#IMDBDetailsInfoHideShowTR .imdbnew2');
    const imdbUlrDom = imdbInfoDom.find('>a');
    const imdbUrl = imdbUlrDom.attr('href') || '';
    const movieName = imdbUlrDom.text();
    const year = imdbInfoDom.text().match(/Year:\s*(\d{4})/)?.[1] ?? '';
    const country = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)?.[1] ?? '';
    this.info.imdbUrl = imdbUrl;
    this.info.movieName = movieName;
    this.info.year = year;
    this.info.area = getAreaCode(country);
  }

  protected extractDescription() {
    const descriptionDom = $('#technicalInfoHideShowTR');
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(
      /\[center\]((?:.|\n)+?)\[\/center\]/g,
      (match, p1) => {
        if (p1.match(/(keep seeding)|(spank your ass)/)) {
          return '';
        }
        return match;
      },
    );
    this.info.description = descriptionBBCode;
  }

  private getVideoType(type: string, title: string) {
    if (type.match(/Remux/i)) {
      return 'remux';
    } else if (type.match(/UHD\/Blu-Ray/i)) {
      return 'uhdbluray';
    } else if (type.match(/Blu-Ray/i)) {
      return 'bluray';
    }
    return getVideoTypeFromSource(title);
  }

  enhanceInfo() {
    const { title, videoType, mediaInfos } = this.info;
    if (!mediaInfos?.length) {
      this.info.videoCodec = getVideoCodecFromSourceAndVideoType(
        title,
        videoType,
      );
      this.info.audioCodec = getAudioCodecFromSource(title);
      this.info.tags = getTagsFromSource(title);
    }
  }
}

registry.register(new HDTExtractor());
