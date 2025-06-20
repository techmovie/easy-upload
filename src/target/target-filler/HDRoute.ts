import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';
import { extractChineseMovieName } from '@/target/helper/index';

class HDRoute extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDRoute';
  }

  protected postProcess() {
    const { description, doubanInfo, subtitle = '' } = this.info!;
    const fullDescription = description + doubanInfo;
    const imdbRank =
      fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)?.[1] ?? '';
    const chineseName = extractChineseMovieName(description, subtitle);
    const summary =
      fullDescription.match(/(简\s+介)\s+([^[◎]+)/)?.[2]?.split('/')?.[0] ?? '';
    $('#upload-imdb').val(imdbRank);
    $('#title_chs').val(chineseName);
    $('#upload_introduction').val(summary);
  }
}

registry.register(new HDRoute());
