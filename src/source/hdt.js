import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, getInfoFromMediaInfo, getInfoFromBDInfo,
  getBDInfoFromBBCode, getAudioCodecFromTitle, getSize, getVideoCodecFromTitle, getFilterBBCode,
  getSourceFromTitle, getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode,
} from '../common';

export default () => {
  const title = document.title.replace(/HD-Torrents.org\s*-/ig, '').trim();
  const imdbInfoDom = $('#IMDBDetailsInfoHideShowTR .imdbnew2');
  const imdbUlrDom = imdbInfoDom.find('>a');
  const imdbUrl = imdbUlrDom.attr('href');
  const movieName = imdbUlrDom.text();
  const year = imdbInfoDom.text().match(/Year:\s*(\d{4})/)?.[1] ?? '';
  const country = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)?.[1] ?? '';
  const { Category, Size, Genre } = getBasicInfo();
  let tags = getTagsFromSubtitle(title);
  let category = Category.toLowerCase().split(/\s|\//)[0];
  category = Genre === 'Animation' ? 'cartoon' : category;
  const videoType = getVideoType(Category, title);
  const source = getSourceFromTitle(title);
  let resolution = title.match(/\d{3,4}(p|i)/i)?.[0];
  if (!resolution && resolution.match(/4k|uhd/i)) {
    resolution = '2160p';
  }
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const descriptionDom = $('#technicalInfoHideShowTR');
  let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  descriptionBBCode = descriptionBBCode.replace(/\[center\]((?:.|\n)+?)\[\/center\]/g, (match, p1) => {
    if (p1.match(/(keep seeding)|(spank your ass)/)) {
      return '';
    } else {
      return match;
    }
  });
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
      tags = { ...TORRENT_INFO.tags, ...mediaTags };
    }
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.source = source;
  TORRENT_INFO.area = getAreaCode(country);
  TORRENT_INFO.size = getSize(Size);
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
};
const getBasicInfo = () => {
  const basicInfo = {};
  $('.detailsleft').each((index, element) => {
    const key = $(element).text().replace(/:/g, '').trim();
    const value = $(element).next('td').text();
    if (value) {
      basicInfo[key] = value.replace(/\n/g, '').trim();
    }
  });
  return basicInfo;
};

const getBDInfoOrMediaInfo = (bbcode) => {
  const quoteList = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g) ?? [];
  let bdinfo = ''; let mediaInfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = quoteList[i].replace(/\[\/?quote\]/g, '');
    if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
      bdinfo += quoteContent;
    }
    if (quoteContent.match(/Unique ID/i)) {
      mediaInfo += quoteContent;
    }
  }
  // 有一些bdinfo是没有放在引用里的
  if (!bdinfo) {
    bdinfo = getBDInfoFromBBCode(bbcode);
  }
  return {
    bdinfo,
    mediaInfo,
  };
};
const getVideoType = (type, title) => {
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
