import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromMediaInfo,
  getInfoFromBDInfo, getSize, getSourceFromTitle,
  getFilterBBCode, getBDInfoFromBBCode,
  getTagsFromSubtitle, getPreciseCategory,
} from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const { Category, Name, Type, Size, Resolution } = getBasicInfo();

  TORRENT_INFO.size = getSize(Size);
  let title = formatTorrentTitle(Name);
  const tags = getTagsFromSubtitle(TORRENT_INFO.title);
  const category = getCategory(Category);
  const videoType = getVideoType(Type, Resolution);
  let IMDBYear = $('.movie-heading span:last').text();
  const movieName = $('.movie-heading span:first').text();

  if (CURRENT_SITE_NAME === 'HDPOST') {
    const englishTitle = title.match(/[\s\W\d]+(.+)/)?.[1] ?? '';
    TORRENT_INFO.subtitle = title.replace(englishTitle, '')?.trim();
    title = englishTitle;
  }
  if (CURRENT_SITE_NAME === 'ACM') {
    title = title.replace(/\/\s+\W+/, '');
  }
  if (!IMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
    IMDBYear = matchYear?.pop() ?? '';
  } else {
    IMDBYear = IMDBYear.replace(/\(|\)|\s/g, '');
  }
  const imdbUrl = $('.movie-details a:contains(IMDB)').attr('href');
  const resolution = Resolution.match(/\d+(i|p)/i)?.[0];

  const descriptionDom = $('.fa-sticky-note').parents('.panel-heading')
    .siblings('.table-responsive').find('.panel-body').clone();
  descriptionDom.find('#collection_waypoint').remove();
  let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  const mediaInfo = $('.decoda-code code').text();
  const bdinfo = getBDInfoFromBBCode(descriptionBBCode);
  if (mediaInfo) {
    descriptionBBCode += `\n[quote]${mediaInfo}[/quote]`;
  }
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.tags = { ...tags, ...mediaTags };
  TORRENT_INFO.screenshots = descriptionBBCode.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g) ?? [];
  TORRENT_INFO.title = title;
  TORRENT_INFO.year = IMDBYear;
  TORRENT_INFO.movieName = CURRENT_SITE_NAME === 'HDPOST' ? '' : movieName;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.poster = $('.movie-poster').attr('src');
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.source = getSourceFromTitle(title);
  TORRENT_INFO.videoType = videoType.toLowerCase();
  TORRENT_INFO.description = descriptionBBCode;
  return TORRENT_INFO;
};
const getBasicInfo = () => {
  const basicInfo = {};
  const keyMap = {
    Name: 'Name',
    名称: 'Name',
    名稱: 'Name',
    Size: 'Size',
    体积: 'Size',
    體積: 'Size',
    Category: 'Category',
    类别: 'Category',
    類別: 'Category',
    Type: 'Type',
    规格: 'Type',
    規格: 'Type',
    Resolution: 'Resolution',
  };
  $('#vue+.panel table tr').each((index, element) => {
    const key = $(element).find('td:first').text().replace(/\s|\n/g, '');
    if (keyMap[key]) {
      const value = $(element).find('td:last').text();
      basicInfo[keyMap[key]] = value.replace(/\n/g, '').trim();
    }
  });
  return basicInfo;
};
const getCategory = (key) => {
  if (!key) {
    return '';
  }
  if (key.match(/movie|电影/i)) {
    return 'movie';
  } else if (key.match(/tv|电视|剧集/i)) {
    return 'tv';
  }
};
const getVideoType = (type, resolution) => {
  type = type.replace(/\s/g, '');
  if (type.match(/FullDisc/)) {
    if (resolution.match(/2160p/i)) {
      return 'uhdbluray';
    } else if (resolution.match(/1080/)) {
      return 'bluray';
    } else {
      return 'dvd';
    }
  } else if (type.match(/Encode/i)) {
    return 'encode';
  } else if (type.match(/web/i)) {
    return 'web';
  } else if (type.match(/HDTV/i)) {
    return 'hdtv';
  }
  return type;
};
