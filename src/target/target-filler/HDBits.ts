import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';

class HDBits extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDBits';
  }

  protected processTorrentTitle() {
    super.processTorrentTitle();
    const { title, videoType, movieName, movieAkaName } = this.info!;
    let mediaTitle = title.replace(
      /([^\d]+)\s+([12][90]\d{2})/,
      (_, p1, p2) => {
        return `${movieName || movieAkaName} ${p2}`;
      },
    );
    if (videoType === 'remux') {
      mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/gi, '');
    }
    this.info!.title = mediaTitle;
  }
}

registry.register(new HDBits());
