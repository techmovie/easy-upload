import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import { registry } from './target-filler/registry';

import './target-filler/52pt';
import './target-filler/Bib';
import './target-filler/BTSCHOOL';
import './target-filler/Concertos';
import './target-filler/HDBits';
import './target-filler/HDFans';
import './target-filler/HDRoute';
import './target-filler/HDT';
import './target-filler/HDTime';
import './target-filler/HDU';
import './target-filler/KEEPFRDS';
import './target-filler/NYPT';
import './target-filler/PTN';
import './target-filler/PTSBAO';
import './target-filler/RedLeaves';
import './target-filler/SpeedApp';
import './target-filler/SSD';
import './target-filler/TTG';
import './target-filler/UHDBits';
import './target-filler/UNIT3D';
import './target-filler/NexusPHP';
import './target-filler/BeyondHD';
import './target-filler/SC';

export const fillTargetForm = (info: TorrentInfo.Info): void => {
  if (!info) {
    console.warn('No torrent info provided for filling form');
    return;
  }

  console.log('Filling form with info:', info);

  const filler = registry.getApplicableFiller(
    CURRENT_SITE_NAME,
    CURRENT_SITE_INFO.siteType,
  );

  if (filler) {
    filler.fill(info);
  } else {
    console.warn(`No specialized filler found for site: ${CURRENT_SITE_NAME}`);
  }
};
