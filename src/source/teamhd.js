import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromMediaInfo,
  getInfoFromBDInfo, getSize, fetch,
  getPreciseCategory, getSourceFromTitle,
  getTagsFromSubtitle, getScreenshotsFromBBCode,
} from '../common';
export default async () => {
  const torrentInfo = getTorrentInfo();
  torrentInfo.category = getPreciseCategory(torrentInfo, torrentInfo.category);
  try {
    let { movieName, year } = torrentInfo;
    movieName = movieName.toLowerCase().replace(/\s/g, '_');
    const url = `https://v2.sg.media-imdb.com/suggestion/${movieName[0]}/${movieName}_${year}.json`;
    const imdbSearch = await fetch(url);
    if (imdbSearch && imdbSearch.d.length) {
      torrentInfo.imdbUrl = `https://www.imdb.com/title/${imdbSearch.d[0].id}`;
    }
  } catch (error) {
    console.log(error);
  }
  Object.assign(TORRENT_INFO, torrentInfo);
};
const getTorrentInfo = () => {
  const basicInfoText = $('.download').text().replace(/.+?\//g, '').trim();
  const year = basicInfoText.match(/\((\d{4})\)/)[1];
  const movieName = basicInfoText.match(/(.+)\(\d{4}\)/)[1].trim();
  const resolution = basicInfoText.match(/(\s*(\d+(p|i)))$/i)[2];
  const videoType = getVideoType(basicInfoText, resolution);
  let size = $('#details_hop').text().match(/-\s*(.+?GB)/)[1];
  size = getSize(size);
  const category = getCategory($('#details_hop a[href*="browse/cat"]').attr('href'));
  const fileName = $('.download').attr('href')
    .match(/name=(.+)/)[1].replace(/\.torrent/g, '')
    ?.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, '');
  const title = formatTorrentTitle(fileName);
  const source = getSourceFromTitle(title);
  const tags = getTagsFromSubtitle(title);
  const isBluray = videoType.match(/bluray/i);
  const mediaInfo = $('.card-header:contains("MediaInfo") + .card-collapse .card-body').text();
  const bdInfo = $('.card-header:contains("BDInfo") + .card-collapse .card-body').text();
  const eacLogs = $('.card-header:contains("eac3to Log") + .card-collapse .card-body').text();
  const mediaInfoOrBDInfo = isBluray ? bdInfo : mediaInfo;
  const screenshotsBBCode = $('#details a[href*="teamhd.org/redirector.php"]').map(function () {
    const url = $(this).attr('href').replace(/.+?url=/g, '');
    return `[url=${url}][img]${$(this).find('img').attr('src')}[/img][/url]`;
  }).get();
  const screenshots = getScreenshotsFromBBCode(screenshotsBBCode.join('\n'));

  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  const description = `[quote]${eacLogs}[/quote]\n\n[quote]${mediaInfoOrBDInfo}[/quote]\n\n${screenshotsBBCode.join('')}`;
  return {
    sourceSite: CURRENT_SITE_NAME,
    sourceSiteType: CURRENT_SITE_INFO.siteType,
    title,
    movieName,
    year,
    size,
    category,
    videoType,
    resolution,
    source,
    videoCodec,
    audioCodec,
    screenshots,
    mediaInfo: mediaInfoOrBDInfo,
    mediaInfos: [mediaInfoOrBDInfo],
    description,
    tags: { ...tags, ...mediaTags },
  };
};
const getCategory = (link) => {
  const catNum = link.match(/cat(\d+)/)[1];
  const map = {
    29: 'movie',
    25: 'cartoon',
    28: 'document',
    31: 'sport',
    32: 'tv',
    33: 'tvPack',
  };
  return map[catNum] || '';
};
const getVideoType = (type, resolution) => {
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/Blu-Ray.+?Disc/i)) {
    if (resolution === '2160p') {
      return 'uhdbluray';
    }
    return 'bluray';
  } else if (type.match(/HDTV/i)) {
    return 'hdtv';
  } else if (type.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (type.match(/rip/i)) {
    return 'encode';
  }
  return '';
};
