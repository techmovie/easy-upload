import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getUrlParam, formatTorrentTitle } from '../common';
import { 
    getVideoType, 
    getCategory, 
    getMeta, 
    getImages, 
    getVideoCodes, 
    getBDInfo, 
    getResolution 
  } from './nexusphp_helper';

export default () => {
  console.log('call getCHDInfo function')
  const torrentDom = $(`#top`);
  const metaInfo = $("td.rowhead:contains('基本信息'):last").next().text();
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = $('#top').prop ('firstChild').nodeValue.trim();
  TORRENT_INFO.movieAkaName = $("td.rowhead:contains('副标题'):last").next().text();
  let imdbUrl = $('.imdbnew2 a:first').attr('href');
  TORRENT_INFO.imdbUrl = (imdbUrl && imdbUrl.startsWith('https://www.imdb.com/title/')) ? imdbUrl : '';
  TORRENT_INFO.year = $('#top').text().match(/\d{4}/g)[0];
  TORRENT_INFO.title = $('#top').prop('firstChild').nodeValue.trim();
  let doubaninfo = $('.doubaninfo').html();
  TORRENT_INFO.description = doubaninfo ? doubaninfo.replace(/<br>|<br\/>/g, "\n").trim() : '';
  TORRENT_INFO.subtitle = $("td.rowhead:contains('副标题'):last").next().text().trim();
  let category = getMeta(metaInfo, '类型');
  TORRENT_INFO.category = getCategory(category);
  let videoType = getMeta(metaInfo, '媒介');
  TORRENT_INFO.videoType = getVideoType(videoType);
  let videoCodes = getMeta(metaInfo, '编码');
  TORRENT_INFO.videoCodes = getVideoCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码');
  // TORRENT_INFO.source = getSource(videoType);
  let resolution = getMeta(metaInfo, '分辨率')
  TORRENT_INFO.resolution = getResolution(resolution);
  
  TORRENT_INFO.bdinfo = getBDInfo();
  // TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`;
  TORRENT_INFO.screenshots = getImages('简介');

  return TORRENT_INFO
};