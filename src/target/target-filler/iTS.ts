import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';

class ITS extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'iTS';
  }

  protected processTorrentTitle() {
    super.processTorrentTitle();
    const { title } = this.info!;
    this.info!.title = title.replace(/\s/gi, '.');
  }

  protected postProcess() {
    const { category, title, doubanUrl, imdbUrl, screenshots, subtitle } =
      this.info!;
    if (
      category === 'tvPack' ||
      title.match(/Trilogy|Collection/i) ||
      (subtitle && subtitle.match(/合集/))
    ) {
      $('input[name="pack"]').attr('checked', 'true');
    }
    $(this.siteInfo.imdb.selector).val((doubanUrl || imdbUrl) as string);
    $(this.siteInfo.screenshots.selector).val(screenshots.join('\n'));
  }
}

registry.register(new ITS());
