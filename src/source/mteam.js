import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getUrlParam, formatTorrentTitle } from '../common';

export default () => {
  console.log('call getCHDInfo function')
  const torrentDom = $(`#top`);
  const metaInfo = $("td.rowhead:contains('基本資訊'):last").next().text();
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = $('#top').prop ('firstChild').nodeValue.trim();
  TORRENT_INFO.movieAkaName = $("td.rowhead:contains('副標題'):last").next().text();
  TORRENT_INFO.imdbUrl = $('#kimdb>a').attr('href')|| '';
  TORRENT_INFO.year = $('#top').text().match(/\d{4}/g)[0];
  TORRENT_INFO.title = $('#top').prop ('firstChild').nodeValue.trim();
  TORRENT_INFO.subtitle = $("td.rowhead:contains('副標題'):last").next().text();
  let category = getMeta(metaInfo, '類別');
  TORRENT_INFO.category = getCategory(category);
  // let videoType = getMeta(metaInfo, '媒介');
  // TORRENT_INFO.videoType = getVideoType(videoType);
  let videoCodes = getMeta(metaInfo, '編碼');
  TORRENT_INFO.videoCodes = getCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码');
  // TORRENT_INFO.source = getPTPSource(source, codes, resolution);
  TORRENT_INFO.resolution = getMeta(metaInfo, '解析度').toLowerCase();
  // const { logs, bdinfo } = getPTPLogsOrBDInfo(torrentDom);
  // TORRENT_INFO.logs = logs;
  // TORRENT_INFO.bdinfo = bdinfo;
  // TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`;
  TORRENT_INFO.screenshots = getImages(torrentDom);
  // TORRENT_INFO.area = getAreaCode();
  // createSeedDom(torrentDom, TORRENT_INFO);
  return TORRENT_INFO
};

// mapping sample:
// <option value="401">Movie(電影)/SD</option>
// <option value="419">Movie(電影)/HD</option>
// <option value="420">Movie(電影)/DVDiSo</option>
// <option value="421">Movie(電影)/Blu-Ray</option>
// <option value="439">Movie(電影)/Remux</option>
// <option value="403">TV Series(影劇/綜藝)/SD</option>
// <option value="402">TV Series(影劇/綜藝)/HD</option>
// <option value="435">TV Series(影劇/綜藝)/DVDiSo</option>
// <option value="438">TV Series(影劇/綜藝)/BD</option>
// <option value="404">紀錄教育</option>
// <option value="405">Anime(動畫)</option>
// <option value="406">MV(演唱)</option>
// <option value="408">Music(AAC/ALAC)</option>
// <option value="434">Music(無損)</option>
// <option value="407">Sports(運動)</option>
// <option value="422">Software(軟體)</option>
// <option value="423">PCGame(PC遊戲)</option>
// <option value="427">eBook(電子書)</option>
// <option value="410">AV(有碼)/HD Censored</option>
// <option value="429">AV(無碼)/HD Uncensored</option>
// <option value="424">AV(有碼)/SD Censored</option>
// <option value="430">AV(無碼)/SD Uncensored</option>
// <option value="426">AV(無碼)/DVDiSo Uncensored</option>
// <option value="437">AV(有碼)/DVDiSo Censored</option>
// <option value="431">AV(有碼)/Blu-Ray Censored</option>
// <option value="432">AV(無碼)/Blu-Ray Uncensored</option>
// <option value="436">AV(網站)/0Day</option>
// <option value="425">IV(寫真影集)/Video Collection</option>
// <option value="433">IV(寫真圖集)/Picture Collection</option>
// <option value="411">H-Game(遊戲)</option>
// <option value="412">H-Anime(動畫)</option>
// <option value="413">H-Comic(漫畫)</option>
// <option value="409">Misc(其他)</option></select>

const getCategory = (videoType) => {
  if (videoType.match(/Movie/i)) {
    return 'movie';
  }
  if (videoType.match(/TV/i)) {
    return 'tv';
  }
  if (videoType.match(/Sports/i)) {
    return 'sport';
  }
  return '';
};

const getMeta = (metaInfo, type) => {
  if (metaInfo === '') {
    return '';
  }
  let meta = metaInfo.split('   ');
  for(var i=0;i<meta.length;i++){
      meta[i] = meta[i].split(":");
  }
  for(var i=0;i<meta.length;i++){
    if (meta[i][0] === type) {
      return meta[i][1].trim();
    }
  }
  return '';

}

// videoCodes mapping sample
// H.264 1
// VC-1 2
// Xvid 3
// MPEG-2 4
// FLAC 5
// APE 1
// DTS 1
// AC-3 1
// WAV 1
// MP3 1
// MPEG-4 1
// H.265 1
// ALAC 1
// AAC 1

const getCodes = (codes) => {

  return codes.replace(/[.-]/g, '').toLowerCase();
};

// 获取截图
const getImages = () => {
  let imgList = [];
  const images = $("td.rowhead:contains('簡介'):last").next().find('img');
  for (let i = 0; i < images.length; i++) {
      imgList.push(images[i].getAttribute('src'));
  }
 
  return imgList;
};

const getPTPSource = (source, codes, resolution) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getPtpCodes = (codes) => {
  if (codes === 'BD66' || codes === 'BD100') {
    return 'hevc';
  }
  if (codes.startsWith('BD')) {
    return 'h264';
  }
  if (codes.startsWith('DVD')) {
    return 'mpeg2';
  }
  return codes.replace(/[.-]/g, '').toLowerCase();
};
const getVideoType = (videoType) => {
  if (videoType === 'WEB-DL') {
    return 'web';
  }
  
  return videoType.replace(/[.-]/g, '').toLowerCase();
};
const getPTPResolution = (resolution) => {
  if (resolution.match(/NTSC|PAL/ig)) {
    return '480p';
  } else if (resolution.match(/\d{3}x\d{3}/)) {
    return '480p';
  }
  return resolution;
};
const getAreaCode = () => {
  const europeList = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
  let country = [];
  const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
  if (matchArray && matchArray.length > 0) {
    country = matchArray[1].replace(/(,)\s+/g, '$1').split(',');
  }
  if (country[0]) {
    if (country[0].match(/USA|Canada/i)) {
      return 'US';
    } else if (europeList.includes(country[0])) {
      return 'EU';
    } else if (country[0].match(/Japan/i)) {
      return 'JP';
    } else if (country[0].match(/Korea/i)) {
      return 'KR';
    } else if (country[0].match(/Taiwan/i)) {
      return 'TW';
    } else if (country[0].match(/Hong Kong/i)) {
      return 'HK';
    } else if (country[0].match(/China/i)) {
      return 'CN';
    }
  }
  return 'OT';
};
