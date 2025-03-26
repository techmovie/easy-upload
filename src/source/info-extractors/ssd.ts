import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { getFilterBBCode, formatTorrentTitle } from '@/source/helper/index';
import { CONFIG } from '../config';
import $ from 'jquery';

class SSDExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'SSD';
  }

  extractTitle(): void {
    this.info.title = formatTorrentTitle($('#torrent-name').text());
  }

  protected extractDoubanUrl(): void {
    this.info.doubanUrl = $(
      ".douban_info a:contains('://movie.douban.com/subject/')",
    ).attr('href');
  }

  protected extractImdbUrl(): void {
    this.info.imdbUrl = $(
      ".douban_info a:contains('://www.imdb.com/title/')",
    ).attr('href');
  }

  protected extractDoubanInfo(): void {
    const doubanInfo = getFilterBBCode($('.douban-info artical')?.[0]);
    const postUrl = $('#kposter').find('img')?.attr('src') ?? '';
    const doubanPoster = postUrl ? `[img]${postUrl}[/img]\n` : '';
    this.info.doubanInfo =
      doubanPoster + doubanInfo?.replace(/\n{2,}/g, '\n') || '';
  }

  protected extractDescription() {
    let extraTextInfo = getFilterBBCode(
      $('.torrent-extra-text-container .extra-text')?.[0],
    );
    extraTextInfo = extraTextInfo ? `\n[quote]${extraTextInfo}[/quote]\n` : '';
    const extraScreenshotDom = $('.screenshot').find('img');
    const imgs: string[] = [];
    if (extraScreenshotDom) {
      extraScreenshotDom.each((_, item) => {
        imgs.push(`[img]${$(item).attr('src')?.trim() ?? ''}[/img]`);
      });
    }
    const extraScreenshot = imgs.join('');
    const mediaInfo = $("section[data-group='mediainfo'] .codemain").text();
    this.info.mediaInfos = [mediaInfo];
    this.info.description = extraTextInfo + extraScreenshot;
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      resolution: /(分辨率|解析度):\s*([^\s]+)?/i,
      videoTypeKey: /(格式):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new SSDExtractor());
