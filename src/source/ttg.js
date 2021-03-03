import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getInfoFromBDInfo, getInfoFromMediaInfo, getSourceFromTitle, getFilterBBCode, getScreenshotsFromBBCode, getAreaCode, getTagsFromSubtitle } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const headTitle = $('#main_table h1').eq(0).text();
  const title = headTitle.match(/[^[]+/)?.[0];
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.subtitle = headTitle.replace(title, '').replace(/\[|\]/g, '');
  TORRENT_INFO.tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
  const mediaTecInfo = getTorrentValueDom('类型').text();
  const { category, area, videoType } = getCategoryAndArea(mediaTecInfo);
  TORRENT_INFO.category = category;
  TORRENT_INFO.area = area;
  TORRENT_INFO.videoType = getVideoType(title, videoType);
  const year = TORRENT_INFO.title.match(/(18|19|20)\d{2}/g);
  TORRENT_INFO.year = year ? year.pop() : '';
  TORRENT_INFO.imdbUrl = getTorrentValueDom('IMDB').find('a').attr('href');
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  const sizeStr = getTorrentValueDom('尺寸').text().match(/\(((\d|,)+)\s*字节\)/i)?.[1];
  TORRENT_INFO.size = sizeStr.replaceAll(',', '');
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;

  window.onload = () => {
    const descriptionDom = $('#kt_d');
    const bbCodes = getFilterBBCode(descriptionDom[0]);
    TORRENT_INFO.description = bbCodes;
    const doubanUrl = bbCodes.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)?.[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const areaMatch = bbCodes.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2];
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
    const { logs, bdinfo, mediaInfo } = getLogsOrMediaInfo(descriptionDom);
    TORRENT_INFO.logs = logs;
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
      const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution;
      TORRENT_INFO.tags = { ...TORRENT_INFO.tags, ...mediaTags };
    } else {
      let resolution = TORRENT_INFO.title.match(/\d{3,4}(p|i)/i)?.[0];
      if (!resolution && resolution.match(/4k|uhd/i)) {
        resolution = '2160p';
      }
      TORRENT_INFO.resolution = resolution;
      TORRENT_INFO.audioCodec = getAudioCodec(TORRENT_INFO.title);
      // 从简略mediainfo中获取videoCodes
      if (bbCodes.match(/VIDEO\s*CODEC/i)) {
        const matchCodec = bbCodes.match(/ViDEO\s*CODEC\.*:?\s*([^\s_]+)?/i)?.[1];
        if (matchCodec) {
          TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, '').toLowerCase();
        }
      }
      // 从简略mediainfo中获取videoCodes
      if (bbCodes.match(/AUDIO\s*CODEC/i)) {
        const matchCodec = bbCodes.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)?.[1];
        if (matchCodec) {
          TORRENT_INFO.audioCodec = getAudioCodec(matchCodec);
        }
      }
    }
    TORRENT_INFO.screenshots = getImages(bbCodes);
    console.log(TORRENT_INFO);
  };
};

const getCategoryAndArea = (mediaInfo) => {
  let category = ''; let area = ''; let videoType = '';
  if (mediaInfo.match(/电影/)) {
    category = 'movie';
  } else if (mediaInfo.match(/影视/)) {
    category = 'movie';
  } else if (mediaInfo.match(/剧包/)) {
    category = 'tvpack';
  } else if (mediaInfo.match(/剧/)) {
    category = 'tv';
  } else if (mediaInfo.match(/记录/)) {
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
// 获取logs 完整bdinfo或mediainfo
const getLogsOrMediaInfo = (descriptionDom) => {
  const quoteList = descriptionDom.find('.sub').has('b:contains(Quote)').next().find('td');
  let logs = ''; let bdinfo = ''; let mediaInfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = $(quoteList[i]).html();
    if (quoteContent.match(/eac3to/)) {
      logs += `[quote]${formatQuoteContent(quoteContent)}[/quote]`;
    }
    if (quoteContent.match(/DISC/i)) {
      bdinfo += formatQuoteContent(quoteContent);
    }
    if (quoteContent.match(/Unique ID/i)) {
      mediaInfo += formatQuoteContent(quoteContent);
    }
  }
  return {
    logs,
    bdinfo,
    mediaInfo,
  };
};
const formatQuoteContent = (content) => {
  return content.replace(/&nbsp;/g, ' ').replace(/<br>/g, '\n');
};
// 获取截图
const getImages = (bbcode) => {
  if (bbcode.match(/More\.Screens/i)) { // 官组截图
    const moreScreen = bbcode.match(/\.More\.Screens\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)?.[1];
    return getScreenshotsFromBBCode(moreScreen);
  } else {
    return getScreenshotsFromBBCode(bbcode);
  }
};
const getVideoType = (title, videoType) => {
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
const getTorrentValueDom = (key) => {
  return $(`#main_table td.heading:contains(${key})`).next();
};
const getAudioCodec = (audio) => {
  if (audio.match(/Dolby Digital/i)) {
    return 'dd';
  } else if (audio.match(/AAC/i)) {
    return 'aac';
  } else if (audio.match(/DTS/i)) {
    return 'dts';
  }
  return audio;
}
;
