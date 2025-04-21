import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import {
  fixTorrentTitle,
  replaceAlignTagsToQuote,
} from '@/target/helper/index';

class NexusPHP extends BaseFiller implements TargetFiller {
  priority = 5;

  canHandle(siteName: string, siteType: string): boolean {
    return siteType === 'NexusPHP';
  }

  protected processDescription(): void {
    super.processDescription();
    const { description } = this.info!;
    this.info!.description = replaceAlignTagsToQuote(description);
  }

  protected processTorrentTitle() {
    super.processTorrentTitle();
    const { title, source } = this.info!;
    const isWebSource = !!source.match(/web/gi);
    const fixedTitle = fixTorrentTitle(title, isWebSource);
    this.info!.title = fixedTitle;
  }
}

registry.register(new NexusPHP());
