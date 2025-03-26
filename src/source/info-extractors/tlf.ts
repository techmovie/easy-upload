import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { CONFIG } from '../config';

class TLFExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'TLF';
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      category: /(类型):\s*([^\s]+)?/i,
      videoType: /(媒介):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new TLFExtractor());
