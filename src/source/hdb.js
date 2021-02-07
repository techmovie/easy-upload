import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getAudioCodes, getSize } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const { size, category, videoCodes, videoType } = getBasicInfo();
  const title = $('h1').eq(0).text();
  TORRENT_INFO.title = formatTorrentTitle(title);
  const IMDBLinkDom = $('.contentlayout h1');
  const IMDBYear = IMDBLinkDom.prop('lastChild').nodeValue.replace(/\s|\(|\)/g, '');
  const movieName = IMDBLinkDom.find('a').text();
  if (!IMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
    TORRENT_INFO.year = matchYear ? matchYear[0] : '';
  } else {
    TORRENT_INFO.year = IMDBYear;
  }
  TORRENT_INFO.imdbUrl = IMDBLinkDom.find('a').attr('href');
  const tags = [];
  const tagDom = $('.tag-content a');
  tagDom.each((index, element) => {
    const tagText = $(element).text();
    tags.push(tagText);
  });
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.movieName = movieName;
  // const resolution = getResolution(Type);
  TORRENT_INFO.category = category;
  // TORRENT_INFO.source = getSource(Source, Type);
  TORRENT_INFO.audioCodes = getAudioCodes(TORRENT_INFO.title);
  TORRENT_INFO.videoCodes = videoCodes;
  TORRENT_INFO.videoType = videoType;
  // TORRENT_INFO.resolution = resolution;

  TORRENT_INFO.size = size;
  const mediaInfo = $('#stats-full code').text();
  TORRENT_INFO.mediaInfo = mediaInfo;
  TORRENT_INFO.screenshots = getImages();
  return TORRENT_INFO;
};
const getBasicInfo = () => {
  const videoTypeMap = {
    'Blu-ray/HD DVD': 'bluray',
    Capture: 'hdtv',
    Encode: 'encode',
    Remux: 'remux',
    'WEB-DL': 'web',
  };
  const info = $('th:contains(Category)').next().text();
  const size = $('th:contains(Size)').eq(0).next().text();
  const splitArray = info.split('(');
  const category = splitArray[0].trim().toLowerCase();
  const videoCodes = splitArray[1].split(',')[0].toLowerCase().replace(/\./g, '');
  const videoType = splitArray[1].split(',')[1].replace(/\)/g, '').trim();
  return {
    size: getSize(size),
    category,
    videoCodes,
    videoType: videoTypeMap[videoType],
  };
};
// 获取截图
const getImages = () => {
  const links = $('.panel-body a');
  const screenshots = [];
  links.each((index, element) => {
    const imageUrl = $(element).attr('href');
    const thumbnailURL = $(element).find('img').attr('src');
    if (thumbnailURL && thumbnailURL.match(/.+\.png/i)) {
      screenshots.push(`[url=${imageUrl}][img]${thumbnailURL}[/img][/url]`);
    }
  });
  return screenshots;
};
