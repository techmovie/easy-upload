import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { formatTorrentTitle, getFilterBBCode } from '@/source/helper/index';
import { GMFetch } from '@/common';
import $ from 'jquery';

class TTGExtractor extends NexusPHPExtractor {
  priority = 10;
  headTitle = '';

  canHandle (siteName: string): boolean {
    return siteName === 'TTG';
  }

  extractTitle () {
    this.headTitle = $('#main_table h1').eq(0).text();
    const title = formatTorrentTitle(this.headTitle.match(/[^[]+/)?.[0] ?? '');
    this.info.title = title;
  }

  extractSubtitle () {
    this.info.subtitle = this.headTitle.replace(this.info.title, '').replace(/\[|\]/g, '');
  }

  extractImdbUrl () {
    this.info.imdbUrl = $('#main_table td.heading:contains(IMDb)').next().find('a').attr('href') || '';
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
    const noneSenseNumberMatch = description.match(/@\d+?\(\d+?\)/)?.[0] ?? '';
    if (noneSenseNumberMatch) {
      description = description.replace(noneSenseNumberMatch, '');
    }
    if (this.info.title.match(/-WiKi$/)) {
      const doubanPart = description.match(/◎译\s+名(.|\n)+/)?.[0] ?? '';
      description = description.replace(doubanPart, '');
      description = description.replace(/(\[img\].+?\[\/img\])/, `$1\n\n${doubanPart}`);
    }
    this.info.description = description;
  }

  extractMetaInfo () {

  }

  enhanceInfo () {
    const sizeMatch = $('#main_table td.heading:contains(尺寸)')
      .next().text().match(/\(((\d|,)+)\s*字节\)/i)?.[1] ?? '';
    this.info.size = parseInt(sizeMatch.replace(/,/g, ''), 10);
  }

  protected extractComparisonsScreenshots (): void {
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
}

registry.register(new TTGExtractor());
