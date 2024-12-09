import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getUrlParam, formatTorrentTitle, getAreaCode,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  getBDInfoOrMediaInfo, getSize,
  getFilterBBCode, fetch, getSourceFromTitle,
} from '../common';
import $ from 'jquery';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }

  const torrentInfo = getTorrentInfo(torrentId);
  const showInfo = await getShowInfo();

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  Object.assign(TORRENT_INFO, torrentInfo);
  Object.assign(TORRENT_INFO, showInfo);

  return TORRENT_INFO;
};

function getTorrentInfo (torrentId:string) {
  const torrentName = $(`#torrent_${torrentId}`).prev().find('> td').text().replace(/»/, '').trim();
  const { container, source, size } = getSpecs(torrentId);
  const seasonTitle = $('#content > div > h2').contents().last().text().trim();
  const [season = '', year = ''] = seasonTitle?.match(/(.*) \[(\d+)\]/)?.slice(1) ?? [];
  const movieName = $('#content > div > h2 > a > img').attr('alt')?.replace(/\(\d+\)/, '').trim();
  const description = getFilterBBCode($(`#torrent_${torrentId} > td > blockquote`).last()[0]);
  const videoType = getVideoType({ torrentName, source });
  const isBluray = videoType.match(/bluray/i);
  const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
  const mediaInfos = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { resolution, videoCodec, audioCodec, mediaTags: tags } = getInfoFunc(mediaInfos?.[0]);
  const category = getCategory(season);
  const sourceFrom = getSourceFromTitle(torrentName);

  const torrentLink = $(`#torrent_${torrentId}`).prev().prev().find('a[title="Download"]').attr('href');
  CURRENT_SITE_INFO.torrentLink = torrentLink;

  return {
    title: formatTorrentTitle(torrentName),
    format: container.toLowerCase(),
    source: sourceFrom,
    size: getSize(size),
    resolution,
    year,
    movieName,
    description,
    videoType,
    mediaInfos,
    videoCodec,
    audioCodec,
    tags,
    category,
  };
}

async function getShowInfo () {
  const seriesUrl = $('#content > .thin > h2 > a').prop('href');
  const html = await fetch(seriesUrl, {
    responseType: undefined,
  });
  const infoHtml = html.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)[1];
  const infoDom = new DOMParser().parseFromString(infoHtml, 'text/html');
  const info = Object.fromEntries(Array.from(infoDom.querySelectorAll('tr')).map(tr => {
    const tds = Array.from(tr.children);
    return [(tds[0] as HTMLTableCellElement).innerText.trim(), tds[1]];
  }));
  const country = (info['Country:'] as HTMLTableCellElement).innerText;
  const imdbUrl = info['External Links:'].innerHTML.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)?.[0];

  return {
    area: getAreaCode(country),
    imdbUrl,
  };
}

const getVideoType = ({ torrentName = '', source = '' }) => {
  if (torrentName.match(/remux/i)) {
    return 'remux';
  } else if (['BD50', 'BD25'].includes(source)) {
    return 'bluray';
  } else if (['BD66', 'BD100'].includes(source)) {
    return 'uhdbluray';
  } else if (['WEB-DL'].includes(source)) {
    return 'web';
  } else if (['HDTV'].includes(source)) {
    return 'encode';
  }
  return '';
};

function getCategory (season:string) {
  return season.match(/season/i) ? 'tvPack' : 'tv';
}

function getSpecs (torrentId:string) {
  // MKV / H.264 / NFO / HDTV / 1080p / Scene
  // ISO / H.265 / BD50 / 2160p / Scene
  const specsDom = $(`#torrent_${torrentId}`).prev().prev();
  const rawSpecs = specsDom.find('> td > a').text().replace(/»/, '').split('/').map(v => v.trim());
  const specs = rawSpecs.filter(v => !['NFO'].includes(v));
  const size = specsDom.find('> td').next('td').text().replace(/\s/g, '');
  const [container, videoCodec, source, resolution, group] = specs;
  return {
    container,
    videoCodec,
    source,
    resolution,
    group,
    size,
  };
}
