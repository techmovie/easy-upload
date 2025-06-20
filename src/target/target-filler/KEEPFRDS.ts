import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { filterEmptyTags } from '@/target/helper/index';

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
    let {
      description,
      sourceSite,
      mediaInfos,
      originalDescription,
      screenshots,
      category,
      title,
      subtitle,
    } = this.info!;
    description = description.replace(/\[\/?(center|code)\]/g, '');
    if (sourceSite === 'PTP') {
      description = originalDescription?.replace(/^(\s+)/g, '') ?? '';
      description = filterEmptyTags(description);
      description = description.replace(/http:\/\/ptpimg/g, 'https://ptpimg');
      screenshots.forEach((screenshot) => {
        const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
        if (!description.match(regStr)) {
          // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
          const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
          if (description.match(regOldFormat)) {
            description = description.replace(
              regOldFormat,
              `[img]${screenshot}[/img]`,
            );
          } else {
            description = description.replace(
              new RegExp(`(?<!\\[img\\])${screenshot}`, 'gi'),
              `[img]${screenshot}[/img]`,
            );
          }
        }
      });
    } else if (sourceSite === 'RED') {
      description = description.replace(/\[#\]/g, '[*]');
    }
    $('#torrent').on('change', () => {
      if (category !== 'music') {
        $(this.siteInfo.name.selector).val(title);
        if (subtitle) $(this.siteInfo.subtitle.selector).val(subtitle);
      } else {
        $(this.siteInfo.name.selector).val(subtitle || '');
        if (subtitle) $(this.siteInfo.subtitle.selector).val(title);
      }
    });
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
