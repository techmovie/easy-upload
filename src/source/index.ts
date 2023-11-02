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
import getBTNInfo from './btn';
import getAvistaZInfo from './avistaz';
import getTeamHDInfo from './teamhd';
import getHDSpaceInfo from './hdspace';
import getGPWInfo from './gpw';
import getEMPInfo from './emp';
import getBdcInfo from './bdc';
import getRedInfo from './red';
import getMTVInfo from './mtv';
import getSpeedAppInfo from './speedapp';

const siteNameMap = {
  BeyondHD: getBHDInfo,
  HDBits: getHDBInfo,
  TTG: getTTGInfo,
  HDT: getHDTInfo,
  KG: getKGInfo,
  UHDBits: getUHDInfo,
  PTP: getPTPInfo,
  BTN: getBTNInfo,
  TeamHD: getTeamHDInfo,
  HDSpace: getHDSpaceInfo,
  GPW: getGPWInfo,
  EMP: getEMPInfo,
  Bdc: getBdcInfo,
  RED: getRedInfo,
  DicMusic: getRedInfo,
  MTV: getMTVInfo,
  SpeedApp: getSpeedAppInfo,
};

const siteTypeInfoMap = {
  NexusPHP: getNexusPHPInfo,
  UNIT3D: getUNIT3DInfo,
  AvistaZ: getAvistaZInfo,
};

let getTorrentInfo = (): any => Promise.resolve();

if (!CURRENT_SITE_INFO) {
  console.log('do nothing');
} else if (siteNameMap[CURRENT_SITE_NAME as keyof typeof siteNameMap]) {
  getTorrentInfo = siteNameMap[CURRENT_SITE_NAME as keyof typeof siteNameMap];
} else if (siteTypeInfoMap[CURRENT_SITE_INFO.siteType as keyof typeof siteTypeInfoMap]) {
  getTorrentInfo = siteTypeInfoMap[CURRENT_SITE_INFO.siteType as keyof typeof siteTypeInfoMap];
}

export default getTorrentInfo;
