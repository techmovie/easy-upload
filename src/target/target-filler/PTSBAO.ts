import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class PTSBAO extends BaseFiller implements TargetFiller {
  canHandle(siteName: string): boolean {
    return siteName === 'PTSBAO';
  }

  priority = 10;

  protected prepareToFillInfo() {
    if (localStorage.getItem('autosave')) {
      localStorage.removeItem('autosave');
    }
  }

  protected postProcess() {
    $('a[data-sceditor-command="source"]')[0].click();
    $(this.siteInfo.description.selector).val(this.info!.description);
  }
}

registry.register(new PTSBAO());
