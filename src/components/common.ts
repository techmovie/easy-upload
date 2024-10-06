import {
  CURRENT_SITE_NAME,
  PT_SITE, TORRENT_INFO,
} from '../const';
import {
  getIMDBIdByUrl,
} from '../common';
const getQuickSearchUrl = (siteName:string) => {
  const siteInfo = PT_SITE[siteName as keyof typeof PT_SITE] as Site.SiteInfo;
  const searchConfig = siteInfo.search;
  const { params = {}, imdbOptionKey, nameOptionKey, path, replaceKey } = searchConfig;
  let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl as string);
  let searchKeyWord = '';
  const { movieAkaName, movieName, title, musicJson } = TORRENT_INFO;
  if (imdbId && !siteName.match(/(nzbs.in|HDF|TMDB|豆瓣读书|TeamHD|NPUBits)$/) &&
  siteInfo.siteType !== 'AvistaZ') {
    if (replaceKey) {
      searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
    } else {
      searchKeyWord = imdbId;
    }
  } else if (CURRENT_SITE_NAME.match(/RED|DicMusic|Orpheus/)) {
    const { year = '', name = '' } = musicJson?.group ?? {};
    searchKeyWord = `${name} ${year}`;
  } else {
    searchKeyWord = movieAkaName || movieName || title;
    imdbId = '';
  }
  let searchParams = Object.keys(params).map(key => {
    return `${key}=${params[key]}`;
  }).join('&');
  if (imdbId) {
    searchParams = searchParams.replace(/\w+={name}&{0,1}?/, '')
      .replace(/{imdb}/, searchKeyWord).replace(/{optionKey}/, imdbOptionKey || '');
  } else {
    if (searchParams.match(/{name}/)) {
      searchParams = searchParams.replace(/\w+={imdb}&{0,1}?/, '').replace(/{name}/, searchKeyWord);
    } else {
      searchParams = searchParams.replace(/{imdb}/, searchKeyWord);
    }
    searchParams = searchParams.replace(/{optionKey}/, nameOptionKey || '');
  }

  let url = `${siteInfo.url + path}${searchParams ? `?${searchParams}` : ''}`;
  if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD|OpenSub/)) {
    url = url.replace(/{name}/, searchKeyWord);
  }
  return url;
};
export {
  getQuickSearchUrl,
};
