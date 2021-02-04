import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getAudioCodes, getAreaCode } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const { Audio, Category, Name, Source, Type, Video } = getBasicInfo();
  TORRENT_INFO.title = formatTorrentTitle(Name);
  const TMDBYear = $('.movie-heading a:last').text();
  const movieName = $('.movie-heading a:first').text();
  if (!TMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
    TORRENT_INFO.year = matchYear ? matchYear[0] : '';
  } else {
    TORRENT_INFO.year = TMDBYear;
  }
  const tags = [];
  if (Audio) {
    tags.push(Audio.replace(/:|-|\./, 'g').toLowerCase());
  }
  if (Video) {
    tags.push(Video.replace(/:|-|\./, 'g').toLowerCase());
  }
  TORRENT_INFO.tags = tags;
  const { category: movieCat, countries, imdbUrl } = getMovieDetails();
  TORRENT_INFO.movieName = movieName;
  const category = Category.toLowerCase().replace(/s/, '');
  const resolution = getResolution(Type);
  TORRENT_INFO.category = movieCat === 'Animation' ? 'cartoon' : category;
  TORRENT_INFO.source = getSource(Source, Type);
  TORRENT_INFO.audioCodes = getAudioCodes(TORRENT_INFO.title);
  TORRENT_INFO.area = getAreaCode(countries);
  TORRENT_INFO.videoCodes = getVideoCodes(Type, TORRENT_INFO.title);
  TORRENT_INFO.videoType = getVideoType(Type);
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.imdbUrl = imdbUrl;
  const mediaInfo = $('#stats-full code').text();
  TORRENT_INFO.mediaInfo = mediaInfo;
  TORRENT_INFO.screenshots = getImages();
  return TORRENT_INFO;
};
const getBasicInfo = () => {
  const basicInfo = {};
  $('.dotborder').each((index, element) => {
    const key = $(element).find('td:first').text();
    const value = $(element).find('td:last').text();
    basicInfo[key] = value.replace(/\n/g, '').trim();
  });
  console.log(basicInfo);
  return basicInfo;
};
const getMovieDetails = () => {
  const infoList = $('.movie-details a');
  const movieDetail = {};
  infoList.each((index, element) => {
    const urlParams = $(element).attr('href').replace(/.+\?/g, '').split('=');
    if (urlParams.length > 1) {
      let key = decodeURI(urlParams[0]);
      const value = urlParams[1];
      if (key === 'g[]') {
        key = 'category';
      }
      movieDetail[key] = value;
    } else if (urlParams[0].match(/tt\d+/)) {
      movieDetail.imdbUrl = urlParams[0];
    }
  });
  return movieDetail;
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
const getSource = (source, resolution) => {
  if (resolution.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/UHD/i)) {
    return 'uhdbluray';
  }
  if (source.match(/WEB|WEB-DL/i)) {
    return 'web';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getVideoCodes = (type, title) => {
  type = type.replace(/\s/g, '');
  if (type.match(/BD50|BD25/ig)) {
    if (title.match(/VC-1/i)) {
      return 'vc1';
    }
    return 'h264';
  } else if (type.match(/UHD50|UHD66|UHD100/i)) {
    return 'hevc';
  } else if (type.match(/DVD5|DVD9/i)) {
    return 'mepg2';
  } else if (type.match(/2160p/i)) {
    return 'x265';
  } else if (type.match(/\d{3,4}p/i)) {
    return 'x264';
  }
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
const getResolution = (resolution) => {
  if (resolution.match(/UHD/i)) {
    return '2160p';
  } if (resolution.match(/BD/i)) {
    return '1080p';
  } else if (resolution.match(/DVD/i)) {
    return '480p';
  }
  return resolution;
};
