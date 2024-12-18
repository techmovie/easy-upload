import { TORRENT_INFO } from '../const';
import { htmlToBBCode } from './utils';

export const formatTorrentTitle = (title:string) => {
  // 保留5.1 H.264中间的点
  return title.replace(/\.(?!(\d+))/ig, ' ')
    .replace(/\.(?=\d{4}|48|57|72|2k|4k|7.1|6.1|5.1|4.1|2.0|1.0)/ig, ' ').trim();
};
// 获取更加准确的分类
export const getPreciseCategory = (torrentInfo: TorrentInfo.Info, category: string) => {
  const { description, title, subtitle, doubanInfo } = torrentInfo;
  const movieGenre = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)?.[2] ?? '';
  if (movieGenre.match(/动画/)) {
    return 'cartoon';
  } else if (movieGenre.match(/纪录/)) {
    return 'documentary';
  } else if (subtitle?.match(/全.+?集/) || title.match(/s0?\d{1,2}[^(e|.e)]/i)) {
    return 'tvPack';
  }
  if (category?.match(/tv/)) {
    if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || subtitle?.match(/第[^\s]集/)) {
      return 'tv';
    }
    return 'tvPack';
  }
  return category;
};

// 获取音频编码
export const getAudioCodecFromTitle = (title:string) => {
  if (!title) {
    return '';
  }
  title = title.replace(/:|-|\s/g, '');
  if (title.match(/atmos/i)) {
    return 'atmos';
  } else if (title.match(/dtshdma/i)) {
    return 'dtshdma';
  } else if (title.match(/dtsx/i)) {
    return 'dtsx';
  } else if (title.match(/dts/i)) {
    return 'dts';
  } else if (title.match(/truehd/i)) {
    return 'truehd';
  } else if (title.match(/lpcm/i)) {
    return 'lpcm';
  } else if (title.match(/flac/i)) {
    return 'flac';
  } else if (title.match(/aac/i)) {
    return 'aac';
  } else if (title.match(/DD\+|DDP|DolbyDigitalPlus/i)) {
    return 'dd+';
  } else if (title.match(/DD|DolbyDigital/i)) {
    return 'dd';
  } else if (title.match(/ac3/i)) {
    return 'ac3';
  }
  return '';
};
export const getVideoCodecFromTitle = (title:string, videoType = '') => {
  title = title.replace(/\.|-/g, '');
  if (title.match(/x264/i) || (title.match(/h264|avc/i) && videoType === 'encode')) {
    return 'x264';
  } else if (title.match(/h264|AVC/i)) {
    return 'h264';
  } else if (title.match(/x265/i) || (title.match(/h265|hevc/i) && videoType === 'encode')) {
    return 'x265';
  } else if (title.match(/hevc|h265/i)) {
    return 'hevc';
  } else if (title.match(/vc-?1/i)) {
    return 'vc1';
  } else if (title.match(/mpeg-?2/i)) {
    return 'mpeg2';
  } else if (title.match(/mpeg-?4/i)) {
    return 'mpeg4';
  } else if (title.match(/vvc/i)) {
    return 'vvc';
  }
  return '';
};

// 从标题获取source
export const getSourceFromTitle = (title: string) => {
  if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
    return 'uhdbluray';
  } else if (title.match(/blu(-)?ray|remux/i)) {
    return 'bluray';
  } else if (title.match(/hdtv/i)) {
    return 'hdtv';
  } else if (title.match(/web(-?(rip|dl))+/i)) {
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
export const getSubTitle = (data: Douban.DoubanData) => {
  const { chineseTitle, thisTitle: originalTitle, transTitle } = data;
  let title = '';
  if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
    title += chineseTitle;
  }
  const moreTitle = originalTitle.concat(transTitle).filter(item => title !== item);
  let seasonEpisode = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)?.[1] ?? '';
  seasonEpisode = seasonEpisode.replace(/^0/i, '');
  const episode = seasonEpisode ? ` 第${seasonEpisode}集` : '';
  const hardcodedSub = TORRENT_INFO.hardcodedSub ? '| 硬字幕' : '';
  return `${title}${moreTitle.length > 0 ? '/' : ''}${moreTitle.join('/')}${episode} ${hardcodedSub}`;
};

// 过滤掉一些声明或者无意义文字
export const getFilterBBCode = (content:Element) => {
  if (content) {
    const bbCodes = htmlToBBCode(content);
    return bbCodes?.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, (match, p1) => {
      if ((p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/))) {
        return '';
      }
      return match;
    }) ?? '';
  }
  return '';
};

export const getTagsFromSubtitle = (title:string) => {
  const tags: TorrentInfo.MediaTags = {};
  if (title.match(/diy/i)) {
    tags.diy = true;
  }
  if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语(言|字幕)/)) {
    tags.chinese_audio = true;
  }
  if (title.match(/Atmos|杜比全景声/i)) {
    tags.dolby_atoms = true;
  }
  if (title.match(/HDR/i)) {
    if (title.match(/HDR10\+/i)) {
      tags.hdr10_plus = true;
    } else {
      tags.hdr = true;
    }
  }
  if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
    tags.dolby_vision = true;
  }
  if (title.match(/粤/i)) {
    tags.cantonese_audio = true;
  }
  if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i) && !title.match(/无中(字|文)/)) {
    tags.chinese_subtitle = true;
  }
  if (title.match(/Criterion|CC标准/i)) {
    tags.the_criterion_collection = true;
  }
  if (title.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|禁止转载|exclusive/)) {
    tags.exclusive = true;
  }
  return tags;
};

export const replaceRegSymbols = (string:string) => {
  return string.replace(/([*.?+$^[\](){}|\\/])/g, '\\$1');
};
