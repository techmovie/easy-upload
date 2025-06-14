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
    let { description, comparisons } = this.info!;
    const quoteRegex = /\[quote\]([\s\S]*?)\[\/quote\]/g;
    let modifiedDescription = description;
    let match;
    while ((match = quoteRegex.exec(description)) !== null) {
      const fullMatch = match[0];
      const quoteContent = match[1];
      if (quoteContent.match(/Disc Title|Disc Label/i)) {
        const replacement = `[hide=BDInfo]${quoteContent}[/hide]`;
        modifiedDescription = modifiedDescription.replace(
          fullMatch,
          replacement,
        );
      } else if (
        quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)
      ) {
        const replacement = `[hide=mediainfo]${quoteContent}[/hide]`;
        modifiedDescription = modifiedDescription.replace(
          fullMatch,
          replacement,
        );
      }
    }

    description = modifiedDescription;
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
