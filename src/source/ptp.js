import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getUrlParam, formatTorrentTitle, getAreaCode,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  replaceRegSymbols, getBDInfoOrMediaInfo,
} from '../common';

export default () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const torrentDom = $(`#torrent_${torrentId}`);
  const ptpMovieTitle = $('.page__title').text().match(/]?([^[]+)/)[1]?.trim();
  const [movieName, movieAkaName = ''] = ptpMovieTitle.split(' AKA ');
  const mediaInfoArray = [];
  torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').each(function () {
    const textContent = $(this).text();
    if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)/i)) {
      mediaInfoArray.push(textContent);
    }
  });
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.movieAkaName = movieAkaName;
  TORRENT_INFO.imdbUrl = $('#imdb-title-link')?.attr('href') ?? '';
  TORRENT_INFO.year = $('.page__title').text().match(/\[(\d+)\]/)[1];
  const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
  TORRENT_INFO.category = getPTPType();
  const screenshots = getPTPImage(torrentDom);
  getDescription(torrentId).then(res => {
    const descriptionData = formatDescriptionData(res, screenshots, mediaInfoArray);
    TORRENT_INFO.description = descriptionData;
    const infoArray = torrentHeaderDom.find('#PermaLinkedTorrentToggler').text().replace(/ /g, '').split('/');
    const [codes, container, source, ...otherInfo] = infoArray;
    const isRemux = otherInfo.includes('Remux');
    TORRENT_INFO.videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux, codes, source);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionData);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = mediaTags;
    let torrentName = torrentHeaderDom.data('releasename');
    torrentName = formatTorrentTitle(torrentName);
    TORRENT_INFO.title = torrentName;
    TORRENT_INFO.source = getPTPSource(source, codes, resolution);
    TORRENT_INFO.size = torrentHeaderDom.find('.nobr span').attr('title').replace(/[^\d]/g, '');
    TORRENT_INFO.screenshots = screenshots;
    console.log(TORRENT_INFO);
  });

  let country = [];
  const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
  if (matchArray && matchArray.length > 0) {
    country = matchArray?.[1].replace(/(,)\s+/g, '$1').split(',');
  }
  TORRENT_INFO.area = getAreaCode(country?.[0]);
  return TORRENT_INFO;
};
const getPTPType = () => {
  const typeMap = {
    'Feature Film': 'movie',
    'Short Film': 'movie',
    'Stand-up Comedy': 'other',
    Miniseries: 'tvPack',
    'Live Performance': 'concert',
    'Movie Collection': 'movie',
  };
  const ptpType = $('#torrent-table .basic-movie-list__torrent-edition__main').eq(0).text();
  return typeMap[ptpType];
};
// 获取截图 对比图和原始截图分开获取
const getPTPImage = () => {
  const imgList = [];
  const torrentInfoPanel = $('.movie-page__torrent__panel');
  const imageDom = torrentInfoPanel.find('.bbcode__image');
  for (let i = 0; i < imageDom.length; i++) {
    imgList.push(imageDom[i].getAttribute('src'));
  }
  return imgList;
};
const getPTPSource = (source, codes, resolution) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getVideoType = (container, isRemux, codes, source) => {
  let type = '';
  if (isRemux) {
    type = 'remux';
  } else if (codes.match(/BD50|BD25/ig)) {
    type = 'bluray';
  } else if (codes.match(/BD66|BD100/ig)) {
    type = 'uhdbluray';
  } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
    type = 'dvdrip';
  } else if (codes.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
    type = 'dvd';
  } else if (container.match(/MKV|MP4/i)) {
    type = 'encode';
  }
  return type;
};
const getDescription = (id) => {
  return new Promise((resolve, reject) => {
    try {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `https://passthepopcorn.me/torrents.php?action=get_description&id=${id}`,
        onload (res) {
          const data = res.responseText;
          if (data) {
            const element = document.createElement('span');
            element.innerHTML = data;
            resolve(element.innerText || element.textContent);
          }
        },
      });
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
const formatDescriptionData = (data, screenshots, mediaInfoArray) => {
  let descriptionData = data.replace(/\r\n/g, '\n');
  // 将每行前后的空格删除 避免bdinfo匹配失败
  descriptionData = descriptionData.split('\n').map(line => {
    return line.trim();
  }).join('\n');
  screenshots.forEach(screenshot => {
    const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, 'i');
    if (!descriptionData.match(regStr)) {
      descriptionData = descriptionData.replace(new RegExp(screenshot, 'g'), `[img]${screenshot}[/img]`);
    }
  });
  descriptionData = descriptionData.replace(/\[(\/)?mediainfo\]/g, '[$1quote]');
  descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, function (match, p1, p2) {
    const slash = p1 || '';
    return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
  });
  descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, '[$1quote]');
  descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\s)+?)\[\/align\]/g, '[$2]$3[/$2]');
  const comparisonArray = descriptionData.match(/\[comparison=(?:.+?)\]((.|\n|\s)+?)\[\/comparison\]/g) || [];
  let comparisonImgArray = [];
  comparisonArray.forEach(item => {
    comparisonImgArray = comparisonImgArray.concat(item.replace(/\[\/?comparison(=(.+?))?\]/g, '').split(/[ \r\n]/));
    descriptionData = descriptionData.replace(item, item.replace(/\s/g, ''));
  });
  const comparisonImgs = [];
  [...new Set(comparisonImgArray)].forEach(item => {
    const formatImg = item.replace(/\s*/g, '');
    if (item.match(/^https?.+/)) {
      comparisonImgs.push(formatImg);
      descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item}`, 'gi'), `[img]${formatImg}[/img]`);
    } else if (item.match(/^\[img\]/i)) {
      comparisonImgs.push(formatImg.replace(/\[\/?img\]/g, ''));
    }
  });
  TORRENT_INFO.comparisonImgs = comparisonImgs;
  descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/g, '\n[b]$1 Comparison:[/b]\n').replace(/\[\/comparison\]/g, '');
  mediaInfoArray.forEach(mediaInfo => {
    const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo)}`, 'i');
    if (!descriptionData.match(regStr)) {
      descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
    }
  });
  if (TORRENT_INFO.category === 'concert') {
    descriptionData = $('#synopsis').text() + '\n' + descriptionData;
  }
  return descriptionData;
};
