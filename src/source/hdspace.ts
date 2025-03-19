import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getAreaCode, parseMedia, getInfoFromBDInfo,
  getBDInfoOrMediaInfo, getAudioCodecFromTitle, convertSizeStringToBytes, getVideoCodecFromTitle, getFilterBBCode,
  getSourceFromTitle, getTagsFromSubtitle, getPreciseCategory, extractImgsFromBBCode, GMFetch,
} from '../common';
import $ from 'jquery';

export default async () => {
  const { Name, Category, Size, Description } = getBasicInfo();
  const title = formatTorrentTitle(Name);
  let tags = getTagsFromSubtitle(title);
  const category = getCategory(Category, title);
  let resolution = title.match(/\d{3,4}(p|i)/i)?.[0];
  if (!resolution && title.match(/4k|uhd/i)) {
    resolution = '2160p';
  }
  const videoType = getVideoType(Category, title);
  const source = getSourceFromTitle(title);

  TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
  TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
  const div = document.createElement('div');
  div.innerHTML = Description.html();
  $(div).find('#slidenfo,a[href*="#nfo"]').remove();
  const descriptionBBCode = getFilterBBCode(div);

  const isBluray = videoType.match(/bluray/i);
  const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);

  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  if (mediaInfoOrBDInfo) {
    TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : parseMedia;
    const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo?.[0]);
    if (videoCodec !== '' && audioCodec !== '' && resolution !== '') {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      resolution = mediaResolution;
      tags = { ...tags, ...mediaTags };
    }
  }
  const imdbId = $('#imdb').next('script').text()?.match(/mid=(\d+)/)?.[1] ?? '';
  const imdbData = await GMFetch<string>(`${CURRENT_SITE_INFO.url}/getimdb.php?mid=${imdbId}`);
  const imdbDom = new DOMParser().parseFromString(imdbData, 'text/html');
  const imdbUlrDom = $('a[href*="imdb.com/title"]', imdbDom);
  const imdbUrl = imdbUlrDom.attr('href');
  const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, '');
  const year = imdbUlrDom.text().match(/\((\d{4})\)/)?.[1] ?? '';
  const country = $('td:contains("Country")', imdbDom).next('td').text();

  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.year = year;
  TORRENT_INFO.movieName = movieName;
  TORRENT_INFO.source = source;
  TORRENT_INFO.size = convertSizeStringToBytes(Size);
  TORRENT_INFO.videoType = videoType;
  TORRENT_INFO.resolution = resolution || '';
  TORRENT_INFO.area = getAreaCode(country);
  TORRENT_INFO.tags = tags;
  TORRENT_INFO.imdbUrl = imdbUrl || '';
  TORRENT_INFO.description = descriptionBBCode;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.screenshots = await extractImgsFromBBCode(descriptionBBCode);
};
const getBasicInfo = () => {
  const basicInfo: {
    Name: string, Category: string, Size: string, Description: JQuery<HTMLElement>
  } = {
    Name: '', Category: '', Size: '', Description: $(''),
  };
  $('#mcol .header').each(function () {
    const key = $(this).text().trim();
    if (!basicInfo[key as keyof typeof basicInfo]) {
      if (key === 'Description') {
        basicInfo.Description = $(this).next('td');
      } else {
        type info = Omit<typeof basicInfo, 'Description'>;
        basicInfo[key as keyof info] = $(this).next('td').text()?.replace(/\n/g, '').trim();
      }
    }
  });
  return basicInfo;
};
const getCategory = (cat:string, title:string) => {
  if (cat.match(/movie/i)) {
    return 'movie';
  } else if (cat.match(/hdtv/i)) {
    return 'tv';
  } else if (cat.match(/doc/i)) {
    return 'documentary';
  } else if (cat.match(/Animation/i)) {
    return 'cartoon';
  } else if (cat.match(/Music\sVideos/i)) {
    return 'concert';
  } else if (title.match(/S\d+(E\d+)?/i)) {
    return 'tv';
  }
  return 'movie';
};
const getVideoType = (type:string, title:string) => {
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/Blu-Ray/i) && title.match(/2160p|4k|uhd/i)) {
    return 'uhdbluray';
  } else if (type.match(/Blu-Ray/i)) {
    return 'bluray';
  }
  if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/blu-ray/i) && title.match(/2160p|4k|uhd/i)) {
    return 'uhdbluray';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return '';
};
