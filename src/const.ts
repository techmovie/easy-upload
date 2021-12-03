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
  doubanBookInfo: null,
  formDom: '',
};

const DOUBAN_SEARCH_API = 'https://omit.mkrobot.org/movie/infos';
const DOUBAN_SUGGEST_API = 'https://www.douban.com/search?cat=1002&q={query}';
const PT_GEN_API = 'https://media.pttool.workers.dev';
const TMDB_API_URL = 'https://api.tmdb.org';
const TMDB_API_KEY = '3d62cb1443c6b34b61262ab332aaf78c';
const USE_CHINESE = /zh-cn|zh-hk|zh-tw/.test(navigator.language.toLowerCase());

const getSiteName = (host) => {
  let siteName = '';
  try {
    Object.keys(PT_SITE).forEach(key => {
      const hostName = PT_SITE[key].host;
      const matchReg = new RegExp(hostName, 'i');
      if (hostName && host.match(matchReg)) {
        siteName = key;
      }
    });
    return siteName;
  } catch (error) {
    if (error.message !== 'end loop') {
      console.log(error);
    }
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
const SORTED_SITE_KEYS: Array<string> = getSortedSiteKeys();
const CODES_ARRAY = ['atmos', 'dtshdma', 'aac', 'ac3', 'dd+', 'dd', 'dtsx', 'dts', 'truehd', 'flac', 'lpcm'];
const EUROPE_LIST = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'UK', 'Vatican City'];
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO: Site.SiteInfo = PT_SITE[CURRENT_SITE_NAME];
const HDB_TEAM = ['Chotab', 'CRiSC', 'CtrlHD', 'DON', 'EA', 'EbP', 'Geek', 'LolHD', 'NTb', 'RightSiZE', 'SA89', 'SbR', 'TayTo', 'VietHD'];
const NOTIFICATION_TEMPLATE =
  `<div className="easy-notification" id="#id#" style="top: #top#px; z-index:#zIndex#;">
    <div className="notification-wrapper">
      <h2 className="notification-title">#title#</h2>
      <div className="notification-content">
        <p>#message#</p>
      </div>
      <div className="notification-close-btn">
        <svg t="1619966620126" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2006" width="200" height="200"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2007" fill="#909399"></path></svg>
      </div>
    </div>
  </div>`;
export {
  TORRENT_INFO,
  DOUBAN_SEARCH_API,
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
  USE_CHINESE,
  NOTIFICATION_TEMPLATE,
};
