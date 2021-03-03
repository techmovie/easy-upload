import { CODES_ARRAY, EUROPE_LIST, TMDB_API_KEY, TMDB_API_URL } from './const';
const formatTorrentTitle = (title) => {
  // 保留5.1 H.264中间的点
  return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, ' ').replace(/\.(?!(\d+))/, ' ').trim();
};

const getUrlParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  const regArray = location.search.substr(1).match(reg);
  if (regArray) {
    return unescape(regArray[2]);
  }
  return '';
};
// 获取音频编码
const getAudioCodec = (title) => {
  if (!title) {
    return '';
  }
  let codes = '';
  const formatTitle = title.replace(/:|-|\s/g, '').toLowerCase();
  for (let i = 0; i < CODES_ARRAY.length; i++) {
    if (formatTitle.includes(CODES_ARRAY[i])) {
      codes = CODES_ARRAY[i];
      break;
    }
  }
  return codes;
};
/*
* 过滤真实原始截图地址
* 如果原图地址没有文件名后缀，截图地址则为缩略图地址
* */
const getScreenshotsFromBBCode = (bbcode) => {
  let allImages = bbcode.match(/(\[url=(http(s)*:\/{2}.+?(\.(png|jpg)))\])?\[img\](.*?\.(png|jpg|gif))\[\/img](\[url\])?/g);
  if (allImages && allImages.length > 0) {
    // 过滤imdb、豆瓣、chd、柠檬无关图片
    allImages = allImages.filter(item => {
      return !item.match(/douban|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
    });
    return allImages.map(item => {
      let imgUrl = '';
      if (item.match(/\[url=http(s)*:.+/)) {
        imgUrl = item.match(/=(([^\]])+)/)?.[1];
      } else {
        imgUrl = item.match(/img\](([^[])+)/)?.[1];
      }
      return imgUrl;
    });
  }
};
// 从标题获取source
const getSourceFromTitle = (title) => {
  if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
    return 'uhdbluray';
  } else if (title.match(/blu(-)?ray|remux/i)) {
    return 'bluray';
  } else if (title.match(/hdtv/i)) {
    return 'hdtv';
  } else if (title.match(/web(-(rip|dl))+/i)) {
    return 'web';
  } else if (title.match(/hddvd/i)) {
    return 'hddvd';
  } else if (title.match(/dvd/i)) {
    return 'dvd';
  } else if (title.match(/vhs/i)) {
    return 'vhs';
  }
  return 'other';
};
// 获取副标题
const getSubTitle = (data) => {
  const titles = data.trans_title.join('/');
  const { director = [] } = data;
  const directorArray = director.map(item => {
    return replaceEngName(item.name);
  });
  // 演员只选择前两位
  const mainCast = data.cast.slice(0, 2).map(cast => {
    return replaceEngName(cast.name);
  });
  const directorStr = directorArray.length > 0 ? `|导演: ${directorArray.join(' ')}` : '';
  const castStr = mainCast.length > 0 ? `|主演:${mainCast.join(' ')}` : '';
  return titles + directorStr + castStr;
};
/*
* 替换豆瓣演员中的英文名称
* @param {any}
* @return
* */
const replaceEngName = (string) => {
  return string.replace(/\s+[A-Za-z\s]+/, '');
};

const getAreaCode = (area) => {
  const europeList = EUROPE_LIST;
  if (area) {
    if (area.match(/USA|Canada|CA|美国|加拿大/i)) {
      return 'US';
    } else if (europeList.includes(area) || area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
      return 'EU';
    } else if (area.match(/Japan|日本|JP/i)) {
      return 'JP';
    } else if (area.match(/Korea|韩国|KR/i)) {
      return 'KR';
    } else if (area.match(/Taiwan|台湾|TW/i)) {
      return 'TW';
    } else if (area.match(/Hong\s?Kong|香港|HK/i)) {
      return 'HK';
    } else if (area.match(/CN|China|大陆|中|内地|Mainland/i)) {
      return 'CN';
    }
  }
  return 'OT';
};

/*
* 获取蓝光类型
* @param {size}文件大小单位Bytes
* @return
* */
const getBDType = (size) => {
  const GBSize = size / 1e9;
  if (GBSize < 25) {
    return 'BD25';
  } else if (GBSize < 50) {
    return 'BD50';
  } else if (GBSize < 66) {
    return 'BD66';
  } else if (GBSize < 100) {
    return 'BD100';
  }
};

