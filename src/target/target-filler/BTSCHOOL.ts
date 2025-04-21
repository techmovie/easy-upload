import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { getTeamName } from '@/target/helper/index';
import { CONFIG } from '@/target/config';
import $ from 'jquery';

class BTSCHOOL extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'BTSCHOOL';
  }

  protected postProcess() {
    const { doubanUrl } = this.info!;
    $(this.siteInfo.imdb.selector).val(this.imdbId);
    if (doubanUrl) {
      const doubanId = doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
      $(this.siteInfo.douban.selector).val(doubanId);
    }
  }

  protected fillTeamName() {
    const { title } = this.info!;
    const teamConfig = this.siteInfo.team;
    const teamName = getTeamName(title);
    if (CONFIG.HDB_TEAM.includes(teamName)) {
      $(teamConfig.selector).val(teamConfig.map.hdbint);
    }
  }
}

registry.register(new BTSCHOOL());
