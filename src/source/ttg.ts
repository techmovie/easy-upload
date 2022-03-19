import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromBDInfo, getInfoFromMediaInfo,
  getSourceFromTitle, getFilterBBCode, getScreenshotsFromBBCode,
  getAreaCode, getTagsFromSubtitle, getAudioCodecFromTitle,
  getVideoCodecFromTitle, getPreciseCategory, getBDInfoOrMediaInfo,
} from '../common';

export default async () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;

  const headTitle = $('#main_table h1').eq(0).text();
  const title = headTitle.match(/[^[]+/)?.[0] ?? '';
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.subtitle = headTitle.replace(title, '').replace(/\[|\]/g, '');
  const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle + TORRENT_INFO.title);
  const mediaTecInfo = getTorrentValueDom('类型').text();
  const { category, area, videoType } = getCategoryAndArea(mediaTecInfo);
  TORRENT_INFO.area = area;
  TORRENT_INFO.videoType = getVideoType(title, videoType);
  const year = TORRENT_INFO.title.match(/(18|19|20)\d{2}/g) ?? [];
  TORRENT_INFO.year = year ? year.pop() as string : '';
  TORRENT_INFO.imdbUrl = getTorrentValueDom('IMDB').find('a').attr('href');
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  const sizeStr = getTorrentValueDom('尺寸').text().match(/\(((\d|,)+)\s*字节\)/i)?.[1] ?? '';
  TORRENT_INFO.size = parseInt(sizeStr.replace(/,/g, ''), 10);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  TORRENT_INFO.isForbidden = !!$('#kt_d').text().match(/禁转/);
  window.onload = async () => {
    const descriptionDom = $('#kt_d');
    const bbCodes = getFilterBBCode(descriptionDom[0]);
    TORRENT_INFO.description = getDescription(bbCodes, title);
    const doubanUrl = bbCodes.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)?.[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const areaMatch = bbCodes.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2];
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
    if (!category) {
      TORRENT_INFO.category = getCategoryFromDesc(bbCodes);
    } else {
      TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    }
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(bbCodes);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution || '';
      TORRENT_INFO.tags = { ...tags, ...mediaTags };
    } else {
      let resolution = TORRENT_INFO.title.match(/\d{3,4}(p|i)/i)?.[0] ?? '';
      if (!resolution && resolution.match(/4k|uhd/i)) {
        resolution = '2160p';
      }
      TORRENT_INFO.resolution = resolution;
      TORRENT_INFO.audioCodec = getAudioCodecFromTitle(TORRENT_INFO.title);
      // 从简略mediainfo中获取videoCodec
      if (bbCodes.match(/VIDEO(\.| )*CODEC/i)) {
        const matchCodec = bbCodes.match(/VIDEO(\.| )*CODEC\.*:?\s*([^\s_:]+)?/i)?.[2];
        if (matchCodec) {
          TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, '').toLowerCase();
        } else {
          const { title } = TORRENT_INFO;
          TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
        }
      }
      // 从简略mediainfo中获取audioCodec
      if (bbCodes.match(/AUDIO\s*CODEC/i)) {
        const matchCodec = bbCodes.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)?.[1];
        if (matchCodec) {
          TORRENT_INFO.audioCodec = getAudioCodecFromTitle(matchCodec);
        }
      }
    }
    TORRENT_INFO.screenshots = await getImages(bbCodes);
  };
};

const getCategoryAndArea = (mediaInfo:string) => {
  let category = ''; let area = ''; let videoType = '';
  if (mediaInfo.match(/电影/)) {
    category = 'movie';
  } else if (mediaInfo.match(/剧包/)) {
    category = 'tvPack';
  } else if (mediaInfo.match(/剧/)) {
    category = 'tv';
  } else if (mediaInfo.match(/纪录/)) {
    category = 'documentary';
  } else if (mediaInfo.match(/综艺/)) {
    category = 'variety';
  } else if (mediaInfo.match(/体育/)) {
    category = 'sport';
  } else if (mediaInfo.match(/演唱会/)) {
    category = 'concert';
  } else if (mediaInfo.match(/动漫/)) {
    category = 'cartoon';
  }
  if (mediaInfo.match(/韩/)) {
    area = 'KR';
  } else if (mediaInfo.match(/日/)) {
    area = 'JP';
  } else if (mediaInfo.match(/华/)) {
    area = 'CN';
  } else if (mediaInfo.match(/欧/)) {
    area = 'US';
  }

  if (mediaInfo.match(/UHD原盘/i)) {
    videoType = 'uhdbluray';
  } else if (mediaInfo.match(/bluray原盘/i)) {
    videoType = 'bluray';
  } else if (mediaInfo.match(/DVD/i)) {
    videoType = 'dvd';
  }
  return {
    category,
    area,
    videoType,
  };
};
// 获取截图
const getImages = (bbcode:string) => {
  if (bbcode.match(/More\.Screens/i)) { // 官组截图
    const moreScreen = bbcode.match(/\.More\.Screens\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)?.[1] ?? '';
    return getScreenshotsFromBBCode(moreScreen);
  }
  return getScreenshotsFromBBCode(bbcode);
};
const getVideoType = (title:string, videoType:string) => {
  if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/remux/i)) {
    return 'remux';
  } else if (title.match(/dvdrip/i)) {
    return 'dvdrip';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return videoType;
};
const getTorrentValueDom = (key:string) => {
  return $(`#main_table td.heading:contains(${key})`).next();
};
const getCategoryFromDesc = (desc:string) => {
  let category = 'movie';
  const { title, subtitle } = TORRENT_INFO;
  if (title.match(/s0?\d{1,2}/i) || desc.match(/集\s*数/)) {
    if (title.match(/s0?\d{1,2}e0\d{1,2}/i) || subtitle?.match(/第[^\s]集/)) {
      category = 'tv';
    } else {
      category = 'tvPack';
    }
  } else if (desc.match(/动画/)) {
    category = 'cartoon';
  } else if (desc.match(/纪录/)) {
    category = 'documentary';
  }
  return category;
};
function getDescription (bbcode:string, title:string) {
  // 删除优惠信息
  const discountMatch = bbcode.match(/\[color=\w+\]本种子.+?\[\/color\]/)?.[0] ?? '';
  if (discountMatch) {
    bbcode = bbcode.replace(discountMatch, '');
  }
  const noneSenseNumberMatch = bbcode.match(/@\d+?\(\d+?\)/)?.[0] ?? '';
  if (noneSenseNumberMatch) {
    bbcode = bbcode.replace(noneSenseNumberMatch, '');
  }
  if (title.match(/-WiKi$/)) {
    const doubanPart = bbcode.match(/◎译\s+名(.|\n)+/)?.[0] ?? '';
    bbcode = bbcode.replace(doubanPart, '');
    bbcode = bbcode.replace(/(\[img\].+?\[\/img\])/, `$1\n\n${doubanPart}`);
  }
  return bbcode;
}
