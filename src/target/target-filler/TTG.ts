import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { replaceAlignTagsToQuote } from '@/target/helper/index';
import $ from 'jquery';

class TTG extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'TTG';
  }

  protected processDescription(): void {
    super.processDescription();
    const { description } = this.info!;
    this.info!.description = replaceAlignTagsToQuote(description);
  }

  protected postProcess() {
    const { doubanUrl } = this.info!;
    if (doubanUrl) {
      const doubanId = doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
      $(this.siteInfo.douban.selector).val(doubanId);
    }
  }
}

registry.register(new TTG());
