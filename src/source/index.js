import { CURRENT_SITE_NAME, CURRENT_SITE_INFO } from '../const';

import getPTPInfo from './ptp';
import getBHDInfo from './bhd';
import getNexusPHPInfo from './nexusphp';

let getTorrentInfo = getPTPInfo;

if (CURRENT_SITE_INFO.siteType === 'NexusPHP') {
  getTorrentInfo = getNexusPHPInfo;
} else if (CURRENT_SITE_NAME === 'BHD') {
  getTorrentInfo = getBHDInfo;
}

export default getTorrentInfo;
