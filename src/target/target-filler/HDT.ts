import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class HDT extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDT';
  }

  protected processDescription() {
    let { description } = this.info!;
    description = description
      .replace(/(\[\/img\])(\[img\])/g, '$1 $2')
      .replace(/(\[\/url\])(\[url)/g, '$1 $2');
    this.info!.description = description;
    super.processDescription();
  }

  protected postProcess() {
    let { category, imdbUrl = '' } = this.info!;
    if (category !== 'tvPack') {
      $('select[name="season"').val('true');
    }
    if (!/.+\/$/.test(imdbUrl) && /tt\d+/.test(imdbUrl)) {
      imdbUrl += '/';
    }
    $(this.siteInfo.imdb.selector).val(imdbUrl);
  }
}

registry.register(new HDT());
