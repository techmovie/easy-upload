import { CURRENT_SITE_NAME, CURRENT_SITE_INFO } from '../const';

import getPTPInfo from './ptp';
import getBHDInfo from './bhd';
import getHDBInfo from './hdb';
import getTTGInfo from './ttg';
import getNexusPHPInfo from './nexusphp';

let getTorrentInfo = getPTPInfo;
if (!CURRENT_SITE_INFO) {
  getTorrentInfo = undefined;
} else if (CURRENT_SITE_INFO.siteType === 'NexusPHP') {
  getTorrentInfo = getNexusPHPInfo;
} else if (CURRENT_SITE_NAME === 'BeyondHD') {
  getTorrentInfo = getBHDInfo;
} else if (CURRENT_SITE_NAME === 'HDBits') {
  getTorrentInfo = getHDBInfo;
} else if (CURRENT_SITE_NAME === 'TTG') {
  getTorrentInfo = getTTGInfo;
}

export default getTorrentInfo;
