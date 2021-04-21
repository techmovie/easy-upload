import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, HDB_TEAM } from './const';
import { getBDType, getTMDBIdByIMDBId, getIMDBIdByUrl, getIMDBData, getTMDBVideos, getRtIdFromTitle } from './common';

const fillTargetForm = (info) => {
  console.log(info);
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
    } else if (CURRENT_SITE_NAME === 'SSD') {
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
    description = info.description;
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
    if (mediaInfo && !description.includes(mediaInfo)) {
      description += `\n[quote]${mediaInfo}[/quote]`;
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
  // 过滤空标签
  description = filterEmptyTags(description);

  $(CURRENT_SITE_INFO.description.selector).val(getThanksQuote(info) + description.trim());
  // 站点特殊处理
  if (CURRENT_SITE_NAME.match(/BeyondHD|Blutopia|HDPOST|ACM/)) {
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

  if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice|1PTBA/i)) {
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
    if (info.tags.DIY) {
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
    const { description, doubanInfo } = info;
    const fullDescription = description + doubanInfo;
    const imdbRank = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)?.[1] ?? '';
    $('#upload-imdb').val(imdbRank);
    const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
    const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
    const summary = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)?.[2]?.split('/')?.[0] ?? '';
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
    }
    $('#title_chs').val(chineseName);
    $('#upload_introduction').val(summary);
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
  if (CURRENT_SITE_NAME === 'Pter') {
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
    // eslint-disable-next-line camelcase
    const { year, pager, translator, author, publisher, ISBN, book_intro } = info.doubanBookInfo;
    console.log(info.doubanBookInfo);
    $('#AuthorsField').val(author.join(','));
    $('#PublishersField').val(publisher);
    $('#IsbnField').val(ISBN);
    $('#YearField').val(year);
    $('#PagesField').val(pager);
    $('#LanguageField').val('17');
    $('#inputFileID').replaceWith('<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>');
    $('#TranslatorsField').val(translator.join(','));
    $('#DescriptionField').val(book_intro);
    const event = new Event('change');
    document.getElementById('DescriptionField').dispatchEvent(event);
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
      if (tags.chineseAudio || tags.cantoneseAudio || tags.chineseSubtitle) {
        videoTypeValue = videoType === 'bluray' ? '14' : '15';
      }
    } else if (videoType === 'remux' && resolution === '2160p') {
      videoTypeValue = '5';
    }
    $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
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
// 获取制作组名称
const getTeamName = (info) => {
  const teamMatch = info.title.match(/-([^-]+)$/);
  let teamName = teamMatch?.[1]?.replace(/-/g, '')?.split('@') ?? '';
  if (teamName) {
    teamName = teamName.length > 1 ? teamName[1] : teamName[0];
  } else {
    teamName = 'other';
  }
  return teamName;
};
const disableTorrentChange = () => {
  const nameSelector = CURRENT_SITE_INFO.name?.selector ?? '';
  if (nameSelector.match(/^#\w+/)) {
    const nameDom = $(nameSelector).clone().attr('name', '').hide();
    $(nameSelector).attr('id', '').after(nameDom);
  }
};

const getScreenshotsBBCode = (imgArray) => {
  return imgArray.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
};

const filterNexusDescription = (info) => {
  const { description, screenshots = [] } = info;
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
  const screenshotsBBCode = screenshots.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
  return filterDescription + '\n' + screenshotsBBCode.join('');
};
const getThanksQuote = (info) => {
  const isChineseSite = isChineseTacker(CURRENT_SITE_INFO.siteType) || CURRENT_SITE_NAME === 'HDPOST';
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
// 北洋特殊处理
const handleTJUPT = (info) => {
  const domTimeout = setTimeout(() => {
    if ($('#ename')) {
      const { title, description, doubanInfo, category, resolution } = info;
      $('#ename').val(title);
      const fullDescription = description + doubanInfo;
      let area = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
      area = area.replace(/\[\/?.+?\]/g, '');
      const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
      const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
      const castArray = fullDescription.match(/(主\s+演)\s+([^◎]+)/)?.[2]?.split('\n')?.filter(item => !!item) ?? [];
      const language = fullDescription.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
      const castStr = castArray.map(item => {
        return item.trim().split(/\s+/)?.[0];
      }).join('/');
      if (area) {
        if (category === 'movie') {
          $('#district').val(area.replace(/,/g, '/').replace(/中国/, ''));
        } else if (category.match(/tv/)) {
          let selector = '';
          if (area.match(/大陆/)) {
            selector = '#specificcat1';
          } else if (area.match(/台|港/)) {
            selector = '#specificcat2';
          } else if (area.match(/美国/)) {
            selector = '#specificcat3';
          } else if (area.match(/英国/)) {
            selector = '#specificcat7';
          } else if (area.match(/日本/)) {
            selector = '#specificcat4';
          } else if (area.match(/韩国/)) {
            selector = '#specificcat5';
          } else {
            selector = '#specificcat6';
          }
          $(selector).attr('checked', true);
          // eslint-disable-next-line no-undef
          getcheckboxvalue('specificcat');
        } else if (category.match(/variety/)) {
          const districtMap = {
            CN: '#district1',
            HK: '#district2',
            TW: '#district2',
            JP: '#district4',
            KR: '#district4',
            US: '#district3',
            EU: '#district3',
            OT: '#district5',
          };
          $(districtMap[info.area]).attr('checked', true);
          // eslint-disable-next-line no-undef
          getcheckboxvalue('district');
        }
      }
      if ($('#format')) {
        if (category.match(/variety/)) {
          if (resolution.match(/720/)) {
            $('#format3').attr('checked', true);
          } else if (resolution.match(/1080/)) {
            $('#format5').attr('checked', true);
          }
          // eslint-disable-next-line no-undef
          getcheckboxvalue('format');
        } else if (category.match(/documentary/)) {
          // 这里的单选很不合理 同时是BDRip和1080p的该如何选？
          if (resolution.match(/720/)) {
            $('#format2').attr('checked', true);
          } else if (resolution.match(/1080/)) {
            $('#format1').attr('checked', true);
          }
          // eslint-disable-next-line no-undef
          getradiovalue('format');
        }
      }
      if ($('#language')) {
        let selector = '';
        if (language) {
          if (language.match(/汉语/)) {
            selector = '#language1';
          } else if (language.match(/粤/)) {
            selector = '#language2';
          } else if (language.match(/英语/)) {
            selector = '#language3';
          } else if (language.match(/日语/)) {
            selector = '#language4';
          } else if (language.match(/韩语/)) {
            selector = '#language5';
          }
          $(selector).attr('checked', true);
          // eslint-disable-next-line no-undef
          getcheckboxvalue('language');
        }
      }
      if (category.match(/variety/)) {
        $('#tvshowsguest').val(castStr);
      }
      let chineseName = originalName;
      if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
        chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
      }
      $('#cname').val(chineseName);
      clearTimeout(domTimeout);
    }
  }, 2000);
};
const handleIts = async (info) => {
  $('textarea[name="descr"]').val('数据加载中...');
  let template = `[center]

  [img]$poster$[/img]
  
  [color=darkorange][url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][/color]  [size=3]$imdbScore$[/size] [img]https://ptpimg.me/6ze1yb.gif[/img]  [size=3][color=darkorange][url=$rtUrl$][img]https://ptpimg.me/8r4772.png[/img][/url][/color] $rtScore$[/size] [img]https://ptpimg.me/6ze1yb.gif[/img] [color=darkorange][url=$tmdbUrl$][img]https://i.ibb.co/VWMtVnN/0fa9aceda3e5.png[/img][/url][/color] [size=3]$tmdbScore$[/size]
  
  
  [color=DarkOrange][size=2]◢ SYNOPSIS ◣[/size][/color]
  
  $synopsis$
  
  
  [color=DarkOrange][size=2]◢ TRAILER ◣[/size][/color]
  
  [youtube]$youtubeUrl$[/youtube]
  

  [color=DarkOrange][size=2]◢ SCREENSHOTS ◣[/size][/color]
  
  $SCREENSHOTS$
  
  [/center]`;
  const collectionMap = {};
  $('select[name="collection_id1"] option').each(function () {
    const option = $(this);
    collectionMap[option.text()] = option.val();
  });
  const collectionValueArr = [];
  const teamName = getTeamName(info);
  if (collectionMap[teamName]) {
    collectionValueArr.push(collectionMap[teamName]);
  }
  const { imdbUrl, category, screenshots, comparisonImgs = [], resolution, movieName } = info;
  if (!resolution.match(/2160|1080|720/) && category === 'movie') {
    $('select[name="type"]').val('67');
  }
  const screenshotsBBCode = getScreenshotsBBCode(screenshots);
  template = template.replace('$SCREENSHOTS$', screenshotsBBCode.join(''));
  if (comparisonImgs.length > 0) {
    const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
    template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]◢ COMPARISONS ◣[/size][/color]\n\n
    ${comparisonImgsBBCode.join('')}\n\n$1`);
  }
  if (category.match(/tv|movie/)) {
    try {
      const replaceParams = {
        tmdbUrl: '',
        tmdbScore: 0,
        imdbScore: 0,
        imdbUrl,
        poster: '',
        synopsis: '',
        rtUrl: '',
        rtScore: 0,
        youtubeUrl: '',
      };
      const { poster, imdb_rating_average: imdbRate, description, year, aka, directors = [], details = {} } = await getIMDBData(imdbUrl);
      let language = details.Language || '';
      language = language?.split('|')?.[0]?.trim() ?? '';
      const director = directors.map(item => item.name)[0];
      if (collectionMap[director]) {
        collectionValueArr.push(collectionMap[director]);
      }
      if (collectionMap[language]) {
        collectionValueArr.push(collectionMap[language]);
      }
      collectionValueArr.forEach((value, index) => {
        $(`select[name="collection_id${index + 1}"]`).val(value);
      });
      replaceParams.poster = poster;
      replaceParams.synopsis = description;
      replaceParams.imdbScore = imdbRate;
      const imdbId = getIMDBIdByUrl(imdbUrl);
      const { id: tmdbId, vote_average: tmdbRate } = await getTMDBIdByIMDBId(imdbId, {
        append_to_response: 'videos',
      });
      replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
      replaceParams.tmdbScore = tmdbRate;
      const videos = await getTMDBVideos(tmdbId);
      const youtubeId = videos.filter(video => video.site === 'YouTube')?.[0]?.key ?? '';
      if (youtubeId.length > 0) {
        replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
      }
      const searchMovieName = movieName || aka.filter(item => item.country.match(/(World-wide)|UK|USA/))?.[0].title;
      const rtInfo = await getRtIdFromTitle(searchMovieName, !!category.match(/tv/), year);
      const { score = 0, id = '' } = rtInfo;
      replaceParams.rtScore = `${score}%`;
      replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
      Object.keys(replaceParams).forEach(key => {
        template = template.replace(`$${key}$`, replaceParams[key]);
      });
      $('textarea[name="descr"]').val(template);
    } catch (error) {
      $('textarea[name="descr"]').val(error.message);
    }
  }
};
export {
  fillTargetForm,
}
;
