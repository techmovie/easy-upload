import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, getInfoFromMediaInfo,
  getInfoFromBDInfo, getSize, getFilterBBCode,
  getPreciseCategory, getSourceFromTitle, getTagsFromSubtitle, getScreenshotsFromBBCode,
} from '../common';
interface BasicInfo {
  Type: string,
  'File Size':string,
  Title: string,
  'Video Quality': string,
  'resolution': string,
  'Rip Type': string
}

export default async () => {
  const torrentInfo = await getTorrentInfo();
  torrentInfo.category = getPreciseCategory(torrentInfo, torrentInfo.category);
  Object.assign(TORRENT_INFO, torrentInfo);
};
const getTorrentInfo = async () => {
  const imdbUrl = $('.badge-extra a[href*="www.imdb.com/title"]').attr('href')?.split('?')?.[1] ?? '';
  const movieTitle = $('.block-titled h3 a').text();
  const movieName = movieTitle.split('(')[0].trim();
  const year = movieTitle.match(/\((\d+)\)/)?.[1] ?? '';
  let { Type, 'File Size': size, Title, 'Video Quality': resolution, 'Rip Type': videoType } = getBasicInfo();
  const category = Type?.toLowerCase().replace('-', '');
  const title = formatTorrentTitle(Title);
  videoType = getVideoType(videoType, resolution);
  const country = $('.fa-flag~.badge-extra:first a').text();
  const area = getAreaCode(country);
  const source = getSourceFromTitle(title);
  const tags = getTagsFromSubtitle(title);
  const mediaInfoOrBDInfo = $('#collapseMediaInfo pre').text();
  const screenshotsBBCode = $('#collapseScreens a').map(function () {
    return `[url=${$(this).attr('href')}][img]${$(this).find('img').attr('src')}[/img][/url]`;
  }).get();
  const screenshots = await getScreenshotsFromBBCode(screenshotsBBCode.join('\n'));
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  const descriptionBBCode = getFilterBBCode($('.torrent-desc')[0]);
  const description = `${descriptionBBCode}\n\n[quote]${mediaInfoOrBDInfo}[/quote]\n\n${screenshotsBBCode.join('')}`;
  return {
    sourceSite: CURRENT_SITE_NAME,
    sourceSiteType: CURRENT_SITE_INFO.siteType,
    title,
    imdbUrl,
    movieName,
    year,
    size: getSize(size),
    category,
    videoType,
    resolution,
    area,
    source,
    videoCodec,
    audioCodec,
    screenshots,
    mediaInfo: mediaInfoOrBDInfo,
    description,
    tags: { ...tags, ...mediaTags },
  };
};
const getBasicInfo = ():BasicInfo => {
  const basicInfo:BasicInfo = {
    Type: '',
    'File Size': '',
    Title: '',
    'Video Quality': '',
    resolution: '',
    'Rip Type': '',
  };
  $('#content-area .block:last table:first>tbody>tr').each((index, element) => {
    const key = $(element).find('td:first').text() as keyof BasicInfo;
    const value = $(element).find('td:last').text();
    basicInfo[key] = value.replace(/\n/g, '').trim();
  });
  return basicInfo;
};

const getVideoType = (type:string, resolution:string) => {
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/BluRay\s*Raw/i)) {
    if (resolution === '2160p') {
      return 'uhdbluray';
    }
    return 'bluray';
  } else if (type.match(/HDTV/i)) {
    return 'hdtv';
  } else if (type.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (type.match(/dvdrip/i)) {
    return 'dvdrip';
  } else if (type.match(/DVD/)) {
    return 'dvd';
  } else if (type.match(/rip/i)) {
    return 'encode';
  }
  return '';
};
