import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from './const';
import { getBDType, getTMDBIdByIMDBId, getIMDBIdByUrl } from './common';
const getDescription = (info) => {
  const thanksQuote = `[quote][size=4]source from [b][color=#1A73E8]${info.sourceSite}[/color][/b]. Many thanks to the original uploader![/size][/quote]\n\n`;
  const siteInfo = CURRENT_SITE_INFO;
  const doubanInfo = (info.doubanInfo && CURRENT_SITE_NAME !== 'SSD') ? `${info.doubanInfo}\n` : '';
  const logs = info.logs ? `eac3to logs:\n[hide]${info.logs}[/hide]\n\n` : '';
  const isHDBBDInfo = CURRENT_SITE_NAME === 'HDB' && info.videoType.match(/bluray/);
  const bdinfo = info.bdinfo ? `BDInfo:\n[quote]${info.bdinfo}[/quote]\n\n` : '';
  const mediaInfo = siteInfo.mediaInfo && !isHDBBDInfo ? '' : `[quote]${info.mediaInfo}[/quote]\n`;
  const screenshots = info.screenshots.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
  const screenshotsPart = CURRENT_SITE_NAME === 'SSD' ? '' : `Screenshots:\n${screenshots.join('')}`;
  return `${thanksQuote}${doubanInfo}${mediaInfo}${info.description}${logs}${bdinfo}${screenshotsPart}`;
};
const fillTargetForm = (info) => {
  console.log(info);
  const imdbId = getIMDBIdByUrl(info.imdbUrl);
  $(CURRENT_SITE_INFO.imdb.selector).val(info.imdbUrl);
  if (CURRENT_SITE_NAME === 'HDB') {
    let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p2) => {
      return `${info.movieName || info.movieAkaName} ${p2}`;
    });
    if (info.videoType === 'remux') {
      mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, '');
    }
    info.title = mediaTitle;
  }
  if (CURRENT_SITE_NAME === 'SSD') {
    info.title = info.title.replace(/\s/ig, '.');
    $(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
    $(CURRENT_SITE_INFO.screenshots.selector).val(info.screenshots.join('\n'));
  }
  if (CURRENT_SITE_INFO.name) {
    $(CURRENT_SITE_INFO.name.selector).val(info.title);
  }
  // 避免选择种子文件后自动改变种子名称
  disableTorrentChange();
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
  let description = getDescription(info);
  // HDB只填入mediainfo bdinfo放在简介里
  if (CURRENT_SITE_INFO.mediaInfo && !(info.videoType.match(/bluray/ig) && CURRENT_SITE_NAME === 'HDB')) {
    $(CURRENT_SITE_INFO.mediaInfo.selector).val(mediaInfo);
  }
  if (info.description && (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/) && !CURRENT_SITE_NAME.match(/SSD/))) {
    description = info.description;
  }
  $(CURRENT_SITE_INFO.description.selector).val(description);
  if (CURRENT_SITE_NAME === 'BHD') {
    $(CURRENT_SITE_INFO.imdb.selector).val(imdbId);
    getTMDBIdByIMDBId(imdbId).then(id => {
      $(CURRENT_SITE_INFO.tmdb.selector).val(id);
    });
    const { category, videoType } = info;
    info.category = videoType;
    info.videoType = category;
    // BHD需要细分蓝光类型
    if (videoType.match(/bluray/)) {
      let bdType = getBDType(info.size);
      if (videoType === 'uhdbluray' && bdType === 'BD50') {
        bdType = 'uhd50';
      }
      info.category = bdType;
    }
  }
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
  if (CURRENT_SITE_NAME.match(/HDHome/i)) {
    $(CURRENT_SITE_INFO.category.selector).change();
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
  const value = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : undefined;
  if (Array.isArray(value) && selectArray) {
    // 如果此时分类对应的值仍未数组 则继续过滤
    if (selectArray.length > 1) {
      selectArray = selectArray.filter(item => value.includes(item));
    }
    // 如果当前key下有selector属性 赋值为value第一项
    if (siteInfo[key].selector) {
      $(siteInfo[key].selector).val(value[0]);
    }
  } else if (siteInfo[key] && siteInfo[key].selector) {
    $(siteInfo[key].selector).val(value);
  }
  return selectArray;
};

const disableTorrentChange = () => {
  if (CURRENT_SITE_NAME.match(/SSD|HDHome|CHDBits|PTer/)) {
    $(CURRENT_SITE_INFO.name.selector).attr('id', '');
  }
};
export {
  fillTargetForm,
}
;
