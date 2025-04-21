import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class SpeedApp extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'SpeedApp';
  }

  protected processDescription() {
    let { description } = this.info!;
    description = description
      .replace(/\[url.*\[\/url\]/g, '')
      .replace(/\[img.*\[\/img\]/g, '')
      .replace(/\[\/?(i|b|center|quote|size|color)\]/g, '')
      .replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, '')
      .replace(/\n\n*/g, '\n');
    this.info!.description = description;
    super.processDescription();
  }

  protected postProcess() {
    let { imdbUrl = '' } = this.info!;
    if (!/.+\/$/.test(imdbUrl) && /tt\d+/.test(imdbUrl)) {
      imdbUrl += '/';
    }
    $(this.siteInfo.imdb.selector).val(imdbUrl);
  }
}

registry.register(new SpeedApp());
