import { CURRENT_SITE_INFO } from '../const';
import {
  getUrlParam, getBDType, getScreenshotsFromBBCode,
} from '../common';
export default (info) => {
  const {
    title, imdbUrl, tags, size,
    videoCodec, videoType,
    resolution,
  } = info;
  const groupId = getUrlParam('groupid');
  if (!groupId) {
    $(CURRENT_SITE_INFO.imdb.selector).val(imdbUrl || 0);
    // eslint-disable-next-line no-undef
    AutoFill();
  }
  info.resolution = getResolution(resolution, videoType, title);
  info.videoCodec = getVideoCodec(videoCodec, videoType, size);
  ['category', 'source', 'videoCodec', 'resolution'].forEach(key => {
    const { selector = '', map } = CURRENT_SITE_INFO[key];
    if (map) {
      const mapValue = map[info[key]];
      $(selector).val(mapValue);
    } else {
      $(selector).val(info[key]);
    }
  });
  const description = getDescription(info);
  $(CURRENT_SITE_INFO.description.selector).val(description);
  const editionInfo = getEditionInfo(videoType, tags);
  if (editionInfo.length > 0) {
    $('#remaster').attr('checked', true);
    // eslint-disable-next-line no-undef
    Remaster();
    editionInfo.forEach(edition => {
      const event = new Event('click');
      $(`#remaster_tags a:contains("${edition}")`)[0].dispatchEvent(event);
    });
  }
};
const getEditionInfo = (videoType, tags) => {
  const editionInfo = [];
  if (videoType === 'remux') {
    editionInfo.push('Remux');
  }
  if (tags.HDR) {
    editionInfo.push('HDR10');
  }
  if (tags['HDR10+']) {
    editionInfo.push('HDR10+');
  }
  if (tags.DolbyVision) {
    editionInfo.push('Dolby Vision');
  }
  if (tags.atmos) {
    editionInfo.push('Dolby Atmos');
  }
  if (tags.dtsx) {
    editionInfo.push('DTS:X');
  }
  return editionInfo;
};
const getVideoCodec = (videoCodec, videoType, size) => {
  if (videoType === 'bluray') {
    return getBDType(size);
  } else if (videoType === 'dvd') {
    const GBSize = size / 1e9;
    if (GBSize < 5) {
      return 'DVD5';
    } else {
      return 'DVD9';
    }
  }
  return videoCodec;
};
const getResolution = (resolution, videoType, title) => {
  if (videoType === 'DVD' && title.match(/NTSC/i)) {
    return 'NTSC';
  } else if (videoType === 'DVD' && title.match(/PAL/i)) {
    return 'PAL';
  }
  return resolution;
};
const getDescription = (info) => {
  const { description, mediaInfo } = info;
  let filterDescription = '';
  if (mediaInfo) {
    filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]`;
  }
  let screenshots = getScreenshotsFromBBCode(description);
  screenshots = screenshots.map(item => `[img]${item}[/img]`);
  return filterDescription + '\n' + screenshots.join('\n');
};
