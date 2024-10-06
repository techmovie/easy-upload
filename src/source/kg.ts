import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, getInfoFromMediaInfo, getInfoFromBDInfo,
  getBDInfoOrMediaInfo, getAudioCodecFromTitle, getVideoCodecFromTitle, getFilterBBCode,
  getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode,
} from '../common';
interface BasicInfo {
  [key:string]:string
}
export default async () => {
  const {
    InternetLink, Year, Type, Genres,
    Source, Size, Filename = '', RipSpecs = '',
    Subtitles, 'Language(s)': language,
  } = getBasicInfo();
  const torrentFileDom = getBasicInfoDom('Download').find('a.index');
  const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, '');
  const fileName = Filename.replace(/\.\w+$/, ''); // 删除文件后缀名
  const title = formatTorrentTitle(fileName || torrentFileName);
  const imdbUrl = InternetLink?.match(/imdb/) ? InternetLink : '';
  const movieTitles = $('.outer h1').text().split('- ');
  let movieName, movieAkaName;
  if (movieTitles.length >= 2) {
    [movieName, movieAkaName = ''] = movieTitles[1].replace(/\(\d+\)/, '').trim().split(/AKA/i);
  }
  const country = $('.outer h1 img').attr('alt') || '';
  const year = Year;
  const size = Size.match(/\((.+?)\)/)?.[1].replace(/,|(bytes)/g, '') ?? '';
  let tags = getTagsFromSubtitle(title);
  if (Subtitles.match(/Chinese/i)) {
    tags.chinese_subtitle = true;
  }
  if (language.match(/Chinese|Mandarin/i)) {
    tags.chinese_audio = true;
  }
  if (language.match(/Cantonese/)) {
    tags.cantonese_audio = true;
  }
  let category = Type.toLowerCase();
  category = Genres.match(/Animation/i) ? 'cartoon' : category;
  const mediaInfo = $('div.mediainfo').text();
  let source = Source.replace(/-/g, '').toLowerCase();
  if (source === 'tv') {
    source = 'hdtv';
  }
  let genreVideoType = getBasicInfoDom('Genres').find('tr td>img').attr('src')
    ?.match(/genreimages\/(\w+)\.\w+/)?.[1] ?? '';
  genreVideoType = RipSpecs.match(/DVD\sFormat/) ? 'dvdr' : genreVideoType;

  const videoType = getVideoType(title, source, genreVideoType, !!mediaInfo);
  let resolution = title.match(/\d{3,4}(p|i)/i)?.[0] ?? '';
  if (!resolution && resolution.match(/4k|uhd/i)) {
    resolution = '2160p';
  }
  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  if (genreVideoType === 'dvdr' && RipSpecs) {
    TORRENT_INFO.videoCodec = 'mpeg2';
    const audioCodec = RipSpecs.match(/DVD\sAudio:(.+)/)?.[1] ?? '';
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec);
    resolution = '480p';
  }
  const descriptionDom = getBasicInfoDom('Description');
  let descriptionBBCode = getFilterBBCode(descriptionDom.find('article')[0]);
  descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, '');

  const isBluray = videoType.match(/bluray/i);
  const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
  const mediaInfoOrBDInfo = isBluray ? bdinfo : [mediaInfo];
  if (mediaInfoOrBDInfo) {
    TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo?.[0]);
    if (videoCodec !== '' && audioCodec !== '' && mediaResolution !== '') {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      resolution = mediaResolution || '';
      tags = { ...tags, ...mediaTags };
    }
  }
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName.trim();
  TORRENT_INFO.movieAkaName = movieAkaName.trim();
  TORRENT_INFO.source = source;
  TORRENT_INFO.size = Number(size);
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.area = getAreaCode(country);
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
};
const getBasicInfo = () => {
  const basicInfo:BasicInfo = {
  };
  $('.outer h1~table:first>tbody>tr').each((index, element) => {
    const key = $(element).find('td.heading').text().replace(/\s/g, '');
    const value = $(element).find('td.heading').next('td').text();
    if (value) {
      basicInfo[key] = value.replace(/\n/g, '').trim();
    }
  });
  return basicInfo;
};
const getVideoType = (title:string, source:string, genreVideoType:string, hasMediainfo:boolean) => {
  if (source) {
    if (source === 'bluray') {
      const blurayFlag = genreVideoType === 'bluray' || !hasMediainfo;
      return blurayFlag ? 'bluray' : 'encode';
    } else if (source === 'dvd') {
      const dvdFlag = genreVideoType === 'dvdr' || !hasMediainfo;
      return dvdFlag ? 'dvd' : 'dvdrip';
    }
    return source;
  }
  if (title.match(/UHD/i) && title.match(/Blu-Ray/i)) {
    return 'uhdbluray';
  } else if (title.match(/Blu-Ray/i)) {
    return 'bluray';
  } else if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/dvdrip/i)) {
    return 'dvdrip';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return '';
};
const getBasicInfoDom = (key:string) => {
  return $(`.outer h1~table:first>tbody>tr td:contains(${key})`).next('td');
};
