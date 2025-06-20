import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { CONFIG } from '../config';

class HDHExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDHome';
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      videoType: /(媒介):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new HDHExtractor());
