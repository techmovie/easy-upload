import { CURRENT_SITE_NAME, CURRENT_SITE_INFO } from '../const';

import getPTPInfo from './ptp';
import getBHDInfo from './bhd';
import getHDBInfo from './hdb';
import getTTGInfo from './ttg';
import getUNIT3DInfo from './unit3d';
import getNexusPHPInfo from './nexusphp';
import getHDTInfo from './hdt';
import getKGInfo from './kg';
import getUHDInfo from './uhd';

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
} else if (CURRENT_SITE_INFO.siteType === 'UNIT3D') {
  getTorrentInfo = getUNIT3DInfo;
} else if (CURRENT_SITE_NAME === 'HDT') {
  getTorrentInfo = getHDTInfo;
} else if (CURRENT_SITE_NAME === 'KG') {
  getTorrentInfo = getKGInfo;
} else if (CURRENT_SITE_NAME === 'UHDBits') {
  getTorrentInfo = getUHDInfo;
}

export default getTorrentInfo;
