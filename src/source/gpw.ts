import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO, PT_SITE } from '../const';
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
  const imdbUrl = $('.info_crumbs a[href*="www.imdb.com/title"]').attr('href');
  const doubanUrl = $('.info_crumbs a[href*="https://movie.douban.com/subject/"]').attr('href');
  const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
  const { torrent, group } = response;
  const { name: movieName, year, wikiImage: poster, releaseType } = group;
  let { description, fileList, filePath, size } = torrent;

  fileList = fileList.replace(/\.\w+?{{{\d+}}}/, '');
  const title = formatTorrentTitle(filePath || fileList);
  const category = getCategory(releaseType);
  const country = $('.info_crumbs .fa-flag').next('span').text();
  const area = getAreaCode(country);

  const torrentHeaderDom = $(`#torrent${torrentId}`);
  const infoArray = torrentHeaderDom.find('.td_info .specs').text().trim().split(' / ');

  let [codes, source, resolution, container, ...otherInfo] = infoArray;
  console.log(codes);
  const isRemux = otherInfo.includes('Remux');
  const videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux, source, otherInfo);
  source = getSource(source, otherInfo.join(','), resolution);

  const { knownTags, otherTags } = getTags(otherInfo, ['可替代', '特色']);
  const tags = { ...knownTags };

  const torrentDom = $(`#torrent_torrent_${torrentId}`).find('#subtitles_box').next('blockquote');
  const screenshots = getScreenshots(torrentDom);
  const mediaInfoArray:string[] = [];
  const isBluray = videoType.match(/bluray/i);
  torrentDom.find('.mediainfo-bbcode.hidden,.bdinfo-bbcode.hidden pre').each(function () {
    const textContent = $(this).text();
    if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
      mediaInfoArray.push(textContent);
    }
  });
  // mediainfo
  const mediaInfoOrBDInfo = mediaInfoArray.filter(media => {
    return videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
  });

  const mediaInfo = mediaInfoOrBDInfo.join('\n\n').trim();
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
    mediaInfo,
    mediaInfos,
    description: descriptionData,
    tags: { ...tags, ...mediaTags },
    otherTags,
  };
};
const getCategory = (releaseType:number) => {
  const typeMap = {
    1: 'movie',
    2: 'movie',
    4: 'other',
    3: 'tvPack',
    5: 'concert',
    6: 'movie',
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
const getVideoType = (container:string, isRemux:boolean, source:string, otherInfo:string[]) => {
  const info = otherInfo.join(',');
  let type = '';
  if (isRemux) {
    type = 'remux';
  } else if (info.match(/BD50|BD25|DIY/ig)) {
    type = 'bluray';
  } else if (info.match(/BD66|BD100/ig) || (source.match(/Blu-ray/i) && info.match(/DIY/i))) {
    type = 'uhdbluray';
  } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
    type = 'dvdrip';
  } else if (info.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
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
  const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n|\s)+?)\[\/comparison\]/ig) || [];
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

function getTags (rawTags:string[], exclude:string[] = []) {
  const knownTags:TorrentInfo.MediaTags = {};
  const otherTags:TorrentInfo.MediaTags = {};
  const { editionTags } = PT_SITE.GPW.sourceInfo;
  for (const rawTag of rawTags) {
    const tag = editionTags[rawTag as keyof typeof editionTags];
    if (tag) {
      knownTags[tag] = true;
    } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/(-\d+%)|免费|DVD|BD/i)) {
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
