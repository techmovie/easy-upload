import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, parseMedia, getInfoFromBDInfo,
  getBDInfoOrMediaInfo, getAudioCodecFromTitle, convertSizeStringToBytes, getVideoCodecFromTitle, getFilterBBCode,
  getSourceFromTitle, getTagsFromSubtitle, getPreciseCategory, extractImgsFromBBCode,
} from '../common';
import $ from 'jquery';

export default async () => {
  const title = document.title.replace(/HD-Torrents.org\s*-/ig, '').trim();
  const imdbInfoDom = $('#IMDBDetailsInfoHideShowTR .imdbnew2');
  const imdbUlrDom = imdbInfoDom.find('>a');
  const imdbUrl = imdbUlrDom.attr('href') || '';
  const movieName = imdbUlrDom.text();
  const year = imdbInfoDom.text().match(/Year:\s*(\d{4})/)?.[1] ?? '';
  const country = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)?.[1] ?? '';
  const { Category, Size, Genre } = getBasicInfo();
  let tags = getTagsFromSubtitle(title);
  let category = Category.toLowerCase().split(/\s|\//)[0];
  category = Genre.match(/Animation/i) ? 'cartoon' : category;
  const videoType = getVideoType(Category, title);
  const source = getSourceFromTitle(title);
  let resolution = title.match(/\d{3,4}(p|i)/i)?.[0] ?? '';
  if (!resolution && resolution?.match(/4k|uhd/i)) {
    resolution = '2160p';
  }
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const descriptionDom = $('#technicalInfoHideShowTR');
  let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  descriptionBBCode = descriptionBBCode.replace(/\[center\]((?:.|\n)+?)\[\/center\]/g, (match, p1) => {
    if (p1.match(/(keep seeding)|(spank your ass)/)) {
      return '';
    }
    return match;
  });
  const isBluray = videoType.match(/bluray/i);
  const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  if (mediaInfoOrBDInfo) {
    TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : parseMedia;
    const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo?.[0]);
    if (videoCodec !== '' && audioCodec !== '' && resolution !== '') {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      resolution = mediaResolution || '';
      tags = { ...tags, ...mediaTags };
    }
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.source = source;
  TORRENT_INFO.area = getAreaCode(country);
  TORRENT_INFO.size = convertSizeStringToBytes(Size);
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = await extractImgsFromBBCode(descriptionBBCode);
};
interface BasicInfo {
  Category: string,
  Size:string,
  Title: string,
  Genre: string
}
const getBasicInfo = () => {
  const basicInfo:BasicInfo = {
    Category: '',
    Size: '',
    Title: '',
    Genre: '',
  };
  $('.detailsleft').each((index, element) => {
    const key = $(element).text().replace(/:/g, '').trim();
    const value = $(element).next('td').text();
    if (value) {
      basicInfo[key as keyof BasicInfo] = value.replace(/\n/g, '').trim();
    }
  });
  return basicInfo;
};

const getVideoType = (type:string, title:string) => {
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/UHD\/Blu-Ray/i)) {
    return 'uhdbluray';
  } else if (type.match(/Blu-Ray/i)) {
    return 'bluray';
  }
  if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/dvdrip/i)) {
    return 'dvdrip';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return '';
};
