import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from './const';
const getDescription = (info) => {
  const thanksQuote = `[quote][size=4]source from [b][color=#1A73E8]${info.sourceSite}[/color][/b]. Many thanks to the original uploader![/size][/quote]`;
  const siteInfo = CURRENT_SITE_INFO;
  const doubanInfo = (info.doubanInfo && CURRENT_SITE_NAME !== 'SSD') ? `${info.doubanInfo}\n` : '';
  const logs = info.logs ? `eac3to logs:\n[hide]${info.logs}[/hide]\n\n` : '';
  const bdinfo = info.bdinfo ? `BDInfo:\n${info.bdinfo}\n\n` : '';
  const mediaInfo = siteInfo.mediaInfo ? '' : `[quote]${info.mediaInfo}[/quote]\n`;
  const screenshots = info.screenshots.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
  const screenshotsPart = CURRENT_SITE_NAME === 'SSD' ? '' : `\n\nScreens:\n${screenshots.join('')}`;
  return `${thanksQuote}\n\n${doubanInfo}${mediaInfo}${info.description}\n\n${logs}${bdinfo}${screenshotsPart}`;
};
const fillTargetForm = (info) => {
  console.log(info);
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
  $(CURRENT_SITE_INFO.name.selector).val(info.title);
  // 避免选择种子文件后自动改变种子名称
  if (CURRENT_SITE_NAME.match(/SSD|HDHome/i)) {
    $(CURRENT_SITE_INFO.name.selector).attr('id', '');
  }
  if (CURRENT_SITE_INFO.subtitle) {
    $(CURRENT_SITE_INFO.subtitle.selector).val(info.subtitle);
  }
  const mediaInfo = info.videoType.match(/bluray|uhdbluray/ig) ? '' : info.mediaInfo;
  const description = getDescription(info);
  if (CURRENT_SITE_INFO.mediaInfo) {
    $(CURRENT_SITE_INFO.mediaInfo.selector).val(mediaInfo);
  }
  $(CURRENT_SITE_INFO.description.selector).val(description);
  if (CURRENT_SITE_INFO.area && CURRENT_SITE_INFO.area.selector) {
    $(CURRENT_SITE_INFO.area.selector).val(CURRENT_SITE_INFO.area.map[info.area]);
  }
  const category = CURRENT_SITE_INFO.category.map[info.category];
  const keyArray = ['videoCodes', 'videoType', 'resolution', 'source'];
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
  if (CURRENT_SITE_INFO.douban) {
    $(CURRENT_SITE_INFO.douban.selector).val(info.doubanUrl);
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
  const value = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : undefined;
  if (Array.isArray(value) && selectArray) {
    if (selectArray.length > 1) {
      selectArray = selectArray.filter(item => value.includes(item));
    }
    if (siteInfo[key].selector) {
      $(siteInfo[key].selector).val(value[0]);
    }
  } else if (siteInfo[key] && siteInfo[key].selector) {
    $(siteInfo[key].selector).val(value);
  }
  return selectArray;
};
export {
  fillTargetForm,
}
;
