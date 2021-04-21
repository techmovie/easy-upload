import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromMediaInfo, getInfoFromBDInfo,
  getAudioCodecFromTitle, getVideoCodecFromTitle, getFilterBBCode,
  getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode,
  getUrlParam, getSize, getSourceFromTitle,
} from '../common';

export default () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  const torrentFilePathDom = $(`#files_${torrentId} .filelist_path`);
  const torrentFileDom = $(`#files_${torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
  const torrentFileName = torrentFilePathDom.text()?.replace(/\//g, '') || torrentFileDom.text()?.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, '');
  const title = formatTorrentTitle(torrentFileName);
  const imdbUrl = $('.imovie_title .tooltip.imdb_icon').attr('href');
  const poster = $('.imdb_block.poster_box .imgbox img').attr('src');
  const titleText = $('#scontent h2').text();
  const [movieName = '', movieAkaName = ''] = titleText.match(/(.+?)\[/)?.[1].split('/') ?? [];
  const year = titleText.match(/\[(\d+)\]/)?.[1] ?? '';

  let tags = getTagsFromSubtitle(title);
  const source = getSourceFromTitle(title);
  const category = title.match(/Season\s+\d+/) ? 'tv' : 'movie';
  const size = getSize($(`#torrent${torrentId} td`).eq(1).text());
  const infoArray = $(`#torrent${torrentId} td:first-child>a`).text().replace(/\s/g, '').split('/');
  let [resolution, videoType] = infoArray;
  videoType = getVideoType(videoType, resolution);
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const descriptionDom = $(`#torrent_${torrentId} #description`);
  const descriptionBBCode = getFilterBBCode(descriptionDom[0]);

  getMediaInfo(torrentId).then(data => {
    if (data) {
      TORRENT_INFO.mediaInfo = data;
      const isBluray = videoType.match(/bluray/i);
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
    console.log(TORRENT_INFO);
  });
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = title;
  TORRENT_INFO.year = year;
  TORRENT_INFO.poster = poster;
  TORRENT_INFO.movieName = movieName.trim();
  TORRENT_INFO.movieAkaName = movieAkaName.trim();
  TORRENT_INFO.source = source;
  TORRENT_INFO.size = size;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
};

const getMediaInfo = (torrentId) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://uhdbits.org/torrents.php?action=mediainfo&id=${torrentId}`,
      onload (res) {
        const data = res.responseText;
        if (res.status !== 200 || !data) {
          reject(new Error('请求失败'));
        }
        resolve(data.replace(/\r\n/g, '\n'));
      },
    });
  });
};
const getVideoType = (videoType, resolution) => {
  videoType = videoType.replace('-', '').toLowerCase();
  if (videoType.match(/bluray/)) {
    if (resolution === '2160p') {
      return 'uhdbluray';
    }
  } else if (videoType.match(/web/)) {
    return 'web';
  } else if (videoType.match(/x264|x265/)) {
    return 'encode';
  } else if (videoType.match(/x264|x265/)) {
    return 'encode';
  } else if (videoType.match(/WEB/i)) {
    return 'web';
  }
  return videoType;
};
