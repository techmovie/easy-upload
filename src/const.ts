import { PT_SITE } from './config.json';

const BROWSER_LANGUAGE = navigator.language.toLowerCase().split('-')[0];

type SiteName = keyof typeof PT_SITE;
const getSiteName = (host: string) => {
  let siteName = '' as SiteName | '';
  try {
    Object.keys(PT_SITE).forEach((key) => {
      const siteKey = key as SiteName;
      const hostName = PT_SITE[siteKey].host;
      const matchReg = new RegExp(hostName, 'i');
      if (hostName && host.match(matchReg)) {
        siteName = siteKey;
      }
    });
    return siteName;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message !== 'end loop') {
      console.log(error);
    }
    return '';
  }
};
const getSortedSiteKeys = () => {
  return Object.keys(PT_SITE).sort((a, b) => {
    const isChineseReg = /[\u4e00-\u9fa5]+/;
    if (isChineseReg.test(a) && !isChineseReg.test(b)) {
      return 1;
    }
    if (!isChineseReg.test(a) && isChineseReg.test(b)) {
      return -1;
    }
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
};
const SORTED_SITE_KEYS = getSortedSiteKeys();
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO = PT_SITE[
  CURRENT_SITE_NAME as keyof typeof PT_SITE
] as Site.SiteInfo;
const HDB_TEAM = [
  'Chotab',
  'CRiSC',
  'CtrlHD',
  'DON',
  'EA',
  'EbP',
  'Geek',
  'LolHD',
  'NTb',
  'RightSiZE',
  'SA89',
  'SbR',
  'TayTo',
  'VietHD',
];

const TORRENT_INFO = GM_getValue<TorrentInfo.Info>('cachedTorrentInfo');

export {
  CURRENT_SITE_NAME,
  CURRENT_SITE_INFO,
  PT_SITE,
  HDB_TEAM,
  SORTED_SITE_KEYS,
  BROWSER_LANGUAGE,
  SiteName,
  TORRENT_INFO,
};
