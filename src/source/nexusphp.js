import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getSize, getAreaCode, getFilterBBCode, getSourceFromTitle, getScreenshotsFromBBCode, getTagsFromSubtitle, getInfoFromBDInfo, getAudioCodec } from '../common';

/**
 * 获取 NexusPHP 默认数据
 */
export default () => {
  let title = $('#top').text().split(/\s{3,}/)?.[0]?.trim();
  const year = title.match(/(19|20)\d{2}/g);
  let metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊')").next().text().replace(/：/g, ':');
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let siteImdbUrl = $('#kimdb>a').attr('href'); // 部分站点IMDB信息需要手动更新才能展示
  let descriptionBBCode = getFilterBBCode($('#kdescr')[0]);

  // 站点自定义数据覆盖 开始
  if (CURRENT_SITE_NAME.match(/hdc/i)) {
    const meta = [];
    $("li:contains('基本信息'):last").next('li').children('i').each(function () {
      meta.push($(this).text().replace('：', ':'));
    });
    metaInfo = meta.join('   ');
    subtitle = $('#top').next('h3').text();
  }

  if (CURRENT_SITE_NAME.match(/ourbits/i)) {
    siteImdbUrl = $('.imdbnew2 a:first').attr('href');
    TORRENT_INFO.doubanUrl = $('#doubaninfo .doubannew a').attr('href');
    const doubanInfo = getFilterBBCode($('.doubannew2 .doubaninfo')?.[0]);
    const doubanPoster = `[img]${$('#doubaninfo .doubannew a img').attr('src')}[/img]\n`;
    TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
  }

  if (CURRENT_SITE_NAME === 'FRDS') {
    [title, subtitle] = [subtitle, title];
  }
  // 站点自定义数据覆盖 结束

  const { category, videoType, videoCodec, audioCodec, resolution, processing, size } = getMetaInfo(metaInfo);

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const doubanUrl = descriptionBBCode.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)?.[0];
  if (doubanUrl) {
    TORRENT_INFO.doubanUrl = doubanUrl;
  }
  const imdbUrl = descriptionBBCode.match(/http(s)?:\/\/www.imdb.com\/title\/tt\d+/)?.[0];
  if (imdbUrl) {
    TORRENT_INFO.imdbUrl = imdbUrl;
  } else if (siteImdbUrl) {
    TORRENT_INFO.imdbUrl = (siteImdbUrl.match(/www.imdb.com\/title/)) ? siteImdbUrl : '';
  }
  // 兼容家园
  if (!processing || processing.match(/raw/)) {
    const areaMatch = descriptionBBCode.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2];
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
  } else {
    TORRENT_INFO.area = getAreaCode(processing);
  }
  TORRENT_INFO.year = year ? year.pop() : '';
  TORRENT_INFO.title = title;
  TORRENT_INFO.subtitle = subtitle;
  if (TORRENT_INFO.doubanInfo) {
    descriptionBBCode = TORRENT_INFO.doubanInfo += descriptionBBCode;
  }
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getCategory(category || descriptionBBCode);
  TORRENT_INFO.videoType = getVideoType(videoType || TORRENT_INFO.title);
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.size = getSize(size);
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  TORRENT_INFO.tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const { logs, bdinfo, mediaInfo } = getLogsOrMediaInfo();
  TORRENT_INFO.logs = logs;
  TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
  if (isBluray && bdinfo) {
    TORRENT_INFO.mediaInfo = bdinfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFromBDInfo(bdinfo);
    console.log(resolution);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = { ...TORRENT_INFO.tags, ...mediaTags };
  } else {
    TORRENT_INFO.mediaInfo = mediaInfo;
    if (CURRENT_SITE_NAME.match(/beitai/i)) {
      // 从简略mediainfo中获取videoCodes
      if (descriptionBBCode.match(/VIDEO\s*(\.)?CODEC/i)) {
        const matchCodec = descriptionBBCode.match(/VIDEO\s*(\.)?CODEC\.*:?\s*([^\s_,]+)?/i)?.[2];
        if (matchCodec) {
          TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, '').toLowerCase();
        }
      }
    } else {
      TORRENT_INFO.videoCodec = getVideoCodec(videoCodec);
    }
    TORRENT_INFO.resolution = getResolution(resolution);
    TORRENT_INFO.audioCodec = getAudioCodec(audioCodec || TORRENT_INFO.title);
  }
};