const getTMDBIdByIMDBId = (imdbid) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`,
      onload (res) {
        const data = JSON.parse(res.responseText);
        if (res.status !== 200 || !data.movie_results || data.movie_results.length < 1) {
          reject(new Error('请求失败'));
        }
        resolve(data.movie_results[0].id);
      },
    });
  });
};
const getIMDBIdByUrl = (imdbLink) => {
  const imdbIdArray = /tt\d+/.exec(imdbLink);
  if (imdbIdArray && imdbIdArray[0]) {
    return imdbIdArray[0];
  }
  return '';
};

const getSize = (size) => {
  if (size.match(/T/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/G/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/M/i)) {
    return (parseFloat(size) * 1024 * 1024) || 0;
  } else if (size.match(/K/i)) {
    return (parseFloat(size) * 1024) || 0;
  }
  return '';
};

const getInfoFromMediaInfo = (mediaInfo) => {
  if (!mediaInfo) {
    return false;
  }
  const mediaArray = mediaInfo.split(/\n\s*\n/);
  const [generalPart, videoPart] = mediaArray;
  const secondVideoPart = mediaArray.filter(item => item.startsWith('Video #2'));
  const [audioPart, ...otherAudioPart] = mediaArray.filter(item => item.startsWith('Audio'));
  const textPart = mediaArray.filter(item => item.startsWith('Text'));
  const fileName = getMediaValueByKey('Complete name', generalPart).replace(/\.avi|\.mkv|\.mp4|\.ts/i, '');
  const fileSize = getSize(getMediaValueByKey('File size', generalPart));
  const { videoCodec, isHdr, isDV } = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
  const { audioCodec, channelName, languageArray } = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
  const subtitleLanguageArray = textPart.map(item => {
    return getMediaValueByKey('Language', item);
  });
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, isHdr, isDV);
  const resolution = getResolution(videoPart);
  return {
    fileName,
    fileSize,
    videoCodec,
    audioCodec,
    resolution,
    mediaTags,
  };
};
const getMediaValueByKey = (key, mediaInfo) => {
  const keyRegStr = key.replace(/\s/, '\\s*').replace(/(\(|\))/g, '\\$1');
  const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\n]+)`, 'i');
  return mediaInfo.match(reg) ? mediaInfo.match(reg)[1] : '';
};
const getResolution = (mediaInfo) => {
  const height = parseInt(getMediaValueByKey('Height', mediaInfo).replace(/\s/g, ''));
  const width = parseInt(getMediaValueByKey('Width', mediaInfo).replace(/\s/g, ''));
  const ScanType = getMediaValueByKey('Scan type', mediaInfo);
  if (height > 1080) {
    return '2160p';
  } else if (height > 720 && ScanType === 'Progressive') {
    return '1080p';
  } else if (height > 720 && ScanType !== 'Progressive') {
    return '1080i';
  } else if (height > 576 || width > 1024) {
    return '720p';
  } else if (height > 480 || width === 1024) {
    return '576p';
  } else if (width >= 840 || height === 480) {
    return '480p';
  } else {
    return `${width}x${height}`;
  }
};
const getMediaTags = (audioCodec, channelName, languageArray, subtitleLanguageArray, isHdr, isDV) => {
  const hasChineseAudio = languageArray.includes('Chinese');
  const hasChineseSubtitle = subtitleLanguageArray.includes('Chinese');
  const mediaTags = {};
  if (hasChineseAudio) {
    mediaTags.chineseAudio = true;
  }
  if (languageArray.includes('Cantonese')) {
    mediaTags.cantoneseAudio = true;
  }
  if (hasChineseSubtitle) {
    mediaTags.chineseSubtitle = true;
  }
  if (isHdr) {
    mediaTags.HDR = true;
  }
  if (isDV) {
    mediaTags.DolbyVision = true;
  }
  if (audioCodec.match(/dtsx|atmos/ig)) {
    mediaTags[audioCodec] = true;
  }
  return mediaTags;
};
const getVideoCodecByMediaInfo = (mainVideo, generalPart, secondVideo) => {
  const generalFormat = getMediaValueByKey('Format', generalPart);
  const videoFormat = getMediaValueByKey('Format', mainVideo);
  const videoFormatVersion = getMediaValueByKey('Format version', mainVideo);
  const videoCodeId = getMediaValueByKey('Codec ID', mainVideo);
  const hdrFormat = getMediaValueByKey('HDR format', mainVideo);
  const isDV = secondVideo.length > 0 && getMediaValueByKey('HDR format', secondVideo[0]).includes('Dolby Vision');
  const isEncoded = !!getMediaValueByKey('Encoding settings', mainVideo);
  let videoCodec = '';
  if (generalFormat === 'DVD Video') {
    videoCodec = 'DVD';
  } else if (generalFormat === 'MPEG-4') {
    videoCodec = 'mpeg4';
  } else if (videoFormat === 'MPEG Video' && videoFormatVersion === 'Version 2') {
    videoCodec = 'mpeg2';
  } else if (videoCodeId.match(/xvid/i)) {
    videoCodec = 'xvid';
  } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
    videoCodec = 'hevc';
  } else if (videoFormat.match(/HEVC/i) && isEncoded) {
    videoCodec = 'x265';
  } else if (videoFormat.match(/AVC/i) && isEncoded) {
    videoCodec = 'x264';
  } else if (videoFormat.match(/AVC/i) && !isEncoded) {
    videoCodec = 'h264';
  } else if (videoFormat.match(/VC-1/i)) {
    videoCodec = 'vc1';
  }
  return {
    videoCodec,
    isHdr: !!hdrFormat,
    isDV,
  };
};
const getAudioCodecByMediaInfo = (mainAudio, otherAudio = []) => {
  const audioFormat = getMediaValueByKey('Format', mainAudio);
  const audioChannels = getMediaValueByKey('Channel(s)', mainAudio);
  const commercialName = getMediaValueByKey('Commercial name', mainAudio);
  const languageArray = [mainAudio, ...otherAudio].map(item => {
    return getMediaValueByKey('Language', item);
  });
  let channelName = '';
  let audioCodec = '';
  const channelNumber = parseInt(audioChannels);
  if (channelNumber && channelNumber >= 6) {
    channelName = `${channelNumber - 1}.1`;
  } else {
    channelName = `${channelNumber}.0`;
  }
  if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'atmos';
  } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'truehd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital$/i)) {
    audioCodec = 'dd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
    audioCodec = 'dd+';
  } else if (audioFormat.match(/AC-3/i)) {
    audioCodec = 'ac3';
  } else if (audioFormat.match(/DTS XLL X/i)) {
    audioCodec = 'dtsx';
  } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
    audioCodec = 'dtshdma';
  } else if (audioFormat.match(/DTS/i)) {
    audioCodec = 'dts';
  } else if (audioFormat.match(/FLAC/i)) {
    audioCodec = 'flac';
  } else if (audioFormat.match(/AAC/i)) {
    audioCodec = 'aac';
  } else if (audioFormat.match(/LPCM/i)) {
    audioCodec = 'lpcm';
  }
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
const getInfoFromBDInfo = (bdInfo) => {
  const splitArray = bdInfo.split('Disc Title');
  // 如果有多个bdinfo只取第一个
  if (splitArray.length > 2) {
    bdInfo = splitArray[1];
  }
  const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)+((.|\n)+)AUDIO:/i);
  const audioMatch = bdInfo.match(/AUDIO:(\s|Codec|Bitrate|Description|Language|-)+((.|\n)+)SUBTITLE(S)*:/i);
  const subtitleMatch = bdInfo.match(/SUBTITLE(S)*:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)+)(FILES:)*/i);
  const fileSize = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)?.[1]?.replaceAll(',', '');
  const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i); // 是否为bdinfo的另一种格式quickSummary
  const videoPart = splitBDMediaInfo(videoMatch, 2);
  const [mainVideo = '', otherVideo = ''] = videoPart;
  const videoCodec = mainVideo.match(/2160/) ? 'hevc' : 'h264';
  const isHdr = !!mainVideo.match(/\/\s*HDR(\d)*\s*\//i);
  const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
  const audioPart = splitBDMediaInfo(audioMatch, 2);
  const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
  const resolution = mainVideo.match(/\d{3,4}(p|i)/)?.[0];
  const { audioCodec, channelName, languageArray } = getBDAudioInfo(audioPart, quickSummaryStyle);
  const subtitleLanguageArray = subtitlePart.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1];
    const normalMatch = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)?.[1];
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, isHdr, isDV);
  return {
    fileSize,
    videoCodec,
    audioCodec,
    resolution,
    mediaTags,
  };
};
const splitBDMediaInfo = (matchArray, matchIndex) => {
  return matchArray?.[matchIndex]?.split('\n').filter(item => !item.match(/^\s+$/));
};
const getBDAudioInfo = (audioPart, quickSummaryStyle) => {
  const sortArray = audioPart.sort((a, b) => {
    const firstBitrate = parseInt(a.match(/\/\s*(\d+)\s*kbps/i)?.[1]);
    const lastBitrate = parseInt(b.match(/\/\s*(\d+)\s*kbps/i)?.[1]);
    return lastBitrate - firstBitrate;
  });
  const [mainAudio, secondAudio] = sortArray;
  const mainAudioCodec = getAudioCodec(mainAudio);
  const secondAudioCodec = getAudioCodec(secondAudio);
  let audioCodec = mainAudioCodec;
  let channelName = mainAudio.match(/\d\.\d/)?.[0];
  if (mainAudioCodec === 'lpcm' && secondAudioCodec === 'dtshdma') {
    audioCodec = secondAudioCodec;
    channelName = mainAudio.match(/\d\.\d/)?.[0];
  }
  const languageArray = sortArray.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1];
    const normalMatch = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)?.[1];
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
const wrappingBBCodeTag = ({ pre, post, tracker }, preTag, poTag) => {
  const isPre = typeof pre !== 'undefined' && pre !== null;
  const isPost = typeof post !== 'undefined' && post !== null;
  if (isPre) {
    pre.unshift(preTag);
  }
  if (isPost) {
    post.push(poTag);
  }
};
// 过滤掉一些声明或者无意义文字
const getFilterBBCode = (content) => {
  const bbCodes = htmlToBBCode(content);
  return bbCodes.replace(/\[\w+(=(\w|\d|#)+)*\]([^[]+)\[\/\w+\]/g, function (match, p1, p2, p3) {
    if (p3 && p3.match(/温馨提示|本种子|郑重声明|带宽|法律责任|引用|Quote:|正版|商用/)) {
      return '';
    }
    return match;
  });
};
// html转BBCode代码
const htmlToBBCode = (node) => {
  const bbCodes = [];
  const pre = [];
  const post = [];
  const pp = wrappingBBCodeTag.bind(null, { pre, post });
  switch (node.nodeType) {
    case 1: { // tag
      switch (node.tagName.toUpperCase()) {
        case 'UL': { pp('[list]', '[/list]'); break; }
        case 'OL': { pp('[list=1]', '[/list]'); break; }
        case 'LI': { pp('[*]'); break; }
        case 'B': { pp('[b]', '[/b]'); break; }
        case 'U': { pp('[u]', '[/u]'); break; }
        case 'I': { pp('[i]', '[/i]'); break; }
        case 'DIV': { pp(null, '\n'); break; }
        case 'P': { pp('\n', '\n'); break; }
        case 'BR': { pp('\n'); break; }
        case 'BLOCKQUOTE':
        case 'TD': // TTG
        case 'FIELDSET': { pp('[quote]', '[/quote]'); break; }
        case 'IMG': {
          const { src } = node;
          if (src && src.match(/\.gif/)) {
            return null;
          }
          return `[img]${src}[/img]`;
        }
        case 'FONT': {
          const { color } = node;
          if (color) {
            pp(`[color=${color}]`, '[/color]');
          }
          break;
        }
        case 'A': {
          const { href } = node;
          if (href && href.length > 0) {
            pp(`[url=${href}]`, '[/url]');
          }
          break;
        }
        case 'H1': { pp('[b][size="7"]', '[/size][/b]\n'); break; }
        case 'H2': { pp('[b][size="6"]', '[/size][/b]\n'); break; }
        case 'H3': { pp('[b][size="5"]', '[/size][/b]\n'); break; }
        case 'H4': { pp('[b][size="4"]', '[/size][/b]\n'); break; }
      }
      const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
      if (textAlign) {
        switch (textAlign.toUpperCase()) {
          case 'LEFT': { pp('[left]', '[/left]'); break; }
          case 'RIGHT': { pp('[right]', '[/right]'); break; }
          case 'CENTER': { pp('[center]', '[/center]'); break; }
        }
      }
      if (fontWeight === 'bold' || ~~fontWeight >= 600) {
        pp('[b]', '[/b]');
      }
      if (fontStyle === 'italic') pp('[i]', '[/i]');
      if (textDecoration === 'underline') pp('[u]', '[/u]');
      if (color && color.trim() !== '') pp(`[color=${color}]`, '[/color]');
      break;
    }
    case 3: {
      return node.textContent;
    } // textNode
    default: return null;
  }
  node.childNodes.forEach((node, i) => {
    const code = htmlToBBCode(node);
    if (code) {
      bbCodes.push(code);
    }
  });
  return pre.concat(bbCodes).concat(post).join('');
};
const getTagsFromSubtitle = (title) => {
  const tags = {};
  if (title.match(/diy/i)) {
    tags.DIY = true;
  }
  if (title.match(/国配/i)) {
    tags.chineseAudio = true;
  }
  if (title.match(/粤/i)) {
    tags.cantoneseAudio = true;
  }
  if (title.match(/简|繁|中字/i)) {
    tags.chineseSubtitle = true;
  }
  return tags;
};
export {
  getUrlParam,
  formatTorrentTitle,
  getAudioCodec,
  replaceEngName,
  getSubTitle,
  getAreaCode,
  getBDType,
  getTMDBIdByIMDBId,
  getIMDBIdByUrl,
  getSize,
  getInfoFromMediaInfo,
  getInfoFromBDInfo,
  getSourceFromTitle,
  htmlToBBCode,
  getFilterBBCode,
  getScreenshotsFromBBCode,
  getTagsFromSubtitle,
}
;
