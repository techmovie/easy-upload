import { registry } from './registry';
import { AvistaZExtractor } from './base/avistaz-base';

class GenericAvistaZExtractor extends AvistaZExtractor {
  priority = 5;

  canHandle (siteName: string, siteType: string): boolean {
    return siteType === 'AvistaZ';
  }
}

registry.register(new GenericAvistaZExtractor());
