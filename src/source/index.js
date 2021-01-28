
import { CURRENT_SITE_NAME, CURRENT_SITE_INFO} from '../const';

import getPTPInfo from './ptp';
import getCHDInfo from './chd'
import getMTeamInfo from './mteam'

let getTorrentInfo = getPTPInfo;

switch(CURRENT_SITE_NAME) {
	case 'PTP':
		getTorrentInfo = getPTPInfo;
		break;
	case 'CHD':
		getTorrentInfo = getCHDInfo;
		break;
	case 'MTeam':
		getTorrentInfo = getMTeamInfo;
		break;
}

export default getTorrentInfo;