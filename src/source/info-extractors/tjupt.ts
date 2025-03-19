import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { formatTorrentTitle } from '@/source/helper/index';
import { CONFIG } from '@/source/config';
import $ from 'jquery';

class TJUPTExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle (siteName: string): boolean {
    return siteName === 'TJUPT';
  }

  extractTitle (): void {
    const title = formatTorrentTitle($('#top').text().split(/\s{3,}/)?.[0]?.trim());
    const matchArray = title.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
    const realTitle = matchArray.filter(item => item.match(/\.| /))?.[0] ?? '';
    this.info.title = realTitle.replace(/\[|\]/g, '');
  }

  getMetaInfoRules () {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      category: /(类型):\s*([^\s|]+)?/i,
    };
  }
}

registry.register(new TJUPTExtractor());
