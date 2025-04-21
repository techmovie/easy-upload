import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class NYPT extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'NYPT';
  }

  protected postProcess() {
    const { category, title } = this.info!;
    $('#browsecat').trigger('change');
    const domTimeout = setTimeout(() => {
      const catMap = {
        movie: '#movie_enname',
        tv: '#series_enname',
        tvPack: '#series_enname',
        documentary: '#doc_enname',
        variety: '#show_enname',
        cartoon: '#anime_enname',
      };
      const selector = catMap[category as keyof typeof catMap];
      if (selector) {
        $(selector).val(title);
      }
      clearTimeout(domTimeout);
    }, 2000);
  }
}

registry.register(new NYPT());
