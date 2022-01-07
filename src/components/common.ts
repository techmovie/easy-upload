
import {
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
  const { movieAkaName, movieName, title } = TORRENT_INFO;
  if (imdbId && !siteName.match(/(nzbs.in|HDF|bB|TMDB|豆瓣读书|TeamHD|NPUBits)$/) &&
  siteInfo.siteType !== 'AvistaZ') {
    if (replaceKey) {
      searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
    } else {
      searchKeyWord = imdbId;
    }
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
