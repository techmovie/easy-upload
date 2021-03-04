import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getSize, getAreaCode, getFilterBBCode, getSourceFromTitle, getScreenshotsFromBBCode, getTagsFromSubtitle, getInfoFromBDInfo } from '../common';

/**
 * 获取 NexusPHP 默认数据
 */
export default () => {
  let title = $('#top').prop('firstChild').nodeValue.trim();
  const year = title.match(/(19|20)\d{2}/g);
  let metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊')").next().text().replace(/：/g, ':');
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let siteImdbUrl = $('#kimdb>a').attr('href'); // 部分站点IMDB信息需要手动更新才能展示
  const descriptionBBCode = getFilterBBCode($('#kdescr')[0]);

  // 站点自定义数据覆盖 开始
  if (CURRENT_SITE_NAME === 'HDC') {
    const meta = [];
    $("li:contains('基本信息'):last").next('li').children('i').each(function () {
      meta.push($(this).text().replace('：', ':'));
    });
    metaInfo = meta.join('   ');
    subtitle = $('#top').next('h3').text();
  }

  if (CURRENT_SITE_NAME === 'OURBITS') {
    siteImdbUrl = $('.imdbnew2 a:first').attr('href');
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
  const imdbUrl = descriptionBBCode.match(/http(s)?:\/\/www.imdb.com\/title\/\d+/)?.[0];
  if (imdbUrl) {
    TORRENT_INFO.imdbUrl = imdbUrl;
  } else if (siteImdbUrl) {
    TORRENT_INFO.imdbUrl = (siteImdbUrl.match(/www.imdb.com\/title/)) ? siteImdbUrl : '';
  }

  if (!processing) {
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
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getCategory(category);
  TORRENT_INFO.videoType = getVideoType(videoType || TORRENT_INFO.title);
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.size = getSize(size);
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  TORRENT_INFO.tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const { logs, bdinfo, mediaInfo } = getLogsOrMediaInfo();
  TORRENT_INFO.logs = logs;
  if (isBluray) {
    TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
    TORRENT_INFO.mediaInfo = bdinfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFromBDInfo(bdinfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = { ...TORRENT_INFO.tags, ...mediaTags };
  } else {
    TORRENT_INFO.mediaInfo = mediaInfo;
    TORRENT_INFO.videoCodec = getVideoCodec(videoCodec);
    TORRENT_INFO.resolution = getResolution(resolution);
    TORRENT_INFO.bdinfo = getBDInfo();
    TORRENT_INFO.audioCodec = getAudioCodec(audioCodec);
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
  return content.replace(/&nbsp;|<legend>\s*引用\s*<\/legend>/g, ' ').replace(/<br>/g, '\n');
};
const getMetaValue = (key, metaInfo) => {
  let regStr = `(${key}):\\s?([^\\s]+)?`;
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
  } else if (videoType.match(/encode|x264|x265/ig)) {
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
  if (codes.match(/265|hevc/ig)) {
    return 'x265';
  } else if (codes.match(/264|avc/ig)) {
    return 'x264';
  }
  return codes;
};

/**
 * 格式化音频编码格式
 * @param {code} codes 编码文字
 */
const getAudioCodec = (codes) => {
  if (!codes) {
    return '';
  }
  codes = codes.replace(/[.-]|[ ]/g, '').toLowerCase();
  if (codes.match(/dtshd/ig)) {
    return 'dtshdma';
  }
  return codes;
};

/**
 * 获取简介中引用的视频编码信息
 */
const getBDInfo = () => {
  const quoteList = $('#kdescr').find('fieldset');
  let bdinfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = quoteList[i].innerText;
    if (quoteContent.match(/DISC|BIT|RATE/i)) {
      bdinfo += ` [quote] ${quoteContent.trim()}[/quote]`;
    }
  }
  return bdinfo;
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
