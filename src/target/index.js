import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, HDB_TEAM } from '../const';
import {
  getBDType, getTMDBIdByIMDBId, getIMDBIdByUrl,
  getFilterImages, getBDInfoOrMediaInfo,
} from '../common';
import { getTeamName } from './common';

import handleIts from './its';
import handleTJUPT from './tjupt';
import handleHDRoute from './hdr';
import handleBib from './bib';
import handleBb from './bB';
import handlePTP from './ptp';
import handlePTN from './ptn';
import handleGPW from './gpw';

const fillTargetForm = (info) => {
  console.log(info);
  if (CURRENT_SITE_NAME === 'bB') {
    handleBb(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'PTP') {
    handlePTP(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'GPW') {
    handleGPW(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'PTSBAO' && localStorage.getItem('autosave')) {
    localStorage.removeItem('autosave');
  }
  const imdbId = getIMDBIdByUrl(info.imdbUrl);
  const isBluray = info.videoType.match(/bluray/i);
  const { screenshots = [] } = info;
  const imdbSelector = CURRENT_SITE_INFO.imdb?.selector;
  if (CURRENT_SITE_NAME === 'HDRoute') {
    $(imdbSelector).val(imdbId?.replace('tt', '') ?? '');
  } else {
    if (imdbSelector) {
      $(imdbSelector).val(info.imdbUrl);
    }
  }
  // 针对hdb的站点的命名规则对标题进行处理
  if (CURRENT_SITE_NAME === 'HDBits') {
    let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p2) => {
      return `${info.movieName || info.movieAkaName} ${p2}`;
    });
    if (info.videoType === 'remux') {
      mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, '');
    }
    info.title = mediaTitle;
  }
  // 北洋站没有配置name
  if (CURRENT_SITE_INFO.name) {
    const { title, subtitle } = info;
    let torrentTitle = title;
    if (CURRENT_SITE_NAME === 'TTG') {
      torrentTitle += `[${subtitle}]`;
    } else if (CURRENT_SITE_NAME.match(/SSD|iTS/)) {
      torrentTitle = title.replace(/\s/ig, '.');
    }
    $(CURRENT_SITE_INFO.name.selector).val(torrentTitle);
  }
  // 避免选择种子文件后自动改变种子名称
  disableTorrentChange();

  // 填写四个常见的信息
  const commonInfoKeys = ['subtitle', 'douban', 'area', 'audioCodec'];
  commonInfoKeys.forEach(key => {
    const siteInfo = CURRENT_SITE_INFO[key];
    if (siteInfo && siteInfo.selector) {
      let value = info[key];
      if (key === 'douban') {
        value = info.doubanUrl;
      } else if (key === 'area' || key === 'audioCodec') {
        value = siteInfo.map[info[key]];
      }
      $(siteInfo.selector).val(value);
    }
  });
  const mediaInfo = info.mediaInfo;
  let description = '';
  // 内站直接填写完整简介
  if (info.description) {
    // 去简介前的空格和换行
    description = info.description.replace(/^(\s+)/g, '');
    if (isChineseTacker(CURRENT_SITE_INFO.siteType) && CURRENT_SITE_NAME !== 'SSD') {
      // 需要拼接豆瓣信息的内站
      const { doubanInfo } = info;
      if (doubanInfo) {
        description = doubanInfo + '\n' + description;
      }
    } else {
      // 需要过滤掉中文信息
      const { sourceSiteType } = info;
      if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== 'Bib') {
        description = filterNexusDescription(info);
      }
    }
  }
  // HDB Blu只填入mediainfo bdinfo放在简介里
  if (CURRENT_SITE_INFO.mediaInfo) {
    if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits|Blutopia)/))) {
      $(CURRENT_SITE_INFO.mediaInfo.selector).val(mediaInfo);
      description = description.replace(mediaInfo.trim(), '');
    }
  }
  // 删除简介中的截图
  if (CURRENT_SITE_INFO.screenshots) {
    screenshots.forEach(img => {
      if (description.includes(img)) {
        description = description.replace(img, '');
        if (!img.match(/\[url=.+?\[url]/)) {
          description = description.replace(/\[img\]\[\/img\]\n*/g, '');
        }
      }
    });
  }
  // 给SSD点赞！
  if (CURRENT_SITE_NAME === 'SSD') {
    $(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
    $(CURRENT_SITE_INFO.screenshots.selector).val(screenshots.join('\n'));
    if (info.category === 'tvPack' || info.title.match(/Trilogy|Collection/i) || (info.subTitle && info.subTitle.match(/合集/))) {
      $('input[name="pack"]').attr('checked', true);
    }
  }
  // 海带
  if (CURRENT_SITE_NAME === 'HDAI') {
    $(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
    $(CURRENT_SITE_INFO.screenshots.selector).val(screenshots.join('\n'));
    if (isBluray) {
      $('input[type="checkbox"][name="tag[o]"]').attr('checked', true);
    }
  }
  // 海报填写
  if (CURRENT_SITE_INFO.poster) {
    let poster = info.poster;
    if (!poster) {
      const doubanPosterImage = (info.description + info.doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
      if (doubanPosterImage && doubanPosterImage[1]) {
        poster = doubanPosterImage[1];
      } else {
        poster = description.match(/\[img\](.+?)\[\/img\]/)?.[1] ?? '';
      }
    }
    if (poster) {
      $(CURRENT_SITE_INFO.poster).val(poster);
      if (CURRENT_SITE_NAME === 'HDRoute') {
        $('input[name="poster"]').val(poster);
        description = description.replace(poster, '');
      }
    }
  }

  // BHD可以通过设置为显示缩略图
  if (CURRENT_SITE_NAME === 'BeyondHD') {
    info.screenshots.forEach(img => {
      const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\]`);
      if (description.match(regStr)) {
        description = description.replace(regStr, function (p1, p2) {
          return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
        });
      }
    });
  }
  if (CURRENT_SITE_NAME === 'PTer') {
    const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
    description = description.replace(`[quote]${mediaInfo}[/quote]`, `[hide=mediainfo]${mediaInfo}[/hide]`);
    description = description.replace(`[quote]${bdinfo}[/quote]`, `[hide=BDInfo]${bdinfo}[/hide]`);
  }
  if (CURRENT_SITE_NAME === 'PTN') {
    description = info.imdbUrl + '\n\n' + description;
  }
  // 过滤空标签
  description = filterEmptyTags(description);
  const thanksQuoteClosed = GM_getValue('easy-seed.thanks-quote-closed') || '';
  if (!thanksQuoteClosed) {
    description = getThanksQuote(info) + description.trim();
  }
  $(CURRENT_SITE_INFO.description.selector).val(description);
  // 站点特殊处理
  if (CURRENT_SITE_NAME.match(/BeyondHD|Blutopia|HDPOST|ACM|Aither/)) {
    const fillIMDBId = CURRENT_SITE_INFO.siteType === 'UNIT3D' ? imdbId.replace('tt', '') : imdbId;
    $(CURRENT_SITE_INFO.imdb.selector).val(fillIMDBId);
    getTMDBIdByIMDBId(imdbId).then(data => {
      $(CURRENT_SITE_INFO.tmdb.selector).val(data.id);
    });
    if (CURRENT_SITE_NAME.match(/BeyondHD|ACM/i)) {
      const { category, videoType } = info;
      // videoType和category交换
      info.category = videoType;
      info.videoType = category;
      // BHD需要细分蓝光类型
      if (isBluray) {
        let bdType = getBDType(info.size);
        if (videoType === 'uhdbluray' && bdType === 'BD50') {
          bdType = 'uhd50';
        }
        info.category = bdType;
      }
    }
  }
  if (CURRENT_SITE_INFO.category) {
    const category = CURRENT_SITE_INFO.category.map[info.category];
    const keyArray = ['videoCodec', 'videoType', 'resolution', 'source', 'area'];
    let finalSelectArray = [];
    if (Array.isArray(category)) {
      finalSelectArray = [...category];
      keyArray.forEach(key => {
        finalSelectArray = matchSelectForm(CURRENT_SITE_INFO, info, key, finalSelectArray);
        if (finalSelectArray.length === 1) {
          $(CURRENT_SITE_INFO.category.selector).val(finalSelectArray[0]);
        }
      });
    } else {
      [...keyArray, 'category'].forEach(key => {
        matchSelectForm(CURRENT_SITE_INFO, info, key, finalSelectArray);
      });
    }
  }
  if (CURRENT_SITE_INFO.format) {
    const formatData = CURRENT_SITE_INFO.format;
    $(formatData.selector).val(formatData.map[info.format]);
  }
  if (CURRENT_SITE_INFO.image) {
    $(CURRENT_SITE_INFO.image.selector).val(info.image);
  }

  if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice|1PTBA|HDAtmos/i)) {
    setTimeout(() => {
      const event = new Event('change');
      document.querySelector(CURRENT_SITE_INFO.category.selector).dispatchEvent(event);
    }, 500);
  }
  // 匿名勾选
  if (CURRENT_SITE_INFO.anonymous) {
    const { selector, value = '' } = CURRENT_SITE_INFO.anonymous;
    if (value) {
      $(selector).val(value);
    } else {
      $(selector).attr('checked', true);
    }
  }
  // 标签勾选
  if (CURRENT_SITE_INFO.tags) {
    Object.keys(info.tags).forEach(key => {
      if (info.tags[key] && CURRENT_SITE_INFO.tags[key]) {
        $(CURRENT_SITE_INFO.tags[key]).attr('checked', true);
      }
    });
  }
  // 填入制作组
  fillTeamName(info);
  // 对配置覆盖不到的地方进行专门处理
  if (CURRENT_SITE_NAME.match(/PTHome|HDSky|LemonHD|1PTBA|52pt/i)) {
    if (info.tags.diy) {
      let categoryValue = '';
      if (CURRENT_SITE_NAME === 'PTHome') {
        categoryValue = info.videoType === 'bluray' ? '14' : '13';
      } else if (CURRENT_SITE_NAME === 'HDSky') {
        categoryValue = info.videoType === 'bluray' ? '12' : '14';
      } else if (CURRENT_SITE_NAME === 'LemonHD') {
        $('select[name="tag_diy"]').val('yes');
        return;
      } else if (CURRENT_SITE_NAME === '1PTBA') {
        categoryValue = info.videoType === 'bluray' ? '1' : '4';
      } else if (CURRENT_SITE_NAME === '52pt') {
        categoryValue = info.videoType === 'bluray' ? '2' : '12';
      }
      $(CURRENT_SITE_INFO.videoType.selector).val(categoryValue);
    }
  }
  /*
  * 单独处理HDU
  * 为什么要在媒体类型里再还要增加个TV分类？？
  * */
  if (CURRENT_SITE_NAME.match(/HDU/)) {
    let videoTypeValue = '';
    const { resolution, videoType, category } = info;
    const isTV = category.match(/tv/);
    if (videoType === 'remux') {
      if (resolution === '2160p') {
        videoTypeValue = isTV ? '16' : '15';
      } else {
        videoTypeValue = isTV ? '12' : '3';
      }
    }
    if (isTV) {
      if (videoType === 'encode') {
        videoTypeValue = '14';
      } else if (videoType === 'web') {
        videoTypeValue = '13';
      }
    }
    if (videoTypeValue) {
      $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
    }
    if (videoType.match(/bluray/)) {
      $(CURRENT_SITE_INFO.category.selector).val('424');
    }
  }
  // 单独处理北洋
  if (CURRENT_SITE_NAME === 'TJUPT') {
    $('#browsecat').change();
    handleTJUPT(info);
  }
  // 单独处理南洋
  if (CURRENT_SITE_NAME === 'NYPT') {
    $('#browsecat').change();
    const domTimeout = setTimeout(() => {
      const catMap = {
        movie: '#movie_enname',
        tv: '#series_enname',
        tvPack: '#series_enname',
        documentary: '#doc_enname',
        variety: '#show_enname',
        cartoon: '#anime_enname',
      };
      const selector = catMap[info.category];
      if (selector) {
        $(selector).val(info.title);
      }
      clearTimeout(domTimeout);
    }, 2000);
  }
  // 单独处理UNIT3D剧集
  if (CURRENT_SITE_INFO.siteType === 'UNIT3D' && info.category.match(/tv/)) {
    const season = info.title.match(/S0?(\d{1,2})/i)?.[1] ?? 1;
    const episode = info.title.match(/EP?0?(\d{1,3})/i)?.[1] ?? 0;
    $('#season_number').val(season);
    $('#episode_number').val(episode);
  }
  // 单独处理路
  if (CURRENT_SITE_NAME === 'HDRoute') {
    handleHDRoute(info);
  }

  // 处理HDT
  if (CURRENT_SITE_NAME === 'HDT') {
    if (info.category !== 'tvPack') {
      $('select[name="season"').val('true');
    }
    // IMDB地址最后需要带上「/」
    if (imdbId) {
      $(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${imdbId}/`);
    }
  }
  // 处理Pter
  if (CURRENT_SITE_NAME === 'PTer') {
    const language = info.description.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
    if (!language.match(/英语/) && info.area === 'EU') {
      $(CURRENT_SITE_INFO.area.selector).val('8');
    }
  }
  // 处理HDH iPad
  if (CURRENT_SITE_NAME === 'HDHome') {
    if (info.title.match(/iPad/i)) {
      const categoryMap = {
        movie: '412',
        tv: '426',
        tvPack: '433',
        documentary: '418',
      };
      const ipadCat = categoryMap[info.category];
      if (ipadCat) {
        $('#browsecat').val(ipadCat);
      }
    }
  }
  if (CURRENT_SITE_NAME === 'Bib' && info.doubanBookInfo?.success) {
    handleBib(info);
  }

  if (CURRENT_SITE_NAME === 'iTS') {
    handleIts(info);
  }
  if (CURRENT_SITE_NAME === 'UHDBits') {
    $(CURRENT_SITE_INFO.imdb.selector).val(imdbId);
    const teamName = getTeamName(info);
    $('#team').val(teamName === 'other' ? 'Unknown' : teamName);
    if (info.title.match(/web-?rip/i)) {
      $(CURRENT_SITE_INFO.videoType.selector).val('WEBRip');
    }
    $('#imdb_button').click();
  }
  if (CURRENT_SITE_NAME === '52PT') {
    const { tags, videoType, resolution } = info;
    let videoTypeValue = videoType;
    if (videoType.match(/bluray/)) {
      if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
        videoTypeValue = videoType === 'bluray' ? '14' : '15';
      }
    } else if (videoType === 'remux' && resolution === '2160p') {
      videoTypeValue = '5';
    }
    $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
  }
  if (CURRENT_SITE_NAME === 'BTSCHOOL') {
    $(imdbSelector).val(imdbId);
    if (info.doubanUrl) {
      const doubanId = info.doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
      $(CURRENT_SITE_INFO.douban.selector).val(doubanId);
    }
  }
  if (CURRENT_SITE_NAME === 'PTN') {
    handlePTN(info);
  }
  if (CURRENT_SITE_NAME === 'HDTime') {
    if (info.videoType.match(/bluray/i)) {
      $(CURRENT_SITE_INFO.category.selector).val('424');
    }
  }
};
/*
* 各个字段之间取交集填入表单
* @param {siteInfo} 当前站点的配置
* @param {key} 要填入的字段key
* @param {movieInfo} 要填入的种子信息
* @param {selectArray} 此时分类对应的值
* @return 取当前key对应的value取交集之后的数组
* */
const matchSelectForm = (siteInfo, movieInfo, key, selectArray) => {
  // 拿到字段所对应的值 可能为字符串或者数组
  const valueArray = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : undefined;
  if (Array.isArray(valueArray) && selectArray) {
    // 如果当前key下有selector属性 赋值为value第一项
    if (siteInfo[key].selector) {
      $(siteInfo[key].selector).val(valueArray.shift());
    }
    // 如果此时分类对应的值仍未数组 则继续过滤
    if (selectArray.length > 1) {
      selectArray = selectArray.filter(item => valueArray.includes(item));
    }
  } else if (siteInfo[key] && siteInfo[key].selector) {
    $(siteInfo[key].selector).val(valueArray);
  }
  return selectArray;
};
const fillTeamName = (info) => {
  const teamConfig = CURRENT_SITE_INFO.team;
  const teamName = getTeamName(info);
  if (teamName && teamConfig) {
    const formateTeamName = teamConfig.map[teamName.toLowerCase()];
    const matchValue = formateTeamName || teamConfig.map.other;
    if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === 'BTSCHOOL') {
      $(teamConfig.selector).val(teamConfig.map.hdbint);
      return;
    }
    if (CURRENT_SITE_NAME === 'HDAI' && !formateTeamName) {
      $('input[name="team"]').val(teamName);
      return;
    }
    if (matchValue) {
      $(teamConfig.selector).val(matchValue.toLowerCase());
    }
  }
};

