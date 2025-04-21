import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { extractChineseMovieName } from '@/target/helper/index';

class PuTao extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'PuTao';
  }

  protected processTorrentTitle() {
    super.processTorrentTitle();
    const { description, subtitle = '' } = this.info!;
    const chineseName = extractChineseMovieName(description, subtitle);
    this.info!.title = `[${chineseName}]${this.info!.title}`;
  }
}

registry.register(new PuTao());
