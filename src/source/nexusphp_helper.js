/**
 * 格式化视频类型
 * @param {videoType} videoType
 * @return
 */
const getVideoType = (videoType) => {
  if (videoType === '') {
    return '';
  }
  videoType = videoType.replace(/[.-]/g, '').toLowerCase();
  if (videoType.match(/uhd/ig)) {
    return 'uhdbluray';
  } else if (videoType.match(/remux/ig)) {
    return 'remux';
  } else if (videoType.match(/blu/ig)) {
    return 'bluray';
  } else if (videoType.match(/encode/ig)) {
    return 'encode';
  } else if (videoType.match(/web/ig)) {
    return 'web';
  } else if (videoType.match(/hdtv/ig)) {
    return 'hdtv';
  } else if (videoType.match(/dvdr/ig)) {
    return 'dvdrip';
  } else if (videoType.match(/dvd/ig)) {
    return 'dvd';
  }
  return '';
};

/**
 * 格式化视频分类
 * @param {videoType} videoType
 */
const getCategory = (videoType) => {
  if (videoType === '') {
    return '';
  }
  videoType = videoType.replace(/[.-]/g, '').toLowerCase();
  if (videoType.match(/movie/ig)) {
    return 'movie';
  } else if (videoType.match(/tv/ig)) {
    return 'tv';
  } else if (videoType.match(/document/ig)) {
    return 'documentory';
  } else if (videoType.match(/sport/ig)) {
    return 'sport';
  }
  return '';
};

// 获取截图
const getImages = (descText) => {
  const imgList = [];
  const images = $("td.rowhead:contains('" + descText + "'):last").next().find('img');
  for (let i = 0; i < images.length; i++) {
    imgList.push(images[i].getAttribute('src'));
  }

  return imgList;
};

/**
 *
 * @param {metaInfo} metaInfo 基本信息 栏中的各项数值
 * @param {type}} type 需要获取的 类型 文字 如 分辨率
 */
const getMeta = (metaInfo, type) => {
  if (metaInfo === '') {
    return '';
  }
  const meta = metaInfo.split('   ');
  for (let i = 0; i < meta.length; i++) {
    meta[i] = meta[i].split(':');
  }
  for (let i = 0; i < meta.length; i++) {
    if (meta[i][0].trim() === type) {
      return meta[i][1].trim();
    }
  }
  return '';
};

const getVideoCodes = (codes) => {
  if (codes === 'H.264/AVC') {
    return 'h264';
  }

  return codes.replace(/[.-]/g, '').toLowerCase();
};

const getBDInfo = () => {
  const quoteList = $('#kdescr').find('fieldset');
  let bdinfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = quoteList[i].innerText;
    if (quoteContent.includes('DISC INFO') || quoteContent.includes('BiTRATE') || quoteContent.includes('BitRate')) {
      bdinfo += ` [quote] ${quoteContent.trim()}[/quote]`;
    }
  }
  return bdinfo;
};

const getResolution = (resolution) => {
  resolution = resolution.toLowerCase();
  if (resolution.match(/4k|2160 /ig)) {
    return '2160p';
  } else if (resolution.match(/1080p/ig)) {
    return '1080p';
  } else if (resolution.match(/1080i/ig)) {
    return '1080i';
  } else if (resolution.match(/sd/ig)) {
    return '720p';
  }
  return resolution;
};

const getSource = (videoType) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};

const getAreaCode = () => {
  const europeList = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
  let country = [];
  const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
  if (matchArray && matchArray.length > 0) {
    country = matchArray[1].replace(/(,)\s+/g, '$1').split(',');
  }
  if (country[0]) {
    if (country[0].match(/USA|Canada/i)) {
      return 'US';
    } else if (europeList.includes(country[0])) {
      return 'EU';
    } else if (country[0].match(/Japan/i)) {
      return 'JP';
    } else if (country[0].match(/Korea/i)) {
      return 'KR';
    } else if (country[0].match(/Taiwan/i)) {
      return 'TW';
    } else if (country[0].match(/Hong Kong/i)) {
      return 'HK';
    } else if (country[0].match(/China/i)) {
      return 'CN';
    }
  }
  return 'OT';
};

export {
  getVideoType, getCategory, getMeta, getImages, getVideoCodes, getBDInfo, getResolution,
};
