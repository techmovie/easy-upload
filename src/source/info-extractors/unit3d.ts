import { registry } from './registry';
import { Unite3DExtractor } from './base/unit3d-base';

class GenericUnit3DExtractor extends Unite3DExtractor {
  priority = 5;

  canHandle(siteName: string, siteType: string): boolean {
    return siteType === 'UNIT3D';
  }
}

registry.register(new GenericUnit3DExtractor());
