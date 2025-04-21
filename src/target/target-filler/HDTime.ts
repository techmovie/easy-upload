import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class HDTime extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDTime';
  }

  protected postProcess() {
    if (this.info!.videoType.match(/bluray/i)) {
      $(this.siteInfo.category.selector).val('424');
    }
  }
}

registry.register(new HDTime());
