import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, HDB_TEAM } from '../const';
import {
  getBDType, getTMDBIdByIMDBId, getIMDBIdByUrl, getBDInfoOrMediaInfo,
} from '../common';
import {
  getTeamName, matchSelectForm, filterNexusDescription, isChineseTacker, buildPTPDescription,
} from './common';

import handleIts from './its';
import handleTJUPT from './tjupt';
import handleHDRoute from './hdr';
import handleBib from './bib';
import handleBb from './bB';
import handlePTP from './ptp';
import handlePTN from './ptn';
import handleGPW from './gpw';
import handleNPU from './npubits';
import handleBYR from './byr';
import handleSC from './sc';
import handleKG from './kg';
import handleBHD from './bhd';
import handleBdc from './bdc';
import handleZQ from './zhuque';
import autoFill from './autofill';

type SelectKey = 'videoCodec' | 'videoType' | 'resolution' | 'source' | 'area'
const fillTargetForm = (info: TorrentInfo.Info) => {
  autoFill(info || {});
  if (!info) {
    return;
  }
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
  if (CURRENT_SITE_NAME === 'NPUBits') {
    handleNPU(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'BYR') {
    handleBYR(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'SC') {
    handleSC(info);
    return false;
  }
  if (CURRENT_SITE_NAME === 'KG') {
    handleKG(info);
    return;
  }
  if (CURRENT_SITE_NAME === 'BeyondHD') {
    handleBHD(info);
    return;
  }
  if (CURRENT_SITE_NAME === 'Bdc') {
    handleBdc(info);
    return;
  }
  if (CURRENT_SITE_NAME === 'ZHUQUE') {
    handleZQ(info);
    return;
  }

  if (CURRENT_SITE_NAME === 'PTSBAO' && localStorage.getItem('autosave')) {
    localStorage.removeItem('autosave');
  }
  info.title = info.title.replace('H 265', 'H.265').replace('H 264', 'H.264'); // 常见问题的修正
  if (CURRENT_SITE_NAME === 'PTer' || CURRENT_SITE_NAME.match(/^(Blutopia|Aither)/)) {
    info.title = info.title.replace(' DoVi ', ' DV ').replace(' DDP ', ' DD+ ');
    if (info.source.match(/web/gi)) info.title = info.title.replace(' HEVC', ' H.265');
  }
  const currentSiteInfo = CURRENT_SITE_INFO as Site.SiteInfo;
  const imdbId = getIMDBIdByUrl(info.imdbUrl || '');
  const isBluray = info.videoType.match(/bluray/i);
  const { screenshots = [] } = info;
  const imdbSelector = currentSiteInfo?.imdb?.selector;
  if (CURRENT_SITE_NAME.match(/HDRoute|HDSpace/)) {
    $(imdbSelector).val(imdbId?.replace('tt', '') ?? '');
  } else if (imdbSelector) {
    $(imdbSelector).val(info.imdbUrl || '');
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
  if (currentSiteInfo.name) {
    const { title } = info;
    let torrentTitle = title;
    if (CURRENT_SITE_NAME.match(/SSD|iTS|HDChina/)) {
      torrentTitle = title.replace(/\s/ig, '.');
    } else if (CURRENT_SITE_NAME.match(/PuTao/)) {
      torrentTitle = `[${getChineseName(info)}]${title}`;
    }
    $(currentSiteInfo.name.selector).val(torrentTitle);
  }
  // 避免选择种子文件后自动改变种子名称
  disableTorrentChange();

  // 填写四个常见的信息
  const commonInfoKeys = ['subtitle', 'douban', 'area', 'audioCodec'] as const;
  commonInfoKeys.forEach(key => {
    const siteInfo = currentSiteInfo[key];
    if (siteInfo && siteInfo.selector) {
      let value = info[key as 'subtitle' | 'area' | 'audioCodec'];
      if (key === 'douban') {
        value = info.doubanUrl;
      } else if (key === 'area' || key === 'audioCodec') {
        value = (siteInfo as Site.SelectorMap).map[value as string];
      }
      $(siteInfo.selector).val(value as string);
    }
  });
  const mediaInfo = info.mediaInfo;
  let description = '';
  // 内站直接填写完整简介
  if (info.description) {
    // 去简介前的空格和换行
    description = info.description.replace(/^(\s+)/g, '');
    if (isChineseTacker(currentSiteInfo.siteType) && CURRENT_SITE_NAME !== 'SSD') {
      // 需要拼接豆瓣信息的内站
      const { doubanInfo } = info;
      if (doubanInfo) {
        description = `${doubanInfo}\n${description}`;
      }
    } else {
      // 需要过滤掉中文信息
      const { sourceSiteType } = info;
      if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== 'Bib') {
        description = filterNexusDescription(info);
      }
    }
  }
  if (CURRENT_SITE_NAME === 'Concertos') {
    $('#add').click();
    $('.sceditor-button.sceditor-button-source.has-icon')[0].click();
    description = description.replace(mediaInfo.trim(), '');
  }
  if (currentSiteInfo.mediaInfo) {
    if (CURRENT_SITE_NAME.match(/^(Blutopia|Aither)/)) {
      const selector = isBluray ? 'textarea[name="bdinfo"]' : currentSiteInfo.mediaInfo.selector;
      $(selector).val(mediaInfo);
      description = description.replace(mediaInfo.trim(), '');
    } else if (isBluray && CURRENT_SITE_NAME.match(/^(SpeedApp)/)) {
      $(currentSiteInfo.bdinfo.selector).val(mediaInfo);
      info.mediaInfo = '';
    } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) { // HDB只填入mediainfo bdinfo放在简介里
      $(currentSiteInfo.mediaInfo.selector).val(mediaInfo);
      description = description.replace(mediaInfo.trim(), '');
    }
  }
  // 删除简介中的截图
  if (currentSiteInfo.screenshots) {
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
    $(currentSiteInfo.imdb.selector).val((info.doubanUrl || info.imdbUrl) as string);
    $(currentSiteInfo.screenshots.selector).val(screenshots.join('\n'));
    if (info.category === 'tvPack' || info.title.match(/Trilogy|Collection/i) || (info.subtitle && info.subtitle.match(/合集/))) {
      $('input[name="pack"]').attr('checked', 'true');
    }
  }
  // 海带
  if (CURRENT_SITE_NAME === 'HDAI') {
    $(currentSiteInfo.imdb.selector).val((info.doubanUrl || info.imdbUrl) as string);
    $(currentSiteInfo.screenshots.selector).val(screenshots.join('\n'));
    if (isBluray) {
      $('input[type="checkbox"][name="tag[o]"]').attr('checked', 'true');
    }
  }
  if (CURRENT_SITE_NAME === 'PTSBAO') {
    $('#torrent').on('change', () => {
      $('a[data-sceditor-command="source"]')[0].click();
      $(currentSiteInfo.description.selector).val(description);
    });
  }
  // 海报填写
  if (currentSiteInfo.poster) {
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
      $(currentSiteInfo.poster).val(poster);
      if (CURRENT_SITE_NAME === 'HDRoute') {
        $('input[name="poster"]').val(poster);
        description = description.replace(poster, '');
      }
    }
  }

  // Blutopia可以通过设置为显示缩略图
  if (CURRENT_SITE_NAME.match(/Blutopia|Aither/)) {
    if (info.sourceSite === 'PTP') {
      description = buildPTPDescription(info);
    }
    if (info.screenshots.length > 0) {
      info.screenshots.forEach(img => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](\n*)?`);
        if (description.match(regStr)) {
          description = description.replace(regStr, (p1, p2) => {
            return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
          });
        }
      });
    }
    // 对于一些即便是缩略图也比较大的图床,可以通过‘||’增加匹配
    if (description.match(/mobile\.webp\[\/img/gi)) {
      description = description.replace(/\[img\]/g, '[img=350x350]');
    }
  }

  if (CURRENT_SITE_NAME === 'HaresClub') {
    $('.modesw').trigger('click');
    $(currentSiteInfo.screenshots.selector).val(screenshots.join('\n'));
    if (layui) {
      setTimeout(() => {
        layui.form.render('select');
        layui.form.render('checkbox');
      }, 1000);
    }
  }
  // 过滤空标签
  description = filterEmptyTags(description);

  if (CURRENT_SITE_NAME === 'PTer') {
    const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
    description = description.replace(`[quote]${mediaInfo}[/quote]`, `[hide=mediainfo]${mediaInfo}[/hide]`);
    description = description.replace(`[quote]${bdinfo}[/quote]`, `[hide=BDInfo]${bdinfo}[/hide]`);
    if (info.comparisons?.length) {
      for (const comparison of info.comparisons) {
        const { title, imgs } = comparison;
        const titleCount = title?.split(',').length ?? '';
        imgs.forEach(img => {
          description = description.replace(`[img]${img}[/img]`, `[img${titleCount}]${img}[/img]`);
        });
      }
    }
  }
  if (CURRENT_SITE_NAME === 'KEEPFRDS') {
    description = description.replaceAll(/\[\/?(center|code)\]/g, '');
    if (info.sourceSite === 'PTP') {
      description = info?.originalDescription?.replace(/^(\s+)/g, '') ?? '';
      description = filterEmptyTags(description);
      description = description.replace(/http:\/\/ptpimg/g, 'https://ptpimg');
      screenshots.forEach(screenshot => {
        const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
        if (!description.match(regStr)) {
          // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
          const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
          if (description.match(regOldFormat)) {
            description = description.replace(regOldFormat, `[img]${screenshot}[/img]`);
          } else {
            description = description.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, 'gi'), `[img]${screenshot}[/img]`);
          }
        }
      });
    }
    info.mediaInfos?.forEach(mediaInfo => { description = description.replace(`[quote]${mediaInfo}[/quote]`, `${mediaInfo}`).replace(`${mediaInfo}`, `[mediainfo]${mediaInfo}[/mediainfo]`); });
  }
  if (CURRENT_SITE_NAME === 'SpeedApp') {
    description = description.replace(/\[url.*\[\/url\]/g, '').replace(/\[img.*\[\/img\]/g, '').replace(/\[\/?(i|b|center|quote|size|color)\]/g, '').replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, '').replace(/\n\n*/g, '\n');
  }
  if (CURRENT_SITE_NAME === 'PTN') {
    description = `${info.imdbUrl}\n\n${description}`;
  }
  if (CURRENT_SITE_NAME === 'HDT') {
    description = description.replace(/(\[\/img\])(\[img\])/g, '$1 $2').replace(/(\[\/url\])(\[url)/g, '$1 $2');
  }
  const thanksQuoteClosed = GM_getValue('easy-seed.thanks-quote-closed') || '';
  if (!thanksQuoteClosed && info.sourceSite !== undefined) {
    description = getThanksQuote(info) + description.trim();
  }
  $(currentSiteInfo.description.selector).val(description);
  // 站点特殊处理
  if (CURRENT_SITE_NAME.match(/Blutopia|HDPOST|ACM|Aither|Concertos/)) {
    const fillIMDBId = currentSiteInfo.siteType === 'UNIT3D' ? imdbId.replace('tt', '') : imdbId;
    $(currentSiteInfo.imdb.selector).val(fillIMDBId);
    getTMDBIdByIMDBId(imdbId).then(data => {
      $(currentSiteInfo.tmdb.selector).val(data.id);
    });
    if (CURRENT_SITE_NAME.match(/Blutopia|Aither/)) {
      $('#torrent').on('change', () => {
        $(currentSiteInfo.imdb.selector).val(fillIMDBId);
        getTMDBIdByIMDBId(imdbId).then(data => {
          $(currentSiteInfo.tmdb.selector).val(data.id);
          $('#automal').val(0);
        });
      });
    }
    if (CURRENT_SITE_NAME.match(/ACM|Concertos/i)) {
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
        info.category = bdType || '';
      }
    }
  }
  if (currentSiteInfo.category) {
    const category = currentSiteInfo.category.map[info.category];
    const keyArray = ['videoCodec', 'videoType', 'resolution', 'source', 'area'];
    let finalSelectArray: string[] = [];
    if (Array.isArray(category)) {
      finalSelectArray = [...category];
      keyArray.forEach(key => {
        finalSelectArray = matchSelectForm(currentSiteInfo, info, key as SelectKey, finalSelectArray);
        if (finalSelectArray.length === 1) {
          $(currentSiteInfo.category.selector).val(finalSelectArray[0]);
        }
      });
    } else {
      [...keyArray, 'category'].forEach(key => {
        matchSelectForm(currentSiteInfo, info, key as SelectKey, finalSelectArray);
      });
    }
  }
  if (currentSiteInfo.format) {
    const formatData = currentSiteInfo.format;
    $(formatData.selector).val(formatData.map[info.format as string]);
  }
  if (currentSiteInfo.image) {
    $(currentSiteInfo.image.selector).val(info.image || '');
  }

  if (CURRENT_SITE_NAME.match(/HDHome|HDZone|PTHome|SoulVoice|1PTBA|HDAtmos|3Wmg/i)) {
    setTimeout(() => {
      const event = new Event('change');
      document.querySelector(currentSiteInfo.category.selector)?.dispatchEvent(event);
    }, 1000);
  }
  // 匿名勾选
  if (currentSiteInfo.anonymous) {
    const { selector, value = '' } = currentSiteInfo.anonymous;
    if (value) {
      $(selector).val(value);
    } else {
      $(selector).attr('checked', 'true');
    }
  }
  // 标签勾选
  if (currentSiteInfo.tags) {
    Object.keys(info.tags).forEach(key => {
      if (info.tags[key] && currentSiteInfo.tags[key]) {
        $(currentSiteInfo.tags[key]).attr('checked', 'true');
      }
    });
  }
  // 填入制作组
  fillTeamName(info);
  // 对配置覆盖不到的地方进行专门处理
  if (CURRENT_SITE_NAME.match(/PTHome|LemonHD|1PTBA|52pt|Audiences/i)) {
    if (info.tags.diy) {
      let categoryValue = '';
      if (CURRENT_SITE_NAME.match(/Audiences|PTHome/)) {
        categoryValue = info.videoType === 'bluray' ? '14' : '13';
      } else if (CURRENT_SITE_NAME === 'LemonHD') {
        $('select[name="tag_diy"]').val('yes');
        return;
      } else if (CURRENT_SITE_NAME === '1PTBA') {
        categoryValue = info.videoType === 'bluray' ? '1' : '4';
      } else if (CURRENT_SITE_NAME === '52pt') {
        categoryValue = info.videoType === 'bluray' ? '2' : '12';
      }
      $(currentSiteInfo.videoType.selector).val(categoryValue);
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
      $(currentSiteInfo.videoType.selector).val(videoTypeValue);
    }
  }
  // 单独处理北洋
  if (CURRENT_SITE_NAME === 'TJUPT') {
    $('#browsecat').trigger('change');
    handleTJUPT(info);
  }
  // 单独处理南洋
  if (CURRENT_SITE_NAME === 'NYPT') {
    $('#browsecat').trigger('change');
    const domTimeout = setTimeout(() => {
      const catMap = {
        movie: '#movie_enname',
        tv: '#series_enname',
        tvPack: '#series_enname',
        documentary: '#doc_enname',
        variety: '#show_enname',
        cartoon: '#anime_enname',
      };
      const selector = catMap[info.category as keyof typeof catMap];
      if (selector) {
        $(selector).val(info.title);
      }
      clearTimeout(domTimeout);
    }, 2000);
  }
  // 单独处理UNIT3D剧集
  if (currentSiteInfo.siteType === 'UNIT3D' && info.category.match(/tv/)) {
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
      $(currentSiteInfo.imdb.selector).val(`https://www.imdb.com/title/${imdbId}/`);
    }
  }
  if (CURRENT_SITE_NAME === 'SpeedApp') {
    // IMDB地址需要完整url
    if (imdbId) {
      $(currentSiteInfo.imdb.selector).val(`https://www.imdb.com/title/${imdbId}/`);
    }
  }
  // 处理Pter
  if (CURRENT_SITE_NAME === 'PTer') {
    const language = info.description.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
    if (!language.match(/英语/) && info.area === 'EU') {
      $(currentSiteInfo.area.selector).val('8');
    }
  }
  // 处理HDH iPad
  if (CURRENT_SITE_NAME.match(/HDHome|HDZone/)) {
    if (info.title.match(/iPad/i)) {
      const categoryMap = {
        movie: '412',
        tv: '426',
        tvPack: '433',
        documentary: '418',
      };
      const ipadCat = categoryMap[info.category as keyof typeof categoryMap];
      if (ipadCat) {
        $('#browsecat').val(ipadCat);
      }
    }
  }
  if (CURRENT_SITE_NAME === 'Bib' && info.doubanBookInfo) {
    handleBib(info);
  }

  if (CURRENT_SITE_NAME === 'iTS') {
    handleIts(info);
  }
  if (CURRENT_SITE_NAME === 'UHDBits') {
    $(currentSiteInfo.imdb.selector).val(imdbId);
    const teamName = getTeamName(info);
    $('#team').val(teamName === 'other' ? 'Unknown' : teamName);
    if (info.title.match(/web-?rip/i)) {
      $(currentSiteInfo.videoType.selector).val('WEBRip');
    }
    $('#imdb_button').trigger('click');
  }
  if (CURRENT_SITE_NAME === '52pt') {
    const { tags, videoType, resolution } = info;
    let videoTypeValue = videoType;
    if (videoType.match(/bluray/)) {
      if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
        videoTypeValue = videoType === 'bluray' ? '14' : '15';
      }
    } else if (videoType === 'remux' && resolution === '2160p') {
      videoTypeValue = '5';
    }
    $(currentSiteInfo.videoType.selector).val(videoTypeValue);
  }
  if (CURRENT_SITE_NAME === 'BTSCHOOL') {
    $(imdbSelector).val(imdbId);
    if (info.doubanUrl) {
      const doubanId = info.doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
      $(currentSiteInfo.douban.selector).val(doubanId);
    }
  }
  if (CURRENT_SITE_NAME === 'PTN') {
    handlePTN(info);
  }
  if (CURRENT_SITE_NAME === 'HDTime') {
    if (info.videoType.match(/bluray/i)) {
      $(currentSiteInfo.category.selector).val('424');
    }
  }
  if (CURRENT_SITE_NAME === 'HDFans') {
    const { videoType, resolution, tags } = info;
    if (videoType === 'remux') {
      $(currentSiteInfo.videoType.selector).val(resolution === '2160p' ? '10' : '8');
    } else if (videoType === 'encode') {
      const map = {
        '2160p': '9',
        '1080p': '5',
        '1080i': '5',
        '720p': '11',
      };
      $(currentSiteInfo.videoType.selector).val(map[resolution as keyof typeof map] || '16');
    }
    if (tags.diy) {
      $(currentSiteInfo.videoType.selector).val(resolution === '2160p' ? '2' : '4');
    }
  }
};

