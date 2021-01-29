import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  getVideoType,
  getCategory,
  getMeta,
  getImages,
  getVideoCodes,
  getBDInfo,
  getResolution,
} from './nexusphp_helper';

export default () => {
  const metaInfo = $("td.rowhead:contains('基本信息'):last").next().text();
  const category = getMeta(metaInfo, '类型');
  const videoType = getMeta(metaInfo, '媒介');
  const videoCodes = getMeta(metaInfo, '编码');
  const resolution = getMeta(metaInfo, '分辨率');

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = $('#top').prop('firstChild').nodeValue.trim();
  TORRENT_INFO.movieAkaName = $("td.rowhead:contains('副标题'):last").next().text();
  TORRENT_INFO.imdbUrl = $('#kimdb>a').attr('href') || '';
  TORRENT_INFO.year = $('#top').text().match(/\d{4}/g)[0];
  TORRENT_INFO.title = $('#top').prop('firstChild').nodeValue.trim();
  TORRENT_INFO.description = $('#kdescr').clone().find('fieldset').remove().text().trim();
  TORRENT_INFO.subtitle = $("td.rowhead:contains('副标题'):last").next().text();
  TORRENT_INFO.category = getCategory(category);
  TORRENT_INFO.videoType = getVideoType(videoType);
  TORRENT_INFO.videoCodes = getVideoCodes(videoCodes);
  TORRENT_INFO.audioCodes = getMeta(metaInfo, '音频编码');
  // TORRENT_INFO.source = getSource(videoType);
  TORRENT_INFO.resolution = getResolution(resolution);
  TORRENT_INFO.bdinfo = getBDInfo();
  TORRENT_INFO.screenshots = getImages('简介');

  return TORRENT_INFO;
};
