import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, PT_SITE, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getSpecsFromMediainfo
  , getAudioCodecFromTitle, getVideoCodecFromTitle, getScreenshotsFromBBCode,
  getSourceFromTitle, getAreaCode,
  getBDInfoOrMediaInfo, GMFetch,
} from '../common';

import type { TorrentDetailInfo, IMDbInfo } from '../types/mt';

const MT_SPECS_MAP = {
  source: {
    8: 'web',
    1: 'bluray',
    3: 'dvd',
    4: 'hdtv',
    5: 'hdtv',
    6: 'other',
    7: 'cd',
  },
  medium: {
    1: 'bluray',
    2: 'hddvd',
    3: 'remux',
    7: 'encode',
    4: 'bluray',
    5: 'hdtv',
    6: 'dvd',
    8: 'cd',
    10: 'web',
  },
  standard: {
    1: '1080p',
    2: '1080i',
    3: '720p',
    5: '480p',
    6: '2160p',
  },
};
type resolution = '2160p' | '1080p' | '1080i' | '720p' | '480p' | '576p'
export default async () => {
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url:string) {
    this.addEventListener('readystatechange', async function () {
      if (this.readyState === 4) {
        if (url.includes('/api/torrent/detail')) {
          const detailData = JSON.parse(this.responseText);
          if (detailData.code === '0') {
            const info = await getTorrentInfo(detailData.data);
            Object.assign(TORRENT_INFO, info);
          }
        }
        if (url.includes('/api/torrent/imdbInfo')) {
          const imdbData = JSON.parse(this.responseText);
          if (imdbData.code === '0') {
            const imdbInfo = getMovieInfo(imdbData.data);
            Object.assign(TORRENT_INFO, imdbInfo);
          }
        }
      }
    });
    // eslint-disable-next-line prefer-rest-params
    originalOpen.apply(this, arguments);
  };
};

const getTorrentInfo = async (info: TorrentDetailInfo): Promise<TorrentInfo.Info> => {
  const { name, imdb, douban, category, source, medium, standard, size, mediainfo, descr, smallDescr } = info;
  const title = formatTorrentTitle(name);
  const year = title?.match(/(19|20)\d{2}/g) ?? [];
  let resolution = getResolution(standard);
  const videoType = getVideoType(medium, title, resolution);
  let sourceName = getSource(source, resolution);
  if (!sourceName) {
    sourceName = getSourceFromTitle(title);
  }
  let videoCodec = getVideoCodecFromTitle(title);
  const audioCodec = getAudioCodecFromTitle(title);
  const screenshots = await getScreenshotsFromBBCode(descr);
  let mediaTags = {};
  let mediaInfoOrBDInfo = [mediainfo];
  const isBluray = !!videoType?.match(/bluray/i);
  if (!mediaInfoOrBDInfo) {
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descr);
    mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  }
  if (mediaInfoOrBDInfo) {
    const infoString = mediaInfoOrBDInfo?.[0].replace(/\n{1,}/g, '\n');
    const specs = await getSpecsFromMediainfo(isBluray, infoString);
    videoCodec = specs.videoCodec ? specs.videoCodec : videoCodec;
    resolution = specs.resolution ? specs.resolution as resolution : resolution;
    mediaTags = specs.mediaTags || {};
  }
  let area = '';
  const areaMatch = descr.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)?.[2];
  if (areaMatch) {
    area = getAreaCode(areaMatch);
  }
  await getTorrentURL();

  return {
    sourceSite: CURRENT_SITE_NAME,
    sourceSiteType: CURRENT_SITE_INFO.siteType,
    subtitle: smallDescr,
    title,
    area,
    imdbUrl: imdb,
    doubanUrl: douban,
    size: parseInt(size, 10),
    category: getCategory(category),
    videoType,
    resolution,
    source: sourceName,
    videoCodec,
    audioCodec,
    screenshots,
    mediaInfos: mediaInfoOrBDInfo,
    description: descr,
    year: year.length > 0 ? year.pop() as string : '',
    movieName: '',
    tags: { ...mediaTags },
  };
};

const getCategory = (id:string) => {
  const catMap = PT_SITE.MTeam.category.map;
  for (const [key, value] of Object.entries(catMap)) {
    if (value.includes(id)) {
      return key;
    }
  }
  return '';
};
const getSource = (id: keyof typeof MT_SPECS_MAP.source, resolution: resolution) => {
  const sourceName = MT_SPECS_MAP.source[id];
  if (sourceName === 'bluray' && resolution === '2160p') {
    return 'uhdbluray';
  }
  return sourceName;
};

const getResolution = (id:keyof typeof MT_SPECS_MAP.standard) => {
  return MT_SPECS_MAP.standard[id] as resolution;
};
const getVideoType = (id:keyof typeof MT_SPECS_MAP.medium, title:string, resolution: resolution) => {
  const videoType = MT_SPECS_MAP.medium[id];
  if (videoType === 'bluray' && resolution === '2160p') {
    return 'uhdbluray';
  } else if (videoType === 'dvd' && title.match(/dvdrip/i)) {
    return 'dvdrip';
  }
  return videoType;
};

const getMovieInfo = (data: IMDbInfo) => {
  const { year, title, photo } = data;
  return {
    year,
    movieName: title,
    poster: photo.full || photo.thumb,
  };
};

const getTorrentURL = async () => {
  const torrentId = location.pathname.match(/detail\/(\d+)/)?.[1] ?? '';
  if (!torrentId) {
    return '';
  }
  const formData = new FormData();
  formData.append('id', torrentId);
  const response = await GMFetch('https://api.m-team.cc/api/torrent/genDlToken', {
    method: 'POST',
    data: formData,
    headers: {
      Authorization: localStorage.getItem('auth') || '',
      'User-Agent': navigator.userAgent,
    },
  });
  CURRENT_SITE_INFO.torrentLink = response?.data ?? '';
};