const fillTeamName = (info: TorrentInfo.Info) => {
  const teamConfig = (CURRENT_SITE_INFO as Site.SiteInfo).team;
  const teamName = getTeamName(info);
  interface Team {
    [key: string]: string
  }
  if (teamName && teamConfig) {
    const formateTeamName = teamConfig.map[teamName.toLowerCase() as keyof Team];
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
  const nameSelector = (CURRENT_SITE_INFO as Site.SiteInfo).name?.selector ?? '';
  if (nameSelector.match(/^#\w+/)) {
    const nameDom = $(nameSelector).clone().attr('name', '').hide();
    $(nameSelector).attr('id', '').after(nameDom);
  }
};

const getThanksQuote = (info: TorrentInfo.Info) => {
  const isChineseSite = isChineseTacker(CURRENT_SITE_INFO.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
  let thanksQuote = `转自[b]${info.sourceSite}[/b]，感谢原发布者！`;
  if (!isChineseSite) {
    thanksQuote = `Torrent from [b]${info.sourceSite}[/b].\nAll thanks to the original uploader！`;
  }
  return `[quote]${thanksQuote}[/quote]\n\n`;
};

// 过滤空标签
const filterEmptyTags = (description: string): string => {
  // eslint-disable-next-line prefer-regex-literals
  const reg = new RegExp('\\[([a-zA-Z]+\\d?)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]', 'g');
  if (description.match(reg)) {
    description = description.replace(reg, (_match, p1, p2) => {
      if (p1 === p2) {
        return '';
      }
      return _match;
    });
    return filterEmptyTags(description);
  }
  return description;
};
function getChineseName (info: TorrentInfo.Info) {
  const { description } = info;
  const originalName = description.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
  const translateName = description.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
  let chineseName = originalName;
  if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
    chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
  }
  if (chineseName === '' && info.subtitle !== '' && info.subtitle !== undefined) {
    chineseName = info.subtitle.replaceAll(/【|】.*/g, '').split('/')?.[0];
  }
  return chineseName.trim();
}
export {
  fillTargetForm,
};
