import { PT_SITE } from './config.json';
const TORRENT_INFO = {
  title: '', // 标题
  subtitle: '', // 副标题
  description: '', // 描述
  originalDescription: '', // 原始描述
  year: '', // 电影年份
  category: '', // 电影、电视、音乐等
  videoType: '', // bluray remux encodes web-dl
  format: '', // 文件格式
  source: '', // 视频来源
  videoCodec: '', // 视频编码
  audioCodec: '', // 音频编码
  resolution: '', // 分辨率
  area: '', // 地区
  doubanUrl: '', // 豆瓣地址
  doubanInfo: '', // 豆瓣简介
  imdbUrl: '', // imdb地址
  tags: {
    diy: false,
    chinese_audio: false,
    cantonese_audio: false,
    chinese_subtitle: false,
    dolby_atoms: false,
    dts_x: false,
    hdr: false,
    dolby_vision: false,
  }, // 标签 diy 中字 国配等
  otherTags: {},
  mediaInfo: '', // mediainfo或者bdInfo
  screenshots: [],
  comparisons: [], // 对比图
  movieAkaName: '', // 别名一般为电影英文名称
  movieName: '', // imdb电影原始名称 一般为拼音
  sourceSite: '', // 种子来源站点简称
  sourceSiteType: '', // 种子来源站点类型
  size: '', // 种子大小 转换成 Bytes
  isForbidden: false, // 是否禁转
  poster: '', // 海报
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
const SORTED_SITE_KEYS = getSortedSiteKeys();
const CODES_ARRAY = ['atmos', 'dtshdma', 'aac', 'ac3', 'dd+', 'dd', 'dtsx', 'dts', 'truehd', 'flac', 'lpcm'];
const EUROPE_LIST = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'UK', 'Vatican City'];
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
const HDB_TEAM = ['Chotab', 'CRiSC', 'CtrlHD', 'DON', 'EA', 'EbP', 'Geek', 'LolHD', 'NTb', 'RightSiZE', 'SA89', 'SbR', 'TayTo', 'VietHD'];
const NOTIFICATION_TEMPLATE = `
<div class="easy-notification" id="#id#" style="top: #top#px; z-index:#zIndex#;">
  <div class="notification-wrapper">
    <h2 class="notification-title">#title#</h2>
    <div class="notification-content">
      <p>#message#</p>
    </div>
    <div class="notification-close-btn">
    <svg t="1619966620126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2006" width="200" height="200"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2007" fill="#909399"></path></svg>
    </div>
  </div>
</div>
`;
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
}
;
