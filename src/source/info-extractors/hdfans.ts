import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { CONFIG } from '../config';

class HDFansExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle (siteName: string): boolean {
    return siteName === 'HDFans';
  }

  getMetaInfoRules () {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      videoType: /(媒介):(.+?)\\s{2,}?/i,
    };
  }
}

registry.register(new HDFansExtractor());
