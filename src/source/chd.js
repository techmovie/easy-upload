import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getUrlParam, formatTorrentTitle } from '../common';

export default () => {
  console.log('call getCHDInfo function')
  const torrentDom = $(`#top`);
  const metaInfo = $("td.rowhead:contains('基本信息'):last").next().text();
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = $('#top').prop ('firstChild').nodeValue.trim();
  TORRENT_INFO.movieAkaName = $("td.rowhead:contains('副标题'):last").next().text();
  TORRENT_INFO.imdbUrl = $('#kimdb>a').attr('href')|| '';
  TORRENT_INFO.year = $('#top').text().match(/\d{4}/g)[0];
  TORRENT_INFO.title = $('#top').prop('firstChild').nodeValue.trim();
  let desc_dom = $('#kdescr').clone();
  desc_dom.find('fieldset').remove();
  TORRENT_INFO.description = desc_dom.text().trim();
  TORRENT_INFO.subtitle = $("td.rowhead:contains('副标题'):last").next().text();
  let category = getMeta(metaInfo, '类型');
  TORRENT_INFO.category = getCategory(category);
  let videoType = getMeta(metaInfo, '媒介');
  TORRENT_INFO.videoType = getVideoType(videoType);
  let videoCodes = getMeta(metaInfo, '编码');
  TORRENT_INFO.videoCodes = getVideoCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码');
  // TORRENT_INFO.source = getPTPSource(source, codes, resolution);
  TORRENT_INFO.resolution = getMeta(metaInfo, '分辨率');
  TORRENT_INFO.bdinfo = getBDInfo();
  // TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`;
  TORRENT_INFO.screenshots = getImages(torrentDom);

  // processing = getMeta(metaInfo, '处理');
  // TORRENT_INFO.area = getAreaCode(processing);
  // createSeedDom(torrentDom, TORRENT_INFO);
  return TORRENT_INFO
};

// Category sample:
// Movies
// Documentaries
// Animations
// TV Series
// TV Shows
// Music
// Sports
// Demo
// HQ Audio
// Game
const getCategory = (videoType) => {
  const typeMap = {
    'Movies': 'movie',
    'TV Series': 'tv',
    'TV Shows': 'tv',
    'Sports' : 'sport',
    'Documentaries' : 'documentary',
  };
  
  return undefined !== typeMap[videoType] ? typeMap[videoType]: ''
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

// 获取截图
const getImages = () => {
  let imgList = [];
  const images = $("td.rowhead:contains('简介'):last").next().find('img');
  for (let i = 0; i < images.length; i++) {
      imgList.push(images[i].getAttribute('src'));
  }
 
  return imgList;
};

const getSource = (source, codes, resolution) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};

const getVideoCodes = (codes) => {
  if (codes === 'H.264/AVC') {
    return 'h264';
  }
  
  return codes.replace(/[.-]/g, '').toLowerCase();
};
const getVideoType = (videoType) => {
  if (videoType === 'WEB-DL') {
    return 'web';
  }
  
  return videoType.replace(/[.-]/g, '').toLowerCase();
};

const getBDInfo = () => {
  const quoteList = $('#kdescr').find('fieldset');
  let bdinfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = quoteList[i].textContent;
    if (quoteContent.includes('DISC INFO:') || quoteContent.includes('ViDEO BiTRATE')) {
      bdinfo += `[fieldset]${quoteContent}[/fieldset]`;
    }
  }
  return bdinfo;
};

// Resolution mapping sample
// 1080p 1
// 1080i 2
// 720p 3
// Other 5
// 8K 7
// 4K 6
// 
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
