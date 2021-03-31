import { PT_SITE } from './config.yaml';
const TORRENT_INFO = {
  title: '', // 标题
  subtitle: '', // 副标题
  description: '', // 描述
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
    DIY: false,
    chineseAudio: false,
    cantoneseAudio: false,
    chineseSubtitle: false,
    atoms: false,
    dtsx: false,
    HDR: false,
    DolbyVision: false,
  }, // 标签 diy 中字 国配等
  mediaInfo: '', // mediainfo或者bdInfo
  screenshots: [],
  comparisonImgs: [], // 对比图
  movieAkaName: '', // 别名一般为电影英文名称
  movieName: '', // imdb电影原始名称 一般为拼音
  sourceSite: '', // 种子来源站点简称
  sourceSiteType: '', // 种子来源站点类型
  size: '', // 种子大小 转换成 Bytes
  isForbidden: false, // 是否禁转
};

const DOUBAN_SEARCH_API = 'https://omit.mkrobot.org/movie/infos';
const DOUBAN_SUGGEST_API = 'https://movie.douban.com/j/subject_suggest';
const PT_GEN_API = 'https://media.pttool.workers.dev';
const TMDB_API_URL = 'https://api.tmdb.org';
const TMDB_API_KEY = '3d62cb1443c6b34b61262ab332aaf78c';

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

const CODES_ARRAY = ['atmos', 'dtshdma', 'aac', 'ac3', 'dd+', 'dd', 'dtsx', 'dts', 'truehd', 'flac', 'lpcm'];
const EUROPE_LIST = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'UK', 'Vatican City'];
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
const HDB_TEAM = ['Chotab', 'CRiSC', 'CtrlHD', 'DON', 'EA', 'EbP', 'Geek', 'LolHD', 'NTb', 'RightSiZE', 'SA89', 'SbR', 'TayTo', 'VietHD'];
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
}
;
