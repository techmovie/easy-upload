import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';

/**
 * 获取 NexusPHP 默认数据
 * TODO: 音频和地区处理
 */
export default () => {
  const title = $('#top').prop('firstChild').nodeValue.trim();
  const year = title.match(/(19|20)\d{2}/g);
  const images = $("td.rowhead:contains('简介'), td.rowhead:contains('簡介')").next().find('img');
  let metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊')").next().text();
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let imdbUrl = $('#kimdb>a').attr('href');
  let description = $('#kdescr').clone().find('fieldset').remove().text().trim();

  // 站点自定义数据覆盖 开始
  if (CURRENT_SITE_NAME === 'HDC') {
    const meta = [];
    $("li:contains('基本信息'):last").next('li').children('i').each(function () {
      meta.push($(this).text().replace('：', ':'));
    });
    metaInfo = meta.join('   ');
    subtitle = $('#top').next('h3').text();
  }

  if (CURRENT_SITE_NAME === 'OURBITS') {
    imdbUrl = $('.imdbnew2 a:first').attr('href');
    const doubaninfo = $('.doubaninfo').html();
    description = doubaninfo ? doubaninfo.replace(/<br>|<br\/>/g, '\n').trim() : '';
  }

  // if (CURRENT_SITE_NAME === 'MTeam') {
  //   imdbUrl = $('.imdbnew2 a:first').attr('href');
  // }
  // 站点自定义数据覆盖 结束

  const { category, videoType, videoCodes, audioCodes, resolution, processing } = getMetaInfo(metaInfo);

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.movieName = title;
  TORRENT_INFO.movieAkaName = subtitle;
  TORRENT_INFO.imdbUrl = (imdbUrl && imdbUrl.match(/www.imdb.com\/title/)) ? imdbUrl : '';
  TORRENT_INFO.year = year ? year.pop() : '';
  TORRENT_INFO.title = title;
  TORRENT_INFO.subtitle = subtitle;
  TORRENT_INFO.description = description;
  TORRENT_INFO.category = getCategory(category);
  TORRENT_INFO.videoType = getVideoType(videoType);
  TORRENT_INFO.videoCodes = getVideoCodes(videoCodes);
  TORRENT_INFO.resolution = getResolution(resolution);
  TORRENT_INFO.bdinfo = getBDInfo();
  TORRENT_INFO.screenshots = getImages(images);

  TORRENT_INFO.audioCodes = audioCodes;
  // TORRENT_INFO.source = TODO;
  TORRENT_INFO.area = processing;

  return TORRENT_INFO;
};

const getMetaInfo = (metaInfo) => {
  let category = '';
  let videoType = '';
  let videoCodes = '';
  let audioCodes = '';
  let resolution = '';
  let processing = '';

  if (metaInfo.match(/类型|分类|類別/)) {
    category = metaInfo.substr(metaInfo.match(/类型|分类|類別/).index).split('   ')[0].split(':')[1].trim();
  }

  // 馒头的媒介来源在分类中
  if (CURRENT_SITE_NAME === 'MTeam') {
    videoType = category;
  } else if (metaInfo.match(/媒介|來源/)) {
    videoType = metaInfo.substr(metaInfo.match(/媒介|來源/).index).split('   ')[0].split(':')[1].trim();
  }

  if (metaInfo.match(/编码|編碼/)) {
    videoCodes = metaInfo.substr(metaInfo.match(/编码|編碼/).index).split('   ')[0].split(':')[1].trim();
  }

  if (metaInfo.match(/音频/)) {
    audioCodes = metaInfo.substr(metaInfo.match(/音频/).index).split('   ')[0].split(':')[1].trim();
  }

  if (metaInfo.match(/分辨率|格式|解析度/)) {
    resolution = metaInfo.substr(metaInfo.match(/分辨率|格式|解析度/).index).split('   ')[0].split(':')[1].trim();
  }

  if (metaInfo.match(/处理|處理|地区/)) {
    processing = metaInfo.substr(metaInfo.match(/处理|處理|地区/).index).split('   ')[0].split(':')[1].trim();
  }

  return {
    category,
    videoType,
    videoCodes,
    audioCodes,
    resolution,
    processing,
  };
};

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
  if (videoType.match(/uhd|ultra/ig)) {
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
  if (videoType.match(/movie|bd|ultra|电影/ig)) {
    return 'movie';
  } else if (videoType.match(/tv|drama|剧集/ig)) {
    return 'tv';
  } else if (videoType.match(/document|纪录/ig)) {
    return 'documentory';
  } else if (videoType.match(/sport|体育/ig)) {
    return 'sport';
  }
  return '';
};

/**
 * 提取简介中视频截图
 * TODO: 去除小图片 如图片标签
 * @param {imagesDomSelector} imagesDomSelector
 */
const getImages = (imagesDomSelector) => {
  const imgList = [];
  const images = imagesDomSelector;
  for (let i = 0; i < images.length; i++) {
    if (images[i].getAttribute('src')) {
      let img = decodeURIComponent(images[i].getAttribute('src')).replace('imagecache.php?url=', ''); // MTeam 解码替换前缀
      if (img.startsWith('http') === false) {
        img = CURRENT_SITE_INFO.url + '/' + img;
      }
      imgList.push(img);
    }
  }

  return imgList;
};

/**
 * 格式化视频编码格式
 * @param {code} codes 编码文字
 */
const getVideoCodes = (codes) => {
  if (codes === '') {
    return '';
  }
  codes = codes.replace(/[.-]/g, '').toLowerCase();
  if (codes.match(/265|hevc/ig)) {
    return 'x265';
  } else if (codes.match(/264|avc/ig)) {
    return 'x264';
  }
  return codes;
};

/**
 * 获取简介中引用的视频编码信息
 */
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

// const getAreaCode = () => {
//   const europeList = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
//   let country = [];
//   const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
//   if (matchArray && matchArray.length > 0) {
//     country = matchArray[1].replace(/(,)\s+/g, '$1').split(',');
//   }
//   if (country[0]) {
//     if (country[0].match(/USA|Canada/i)) {
//       return 'US';
//     } else if (europeList.includes(country[0])) {
//       return 'EU';
//     } else if (country[0].match(/Japan/i)) {
//       return 'JP';
//     } else if (country[0].match(/Korea/i)) {
//       return 'KR';
//     } else if (country[0].match(/Taiwan/i)) {
//       return 'TW';
//     } else if (country[0].match(/Hong Kong/i)) {
//       return 'HK';
//     } else if (country[0].match(/China/i)) {
//       return 'CN';
//     }
//   }
//   return 'OT';
// };

// export {
//   getDefaultData, getVideoType, getCategory, getMeta, getImages, getVideoCodes, getBDInfo, getResolution,
// };
