import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { CONFIG } from '../config';

class SharedNexusSitesExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return /PTSBAO|PTHome|HDTime|BTSCHOOL|SoulVoice/.test(siteName);
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      category: /(类型):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new SharedNexusSitesExtractor());
