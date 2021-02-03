import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';

/**
 * 获取 NexusPHP 默认数据
 * TODO: 截图中去除无关图片
 */
export default () => {
  let title = $('#top').prop('firstChild').nodeValue.trim();
  const year = title.match(/(19|20)\d{2}/g);
  const images = $("td.rowhead:contains('简介'), td.rowhead:contains('簡介')").next().find('img');
  let metaInfo = $("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊')").next().text().replace(/：/g, ':');
  let subtitle = $("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
  let imdbUrl = $('#kimdb>a').attr('href');
  let description = $('#kdescr').clone().find('fieldset').remove().end().text().trim();

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

  if (CURRENT_SITE_NAME === 'FRDS') {
    [title, subtitle] = [subtitle, title];
  }
  // 站点自定义数据覆盖 结束

  const { category, videoType, videoCodes, audioCodes, resolution, processing, size } = getMetaInfo(metaInfo);

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

  TORRENT_INFO.audioCodes = getAudioCodes(audioCodes);
  // TORRENT_INFO.source = TODO;
  TORRENT_INFO.area = getAreaCode(processing);
  TORRENT_INFO.size = getSize(size);

  return TORRENT_INFO;
};

const getMetaInfo = (metaInfo) => {
  let category = '';
  let videoType = '';
  let videoCodes = '';
  let audioCodes = '';
  let resolution = '';
  let processing = '';
  let size = '';

  if (metaInfo.match(/类型|分类|類別/)) {
    category = metaInfo.substr(metaInfo.match(/类型|分类|類別/).index).split('   ')[0].split(':')[1].trim();
  }
  // 馒头的媒介来源在分类中
  if (CURRENT_SITE_NAME === 'MTeam') {
    videoType = category;
  } else if (metaInfo.match(/媒介|来源/)) {
    videoType = metaInfo.substr(metaInfo.match(/媒介|来源/).index).split('   ')[0].split(':')[1].trim();
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
  if (metaInfo.match(/大小/)) {
    size = metaInfo.substr(metaInfo.match(/大小/).index).split('   ')[0].split(':')[1].trim();
  }

  return {
    category,
    videoType,
    videoCodes,
    audioCodes,
    resolution,
    processing,
    size,
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
  } else if (videoType.match(/综艺/ig)) {
    return 'variety';
  } else if (videoType.match(/document|纪录|紀錄/ig)) {
    return 'documentory';
  } else if (videoType.match(/sport|体育/ig)) {
    return 'sport';
  } else if (videoType.match(/mv|演唱/ig)) {
    return 'concert';
  } else if (videoType.match(/anim|动|画|漫/ig)) {
    return 'cartoon';
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

  images.each(function () {
    const src = $(this).data('echo') || $(this).attr('src'); // PTSBAO 图片src 在 data-echo
    if (src) {
      console.log(src);
      let imgUrl = decodeURIComponent(src).replace('imagecache.php?url=', '').trim(); // MTeam 解码替换前缀
      if (imgUrl.startsWith('http') === false) {
        imgUrl = CURRENT_SITE_INFO.url + '/' + imgUrl;
      }
      imgList.push(imgUrl);
    }
  });
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
  codes = codes.replace(/[.-]|[ ]/g, '').toLowerCase();
  if (codes.match(/265|hevc/ig)) {
    return 'x265';
  } else if (codes.match(/264|avc/ig)) {
    return 'x264';
  }
  return codes;
};

/**
 * 格式化音频编码格式
 * @param {code} codes 编码文字
 */
const getAudioCodes = (codes) => {
  if (codes === '') {
    return '';
  }
  codes = codes.replace(/[.-]|[ ]/g, '').toLowerCase();
  if (codes.match(/dtshd/ig)) {
    return 'dtshdma';
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
    if (quoteContent.match(/DISC|BIT|RATE/i)) {
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

const getAreaCode = (area) => {
  if (area.match(/CN|大陆|中|内地|Mainland/i)) {
    return 'CN';
  } else if (area.match(/HK|港|HongKong/i)) {
    return 'HK';
  } else if (area.match(/TW|台|Taiwan/i)) {
    return 'TW';
  } else if (area.match(/JP|日|Japan/i)) {
    return 'JP';
  } else if (area.match(/KR|韩|Korean/i)) {
    return 'KR';
  } else if (area.match(/US|美/i)) {
    return 'US';
  } else if (area.match(/欧|英|法|EU/i)) {
    return 'EU';
  }
  return 'OT';
};

const getSize = (size) => {
  if (size.match(/T/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/G/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/M/i)) {
    return (parseFloat(size) * 1024 * 1024) || 0;
  }
  return '';
};
