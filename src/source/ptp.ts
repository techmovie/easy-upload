import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO, PT_SITE } from '../const';
import {
  getUrlParam, formatTorrentTitle, getAreaCode,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  replaceRegSymbols, fetch,
} from '../common';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const torrentDom = $(`#torrent_${torrentId}`);
  const ptpMovieTitle = $('.page__title').text()?.match(/]?([^[]+)/)?.[1]?.trim() ?? '';
  const [movieName, movieAkaName = ''] = ptpMovieTitle.split(' AKA ');
  const mediaInfoArray:string[] = [];
  torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').each(function () {
    const textContent = $(this).text();
    if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
      mediaInfoArray.push(textContent);
    }
  });
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.movieAkaName = movieAkaName;
  TORRENT_INFO.imdbUrl = $('#imdb-title-link')?.attr('href') ?? '';
  TORRENT_INFO.year = $('.page__title').text().match(/\[(\d+)\]/)?.[1] ?? '';
  const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
  TORRENT_INFO.category = getPTPType();
  const screenshots = getPTPImage();
  getDescription(torrentId).then(res => {
    const releaseName = torrentHeaderDom.data('releasename');
    const releaseGroup = getReleaseGroup(releaseName);
    const descriptionData = formatDescriptionData(res, screenshots, mediaInfoArray);
    TORRENT_INFO.description = descriptionData;
    // Remux / 2D/3D Edition
    const infoArray = torrentHeaderDom.find('#PermaLinkedTorrentToggler').text().trim().split(' / ');
    // eslint-disable-next-line no-unused-vars
    const [codes, container, source, resolution, ...otherInfo] = infoArray;
    const isRemux = otherInfo.includes('Remux');
    const { knownTags, otherTags } = getTags(otherInfo, [releaseGroup]);
    TORRENT_INFO.videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux, codes, source);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    TORRENT_INFO.tags = { ...knownTags };
    TORRENT_INFO.otherTags = otherTags;
    TORRENT_INFO.resolution = resolution;

    // mediainfo
    const mediaInfoOrBDInfo = mediaInfoArray.filter(media => {
      return TORRENT_INFO.videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
    });
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo.join('\n\n').trim();
    TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo.map(v => v.trim());
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join('\n\n'));
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.tags = { ...TORRENT_INFO.tags, ...mediaTags };

    const torrentName = formatTorrentTitle(releaseName);
    TORRENT_INFO.title = torrentName;
    TORRENT_INFO.source = getPTPSource(source, codes, resolution);
    const size = torrentHeaderDom.find('.nobr span').attr('title')?.replace(/[^\d]/g, '') ?? '';
    TORRENT_INFO.size = parseFloat(size);
    TORRENT_INFO.screenshots = screenshots;
    console.log(TORRENT_INFO);
  });

  let country:string[] = [];
  const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/);
  if (matchArray && matchArray.length > 0) {
    country = matchArray?.[1].replace(/(,)\s+/g, '$1').split(',');
  }
  TORRENT_INFO.area = getAreaCode(country?.[0]);
  const trumpReason = $(`#trumpable_${torrentId} span`).text() || '';
  TORRENT_INFO.hardcodedSub = trumpReason.includes('Hardcoded Subtitles');
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
  return typeMap[ptpType as keyof typeof typeMap];
};
// 获取截图 对比图和原始截图分开获取
const getPTPImage = () => {
  const imgList = [];
  const torrentInfoPanel = $('.movie-page__torrent__panel');
  const imageDom = torrentInfoPanel.find('.bbcode__image');
  for (let i = 0; i < imageDom.length; i++) {
    // <a href><img />. e.g. ptp332121
    const parent = imageDom[i].parentElement;
    if (parent?.tagName === 'A' && parent?.getAttribute('href')?.match(/\.png$/)) {
      imgList.push(parent.getAttribute('href') || '');
    } else {
      imgList.push(imageDom[i].getAttribute('src') || '');
    }
  }
  return imgList;
};
const getPTPSource = (source:string, codes:string, resolution:string) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getVideoType = (container:string, isRemux:boolean, codes:string, source:string) => {
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
const getDescription = async (id:string) => {
  const url = `${PT_SITE.PTP.url}/torrents.php?action=get_description&id=${id}`;
  const data = await fetch(url, {
    responseType: undefined,
  });
  if (data) {
    const element = document.createElement('span');
    element.innerHTML = data;
    return (element.innerText || element.textContent || '');
  }
  return '';
};
const formatDescriptionData = (data:string, screenshots:string[], mediaInfoArray:string[]) => {
  let descriptionData = data.replace(/\r\n/g, '\n');
  // 将每行前后的空格删除 避免bdinfo匹配失败
  descriptionData = descriptionData.split('\n').map(line => {
    return line.trim();
  }).join('\n').replace(/http:\/\/ptpimg.me/g, 'https://ptpimg.me'); // torrents.php?action=get_description&id=284503
  TORRENT_INFO.originalDescription = descriptionData;
  screenshots.forEach(screenshot => {
    const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
    if (!descriptionData.match(regStr)) {
      // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
      const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
      if (descriptionData.match(regOldFormat)) {
        descriptionData = descriptionData.replace(regOldFormat, `[img]${screenshot}[/img]`);
      } else {
        descriptionData = descriptionData.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, 'g'), `[img]${screenshot}[/img]`);
      }
    }
  });
  descriptionData = descriptionData.replace(/\[(\/)?mediainfo\]/g, '[$1quote]');
  descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
    const slash = p1 || '';
    return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
  });
  descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, '[$1quote]');
  descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, '[quote][$2]$3[/$2][/quote]');
  const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
  interface ComparisonObj{
    title: string
    imgs: string[]
    reason: string
  }
  const comparisons:ComparisonObj[] = [];
  comparisonArray.forEach(item => {
    descriptionData = descriptionData.replace(item, item.replace(/\s/g, ''));
    const reason = item.match(/(\n.*\n)?\[comparison=/i)?.[1] ?? '';
    const title = item.match(/\[comparison=(.*?)\]/i)?.[1] ?? '';
    const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, '').split(/[ \r\n]/);
    const imgs:string[] = [];
    Array.from(new Set(comparisonImgArray)).forEach(item => {
      const formatImg = item.replace(/\s*/g, '');
      if (item.match(/^https?.+/)) {
        imgs.push(formatImg);
        descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item}`, 'gi'), `[img]${formatImg}[/img]`);
      } else if (item.match(/^\[img\]/i)) {
        imgs.push(formatImg.replace(/\[\/?img\]/g, ''));
      }
    });
    comparisons.push({
      title,
      imgs,
      reason,
    });
  });
  TORRENT_INFO.comparisons = comparisons;
  descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, '\n[b]$1 Comparison:[/b]\n').replace(/\[\/comparison\]/ig, '');
  mediaInfoArray.forEach(mediaInfo => {
    const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo).replace('\"','\\"').slice(0, 10000)}`, 'i');
    if (!descriptionData.match(regStr)) {
      descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
    }
  });
  if (TORRENT_INFO.category === 'concert') {
    descriptionData = `${$('#synopsis').text()}\n${descriptionData}`;
  }
  return descriptionData;
};

function getTags (rawTags:string[], exclude:string[] = []) {
  const { editionTags } = PT_SITE.PTP.sourceInfo;
  const knownTags:TorrentInfo.MediaTags = {};
  const otherTags:TorrentInfo.MediaTags = {};
  for (const rawTag of rawTags) {
    const tag = editionTags[rawTag as keyof typeof editionTags];
    if (tag) {
      knownTags[tag] = true;
    } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/Freeleech|Halfleech/i)) {
      // skip
    } else {
      otherTags[rawTag] = true;
    }
  }
  return {
    knownTags,
    otherTags,
  };
}

function getReleaseGroup (releasename:string) {
  return releasename.match(/-(\w+?)$/)?.[1] ?? '';
}
