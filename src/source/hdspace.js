import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, getInfoFromMediaInfo, getInfoFromBDInfo,
  getBDInfoOrMediaInfo, getAudioCodecFromTitle, getSize, getVideoCodecFromTitle, getFilterBBCode,
  getSourceFromTitle, getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode, fetch,
} from '../common';

export default async () => {
  const { Name, Category, Size, Description } = getBasicInfo();
  const title = formatTorrentTitle(Name);
  let tags = getTagsFromSubtitle(title);
  const category = getCategory(Category, title);
  let resolution = title.match(/\d{3,4}(p|i)/i)?.[0];
  if (!resolution && title.match(/4k|uhd/i)) {
    resolution = '2160p';
  }
  const videoType = getVideoType(Category, title);
  const source = getSourceFromTitle(title);

  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const div = document.createElement('div');
  div.innerHTML = Description.html();
  $(div).find('#slidenfo,a[href*="#nfo"]').remove();
  const descriptionBBCode = getFilterBBCode(div);

  const isBluray = videoType.match(/bluray/i);
  const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);

  const mediaInfoOrBDInfo = isBluray ? bdinfo : (TORRENT_INFO.mediaInfo || mediaInfo);
  if (mediaInfoOrBDInfo) {
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    if (videoCodec !== '' && audioCodec !== '' && resolution !== '') {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      resolution = mediaResolution;
      tags = { ...tags, ...mediaTags };
    }
  }
  const imdbId = $('#imdb').next('script').text().match(/mid=(\d+)/)[1];
  const imdbData = await fetch(`${CURRENT_SITE_INFO.url}/getimdb.php?mid=${imdbId}`, {
    responseType: 'text',
  });
  const imdbDom = new DOMParser().parseFromString(imdbData, 'text/html');
  const imdbUlrDom = $('a[href*="imdb.com/title"]', imdbDom);
  const imdbUrl = imdbUlrDom.attr('href');
  const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, '');
  const year = imdbUlrDom.text().match(/\((\d{4})\)/)?.[1] ?? '';
  const country = $('td:contains("Country")', imdbDom).next('td').text();

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.source = source;
  TORRENT_INFO.size = getSize(Size);
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.area = getAreaCode(country);
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
};
const getBasicInfo = () => {
  const basicInfo = {};
  $('#mcol .header').each(function () {
    const key = $(this).text().trim();
    const value = key === 'Description' ? $(this).next('td') : $(this).next('td').text();
    if (value && !basicInfo[key]) {
      basicInfo[key] = key === 'Description' ? value : value.replace(/\n/g, '').trim();
    }
  });
  return basicInfo;
};
const getCategory = (cat, title) => {
  if (cat.match(/movie/i)) {
    return 'movie';
  } else if (cat.match(/hdtv/i)) {
    return 'tv';
  } else if (cat.match(/doc/i)) {
    return 'documentary';
  } else if (cat.match(/Animation/i)) {
    return 'cartoon';
  } else if (cat.match(/Music\sVideos/i)) {
    return 'concert';
  } else if (title.match(/S\d+(E\d+)?/i)) {
    return 'tv';
  }
  return 'movie';
};
const getVideoType = (type, title) => {
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/Blu-Ray/i) && title.match(/2160p|4k|uhd/i)) {
    return 'uhdbluray';
  } else if (type.match(/Blu-Ray/i)) {
    return 'bluray';
  }
  if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/blu-ray/i) && title.match(/2160p|4k|uhd/i)) {
    return 'uhdbluray';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return '';
};
