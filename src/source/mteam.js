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
  const metaInfo = $("td.rowhead:contains('基本資訊'):last").next().text();
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = $('#top').prop ('firstChild').nodeValue.trim();
  TORRENT_INFO.movieAkaName = $("td.rowhead:contains('副標題'):last").next().text();
  TORRENT_INFO.imdbUrl = $('#kimdb>a').attr('href')|| '';
  TORRENT_INFO.year = $('#top').text().match(/\d{4}/g)[0];
  TORRENT_INFO.title = $('#top').prop ('firstChild').nodeValue.trim();
  let desc_dom = $('#kdescr').clone();
  desc_dom.find('fieldset').remove();
  TORRENT_INFO.description = desc_dom.text().trim();
  TORRENT_INFO.subtitle = $("td.rowhead:contains('副標題'):last").next().text();
  let category = getMeta(metaInfo, '類別');
  TORRENT_INFO.category = getCategory(category);
  let videoCodes = getMeta(metaInfo, '編碼');
  TORRENT_INFO.videoCodes = getVideoCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码').toLowerCase();
  // TORRENT_INFO.source = getSource(source, codes, resolution);
  let resolution = getMeta(metaInfo, '解析度')
  TORRENT_INFO.resolution = resolution.replace('4K', '2160p').toLowerCase();
  TORRENT_INFO.videoType = getVideoType(category, resolution);
  TORRENT_INFO.bdinfo = getBDInfo();
  TORRENT_INFO.screenshots = getImages('簡介');
  // TORRENT_INFO.area = getAreaCode();
  return TORRENT_INFO
};