import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { fixTorrentTitle } from '@/target/helper/index';
import $ from 'jquery';

class PTer extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'PTer' || siteName === 'PTer-offer';
  }

  protected processTorrentTitle(): void {
    const { source, title } = this.info!;
    const isWebSource = !!source.match(/web/gi);
    const fixedTitle = fixTorrentTitle(title, isWebSource);
    this.info!.title = fixedTitle;
    super.processTorrentTitle();
  }

  protected postProcess() {
    const { description, area } = this.info!;
    const language = description.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
    if (!language.match(/英语/) && area === 'EU') {
      $(this.siteInfo.area.selector).val('8');
    }
  }

  protected processDescription() {
    let { description, comparisons, mediaInfos } = this.info!;
    mediaInfos.forEach((info) => {
      if (info.match(/Disc Title|Disc Label/i)) {
        description = description.replace(
          `[quote]${info}[/quote]`,
          `[hide=BDInfo]${info}[/hide]`,
        );
      } else {
        description = description.replace(
          `[quote]${info}[/quote]`,
          `[hide=mediainfo]${info}[/hide]`,
        );
      }
    });
    if (comparisons?.length) {
      for (const comparison of comparisons) {
        const { title, imgs } = comparison;
        const titleCount = title?.split(',').length ?? '';
        imgs.forEach((img) => {
          description = description.replace(
            `[img]${img}[/img]`,
            `[img${titleCount}]${img}[/img]`,
          );
        });
      }
    }
    this.info!.description = description;
    super.processDescription();
  }
}

registry.register(new PTer());
