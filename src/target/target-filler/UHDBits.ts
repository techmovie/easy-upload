import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { getTeamName } from '@/target/helper/index';
import $ from 'jquery';

class UHDBits extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'UHDBits';
  }

  protected postProcess() {
    const { title } = this.info!;

    $(this.siteInfo.imdb.selector).val(this.imdbId);
    if (title.match(/web-?rip/i)) {
      $(this.siteInfo.videoType.selector).val('WEBRip');
    }
    const teamName = getTeamName(title);
    $('#team').val(teamName === 'other' ? 'Unknown' : teamName);
    $('#imdb_button').trigger('click');
  }
}

registry.register(new UHDBits());
