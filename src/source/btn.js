import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getUrlParam, formatTorrentTitle, getAreaCode,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  getBDInfoOrMediaInfo,
  getFilterBBCode, fetch,
} from '../common';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }

  const torrentInfo = getTorrentInfo({ torrentId });
  const showInfo = await getShowInfo();

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  Object.assign(TORRENT_INFO, torrentInfo);
  Object.assign(TORRENT_INFO, showInfo);

  return TORRENT_INFO;
};

function getTorrentInfo ({ torrentId }) {
  const torrentName = $(`#torrent_${torrentId}`).prev().find('> td').text().replace(/»/, '').trim();
  const { container, source } = getSpecs({ torrentId });
  const seasonTitle = $('#content > div > h2').contents().last().text().trim();
  const [season, year] = seasonTitle.match(/(.*) \[(\d+)\]/).slice(1);
  const showName = $('#content > div > h2 > a > img').attr('alt');
  const description = getFilterBBCode($(`#torrent_${torrentId} > td > blockquote`).last()[0]);
  const videoType = getVideoType({ torrentName, source });
  const isBluray = videoType.match(/bluray/i);
  const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
  const mediaInfo = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { resolution, videoCodec, audioCodec, mediaTags: tags } = getInfoFunc(mediaInfo);
  const category = getCategory({ season });

  return {
    title: formatTorrentTitle(torrentName),
    container,
    source,
    resolution,
    year,
    showName,
    description,
    videoType,
    mediaInfo,
    videoCodec,
    audioCodec,
    tags,
    category,
  };
}

async function getShowInfo () {
  const serieUrl = $('#content > .thin > h2 > a').prop('href');
  const html = await fetch(serieUrl);
  const infoHtml = html.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)[1];
  const infoDom = new DOMParser().parseFromString(infoHtml, 'text/html');
  const info = Object.fromEntries(Array.from(infoDom.querySelectorAll('tr')).map(tr => {
    const tds = Array.from(tr.children);
    return [tds[0].innerText.trim(), tds[1]];
  }));
  const country = info['Country:'].innerText;
  const imdbUrl = info['External Links:'].innerHTML.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)?.[0];

  return {
    area: getAreaCode(country),
    imdbUrl,
  };
}

const getVideoType = ({ torrentName, source }) => {
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
  } else {
    return '';
  };
};

function getCategory ({ season }) {
  return season.match(/season/i) ? 'tvPack' : 'tv';
};

function getSpecs ({ torrentId }) {
  // MKV / H.264 / NFO / HDTV / 1080p / Scene
  // ISO / H.265 / BD50 / 2160p / Scene
  const rawSpecs = $(`#torrent_${torrentId}`).prev().prev().find('> td > a').text().replace(/»/, '').split('/').map(v => v.trim());
  const specs = rawSpecs.filter(v => !['NFO'].includes(v));
  const [container, videoCodec, source, resolution, group] = specs;
  return {
    container,
    videoCodec,
    source,
    resolution,
    group,
  };
};
