import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getUrlParam, formatTorrentTitle, getAreaCode, getInfoFromMediaInfo, getInfoFromBDInfo } from '../common';

export default () => {
  const torrentId = getUrlParam('torrentid');
  console.log(torrentId);
  if (!torrentId) {
    return false;
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const torrentDom = $(`#torrent_${torrentId}`);
  const ptpMovieTitle = $('.page__title').text().match(/(^|])([^\d[]+)/)[2].trim();
  const [movieName, movieAkaName = ''] = ptpMovieTitle.split(' AKA ');
  TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`;
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.movieAkaName = movieAkaName;
  TORRENT_INFO.imdbUrl = $('#imdb-title-link').attr('href') || '';
  TORRENT_INFO.year = $('.page__title').text().match(/\[(\d+)\]/)[2];
  const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
  TORRENT_INFO.category = getPTPType();
  if (TORRENT_INFO.category === 'concert') {
    TORRENT_INFO.description = $('#synopsis').text();
  }
  const infoArray = torrentHeaderDom.find('#PermaLinkedTorrentToggler').text().replace(/ /g, '').split('/');
  const [codes, container, source, ...otherInfo] = infoArray;
  const isRemux = otherInfo.includes('Remux');
  TORRENT_INFO.videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux, codes, source);
  const { logs, bdinfo } = getPTPLogsOrBDInfo(torrentDom);
  TORRENT_INFO.logs = logs;
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo;
  TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
  const { videoCodec, audioCodec, fileName = '', resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = mediaTags;
  let torrentName = fileName || torrentHeaderDom.data('releasename'); // 圆盘没有fileName
  torrentName = formatTorrentTitle(torrentName);
  TORRENT_INFO.title = torrentName;
  TORRENT_INFO.source = getPTPSource(source, codes, resolution);
  TORRENT_INFO.size = torrentHeaderDom.find('.nobr span').attr('title').replace(/[^\d]/g, '');
  TORRENT_INFO.screenshots = getPTPImage(torrentDom);
  let country = [];
  const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
  if (matchArray && matchArray.length > 0) {
    country = matchArray?.[1].replace(/(,)\s+/g, '$1').split(',');
  }
  TORRENT_INFO.area = getAreaCode(country?.[0]);
  return TORRENT_INFO;
};
const getPTPType = () => {
  const typeMap = {
    'Feature Film': 'movie',
    'Short Film': 'movie',
    'Stand-up Comedy': 'other',
    Miniseries: 'tv',
    'Live Performance': 'concert',
    'Movie Collection': 'movie',
  };
  const ptpType = $('#torrent-table .basic-movie-list__torrent-edition__main').eq(0).text();
  return typeMap[ptpType];
};
// 获取eac3to日志
const getPTPLogsOrBDInfo = (torrentDom) => {
  const quoteList = torrentDom.find('.movie-page__torrent__panel blockquote');
  let logs = ''; let bdinfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = quoteList[i].textContent;
    if (quoteContent.match(/eac3to/)) {
      logs += `[quote]${quoteContent}[/quote]`;
    }
    if (quoteContent.match(/DISC/)) {
      bdinfo += quoteContent;
    }
  }
  return {
    logs,
    bdinfo,
  };
};
// 获取截图
const getPTPImage = () => {
  let isComparison = false;
  let imgList = [];
  const torrentInfoPanel = $('.movie-page__torrent__panel');
  const links = torrentInfoPanel.find('a');
  for (let i = 0; i < links.length; i++) {
    const clickFunc = links[i].getAttribute('onclick');
    if (clickFunc && clickFunc.includes('BBCode.ScreenshotComparisonToggleShow')) {
      isComparison = true;
      imgList = JSON.parse(clickFunc.match(/\["http([^\]]*)\]/)[0]);
      break;
    }
  }
  if (!isComparison) {
    const imageDom = torrentInfoPanel.find('.bbcode__image');
    for (let i = 0; i < imageDom.length; i++) {
      imgList.push(imageDom[i].getAttribute('src'));
    }
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
