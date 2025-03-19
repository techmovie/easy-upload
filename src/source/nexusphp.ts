import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, convertSizeStringToBytes, getAreaCode, getFilterBBCode, getSourceFromTitle,
  extractImgsFromBBCode, getTagsFromSubtitle, getInfoFromBDInfo, parseMedia,
  getAudioCodecFromTitle, getVideoCodecFromTitle, getBDInfoOrMediaInfo, getPreciseCategory,
} from '../common';
import { getVideoType, getCategory, getResolution, getFormat } from './helper';
import $ from 'jquery';

/**
 * 获取 NexusPHP 默认数据
 */
export default async () => {
  let title = formatTorrentTitle($('#top').text().split(/\s{3,}/)?.[0]?.trim());

  const metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊'),.layui-table td:contains('基本信息')").next().text().replace(/：/g, ':');
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let siteImdbUrl = $('#kimdb>a').attr('href'); // 部分站点IMDB信息需要手动更新才能展示
  let descriptionBBCode = getFilterBBCode($('#kdescr')[0]);
  descriptionBBCode = descriptionBBCode.replace(/\u00A0\u3000/g, ' ');
  // 站点自定义数据覆盖 开始
  if (CURRENT_SITE_NAME === 'MTeam') {
    descriptionBBCode = descriptionBBCode
      .replace(/https:\/\/\w+?\.m-team\.cc\/imagecache.php\?url=/g, '')
      .replace(/(http(s)?)%3A/g, '$1:')
      .replace(/%2F/g, '/');
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
    siteImdbUrl = $('#kimdb .imdbwp__link').attr('href');
    TORRENT_INFO.doubanUrl = $('#kdouban .imdbwp__link').attr('href');
    const element = document.createElement('div');
    $(element).html($('#outer td').has('#kdescr').html());
    descriptionBBCode = getFilterBBCode(element);
    descriptionBBCode = descriptionBBCode.replace('  [url=', '\n  [url=').replace(/\[\/img\]\[\/url\]\n/g, '[/img][/url]');
    const mediainfo = $("div.codemain > pre:contains('Unique ID')");
    if (mediainfo[0]) {
      mediainfo.each(function () {
        TORRENT_INFO.mediaInfos?.push($(this).text());
      });
    }
    descriptionBBCode = descriptionBBCode.replace(/ 截图对比\(点击空白处展开\)/g, '截图对比');
    interface ComparisonObj{
      title: string
      imgs: string[]
      reason: string
    }
    const comparisonArray = $('fieldset[onclick]').toArray() || [];
    const comparisons:ComparisonObj[] = [];
    comparisonArray.forEach(item => {
      const imgs: string[] = [];
      $(item).find('a').toArray().forEach(img => {
        if (img.href) imgs.push(img.href);
      });
      const title = $(item).find('legend').text().replace(' 截图对比(点击空白处展开):', '').trim();
      const reason = '';
      comparisons.push({
        title,
        imgs,
        reason,
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    if (!descriptionBBCode.match('豆瓣评分')) {
      const imdbRate = $('#kimdb span.imdbwp__rating').text().replace('\nRating: ', '');
      const doubanInfo = $('#kdouban .imdbwp__content').text().replace(/\n{2,}/g, '\n').replace(/\n[0-9]?[0-9]\.[0-9]\n/g, '\n').replace(/\n/g, '\n◎').replace(/\n◎$/, '\n').replace('◎Rating:', `◎IMDb链接:${siteImdbUrl}\n◎IMDb评分: ${imdbRate}\n◎豆瓣链接: ${TORRENT_INFO.doubanUrl}\n◎豆瓣评分:`);
      const postUrl = $('#kimdb img.imdbwp__img')?.attr('src') ?? '';
      const doubanPoster = postUrl ? `[img]${postUrl}[/img]\n` : '';
      TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo || '';
    }
    descriptionBBCode = descriptionBBCode.replace(/\[quote\]GeneralVideo[^[]*\[\/quote\]/, '');
  }

  // 站点自定义数据覆盖 结束

  const year = title?.match(/(19|20)\d{2}/g) ?? [];
  const { category, videoType, videoCodec, audioCodec, resolution, processing, size } = getMetaInfo(metaInfo);
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const doubanUrl = descriptionBBCode.match(/https:\/\/((movie|book)\.)?douban\.com\/subject\/\d+/)?.[0];
  if (doubanUrl) {
    TORRENT_INFO.doubanUrl = doubanUrl;
  }
  const imdbUrl = descriptionBBCode.match(/http(s)?:\/\/www\.imdb\.com\/title\/tt\d+/)?.[0];
  if (imdbUrl) {
    TORRENT_INFO.imdbUrl = imdbUrl;
  } else if (siteImdbUrl) {
    TORRENT_INFO.imdbUrl = (siteImdbUrl.match(/www\.imdb\.com\/title/)) ? siteImdbUrl : '';
  }
  TORRENT_INFO.year = year.length > 0 ? year.pop() as string : '';
  TORRENT_INFO.title = title;
  TORRENT_INFO.subtitle = subtitle;
  TORRENT_INFO.description = descriptionBBCode;
  const originalName = descriptionBBCode.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
  const translateName = descriptionBBCode.match(/(译\s+名)\s+(.+)/)?.[2] ?? '';
  if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
    TORRENT_INFO.movieName = originalName;
  } else {
    TORRENT_INFO.movieName = translateName.match(/(\w|\s){2,}/)?.[0]?.trim() ?? '';
  }
  const fullInformation = $('#top').text() + subtitle + descriptionBBCode;
  const isForbidden = fullInformation.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|exclusive/);
  TORRENT_INFO.isForbidden = !!isForbidden;
  // 兼容家园
  if (!processing || processing.match(/raw|encode/)) {
    const areaMatch = descriptionBBCode.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)?.[2];
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
  } else {
    TORRENT_INFO.area = getAreaCode(processing);
  }
  const specificCategory = getPreciseCategory(TORRENT_INFO, getCategory(category || descriptionBBCode));
  TORRENT_INFO.category = specificCategory;
  TORRENT_INFO.videoType = getVideoType(videoType || TORRENT_INFO.title);
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.size = size ? convertSizeStringToBytes(size) : 0;
  if (CURRENT_SITE_NAME === 'KEEPFRDS') {
    TORRENT_INFO.screenshots = await extractImgsFromBBCode(descriptionBBCode.replace(/\[quote\]截图对比[^\n]*\n[^\n]*/gi, ''));
  } else TORRENT_INFO.screenshots = await extractImgsFromBBCode(descriptionBBCode);

  const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
  const pageTags = getTagsFromPage();
  TORRENT_INFO.tags = {
    ...tags,
    ...pageTags,
  };

  if (!TORRENT_INFO.isForbidden && TORRENT_INFO.tags.exclusive) {
    TORRENT_INFO.isForbidden = true;
  }

  const isBluray = !!TORRENT_INFO.videoType.match(/bluray/i);
  if (TORRENT_INFO.mediaInfos.length > 0) {
    getSpecsFromMediainfo(isBluray);
  } else {
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
      getSpecsFromMediainfo(isBluray);
    }
  }

  const infoFromMediaInfoinfo = parseMedia(TORRENT_INFO.mediaInfos?.[0]);
  if (infoFromMediaInfoinfo.subtitles) {
    for (let i = 0; i < infoFromMediaInfoinfo.subtitles?.length; i++) {
      if (/Chinese|Traditional|Simplified|Cantonese|Mandarin/i.test(infoFromMediaInfoinfo.subtitles[i])) {
        TORRENT_INFO.tags.chinese_subtitle = true;
        break;
      }
    }
  }
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(TORRENT_INFO.title || videoCodec, TORRENT_INFO.videoType);
  TORRENT_INFO.resolution = getResolution(resolution || TORRENT_INFO.title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec || TORRENT_INFO.title);

  if (CURRENT_SITE_NAME === 'TCCF') {
    TORRENT_INFO.format = getFormat(videoType);
  } else {
    TORRENT_INFO.format = getFormat($('#top').text() + subtitle);
  }
};

const getMetaInfo = (metaInfo:string) => {
  let resolutionKey = '分辨率|解析度|格式';
  let videoTypeKey = '媒介|来源|质量';
  if (CURRENT_SITE_NAME === 'SSD') {
    resolutionKey = '分辨率|解析度';
    videoTypeKey = '格式';
  }
  if (CURRENT_SITE_NAME === 'KEEPFRDS') {
    videoTypeKey = 'encode';
  }
  if (CURRENT_SITE_NAME.match(/TLF|HDHome/i)) {
    videoTypeKey = '媒介';
  }
  if (CURRENT_SITE_NAME.match(/HDFans/)) {
    videoTypeKey = '来源';
  }
  const category = getMetaValue('类型|分类|類別', metaInfo);
  const videoType = getMetaValue(videoTypeKey, metaInfo);
  const videoCodec = getMetaValue('编码|編碼', metaInfo);
  const audioCodec = getMetaValue('音频|音频编码', metaInfo);
  const resolution = getMetaValue(resolutionKey, metaInfo);
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
const getMetaValue = (key:string, metaInfo:string) => {
  let regStr = `(${key}):\\s?([^\u4e00-\u9fa5]+)?`;
  if (key.match(/大小/)) {
    regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
  }
  if ((CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT|PTSBAO|PTHome|HDTime|BTSCHOOL|TLF|SoulVoice|PuTao/)) && key.match(/类型/)) {
    regStr = `(${key}):\\s?([^\\s]+)?`;
  }
  if (CURRENT_SITE_NAME === 'TCCF' && key.match(/类型/)) {
    regStr = `(${key}):(.+?)\\s{2,}`;
  }
  if (CURRENT_SITE_NAME === 'HDFans' && key.match(/来源/)) {
    regStr = `(${key}):(.+?)\\s{2,}`;
  }
  if (CURRENT_SITE_NAME === 'HDChina' && key.match(/类型/)) {
    regStr = `(${key}):.+?([^\u4e00-\u9fa5]+)`;
  }
  const reg = new RegExp(regStr, 'i');
  const matchValue = metaInfo.match(reg)?.[2] ?? '';
  if (matchValue) {
    return matchValue.replace(/\s/g, '').trim().toLowerCase();
  }
  return '';
};

const getTagsFromPage = () => {
  let tags:TorrentInfo.MediaTags = {};
  if (CURRENT_SITE_NAME === 'PTer') {
    const tagImgs = $("td.rowhead:contains('类别与标签')").next().find('img');
    const links = Array.from(tagImgs.map((index, item) => {
      return $(item).attr('src')?.replace(/(lang\/chs\/)|(\.gif)/g, '') ?? '';
    }));
    if (links.includes('pter-zz')) {
      tags.chinese_subtitle = true;
    }
    if (links.includes('pter-gy')) {
      tags.chinese_audio = true;
    }
    if (links.includes('pter-yy')) {
      tags.cantonese_audio = true;
    }
    if (links.includes('pter-diy')) {
      tags.diy = true;
    }
  } else {
    const tagText = $("td.rowhead:contains('标签')").next().text();
    tags = getTagsFromSubtitle(tagText);
  }
  return tags;
};
function getSpecsFromMediainfo (isBluray:boolean) {
  const getInfoFunc = isBluray ? getInfoFromBDInfo : parseMedia;
  const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(TORRENT_INFO.mediaInfos?.[0] ?? '');
  if (videoCodec !== '' && audioCodec !== '' && resolution !== '') {
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution || '';
    TORRENT_INFO.tags = { ...TORRENT_INFO.tags, ...mediaTags };
  }
}
