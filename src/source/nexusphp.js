import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { getSize, getAreaCode, getFilterBBCode, getSourceFromTitle, getScreenshotsFromBBCode, getTagsFromSubtitle, getInfoFromBDInfo, getAudioCodec, getVideoCodecFromTitle } from '../common';

/**
 * 获取 NexusPHP 默认数据
 */
export default () => {
  let title = $('#top').text().split(/\s{3,}/)?.[0]?.trim();
  let year = title.match(/(19|20)\d{2}/g);
  let metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊')").next().text().replace(/：/g, ':');
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let siteImdbUrl = $('#kimdb>a').attr('href'); // 部分站点IMDB信息需要手动更新才能展示
  let descriptionBBCode = getFilterBBCode($('#kdescr')[0]);

  // 站点自定义数据覆盖 开始
  if (CURRENT_SITE_NAME === 'TJUPT') {
    const matchArray = title.match(/\[((\w|\.|\d|-)+)\]/g);
    const realTitle = matchArray.filter(item => item.match(/\.| /))?.[0] ?? '';
    title = realTitle.replace(/\[|\]/g, '');
  }
  if (CURRENT_SITE_NAME === 'PTer') {
    descriptionBBCode = $('#descrcopyandpaster').val();
  }
  if (CURRENT_SITE_NAME === 'HDChina') {
    const meta = [];
    $("li:contains('基本信息'):last").next('li').children('i').each(function () {
      meta.push($(this).text().replace('：', ':'));
    });
    metaInfo = meta.join('   ');
    subtitle = $('#top').next('h3').text();
  }

  if (CURRENT_SITE_NAME === 'OurBits') {
    siteImdbUrl = $('.imdbnew2 a:first').attr('href');
    TORRENT_INFO.doubanUrl = $('#doubaninfo .doubannew a').attr('href');
    if (TORRENT_INFO.doubanUrl) {
      const doubanInfo = getFilterBBCode($('.doubannew2 .doubaninfo')?.[0]);
      const doubanPoster = `[img]${$('#doubaninfo .doubannew a img').attr('src')}[/img]\n`;
      TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
    }
  }

  if (CURRENT_SITE_NAME === 'KEEPFRDS') {
    [title, subtitle] = [subtitle, title];
    year = title.match(/(19|20)\d{2}/g);
  }

  if (CURRENT_SITE_NAME === 'SSD') {
    TORRENT_INFO.doubanUrl = $(".douban_info a:contains('://movie.douban.com/subject/')").attr('href');
    const doubanInfo = getFilterBBCode($('.douban-info artical')?.[0]);
    const doubanPoster = $("div[data-group='douban']").find('img').attr('src') ? `[img]${$("div[data-group='douban']").find('img').attr('src')}[/img]\n` : '';
    TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
    if (descriptionBBCode === '' || descriptionBBCode === undefined) {
      const extraTextInfo = getFilterBBCode($('.torrent-extra-text-container .extra-text')?.[0]);
      const extraPoster = $('#kposter').find('img').attr('src') ? `[img]${$('#kposter').find('img').attr('src')}[/img]\n` : '';
      const extraScreenshot = $('.screenshot').find('img').attr('src') ? `[img]${$('.screenshot').find('img').attr('src')}[/img]\n` : '';
      const extraMediaInfo = '[quote]' + getFilterBBCode($("section[data-group='mediainfo']")?.[0]) + '[/quote]';
      descriptionBBCode = extraPoster + extraTextInfo + extraMediaInfo + extraScreenshot;
    }

    siteImdbUrl = $(".douban_info a:contains('://www.imdb.com/title/')").attr('href');
  }

  if (CURRENT_SITE_NAME === 'LEMONHD') {
    metaInfo += $("td.rowhead:contains('详细信息')").next().text().replace(/：/g, ':');
    // 适配 lemonhd.org/details_animate.php 分辨率缺冒号(:)   -_-//
    if (metaInfo.match(/分辨率:/) === null) {
      metaInfo = metaInfo.replace('分辨率', '分辨率:');
    }
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
  TORRENT_INFO.size = size ? getSize(size) : '';
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  TORRENT_INFO.tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const { logs, bdinfo, mediaInfo } = getLogsOrMediaInfo(descriptionBBCode);
  TORRENT_INFO.logs = logs;
  TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
  if (isBluray && bdinfo) {
    TORRENT_INFO.mediaInfo = bdinfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFromBDInfo(bdinfo);
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
      TORRENT_INFO.videoCodec = getVideoCodecFromTitle(videoCodec || TORRENT_INFO.title);
    }
    TORRENT_INFO.resolution = getResolution(resolution);
    TORRENT_INFO.audioCodec = getAudioCodec(audioCodec || TORRENT_INFO.title);
  }
};

const getMetaInfo = (metaInfo) => {
  const category = getMetaValue('类型|分类|類別', metaInfo);
  const videoType = getMetaValue('媒介|来源|质量', metaInfo);
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
const getLogsOrMediaInfo = (bbcode) => {
  const quoteList = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g) ?? [];
  let logs = ''; let bdinfo = ''; let mediaInfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = formatQuoteContent(quoteList[i]);
    if (quoteContent.match(/eac3to/)) {
      logs += `[quote]${quoteContent}[/quote]`;
    }
    if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
      bdinfo += quoteContent;
    }
    if (quoteContent.match(/Unique ID/i)) {
      mediaInfo += quoteContent;
    }
  }
  return {
    logs,
    bdinfo,
    mediaInfo,
  };
};
const formatQuoteContent = (content) => {
  return content.replace(/\[(.+)\]?/g, '').replaceAll('\u200D', '');
};
const getMetaValue = (key, metaInfo) => {
  let regStr = `(${key}):\\s?([^\u4e00-\u9fa5]+)?`;
  if (key.match(/大小/)) {
    regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
  }
  if ((CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT/)) && key.match(/类型/)) {
    regStr = `(${key}):\\s?([^\\s]+)?`;
  }
  if (CURRENT_SITE_NAME === 'PTer' && key.match(/类型|地区/)) {
    regStr = `(${key}):\\s?([^\\s]+)?`;
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
 * @param {category} category
 */
const getCategory = (category) => {
  if (!category) {
    return '';
  }
  category = category.replace(/[.-]/g, '').toLowerCase();
  if (category.match(/movie|bd|ultra|电影/ig)) {
    return 'movie';
  } else if (category.match(/tv|drama|剧集/ig)) {
    return 'tv';
  } else if (category.match(/TVSeries/ig)) {
    return 'tvPack';
  } else if (category.match(/综艺/ig)) {
    return 'variety';
  } else if (category.match(/document|纪录|紀錄/ig)) {
    return 'documentary';
  } else if (category.match(/sport|体育/ig)) {
    return 'sport';
  } else if (category.match(/mv|演唱/ig)) {
    return 'concert';
  } else if (category.match(/anim|动|画|漫/ig)) {
    return 'cartoon';
  }
  return '';
};

const getResolution = (resolution) => {
  resolution = (resolution === undefined) ? '' : resolution.toLowerCase();
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
