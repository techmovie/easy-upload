
import { CURRENT_SITE_NAME } from '../const';

import getPTPInfo from './ptp';
import getCHDInfo from './chd';
import Mteam from './mteam';
import getTTGInfo from './ttg';
import getOurbitsInfo from './ourbits';
import getHDSkyInfo from './hdsky';

let getTorrentInfo = getPTPInfo;

switch (CURRENT_SITE_NAME) {
  case 'PTP':
    getTorrentInfo = getPTPInfo;
    break;
  case 'CHD':
    getTorrentInfo = getCHDInfo;
    break;
  case 'MTeam':
    getTorrentInfo = (new Mteam()).getTorrentInfo;
    break;
  case 'TTG':
    getTorrentInfo = getTTGInfo;
    break;
  case 'OURBITS':
    getTorrentInfo = getOurbitsInfo;
    break;
  case 'HDSKY':
    getTorrentInfo = getHDSkyInfo;
    break;
}

export default getTorrentInfo;
