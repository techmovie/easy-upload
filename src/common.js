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
const getAudioCodes = (title) => {
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
    if (area.match(/USA|Canada/i)) {
      return 'US';
    } else if (europeList.includes(area)) {
      return 'EU';
    } else if (area.match(/Japan/i)) {
      return 'JP';
    } else if (area.match(/Korea/i)) {
      return 'KR';
    } else if (area.match(/Taiwan/i)) {
      return 'TW';
    } else if (area.match(/Hong Kong/i)) {
      return 'HK';
    } else if (area.match(/China/i)) {
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
  const mediaArray = mediaInfo.split('\n\n');
  const [generalPart, videoPart] = mediaArray;
  const secondVideoPart = mediaArray.filter(item => item.startsWith('Video #2'));
  const [audioPart, ...otherAudioPart] = mediaArray.filter(item => item.startsWith('Audio'));
  const textPart = mediaArray.filter(item => item.startsWith('Text'));
  const fileName = getMediaValueByKey('Complete name', generalPart).replace(/\.avi|\.mkv|\.mp5|\.ts/i, '');
  const fileSize = getSize(getMediaValueByKey('File size', generalPart));
  const { videoCodes, isHdr, isDV } = getVideoCodesByMediaInfo(videoPart, generalPart, secondVideoPart);
  const { audioCodes, channelName, languageArray } = getAudioCodesByMediaInfo(audioPart, otherAudioPart);
  const mediaTags = getMediaTags(audioCodes, channelName, languageArray, textPart, isHdr, isDV);
  const resolution = getResolution(videoPart);
  return {
    fileName,
    fileSize,
    videoCodes,
    audioCodes,
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
  } else if (height > 576) {
    return '720p';
  } else if (height > 480) {
    return '576p';
  } else if (height === 480) {
    return '480p';
  } else {
    return `${width}x${height}`;
  }
};
const getMediaTags = (audioCodes, channelName, languageArray, textPart, isHdr, isDV) => {
  const subtitleLanguageArray = textPart.map(item => {
    return getMediaValueByKey('Language', item);
  });
  const hasChineseAudio = languageArray.includes('Chinese');
  const hasChineseSubtitle = subtitleLanguageArray.includes('Chinese');
  const mediaTags = [];
  if (hasChineseAudio) {
    mediaTags.push('chineseAudio');
  }
  if (languageArray.includes('Cantonese')) {
    mediaTags.push('CantoneseAudio');
  }
  if (hasChineseSubtitle) {
    mediaTags.push('chineseSubtitle');
  }
  if (isHdr) {
    mediaTags.push('HDR');
  }
  if (isDV) {
    mediaTags.push('DolbyVision');
  }
  if (audioCodes.match(/dtsx|atmos/ig)) {
    mediaTags.push(audioCodes);
  }
  if (channelName === '7.1') {
    mediaTags.push(channelName);
  }
  return mediaTags;
};
const getVideoCodesByMediaInfo = (mainVideo, generalPart, secondVideo) => {
  const generalFormat = getMediaValueByKey('Format', generalPart);
  const videoFormat = getMediaValueByKey('Format', mainVideo);
  const videoFormatVersion = getMediaValueByKey('Format version', mainVideo);
  const videoCodeId = getMediaValueByKey('Codec ID', mainVideo);
  const hdrFormat = getMediaValueByKey('HDR format', mainVideo);
  const isDV = secondVideo.length > 0 && getMediaValueByKey('HDR format', secondVideo[0]).includes('Dolby Vision');
  const isEncoded = !!getMediaValueByKey('Encoding settings', mainVideo);
  let videoCodes = '';
  if (generalFormat === 'DVD Video') {
    videoCodes = 'DVD';
  } else if (generalFormat === 'MPEG-4') {
    videoCodes = 'mpeg4';
  } else if (videoFormat === 'MPEG Video' && videoFormatVersion === 'Version 2') {
    videoCodes = 'mpeg2';
  } else if (videoCodeId.match(/xvid/i)) {
    videoCodes = 'xvid';
  } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
    videoCodes = 'hevc';
  } else if (videoFormat.match(/HEVC/i) && isEncoded) {
    videoCodes = 'x265';
  } else if (videoFormat.match(/AVC/i) && isEncoded) {
    videoCodes = 'x264';
  } else if (videoFormat.match(/AVC/i) && !isEncoded) {
    videoCodes = 'h264';
  } else if (videoFormat.match(/VC-1/i)) {
    videoCodes = 'vc1';
  }
  return {
    videoCodes,
    isHdr: !!hdrFormat,
    isDV,
  };
};
const getAudioCodesByMediaInfo = (mainAudio, otherAudio = []) => {
  const audioFormat = getMediaValueByKey('Format', mainAudio);
  const audioChannels = getMediaValueByKey('Channel(s)', mainAudio);
  const commercialName = getMediaValueByKey('Commercial name', mainAudio);
  const languageArray = [mainAudio, ...otherAudio].map(item => {
    return getMediaValueByKey('Language', item);
  });
  let channelName = '';
  let audioCodes = '';
  const channelNumber = parseInt(audioChannels);
  if (channelNumber && channelNumber >= 6) {
    channelName = `${channelNumber - 1}.1`;
  } else {
    channelName = `${channelNumber}.0`;
  }
  if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
    audioCodes = 'atmos';
  } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
    audioCodes = 'truehd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital$/i)) {
    audioCodes = 'dd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
    audioCodes = 'dd+';
  } else if (audioFormat.match(/DTS XLL X/i)) {
    audioCodes = 'dtsx';
  } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
    audioCodes = 'dtshdma';
  } else if (audioFormat.match(/DTS/i)) {
    audioCodes = 'dts';
  } else if (audioFormat.match(/FLAC/i)) {
    audioCodes = 'flac';
  } else if (audioFormat.match(/AAC/i)) {
    audioCodes = 'aac';
  }
  return {
    audioCodes,
    channelName,
    languageArray,
  };
};
export {
  getUrlParam,
  formatTorrentTitle,
  getAudioCodes,
  replaceEngName,
  getSubTitle,
  getAreaCode,
  getBDType,
  getTMDBIdByIMDBId,
  getIMDBIdByUrl,
  getSize,
  getInfoFromMediaInfo,
}
;
