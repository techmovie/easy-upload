import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getUrlParam, formatTorrentTitle,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  getSize, getFilterBBCode, getSourceFromTitle, getScreenshotsFromBBCode,
  getVideoCodecFromTitle, getAudioCodecFromTitle, getTagsFromSubtitle,
} from '../common';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }

  const torrentInfo = await getTorrentInfo(torrentId);

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  Object.assign(TORRENT_INFO, torrentInfo);

  return TORRENT_INFO;
};

async function getTorrentInfo (torrentId:string) {
  const imdbUrl = $('.metalinks a[href*="imdb.com/title"]').attr('href');
  const torrentContainer = $(`#torrent${torrentId}`);
  const [showName] = $('.details>h2').text()?.split('-') ?? [];
  const torrentName = torrentContainer.find('.permalink').text().trim();
  const size = torrentContainer.find('>td').eq(1).text().trim();

  const source = getSourceFromTitle(torrentName);
  const descriptionContainer = $(`#content${torrentId}`).clone();
  descriptionContainer.find('>div').remove();
  const description = getFilterBBCode(descriptionContainer[0]);
  const screenshots = await getScreenshotsFromBBCode(description);
  const isBluray = !!$(`#files_${torrentId}`).text().match(/iso|m2ts/i);
  const videoType = getVideoType({ torrentName, source, isBluray });

  const mediaInfo = $('div.mediainfo').text();
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { resolution, videoCodec, audioCodec, mediaTags: tags } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle(torrentName);

  const category = getCategory(torrentName);
  return {
    title: formatTorrentTitle(torrentName),
    imdbUrl,
    source,
    size: getSize(size),
    resolution,
    movieName: showName.replace(/\n/g, '').trim(),
    description,
    videoType,
    mediaInfo,
    videoCodec,
    audioCodec,
    tags,
    screenshots,
    category,
  };
}

const getVideoType = ({ torrentName = '', source = '', isBluray = false }) => {
  if (torrentName.match(/remux/i)) {
    return 'remux';
  } else if (source.match(/bluray/) && !isBluray) {
    return 'encode';
  }
  return source;
};

function getCategory (season:string) {
  return season.match(/S\d+E(P)\d+/i) ? 'tv' : 'tvPack';
}

function getSpecsFromTitle (torrentName:string) {
  return {
    videoCodec: getVideoCodecFromTitle(torrentName),
    audioCodec: getAudioCodecFromTitle(torrentName),
    mediaTags: getTagsFromSubtitle(torrentName),
    resolution: torrentName.match(/\d{3,4}(p|i)/)?.[0],
  };
}
