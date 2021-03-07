import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getInfoFromMediaInfo, getInfoFromBDInfo, getSize, getSourceFromTitle } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const { Category, Name, Type, Size } = getBasicInfo();

  TORRENT_INFO.size = getSize(Size);
  TORRENT_INFO.title = formatTorrentTitle(Name);

  const IMDBYear = $('.movie-heading span:last').text();
  const movieName = $('.movie-heading span:first').text();
  if (!IMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
    TORRENT_INFO.year = matchYear?.pop() ?? '';
  } else {
    TORRENT_INFO.year = IMDBYear.replace(/\(|\)|\s/g, '');
  }

  const imdbUrl = $('.movie-details a:contains(IMDB)').attr('href');
  TORRENT_INFO.movieName = movieName;
  const category = Category.toLowerCase().replace(/s/, '');
  TORRENT_INFO.category = category;
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  // TORRENT_INFO.area = getAreaCode(countries);
  TORRENT_INFO.videoType = getVideoType(Type);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const mediaInfo = $('.decoda-code code').text();
  TORRENT_INFO.mediaInfo = mediaInfo;
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfo);
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = mediaTags;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.screenshots = getImages();
  return TORRENT_INFO;
};
const getBasicInfo = () => {
  const basicInfo = {};
  $('#vue+.panel table tr').each((index, element) => {
    const key = $(element).find('td:first').text().replace(/\s|\n/g, '');
    const value = $(element).find('td:last').text();
    basicInfo[key] = value.replace(/\n/g, '').trim();
  });
  console.log(basicInfo);
  return basicInfo;
};
// 获取截图
const getImages = () => {
  const links = $('.panel-heading:contains(Description)+div .panel-body a');
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
const getVideoType = (type) => {
  type = type.replace(/\s/g, '');
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/BD50|BD25/i)) {
    return 'bluray';
  } else if (type.match(/UHD50|UHD66|UHD100/i)) {
    return 'uhdbluray';
  } else if (type.match(/DVD5|DVD9/i)) {
    return 'dvd';
  } else if (type.match(/\d{3,4}p/i)) {
    return 'encode';
  }
  return type;
};
