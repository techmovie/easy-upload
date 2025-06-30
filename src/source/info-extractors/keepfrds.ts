import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { getFilterBBCode, formatTorrentTitle } from '@/source/helper/index';
import { extractImgsFromBBCode } from '@/common';
import { CONFIG } from '@/source/config';
import { torrentInfoStore } from '@/store/torrentInfoStore';
import $ from 'jquery';

class FRDSExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'KEEPFRDS';
  }

  protected extractTitle() {
    this.info.title = $("td.rowhead:contains('副标题')").next().text();
  }

  extractSubtitle() {
    this.info.subtitle = formatTorrentTitle(
      $('#top')
        .text()
        .split(/\s{3,}/)?.[0]
        ?.trim(),
    );
  }

  extractDoubanUrl() {
    this.info.doubanUrl = $('#kdouban .imdbwp__link').attr('href');
  }

  extractImdbUrl() {
    this.info.imdbUrl = $('#kimdb .imdbwp__link').attr('href');
  }

  protected extractMediaInfos() {
    const mediaInfoContent = $("div.codemain > pre:contains('Unique ID')");
    const result: string[] = [];
    if (mediaInfoContent.length > 0) {
      mediaInfoContent.each((_, selector) => {
        result.push($(selector).text());
      });
      this.info.mediaInfos = result;
    }
  }

  extractDescription() {
    const element = document.createElement('div');
    $(element).html($('#outer td').has('#kdescr').html());
    let descriptionBBCode = getFilterBBCode(element);
    descriptionBBCode = descriptionBBCode
      .replace('  [url=', '\n  [url=')
      .replace(/\[\/img\]\[\/url\]\n/g, '[/img][/url]');
    descriptionBBCode = descriptionBBCode.replace(
      / 截图对比\(点击空白处展开\)/g,
      '截图对比',
    );
    descriptionBBCode = descriptionBBCode.replace(
      /\[quote\]GeneralVideo[^[]*\[\/quote\]/,
      '',
    );
    this.info.description = descriptionBBCode;
  }

  enhanceInfo() {
    const { description, doubanUrl, imdbUrl } = this.info;
    if (!description.includes('豆瓣评分')) {
      const imdbRate = $('#kimdb span.imdbwp__rating')
        .text()
        .replace('\nRating: ', '');
      const doubanInfo = $('#kdouban .imdbwp__content')
        .text()
        .replace(/\n{2,}/g, '\n')
        .replace(/\n[0-9]?[0-9]\.[0-9]\n/g, '\n')
        .replace(/\n/g, '\n◎')
        .replace(/\n◎$/, '\n')
        .replace(
          '◎Rating:',
          `◎IMDb链接:${imdbUrl}\n◎IMDb评分: ${imdbRate}\n◎豆瓣链接: ${doubanUrl}\n◎豆瓣评分:`,
        );
      const postUrl = $('#kimdb img.imdbwp__img')?.attr('src') ?? '';
      const doubanPoster = postUrl ? `[img]${postUrl}[/img]\n` : '';
      this.info.doubanInfo = doubanPoster + doubanInfo || '';
    }
  }

  extractComparisonsScreenshots() {
    const comparisonArray = $('fieldset[onclick]').toArray() || [];
    const comparisons: TorrentInfo.comparison[] = [];
    comparisonArray.forEach((item) => {
      const imgs: string[] = [];
      $(item)
        .find('a')
        .toArray()
        .forEach((img) => {
          if (img.href) imgs.push(img.href);
        });
      const title = $(item)
        .find('legend')
        .text()
        .replace(' 截图对比(点击空白处展开):', '')
        .trim();
      comparisons.push({
        title,
        imgs,
        reason: '',
      });
    });
    this.info.comparisons = comparisons;
  }

  async extractScreenshots() {
    extractImgsFromBBCode(
      this.info.description.replace(/\[quote\]截图对比[^\n]*\n[^\n]*/gi, ''),
    )
      .then((screenshots) => {
        this.info.screenshots = screenshots;
        torrentInfoStore.setInfo(this.info);
      })
      .catch((error) => {
        console.log('Error extracting screenshots:', error);
      });
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      videoType: /(encode):\s*([^\s]+)?/i,
      category: /(类型):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new FRDSExtractor());
