import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class RedLeaves extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'RedLeaves';
  }

  protected postProcess() {
    try {
      $(this.siteInfo.category.selector).trigger('change');
    } catch (err) {
      console.log(err);
    }
    $('tr.mode_5').css('display', '');
  }
}

registry.register(new RedLeaves());
