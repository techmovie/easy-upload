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
  TORRENT_INFO.category = getMeta(metaInfo, '類別');
  TORRENT_INFO.videoType = getMeta(metaInfo, '媒介');
  let videoCodes = getMeta(metaInfo, '編碼');
  TORRENT_INFO.videoCodes = getCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码');
  // TORRENT_INFO.source = getPTPSource(source, codes, resolution);
  TORRENT_INFO.resolution = getMeta(metaInfo, '解析度');
  // const { logs, bdinfo } = getPTPLogsOrBDInfo(torrentDom);
  // TORRENT_INFO.logs = logs;
  // TORRENT_INFO.bdinfo = bdinfo;
  // TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`;
  TORRENT_INFO.screenshots = getImages(torrentDom);
  // TORRENT_INFO.area = getAreaCode();
  // createSeedDom(torrentDom, TORRENT_INFO);
  return TORRENT_INFO
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
const getVideoType = (container, isRemux, codes, source) => {
  let type = '';
  if (isRemux) {
    type = 'remux';
  } else if (codes.match(/BD50|BD25/ig)) {
    type = 'bluray';
  } else if (codes.match(/BD66|BD100/ig)) {
    type = 'uhdbluray';
  } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
    type = 'dvdrip';
  } else if (codes.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
    type = 'dvd';
  } else if (container.match(/MKV|MP4/i)) {
    type = 'encode';
  }
  return type;
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
