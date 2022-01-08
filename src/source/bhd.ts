import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO, PT_SITE } from '../const';
import {
  formatTorrentTitle, getAreaCode, getInfoFromMediaInfo,
  getInfoFromBDInfo, getSize, getFilterBBCode,
  getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode,
} from '../common';

export default async () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const basicInfo = getBasicInfo();
  const editionTags = getEditionTags(basicInfo);
  const { Category, Name, Source, Type, Size } = basicInfo;
  TORRENT_INFO.size = getSize(Size);
  TORRENT_INFO.title = formatTorrentTitle(Name);
  const tags = getTagsFromSubtitle(TORRENT_INFO.title);
  const TMDBYear = $('.movie-heading a:last').text();
  const movieName = $('.movie-heading a:first').text();
  if (!TMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
    TORRENT_INFO.year = matchYear ? matchYear[0] : '';
  } else {
    TORRENT_INFO.year = TMDBYear;
  }

  const descriptionDom = $('.panel-heading:contains(Description)').next('.panel-body').find('.forced-nfo');
  const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  const { category: movieCat, countries, imdbUrl } = getMovieDetails();
  TORRENT_INFO.movieName = movieName;
  let category = Category.toLowerCase().replace(/s/, '');
  category = movieCat === 'Animation' ? 'cartoon' : category;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.source = getSource(Source, Type);
  TORRENT_INFO.area = getAreaCode(countries);
  TORRENT_INFO.videoType = getVideoType(Type);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const mediaInfo = $('#stats-full code').text();
  TORRENT_INFO.mediaInfo = mediaInfo;
  TORRENT_INFO.mediaInfos = [mediaInfo];
  TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  TORRENT_INFO.originalDescription = `${descriptionBBCode}`;
  TORRENT_INFO.description = `\n[quote]${mediaInfo}[/quote]\n${descriptionBBCode}`;
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { videoCodec, audioCodec, resolution = '', mediaTags } = getInfoFunc(mediaInfo);
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = { ...tags, ...mediaTags, ...editionTags.knownTags };
  TORRENT_INFO.otherTags = editionTags.otherTags;
  TORRENT_INFO.imdbUrl = imdbUrl;
};
interface BasicInfo {
  Category: string
  Name:string
  Source: string
  Type: string
  Size: string
  Video: string
  Audio: string
  Hybrid: string
  Edition: string
  Region: string
  Extras: string
}
const getBasicInfo = () => {
  const basicInfo:BasicInfo = {
    Category: '',
    Name: '',
    Source: '',
    Type: '',
    Size: '',
    Video: '',
    Audio: '',
    Hybrid: '',
    Edition: '',
    Region: '',
    Extras: '',
  };
  $('.dotborder').each((index, element) => {
    const key = $(element).find('td:first').text() as keyof typeof basicInfo;
    const value = $(element).find('td:last').text();
    basicInfo[key] = value.replace(/\n/g, '').trim();
  });
  console.log(basicInfo);
  return basicInfo;
};
const getMovieDetails = () => {
  const infoList = $('.movie-details a');
  const movieDetail = {
    category: '',
    countries: '',
    imdbUrl: '',
  };
  infoList.each((index, element) => {
    const urlParams = $(element).attr('href')?.replace(/.+\//g, '').split('=') ?? '';
    if (urlParams.length > 1) {
      let key = decodeURI(urlParams[0]);
      const value = urlParams[1];
      if (key === 'g[]') {
        key = 'category';
      }
      movieDetail[key as keyof typeof movieDetail] = value;
    } else if (urlParams?.[0].match(/tt\d+/)) {
      movieDetail.imdbUrl = urlParams[0];
    }
  });
  return movieDetail;
};
const getSource = (source:string, resolution:string) => {
  if (resolution.match(/BD100|BD66/i)) {
    return 'uhdbluray';
  }
  if (source.match(/Blu-ray/i) && resolution.match(/UHD/i)) {
    return 'uhdbluray';
  }
  if (source.match(/WEB|WEB-DL/i)) {
    return 'web';
  }
  return source.replace(/-/g, '').toLowerCase();
};
const getVideoType = (type:string) => {
  type = type.replace(/\s/g, '');
  if (type.match(/Remux/i)) {
    return 'remux';
  } else if (type.match(/BD50|BD25/i)) {
    return 'bluray';
  } else if (type.match(/UHD50|UHD66|UHD100/i)) {
    return 'uhdbluray';
  } else if (type.match(/DVD5|DVD9/i)) {
    return 'dvd';
  } else if (type.match(/\d{3,4}p/i)) {
    return 'encode';
  }
  return type;
};

const getEditionTags = (basicInfo:BasicInfo) => {
  const editionTags = PT_SITE.BeyondHD.sourceInfo.editionTags;
  const knownTags:TorrentInfo.MediaTags = {
  };
  const otherTags = {
    Hybrid: false,
  };
  const { Video, Audio, Edition, Extras, Hybrid } = basicInfo;
  const text = [Video, Audio, Edition, Extras].filter(v => Boolean(v)).join(' / ');
  const mediaTags = Object.entries(editionTags);

  for (const [source, target] of mediaTags) {
    if (text.includes(source)) {
      knownTags[target] = true;
    }
  }
  if (Hybrid) {
    otherTags.Hybrid = true;
  }
  // fix hdr10 hdr10+
  if (knownTags.hdr10_plus && knownTags.hdr) {
    delete knownTags.hdr;
  }
  return {
    knownTags,
    otherTags,
  };
};
