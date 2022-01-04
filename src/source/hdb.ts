import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getUrlParam, getSize,
  getInfoFromBDInfo, getInfoFromMediaInfo, getSourceFromTitle,
  getFilterBBCode, getBDInfoOrMediaInfo, fetch,
  getTagsFromSubtitle, getPreciseCategory,
} from '../common';

export default async () => {
  const torrentId = getUrlParam('id');
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const editDom = $('#details tr').has('a:contains(Edit torrent)');
  const descriptionDom = editDom.length > 0 ? editDom.prev() : $('#details tr').has('.js-tagcontent').prev();
  let descriptionBBCode = getFilterBBCode(descriptionDom.find('>td')[0]);
  descriptionBBCode = descriptionBBCode.match(/\[quote\]((.|\n)+)\[\/quote\]/)?.[1] ?? '';
  TORRENT_INFO.description = descriptionBBCode;
  const { size, category, videoType } = getBasicInfo();
  const title = $('h1').eq(0).text();
  TORRENT_INFO.title = formatTorrentTitle(title);
  const tags = getTagsFromSubtitle(title);
  const isMovieType = $('.contentlayout h1').length > 0;
  const IMDBLinkDom = isMovieType ? $('.contentlayout h1') : $('#details .showlinks li').eq(1);
  if (isMovieType) {
    const IMDBYear = IMDBLinkDom.prop('lastChild').nodeValue.replace(/\s|\(|\)/g, '');
    const movieName = IMDBLinkDom.find('a').text();
    TORRENT_INFO.movieName = movieName;
    if (!IMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
      TORRENT_INFO.year = matchYear ? matchYear[0] : '';
    } else {
      TORRENT_INFO.year = IMDBYear;
    }
  }
  TORRENT_INFO.imdbUrl = IMDBLinkDom.find('a').attr('href') || '';
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.videoType = videoType;
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
  if (!isBluray) {
    getMediaInfo(torrentId).then(data => {
      if (data) {
        TORRENT_INFO.mediaInfo = data;
        descriptionBBCode += `\n[quote]${data}[/quote]`;
        TORRENT_INFO.description = descriptionBBCode;
        const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(TORRENT_INFO.mediaInfo);
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        TORRENT_INFO.resolution = resolution || '';
        TORRENT_INFO.tags = { ...tags, ...mediaTags };
      }
    });
  } else {
    TORRENT_INFO.mediaInfo = bdinfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(bdinfo || descriptionBBCode);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution || '';
    TORRENT_INFO.tags = { ...tags, ...mediaTags };
  }
  TORRENT_INFO.size = size;
  TORRENT_INFO.screenshots = getImages();
};
const getBasicInfo = () => {
  const videoTypeMap = {
    'Blu-ray/HD DVD': 'bluray',
    Capture: 'hdtv',
    Encode: 'encode',
    Remux: 'remux',
    'WEB-DL': 'web',
  };
  const info = $('th:contains(Category)').next().text();
  const size = $('th:contains(Size)').eq(0).next().text();
  const splitArray = info.split('(');
  const category = splitArray[0].trim().toLowerCase();
  const videoCodec = splitArray[1].split(',')[0].toLowerCase().replace(/\./g, '');
  const videoType = splitArray[1].split(',')[1].replace(/\)/g, '').trim();
  return {
    size: getSize(size),
    category,
    videoCodec,
    videoType: videoTypeMap[videoType as keyof typeof videoTypeMap],
  };
};
const getMediaInfo = async (torrentId:string) => {
  const res = await fetch(`https://hdbits.org/details/mediainfo?id=${torrentId}`, {
    responseType: undefined,
  });
  const data = res.replace(/\r\n/g, '\n');
  return data || '';
};
// 获取截图
const getImages = () => {
  const screenshots = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g) ?? [];
  return screenshots;
};
