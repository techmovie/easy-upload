import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';

class KEEPFRDS extends BaseFiller implements TargetFiller {
  canHandle(siteName: string): boolean {
    return siteName === 'KEEPFRDS';
  }

  priority = 10;

  protected processTorrentTitle() {
    const { category, title, subtitle } = this.info!;
    if (category === 'music') {
      const subtitle = title;
      if (subtitle !== undefined) {
        this.info!.title = subtitle;
        this.info!.subtitle = subtitle;
      }
    } else if (subtitle === '') {
      this.info!.subtitle = title;
    }
  }

  protected processDescription() {
    let { description, sourceSite, mediaInfos } = this.info!;
    description = description.replace(/\[\/?(center|code)\]/g, '');
    if (sourceSite === 'RED') {
      description = description.replace(/\[#\]/g, '[*]');
    }
    mediaInfos?.forEach((mediaInfo) => {
      if (!/\[mediainfo\]/.test(description)) {
        description = description.replace(
          `[quote]${mediaInfo}[/quote]`,
          `[mediainfo]${mediaInfo}[/mediainfo]`,
        );
      }
    });
    this.info!.description = description;
    super.processDescription();
  }
}

registry.register(new KEEPFRDS());