const getMetaInfo = (metaInfo) => {
  const category = getMetaValue('类型|分类|類別', metaInfo);
  const videoType = getMetaValue('媒介|来源', metaInfo);
  const videoCodec = getMetaValue('编码|編碼', metaInfo);
  const audioCodec = getMetaValue('音频|音频编码', metaInfo);
  const resolution = getMetaValue('分辨率|格式|解析度', metaInfo);
  const processing = getMetaValue('处理|處理|地区', metaInfo);
  const size = getMetaValue('大小', metaInfo);
  console.log({
    category,
    videoType,
    videoCodec,
    audioCodec,
    resolution,
    processing,
    size,
  });
  return {
    category,
    videoType,
    videoCodec,
    audioCodec,
    resolution,
    processing,
    size,
  };
};
// 获取logs 完整bdinfo或mediainfo
const getLogsOrMediaInfo = () => {
  const quoteList = $('#kdescr').find('fieldset');
  let logs = ''; let bdinfo = ''; let mediaInfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = $(quoteList[i]).html();
    if (quoteContent.match(/eac3to/)) {
      logs += `[quote]${formatQuoteContent(quoteContent)}[/quote]`;
    }
    if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
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
  return content.replace(/&nbsp;|<legend>\s*(引用|Quote)\s*<\/legend>/g, ' ').replace(/<br>/g, '\n');
};
const getMetaValue = (key, metaInfo) => {
  let regStr = `(${key}):\\s?([^\u4e00-\u9fa5]+)?`;
  if (key.match(/大小/)) {
    regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)B)`;
  }
  const reg = new RegExp(regStr);
  const matchValue = metaInfo.match(reg, 'i')?.[2];
  if (matchValue) {
    return matchValue.replace(/\s/g, '').trim().toLowerCase();
  }
};

/**
 * 格式化视频类型
 * @param {videoType} videoType
 * @return
 */
const getVideoType = (videoType) => {
  if (!videoType) {
    return '';
  }

  videoType = videoType.replace(/[.-]/g, '').toLowerCase();
  if (videoType.match(/uhd|ultra/ig)) {
    return 'uhdbluray';
  } else if (videoType.match(/remux/ig)) {
    return 'remux';
  } else if (videoType.match(/blu/ig)) {
    return 'bluray';
  } else if (videoType.match(/encode|x264|x265|bdrip/ig)) {
    return 'encode';
  } else if (videoType.match(/web/ig)) {
    return 'web';
  } else if (videoType.match(/hdtv/ig)) {
    return 'hdtv';
  } else if (videoType.match(/dvdr/ig)) {
    return 'dvdrip';
  } else if (videoType.match(/dvd/ig)) {
    return 'dvd';
  }
  return '';
};
/**
 * 格式化视频分类
 * @param {videoType} videoType
 */
const getCategory = (videoType) => {
  if (!videoType) {
    return '';
  }
  videoType = videoType.replace(/[.-]/g, '').toLowerCase();
  if (videoType.match(/movie|bd|ultra|电影/ig)) {
    return 'movie';
  } else if (videoType.match(/tv|drama|剧集/ig)) {
    return 'tv';
  } else if (videoType.match(/综艺/ig)) {
    return 'variety';
  } else if (videoType.match(/document|纪录|紀錄/ig)) {
    return 'documentary';
  } else if (videoType.match(/sport|体育/ig)) {
    return 'sport';
  } else if (videoType.match(/mv|演唱/ig)) {
    return 'concert';
  } else if (videoType.match(/anim|动|画|漫/ig)) {
    return 'cartoon';
  }
  return '';
};

/**
 * 格式化视频编码格式
 * @param {code} codes 编码文字
 */
const getVideoCodec = (codes) => {
  if (!codes) {
    return '';
  }
  codes = codes.replace(/[.-]|[ ]/g, '').toLowerCase();
  return codes;
};

const getResolution = (resolution) => {
  resolution = resolution.toLowerCase();
  if (resolution.match(/4k|2160|UHD/ig)) {
    return '2160p';
  } else if (resolution.match(/1080p/ig)) {
    return '1080p';
  } else if (resolution.match(/1080i/ig)) {
    return '1080i';
  } else if (resolution.match(/720p/ig)) {
    return '720p';
  } else if (resolution.match(/sd/ig)) {
    return '480p';
  }
  return resolution;
};

;
