import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import {
  formatTorrentTitle,
  getFilterBBCode,
  getCategoryFromSource,
  getVideoTypeFromSource,
  getVideoCodecFromSourceAndVideoType,
  refineCategory,
  getResolutionFromSource,
} from '@/source/helper/index';
import { GMFetch, getAreaCode, getAudioCodecFromSource, extractImgsFromBBCode } from '@/common';
import $ from 'jquery';

class TTGExtractor extends NexusPHPExtractor {
  priority = 10;
  headTitle = '';

  canHandle (siteName: string): boolean {
    return siteName === 'TTG';
  }

  extractTitle () {
    const title = $('#main_table h1').eq(0).text();
    this.headTitle = title.replace(/^「.+?」/g, '');
    this.info.title = formatTorrentTitle(this.headTitle.match(/[^[]+/)?.[0] ?? '');
  }

  extractSubtitle () {
    this.info.subtitle = this.headTitle?.replace(this.info.title, '')?.replace(/\[|\]/g, '')?.trim() ?? '';
  }

  extractImdbUrl () {
    const imdbUrl = this.getHeadingTdDomsByKey('IMDb').find('a').attr('href');
    if (!imdbUrl) {
      this.info.imdbUrl = this.info.description.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)?.[0] ?? '';
    }
    this.info.imdbUrl = imdbUrl;
  }

  protected extractDoubanUrl (): void {
    this.info.doubanUrl = this.info.description.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)?.[0] ?? '';
  }

  async extractDescription () {
    const pageContent = await GMFetch<string>(location.href);
    const doc = new DOMParser().parseFromString(pageContent, 'text/html');
    const descriptionContent = doc.querySelector('#kt_d');
    let description = getFilterBBCode(descriptionContent as Element);
    const discountMatch = description.match(/\[color=\w+\]本种子.+?\[\/color\]/)?.[0] ?? '';
    if (discountMatch) {
      description = description.replace(discountMatch, '');
    }
    description = description.replace(/@\d+(\(\d+\))?/g, ''); // @3545(1920)@468@152
    if (this.info.title.match(/-WiKi$/)) {
      const doubanPart = description.match(/◎译\s+名(.|\n)+/)?.[0] ?? '';
      description = description.replace(doubanPart, '');
      description = description.replace(/(\[img\].+?\[\/img\])/, `$1\n\n${doubanPart}`);
    }
    this.info.description = description;
  }

  extractMetaInfo () {
    const { description, title } = this.info;
    const mediaTecInfo = this.getHeadingTdDomsByKey('类型').text();
    this.info.area = getAreaCode(mediaTecInfo);
    const category = getCategoryFromSource(mediaTecInfo + description);
    this.info.category = refineCategory(this.info, category);
    this.info.videoType = getVideoTypeFromSource(mediaTecInfo + title);
    const audioCodec = getAudioCodecFromSource(title);
    if (description.match(/VIDEO(\.| )*CODEC/i)) {
      const matchCodec = description.match(/VIDEO(\.| )*CODEC\.*:?\s*([^\s_:]+)?/i)?.[2];
      if (matchCodec) {
        this.info.videoCodec = matchCodec.replace(/\.|-/g, '').toLowerCase();
      } else {
        this.info.videoCodec = getVideoCodecFromSourceAndVideoType(title, this.info.videoType);
      }
    }
    // 从简略mediainfo中获取audioCodec
    if (description.match(/AUDIO\s*CODEC/i)) {
      const matchCodec = description.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)?.[1];
      if (matchCodec) {
        this.info.audioCodec = getAudioCodecFromSource(matchCodec);
      }
    }
    this.info.audioCodec = audioCodec;
    this.info.resolution = getResolutionFromSource(title);
  }

  enhanceInfo () {
    const sizeMatch = this.getHeadingTdDomsByKey('尺寸').text().match(/\(((\d|,)+)\s*字节\)/i)?.[1] ?? ''; // 46.20 GB (49,602,062,686 字节)
    this.info.size = parseInt(sizeMatch.replace(/,/g, ''), 10);
  }

  extractComparisonsScreenshots () {
    const comparisonPart = this.info.description.match(/\.Comparisons(.|\n)+\[\/img\]\[\/url\]/)?.[0];
    if (!comparisonPart) {
      return;
    }
    const title = comparisonPart.match(/(\[color=.+?\])(.+?)\[\/color\]/g)?.map(item => {
      return item.match(/\[color=.+?\](.+?)\[\/color\]/)?.[1] ?? '';
    }) ?? [];
    const comparisonImgArray:string[] = [];
    const allImages = comparisonPart?.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages.forEach(img => {
        const matchUrl = img.match(/\[url=(.+?)\]/)?.[1];
        if (matchUrl) {
          comparisonImgArray.push(matchUrl);
        }
      });
    }
    this.info.comparisons = [{
      imgs: comparisonImgArray,
      title: title.join(','),
      reason: '',
    }];
  }

  async extractScreenshots () {
    const { description } = this.info;
    if (description.match(/More\.Screens/i)) { // 官组截图
      const moreScreen = description.match(/\.More\.Screens.*?\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)?.[1] ?? '';
      this.info.screenshots = await extractImgsFromBBCode(moreScreen);
      return;
    }
    this.info.screenshots = await extractImgsFromBBCode(description);
  }

  private getHeadingTdDomsByKey (key:string) {
    return $(`#main_table td.heading:contains(${key})`).next();
  };
}

registry.register(new TTGExtractor());
