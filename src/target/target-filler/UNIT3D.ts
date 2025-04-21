import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { fixTorrentTitle, buildPTPDescription } from '@/target/helper/index';

class UNIT3D extends BaseFiller implements TargetFiller {
  priority = 5;

  canHandle(siteName: string, siteType: string): boolean {
    return siteType.includes('UNIT3D');
  }

  protected processDescription() {
    super.processDescription();
    let { description, sourceSite, screenshots } = this.info!;
    if (sourceSite === 'PTP') {
      description = buildPTPDescription(this.info!);
    }
    if (screenshots.length > 0) {
      screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](\n*)?`);
        if (description.match(regStr)) {
          description = description.replace(regStr, (p1, p2) => {
            return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
          });
        }
      });
    }
    if (description.match(/mobile\.webp\[\/img/gi)) {
      description = description.replace(/\[img\]/g, '[img=350x350]');
    }
    description = description.replace(
      /\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g,
      '[$2]$3[/$2]',
    );
    description = description.replace(
      /\[(\/)?hide(?:=(.+?))?\]/g,
      (_, p1, p2) => {
        const slash = p1 || '';
        return p2 ? `${p2}: [${slash}spoiler]` : `[${slash}spoiler]`;
      },
    );
    this.info!.description = description;
  }

  protected processTorrentTitle() {
    super.processTorrentTitle();
    const { title, source } = this.info!;
    const isWebSource = !!source.match(/web/gi);
    const fixedTitle = fixTorrentTitle(title, isWebSource);
    this.info!.title = fixedTitle;
  }
}

registry.register(new UNIT3D());
