import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getUrlParam, formatTorrentTitle, getAreaCode,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  fetch,
} from '../common';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  const data = await getTorrentInfo(torrentId);
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  Object.assign(TORRENT_INFO, data);
};
const getTorrentInfo = async (torrentId:string) => {
  const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
  const { torrent, group } = response;
  const { name: movieName, year, conver: poster, releaseType, region, imdbId, doubanId } = group;
  const imdbUrl = `https://www.imdb.com/title${imdbId}`;
  const doubanUrl = `https://movie.douban.com/subject/${doubanId}`;
  const area = getAreaCode(region);

  let { description, fileList, filePath, size, source, resolution, processing, container, mediainfos, remasterTitle } = torrent;

  fileList = fileList.replace(/\.\w+?{{{\d+}}}/g, '');
  const title = formatTorrentTitle(filePath.replace(/\[.+\]/g, '') || fileList);
  const category = getCategory(releaseType);

  const torrentHeaderDom = $(`#torrent${torrentId}`);
  const infoArray = remasterTitle.split(' / ');
  const isRemux = processing.includes('Remux');
  const videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux, source, resolution, processing);
  source = getSource(source, processing, resolution);
  const tags = getTags(infoArray);
  const torrentLink = torrentHeaderDom.find('a[href*="action=download"]').attr('href');
  CURRENT_SITE_INFO.torrentLink = torrentLink;
  const torrentDom = $(`#torrent${torrentId}`).next('.TableTorrent-rowDetail');
  const screenshots = getScreenshots(torrentDom);
  const mediaInfoArray:string[] = (mediainfos as string[]).map(info => info.replace(/\r\n/g, '\n'));
  const isBluray = videoType.match(/bluray/i);
  // mediainfo
  const mediaInfoOrBDInfo = mediaInfoArray.filter(media => {
    return videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
  });

  const mediaInfos = mediaInfoOrBDInfo.map(v => v.trim());

  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join('\n\n'));
  const descriptionData = formatDescriptionData(description, screenshots, mediaInfoArray);

  return {
    sourceSite: CURRENT_SITE_NAME,
    sourceSiteType: CURRENT_SITE_INFO.siteType,
    title,
    imdbUrl,
    doubanUrl,
    movieName,
    year,
    size,
    category,
    poster,
    videoType,
    resolution,
    area,
    source,
    videoCodec,
    audioCodec,
    screenshots,
    mediaInfos,
    description: descriptionData,
    tags: { ...tags, ...mediaTags },
  };
};
const getCategory = (releaseType:string) => {
  const typeMap = {
    长片: 'movie',
    短片: 'movie',
    单口喜剧: 'other',
    迷你剧: 'tvPack',
    现场演出: 'concert',
    电影集: 'movie',
  };
  return typeMap[releaseType as keyof typeof typeMap];
};
// 获取截图 对比图和原始截图分开获取
const getScreenshots = (torrentDom:JQuery) => {
  const imgList:string[] = [];
  const imageDom = torrentDom.find('.scale_image');
  for (let i = 0; i < imageDom.length; i++) {
    // <a href><img />. e.g. ptp332121
    const parent = imageDom[i].parentElement;
    if (parent?.tagName === 'A' && parent?.getAttribute('href')?.match(/\.png$/)) {
      imgList.push((parent as HTMLLinkElement).getAttribute('href') || '');
    } else {
      imgList.push((imageDom[i] as HTMLImageElement).getAttribute('src') || '');
    }
  }
  return imgList;
};
const getSource = (source:string, codes:string, resolution:string) => {
  if (codes.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
    return 'uhdbluray';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getVideoType = (container:string, isRemux:boolean, source:string, resolution:string, processing:string) => {
  let type = '';
  if (isRemux) {
    type = 'remux';
  } else if (processing.match(/DIY/ig)) {
    type = resolution === '2160p' ? 'uhdbluray' : 'bluray';
  } else if (processing.match(/BD50|BD25/ig)) {
    type = 'bluray';
  } else if (processing.match(/BD66|BD100/ig) || (source.match(/Blu-ray/i) && processing.match(/DIY/i))) {
    type = 'uhdbluray';
  } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
    type = 'dvdrip';
  } else if (processing.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
    type = 'dvd';
  } else if (container.match(/MKV|MP4/i)) {
    type = 'encode';
  }
  return type;
};

const formatDescriptionData = (data:string, screenshots:string[], mediaInfoArray:string[]) => {
  const element = document.createElement('span');
  element.innerHTML = data;
  let descriptionData = element.textContent || '';
  descriptionData = descriptionData?.replace(/\r\n/g, '\n');
  // 将每行前后的空格删除 避免bdinfo匹配失败
  descriptionData = descriptionData.split('\n').map(line => {
    return line.trim();
  }).join('\n');
  TORRENT_INFO.originalDescription = descriptionData;
  screenshots.forEach(screenshot => {
    const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, 'i');
    if (!descriptionData.match(regStr)) {
      descriptionData = descriptionData.replace(new RegExp(screenshot, 'g'), `[img]${screenshot}[/img]`);
    }
  });
  descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
    const slash = p1 || '';
    return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
  });
  descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, '[$1quote]');
  descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, '[$2]$3[/$2]');
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
    descriptionData += `[quote]${mediaInfo}[/quote]`;
  });
  if (TORRENT_INFO.category === 'concert') {
    descriptionData = `${$('#synopsis').text()}\n${descriptionData}`;
  }
  return descriptionData;
};

function getTags (rawTags:string[]) {
  const knownTags:TorrentInfo.MediaTags = {};
  for (const rawTag of rawTags) {
    knownTags[rawTag] = true;
  }
  return knownTags;
}