const disableTorrentChange = () => {
  const nameSelector = CURRENT_SITE_INFO.name?.selector ?? '';
  if (nameSelector.match(/^#\w+/)) {
    const nameDom = $(nameSelector).clone().attr('name', '').hide();
    $(nameSelector).attr('id', '').after(nameDom);
  }
};

const filterNexusDescription = (info) => {
  const { description } = info;
  let filterDescription = '';
  const quoteList = description.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
  if (quoteList && quoteList.length > 0) {
    quoteList.forEach(quote => {
      const isMediaInfoOrBDInfo = quote.match(/Disc\s?Size|\.mpls|Unique\s?ID|唯一ID|Resolution/i);
      if (!quote.match(/[\u4e00-\u9fa5]+/i) || isMediaInfoOrBDInfo) {
        filterDescription += quote + '\n';
      }
    });
  }
  const allImages = getFilterImages(description);
  return filterDescription + '\n' + allImages.join('');
};
const getThanksQuote = (info) => {
  const isChineseSite = isChineseTacker(CURRENT_SITE_INFO.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
  let thanksQuote = `转自[b]${info.sourceSite}[/b]，感谢原发布者！`;
  if (!isChineseSite) {
    thanksQuote = `Torrent from [b]${info.sourceSite}[/b].\nAll thanks to the original uploader！`;
  }
  return `[quote]${thanksQuote}[/quote]\n\n`;
};
// 是否为国内站点
const isChineseTacker = (siteType) => {
  return siteType.match(/NexusPHP|TTG/);
};
// 过滤空标签
const filterEmptyTags = (description) => {
  // eslint-disable-next-line prefer-regex-literals
  const reg = new RegExp('\\[(\\w+)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]', 'g');
  if (description.match(reg)) {
    description = description.replace(reg, function (match, p1, p2) {
      if (p1 === p2) {
        return '';
      }
    });
    return filterEmptyTags(description);
  } else {
    return description;
  }
};
export {
  fillTargetForm,
}
;
