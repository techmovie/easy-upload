import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromMediaInfo, getInfoFromBDInfo,
  getAudioCodecFromTitle, getVideoCodecFromTitle, getFilterBBCode,
  getTagsFromSubtitle, getPreciseCategory, extractImgsFromBBCode,
  getUrlParam, convertSizeStringToBytes, getSourceFromTitle, GMFetch,
} from '../common';
import $ from 'jquery';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  const torrentFilePathDom = $(`#files_${torrentId} .filelist_path`);
  const torrentFileDom = $(`#files_${torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
  const torrentFileName = torrentFilePathDom.text()?.replace(/\//g, '') || torrentFileDom.text()?.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, '');
  const title = formatTorrentTitle(torrentFileName);
  const imdbUrl = $('.imovie_title .tooltip.imdb_icon').attr('href') || '';
  const titleText = $('#scontent h2').text();
  const [movieName = '', movieAkaName = ''] = titleText.match(/(.+?)\[/)?.[1].split('/') ?? [];
  const year = titleText.match(/\[(\d+)\]/)?.[1] ?? '';

  const torrentLink = $(`#torrent${torrentId}`).find('a[href*="action=download"]').attr('href');
  CURRENT_SITE_INFO.torrentLink = torrentLink;

  let tags = getTagsFromSubtitle(title);
  const source = getSourceFromTitle(title);
  const category = title.match(/Season\s+\d+/) ? 'tv' : 'movie';
  const size = convertSizeStringToBytes($(`#torrent${torrentId} td`).eq(1).text());
  const infoArray = $(`#torrent${torrentId} td:first-child>a`).text().replace(/\s/g, '').split('/');
  let [resolution, ...specArray] = infoArray;
  let videoType = specArray.join('|');
  videoType = getVideoType(videoType, resolution);
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const descriptionDom = $(`#torrent_${torrentId} #description`);
  let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  descriptionBBCode = descriptionBBCode.replace(/https?:\/\/anonym\.to\/\?/g, '');
  TORRENT_INFO.originalDescription = descriptionBBCode;

  getMediaInfo(torrentId).then(async data => {
    if (data) {
      TORRENT_INFO.mediaInfos = [data];
      TORRENT_INFO.description = `${descriptionBBCode}\n[quote]${data}[/quote]`;
      TORRENT_INFO.screenshots = await extractImgsFromBBCode(descriptionBBCode);
      TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
      const isBluray = data.match(/\.(iso|m2ts|mpls)/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, mediaTags, resolution: mediaResolution } = getInfoFunc(data);
      if (resolution === 'mHD' && mediaResolution) {
        resolution = mediaResolution;
      }
      if (videoCodec !== '' && audioCodec !== '') {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        tags = { ...tags, ...mediaTags };
      }
    }
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.resolution = resolution;
  });
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = title;
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName.trim();
  TORRENT_INFO.movieAkaName = movieAkaName.trim();
  TORRENT_INFO.source = source;
  TORRENT_INFO.size = size;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.videoType = videoType;
};

const getMediaInfo = async (torrentId:string) => {
  const url = `/torrents.php?action=mediainfo&id=${torrentId}`;
  const data = await GMFetch<string>(url);
  return data || '';
};
const getVideoType = (videoType:string, resolution:string) => {
  videoType = videoType.replace('-', '').toLowerCase();
  if (videoType.match(/bluray/)) {
    if (resolution === '2160p') {
      return 'uhdbluray';
    }
    return 'bluray';
  } else if (videoType.match(/web/)) {
    return 'web';
  } else if (videoType.match(/x264|x265/)) {
    return 'encode';
  } else if (videoType.match(/WEB/i)) {
    return 'web';
  }
  return videoType;
};
