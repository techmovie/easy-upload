import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';

class GenericNexusPHPExtractor extends NexusPHPExtractor {
  priority = 5;

  canHandle (siteName: string, siteType: string): boolean {
    return siteType === 'NexusPHP';
  }
}

registry.register(new GenericNexusPHPExtractor());
