import { getSize } from './utils';
import { getAudioCodecFromTitle } from './torrent-info';

export const getSpecsFromMediainfo = (isBluray:boolean, mediaInfo:string) => {
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfo);
  if (videoCodec !== '' && audioCodec !== '' && resolution !== '') {
    return {
      videoCodec,
      audioCodec,
      resolution,
      mediaTags,
    };
  }
  return {};
};
export const getBDInfoOrMediaInfo = (bbcode:string) => {
  const quoteList = bbcode?.match(/\[quote\](.|\n)+?\[\/quote\]/g) ?? [];
  const bdinfo:string[] = []; const mediaInfo:string[] = [];
  quoteList.forEach(quote => {
    const quoteContent = quote.replace(/\[\/?quote\]/g, '').replace(/\u200D/g, '');
    if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
      bdinfo.push(quoteContent);
    }
    if (quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)) {
      mediaInfo.push(quoteContent);
    }
  });
  if (!bdinfo.length) {
    const bdinfoMatch = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)?.[0] ?? '';
    if (bdinfoMatch) {
      bdinfo.push(bdinfoMatch);
    }
  }
  return {
    bdinfo,
    mediaInfo,
  };
};
/*
* 获取蓝光类型
* @param {size}文件大小单位Bytes
* @return
* */
export const getBDType = (size: number) => {
  const GBSize = size / 1e9;
  if (GBSize < 5) {
    return 'DVD5';
  } else if (GBSize < 9) {
    return 'DVD9';
  } else if (GBSize < 25) {
    return 'BD25';
  } else if (GBSize < 50) {
    return 'BD50';
  } else if (GBSize < 66) {
    return 'BD66';
  } else if (GBSize < 100) {
    return 'BD100';
  }
};
export const getInfoFromMediaInfo = (mediaInfo:string) => {
  if (!mediaInfo) {
    return {};
  }
  const mediaArray = mediaInfo.split(/\n\s*\n/).filter(item => !!item.trim());
  const [generalPart, videoPart] = mediaArray;
  const secondVideoPart = mediaArray.filter(item => item.startsWith('Video #2'));
  const [audioPart, ...otherAudioPart] = mediaArray.filter(item => item.startsWith('Audio'));
  const textPart = mediaArray.filter(item => item.startsWith('Text'));
  const completeName = getMediaValueByKey('Complete name', generalPart);
  const format = completeName?.match(/\.(\w+)$/i)?.[1]?.toLowerCase() ?? '';
  const fileName = completeName.replace(/\.\w+$/i, '');
  const fileSize = getSize(getMediaValueByKey('File size', generalPart));
  const { videoCodec, hdrFormat, isDV } = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
  const { audioCodec, channelName, languageArray } = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
  const subtitleLanguageArray = textPart.map(item => {
    return getMediaValueByKey('Language', item);
  }).filter(sub => !!sub);
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
  const resolution = getResolution(videoPart);
  return {
    fileName,
    fileSize,
    format,
    subtitles: subtitleLanguageArray,
    videoCodec,
    audioCodec,
    resolution,
    mediaTags,
  };
};
export const getMediaValueByKey = (key:string, mediaInfo:string) => {
  if (!mediaInfo) {
    return '';
  }
  const keyRegStr = key.replace(/\s/, '\\s*').replace(/(\(|\))/g, '\\$1');
  const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\\n]+)`, 'i');
  return mediaInfo.match(reg)?.[1] ?? '';
};
const getResolution = (mediaInfo:string) => {
  const height = parseInt(getMediaValueByKey('Height', mediaInfo).replace(/\s/g, ''), 10);
  const width = parseInt(getMediaValueByKey('Width', mediaInfo).replace(/\s/g, ''), 10);
  const ScanType = getMediaValueByKey('Scan type', mediaInfo);
  if (height > 1080) {
    return '2160p';
  } else if (height > 720 && (ScanType === 'Progressive' || !ScanType)) {
    return '1080p';
  } else if (height > 720 && ScanType !== 'Progressive') {
    return '1080i';
  } else if (height > 576 || width > 1024) {
    return '720p';
  } else if (height > 480 || width === 1024) {
    return '576p';
  } else if (width >= 840 || height === 480) {
    return '480p';
  } else if (width && height) {
    return `${width}x${height}`;
  }
  return '';
};
export const getMediaTags = (
  audioCodec:string,
  channelName:string,
  languageArray:string[],
  subtitleLanguageArray:string[],
  hdrFormat:string, isDV:boolean): TorrentInfo.MediaTags => {
  const hasChineseAudio = languageArray.includes('Chinese');
  const hasChineseSubtitle = subtitleLanguageArray.includes('Chinese');
  const mediaTags: TorrentInfo.MediaTags = {};
  if (hasChineseAudio) {
    mediaTags.chinese_audio = true;
  }
  if (languageArray.includes('Cantonese')) {
    mediaTags.cantonese_audio = true;
  }
  if (hasChineseSubtitle) {
    mediaTags.chinese_subtitle = true;
  }
  if (hdrFormat) {
    if (hdrFormat.match(/HDR10\+/i)) {
      mediaTags.hdr10_plus = true;
    } else if (hdrFormat.match(/HDR/i)) {
      mediaTags.hdr = true;
    }
  }
  if (isDV) {
    mediaTags.dolby_vision = true;
  }
  if (audioCodec.match(/dtsx|atmos/ig)) {
    mediaTags.dts_x = true;
  } else if (audioCodec.match(/atmos/ig)) {
    mediaTags.dolby_atmos = true;
  }
  return mediaTags;
};
export const getVideoCodecByMediaInfo = (mainVideo:string, generalPart:string, secondVideo:string[]) => {
  const generalFormat = getMediaValueByKey('Format', generalPart);
  const videoFormat = getMediaValueByKey('Format', mainVideo);
  const videoFormatVersion = getMediaValueByKey('Format version', mainVideo);
  const videoCodeId = getMediaValueByKey('Codec ID', mainVideo);
  const hdrFormat = getMediaValueByKey('HDR format', mainVideo);
  const isDV = hdrFormat.match(/Dolby\s*Vision/i) ||
   (secondVideo.length > 0 && getMediaValueByKey('HDR format', secondVideo[0]).match(/Dolby\s*Vision/i));
  const isEncoded = !!getMediaValueByKey('Encoding settings', mainVideo);
  let videoCodec = '';
  if (generalFormat === 'DVD Video') {
    videoCodec = 'mpeg2';
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
  } else if (videoFormat.match(/vvc/i)) {
    videoCodec = 'vvc';
  }
  return {
    videoCodec,
    hdrFormat,
    isDV: !!isDV,
  };
};
export const getAudioCodecByMediaInfo = (mainAudio:string, otherAudio:string[]) => {
  const audioFormat = getMediaValueByKey('Format', mainAudio);
  const audioChannels = getMediaValueByKey('Channel(s)', mainAudio);
  const commercialName = getMediaValueByKey('Commercial name', mainAudio);
  const formateProfile = getMediaValueByKey('Format profile', mainAudio);
  const languageArray = [mainAudio, ...otherAudio].map(item => {
    return getMediaValueByKey('Language', item);
  });
  let channelName = '';
  let audioCodec = '';
  const channelNumber = parseInt(audioChannels, 10);
  if (channelNumber && channelNumber >= 6) {
    channelName = `${channelNumber - 1}.1`;
  } else {
    channelName = `${channelNumber}.0`;
  }
  if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'atmos';
  } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'truehd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
    audioCodec = 'dd+';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital/i)) {
    audioCodec = 'dd';
  } else if (audioFormat.match(/AC-3/i)) {
    audioCodec = 'ac3';
  } else if (audioFormat.match(/DTS XLL X/i)) {
    audioCodec = 'dtsx';
  } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
    audioCodec = 'dtshdma';
  } else if (audioFormat.match(/DTS/i) && formateProfile.match(/MA \/ Core/i)) {
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
export const getInfoFromBDInfo = (bdInfo:string) => {
  if (!bdInfo) {
    return {};
  }
  const splitArray = bdInfo.split('Disc Title');
  // 如果有多个bdinfo只取第一个
  if (splitArray.length > 2) {
    bdInfo = splitArray[1];
  }
  const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)*)AUDIO:/i);
  const hasFileInfo = bdInfo.match(/FILES:/i);
  const subtitleReg = new RegExp(`SUBTITLE(S)*:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${hasFileInfo ? 'FILES:' : ''}`, 'i');
  const subtitleMatch = bdInfo.match(subtitleReg);
  const audioReg = new RegExp(`AUDIO:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${subtitleMatch ? '(SUBTITLE(S)?)' : hasFileInfo ? 'FILES:' : ''}`, 'i');
  const audioMatch = bdInfo.match(audioReg);
  const fileSize = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)?.[1]?.replace(/,/g, '');
  const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i); // 是否为bdinfo的另一种格式quickSummary
  const videoPart = splitBDMediaInfo(videoMatch, 2);
  const [mainVideo = '', otherVideo = ''] = videoPart;
  const videoCodec = mainVideo.match(/2160/) ? 'hevc' : 'h264';
  const hdrFormat = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)?.[0] ?? '';
  const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
  const audioPart = splitBDMediaInfo(audioMatch, 2);
  const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
  const resolution = mainVideo.match(/\d{3,4}(p|i)/)?.[0];
  const { audioCodec = '', channelName = '', languageArray = [] } = getBDAudioInfo(audioPart, quickSummaryStyle);
  const subtitleLanguageArray = subtitlePart.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1] ?? '';
    const normalMatch = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)?.[1] ?? '';
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  }).filter(sub => !!sub);
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
  return {
    fileSize,
    videoCodec,
    subtitles: subtitleLanguageArray,
    audioCodec,
    resolution,
    mediaTags,
    format: 'm2ts',
  };
};
export const splitBDMediaInfo = (matchArray:string[]|null, matchIndex:number) => {
  return matchArray?.[matchIndex]?.split('\n').filter(item => !!item) ?? [];
};
export const getBDAudioInfo = (audioPart:string[], quickSummaryStyle:boolean) => {
  if (audioPart.length < 1) {
    return {};
  }
  const sortArray = audioPart.sort((a, b) => {
    const firstBitrate = parseInt(a.match(/\/\s*(\d+)\s*kbps/i)?.[1] ?? '', 10);
    const lastBitrate = parseInt(b.match(/\/\s*(\d+)\s*kbps/i)?.[1] ?? '', 10);
    return lastBitrate - firstBitrate;
  });
  const [mainAudio, secondAudio] = sortArray;
  const mainAudioCodec = getAudioCodecFromTitle(mainAudio);
  const secondAudioCodec = getAudioCodecFromTitle(secondAudio);
  let audioCodec = mainAudioCodec;
  let channelName = mainAudio.match(/\d\.\d/)?.[0];
  if (mainAudioCodec === 'lpcm' && secondAudioCodec === 'dtshdma') {
    audioCodec = secondAudioCodec;
    channelName = mainAudio.match(/\d\.\d/)?.[0];
  }
  const languageArray = sortArray.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1] ?? '';
    const normalMatch = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)?.[1] ?? '';
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
