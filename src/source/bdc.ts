import { PT_SITE, TORRENT_INFO, CURRENT_SITE_NAME } from '../const';
import {
  formatTorrentTitle, getAudioCodecFromTitle, getSize,
  getSourceFromTitle, getVideoCodecFromTitle, getFilterBBCode,
  getBDInfoOrMediaInfo, getScreenshotsFromBBCode, getTagsFromSubtitle,
  getAreaCode,
} from '../common';
export default async () => {
  const torrentInfo = await getTorrentInfo();
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = PT_SITE.Bdc.siteType;
  const imdbInfo = getIMDBInfo();
  Object.assign(TORRENT_INFO, torrentInfo, imdbInfo);
  return TORRENT_INFO;
};
async function getTorrentInfo () {
  const containerDom = $('.yui-content #details');
  const torrentName = containerDom.find('>table>tbody>tr:first').text();
  const size = containerDom.find('>table:first-child>tbody>tr:nth-child(5) td:last').text();
  const isTV = containerDom.find('>table:first-child>tbody>tr:nth-child(4) td:last').text()?.includes('TV');
  const source = getSourceFromTitle(torrentName);
  const videoCodec = getVideoCodecFromTitle(torrentName);
  const audioCodec = getAudioCodecFromTitle(torrentName);
  const videoType = getVideoType({ torrentName, source });
  const description = getFilterBBCode(containerDom.find('table').eq(4).find('tr:last-child td')[0]);
  const isBluray = videoType.match(/bluray/i);
  const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
  const mediaInfos = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
  const screenshots = await getScreenshotsFromBBCode(description);
  const tags = getTagsFromSubtitle(torrentName);
  const year = torrentName.match(/(18|19|20)\d{2}/g) ?? [];
  return {
    title: formatTorrentTitle(torrentName),
    size: getSize(size),
    source,
    videoCodec,
    audioCodec,
    videoType,
    description,
    mediaInfos,
    resolution: getResolution(torrentName),
    tags,
    screenshots,
    category: isTV ? 'tv' : 'movie',
    year: year.pop() || '',
  };
}

function getVideoType ({ torrentName = '', source = '' }) {
  if (torrentName.match(/remux/i)) {
    return 'remux';
  } else if (['BD50', 'BD25'].includes(source)) {
    return 'bluray';
  } else if (['BD66', 'BD100'].includes(source)) {
    return 'uhdbluray';
  } else if (['web'].includes(source)) {
    return 'web';
  } else if (['HDTV'].includes(source)) {
    return 'hdtv';
  }
  return 'encode';
}

function getResolution (title:string) {
  title = title.toLowerCase();
  if (title.match(/4k|2160|UHD/ig)) {
    return '2160p';
  } else if (title.match(/1080(p)?/ig)) {
    return '1080p';
  } else if (title.match(/1080i/ig)) {
    return '1080i';
  } else if (title.match(/720(p)?/ig)) {
    return '720p';
  } else if (title.match(/sd/ig)) {
    return '480p';
  }
  return '';
}
function getIMDBInfo () {
  const infoDom = $('#imdbdetails tr td').last();
  const imdbUrl = infoDom.find('a[href*="imdb.com/title"]').attr('href');
  const info = Object.fromEntries(Array.from(infoDom.find('b')).map(text => {
    return [$(text).text().replace(':', ''), $(text)[0]?.nextSibling?.nodeValue?.trim()];
  }));
  const movieName = $('#imdbdetails tr').first().text();
  return {
    imdbUrl,
    movieName,
    area: getAreaCode(info.Country as string),
  };
}
