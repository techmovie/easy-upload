import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { formatTorrentTitle } from '@/source/helper/index';
import { CONFIG } from '@/source/config';
import $ from 'jquery';

class PuTaoExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle (siteName: string): boolean {
    return siteName === 'PuTao';
  }

  extractTitle (): void {
    this.info.title = formatTorrentTitle($('h1').text().replace(/\[.+?\]|\(.+?\)/g, '')?.trim());
  }

  getMetaInfoRules () {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      category: /(类型):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new PuTaoExtractor());
