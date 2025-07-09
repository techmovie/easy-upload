import { CURRENT_SITE_NAME, PT_SITE, SiteName } from '@/const';
import { getIdByIMDbUrl } from '@/common';
import { torrentInfoStore } from '@/store/torrentInfoStore';

const SPECIAL_SITE_TYPES = {
  NO_IMDB_SITES: /(nzbs.in|HDF|TMDB|豆瓣读书|TeamHD|NPUBits)$/,
  MUSIC_SITES: /RED|DicMusic|Orpheus/,
  NAME_REPLACE_SITES: /nzb|TMDB|豆瓣读书|SubHD|OpenSub/,
  AVISTAZ_SITES: 'AvistaZ',
  ZHUQUE: /ZHUQUE/,
};

interface SearchKeywordParams {
  siteName: SiteName;
  siteInfo: Site.SiteInfo;
  torrentInfo: TorrentInfo.Info;
}

interface SearchKeywordResult {
  searchKeyWord: string;
  useImdb: boolean;
}

function determineSearchKeyword({
  siteName,
  siteInfo,
  torrentInfo,
}: SearchKeywordParams): SearchKeywordResult {
  const { imdbUrl, movieAkaName, movieName, title, musicJson } = torrentInfo;

  const imdbId = imdbUrl ? getIdByIMDbUrl(imdbUrl) : '';
  let searchKeyWord = '';
  let useImdb = false;

  if (CURRENT_SITE_NAME.match(SPECIAL_SITE_TYPES.MUSIC_SITES)) {
    const { year = '', name = '' } = musicJson?.group ?? {};
    searchKeyWord = `${name} ${year}`.trim();
  } else if (
    imdbId &&
    !siteName.match(SPECIAL_SITE_TYPES.NO_IMDB_SITES) &&
    siteInfo.siteType !== SPECIAL_SITE_TYPES.AVISTAZ_SITES
  ) {
    if (siteInfo.search.replaceKey && siteInfo.search.replaceKey.length === 2) {
      const [pattern, replacement] = siteInfo.search.replaceKey;
      searchKeyWord = imdbId.replace(new RegExp(pattern), replacement);
    } else {
      searchKeyWord = imdbId;
    }
    useImdb = true;
  } else {
    searchKeyWord = movieAkaName || movieName || title || '';
    useImdb = false;
  }

  return { searchKeyWord, useImdb };
}

interface BuildSearchParamsOptions {
  siteName: SiteName;
  params: Record<string, string>;
  useImdb: boolean;
  searchKeyWord: string;
  imdbOptionKey: string;
  nameOptionKey: string;
}

function buildSearchParams({
  siteName,
  params,
  useImdb,
  searchKeyWord,
  imdbOptionKey,
  nameOptionKey,
}: BuildSearchParamsOptions): string {
  let paramsArray = Object.entries(params).map(
    ([key, value]) => `${key}=${value}`,
  );

  if (useImdb) {
    // remove any based on name search parameters
    paramsArray = paramsArray.filter(
      (param) => !param.match(/\w+={name}&{0,1}?/),
    );

    paramsArray = paramsArray.map((param) =>
      param
        .replace(/{imdb}/g, searchKeyWord)
        .replace(/{optionKey}/g, imdbOptionKey),
    );
  } else {
    // remove any based on imdb search parameters
    paramsArray = paramsArray.filter(
      (param) => !param.match(/\w+={imdb}&{0,1}?/),
    );

    paramsArray = paramsArray.map((param) => {
      if (param.includes('{name}')) {
        return param.replace(/{name}/g, searchKeyWord);
      } else if (param.includes('{imdb}')) {
        return param.replace(/{imdb}/g, searchKeyWord);
      }
      return param.replace(/{optionKey}/g, nameOptionKey);
    });
  }
  if (siteName.match(SPECIAL_SITE_TYPES.ZHUQUE)) {
    const queryParams: Record<string, string> = {};
    paramsArray.forEach((param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    });
    return `/${window.btoa(encodeURIComponent(JSON.stringify(queryParams)))}`;
  }

  return `?${paramsArray.join('&')}`;
}

export const getQuickSearchUrl = (siteName: SiteName): string => {
  const siteInfo = PT_SITE[siteName] as Site.SiteInfo;
  const latestTorrentInfo = torrentInfoStore.getInfo();
  torrentInfoStore.setInfo(latestTorrentInfo);

  if (!siteInfo.search) {
    return siteInfo.url;
  }

  const {
    params = {},
    imdbOptionKey = '',
    nameOptionKey = '',
    path = '',
  } = siteInfo.search;

  const { searchKeyWord, useImdb } = determineSearchKeyword({
    siteName,
    siteInfo,
    torrentInfo: latestTorrentInfo,
  });

  const searchParams = buildSearchParams({
    siteName,
    params,
    useImdb,
    searchKeyWord,
    imdbOptionKey,
    nameOptionKey,
  });

  let url = `${siteInfo.url}${path}${searchParams ? `${searchParams}` : ''}`;

  if (siteName.match(SPECIAL_SITE_TYPES.NAME_REPLACE_SITES)) {
    url = url.replace(/{name}/g, encodeURIComponent(searchKeyWord));
  }

  return url;
};
