import { PT_SITE } from '../const';
import {
  getUrlParam, getBDType, getScreenshotsFromBBCode,
} from '../common';
export default (info:TorrentInfo.Info) => {
  const currentSiteInfo = PT_SITE.PTP;
  const {
    title, imdbUrl, tags, size,
    videoCodec = '', videoType,
    resolution,
  } = info;
  const groupId = getUrlParam('groupid');
  if (!groupId) {
    $(currentSiteInfo.imdb.selector).val(imdbUrl || 0);
    // eslint-disable-next-line no-undef
    AutoFill();
  }
  info.resolution = getResolution(resolution, videoType, title);
  info.videoCodec = getVideoCodec(videoCodec, videoType, size);
  type Key = 'category'|'source'|'videoCodec'|'resolution';
  ['category', 'source', 'videoCodec', 'resolution'].forEach(key => {
    const { selector = '', map } = currentSiteInfo[key as Key];
    type MapKey = keyof typeof map
    if (map) {
      const mapValue = map[info[key as Key] as MapKey];
      $(selector).val(mapValue);
    } else {
      $(selector).val(info[key as Key] as MapKey);
    }
  });
  const description = getDescription(info);
  $(currentSiteInfo.description.selector).val(description);
  const editionInfo = getEditionInfo(videoType, tags);
  if (editionInfo.length > 0) {
    $('#remaster').attr('checked', 'true');
    // eslint-disable-next-line no-undef
    Remaster();
    editionInfo.forEach(edition => {
      const event = new Event('click');
      $(`#remaster_tags a:contains("${edition}")`)[0].dispatchEvent(event);
    });
  }
};
const getEditionInfo = (videoType:string, tags:TorrentInfo.MediaTags) => {
  const editionInfo = [];
  if (videoType === 'remux') {
    editionInfo.push('Remux');
  }
  if (tags.hdr) {
    editionInfo.push('HDR10');
  }
  if (tags.hdr10_plus) {
    editionInfo.push('HDR10+');
  }
  if (tags.dolby_vision) {
    editionInfo.push('Dolby Vision');
  }
  if (tags.dolby_atmos) {
    editionInfo.push('Dolby Atmos');
  }
  if (tags.dts_x) {
    editionInfo.push('DTS:X');
  }
  return editionInfo;
};
const getVideoCodec = (videoCodec:string, videoType:string, size:number) => {
  if (videoType === 'bluray') {
    return getBDType(size);
  } else if (videoType === 'dvd') {
    const GBSize = size / 1e9;
    if (GBSize < 5) {
      return 'DVD5';
    }
    return 'DVD9';
  }
  return videoCodec;
};
const getResolution = (resolution:string, videoType:string, title:string) => {
  if (videoType === 'DVD' && title.match(/NTSC/i)) {
    return 'NTSC';
  } else if (videoType === 'DVD' && title.match(/PAL/i)) {
    return 'PAL';
  }
  return resolution;
};
const getDescription = (info: TorrentInfo.Info) => {
  const { description, mediaInfo } = info;
  let filterDescription = '';
  if (mediaInfo) {
    filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]`;
  }
  let screenshots = getScreenshotsFromBBCode(description);
  screenshots = screenshots.map(item => `[img]${item}[/img]`);
  return `${filterDescription}\n${screenshots.join('\n')}`;
};
