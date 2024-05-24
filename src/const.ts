import { PT_SITE } from './config.json';
const TORRENT_INFO: TorrentInfo.Info = {
  title: '',
  subtitle: '',
  description: '',
  originalDescription: '',
  year: '',
  category: '',
  videoType: '',
  format: '',
  source: '',
  videoCodec: '',
  audioCodec: '',
  resolution: '',
  area: '',
  doubanUrl: '',
  doubanInfo: '',
  imdbUrl: '',
  tags: {
    diy: false,
    chinese_audio: false,
    cantonese_audio: false,
    chinese_subtitle: false,
    dolby_atoms: false,
    dts_x: false,
    hdr: false,
    dolby_vision: false,
  },
  otherTags: {},
  mediaInfo: '',
  mediaInfos: [],
  screenshots: [],
  comparisons: [],
  movieAkaName: '',
  movieName: '',
  sourceSite: '',
  sourceSiteType: '',
  size: 0,
  isForbidden: false,
  poster: '',
};

const DOUBAN_SEARCH_API = 'https://omit.mkrobot.org/movie/infos';
const DOUBAN_SUGGEST_API = 'https://www.douban.com/search?cat=1002&q={query}';
const DOUBAN_MOBILE_API = 'https://m.douban.com/rexxar/api/v2';
const PT_GEN_API = 'https://media.pttool.workers.dev';
const TMDB_API_URL = 'https://api.tmdb.org';
const TMDB_API_KEY = '3d62cb1443c6b34b61262ab332aaf78c';
const BROWSER_LANGUAGE = navigator.language.toLowerCase().split('-')[0];

type SiteName = keyof typeof PT_SITE;
const getSiteName = (host:string) => {
  let siteName = '' as SiteName|'';
  try {
    Object.keys(PT_SITE).forEach(key => {
      const siteKey = key as SiteName;
      const hostName = PT_SITE[siteKey].host;
      const matchReg = new RegExp(hostName, 'i');
      if (hostName && host.match(matchReg)) {
        siteName = siteKey;
      }
    });
    return siteName;
  } catch (error:any) {
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
const CODES_ARRAY = ['atmos', 'dtshdma', 'aac', 'ac3', 'dd+', 'dd', 'dtsx', 'dts', 'truehd', 'flac', 'lpcm'];
const EUROPE_LIST = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'UK', 'Vatican City'];
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME as keyof typeof PT_SITE] as Site.SiteInfo;
const HDB_TEAM = ['Chotab', 'CRiSC', 'CtrlHD', 'DON', 'EA', 'EbP', 'Geek', 'LolHD', 'NTb', 'RightSiZE', 'SA89', 'SbR', 'TayTo', 'VietHD'];

export {
  TORRENT_INFO,
  DOUBAN_SEARCH_API,
  DOUBAN_MOBILE_API,
  PT_GEN_API,
  CODES_ARRAY,
  CURRENT_SITE_NAME,
  CURRENT_SITE_INFO,
  PT_SITE,
  EUROPE_LIST,
  TMDB_API_URL,
  TMDB_API_KEY,
  HDB_TEAM,
  DOUBAN_SUGGEST_API,
  SORTED_SITE_KEYS,
  BROWSER_LANGUAGE,
};
