import {
  PT_SITE, SORTED_SITE_KEYS, TORRENT_INFO,
} from '../const';
import {
  getIMDBIdByUrl, getValue,
} from '../common';
const SearchList = () => {
  const getQuickSearchUrl = (siteName) => {
    const siteInfo: Site.SiteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const { params = {}, imdbOptionKey, nameOptionKey, path, replaceKey } = searchConfig;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
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
        .replace(/{imdb}/, searchKeyWord).replace(/{optionKey}/, imdbOptionKey);
    } else {
      if (searchParams.match(/{name}/)) {
        searchParams = searchParams.replace(/\w+={imdb}&{0,1}?/, '').replace(/{name}/, searchKeyWord);
      } else {
        searchParams = searchParams.replace(/{imdb}/, searchKeyWord);
      }
      searchParams = searchParams.replace(/{optionKey}/, nameOptionKey);
    }

    let url = `${siteInfo.url + path}${searchParams ? `?${searchParams}` : ''}`;
    if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD|OpenSub/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    return url;
  };
  const handleSearchClickEvent = (siteName) => {
    const url = getQuickSearchUrl(siteName);
    GM_openInTab(url);
  };
  const searchListSetting = getValue('easy-seed.enabled-search-site-list');
  const searchSitesEnabled = searchListSetting || [];
  const siteFaviconClosed = getValue('easy-seed.site-favicon-closed', false);
  return <>
    <ul className="search-list">
      {
        SORTED_SITE_KEYS.map(siteName => {
          const siteInfo = PT_SITE[siteName];
          if (siteInfo.search) {
            if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
              const favIcon = (siteFaviconClosed === '' && PT_SITE[siteName].icon) ? PT_SITE[siteName].icon : '';
              return <li key={siteName}>
                <a href="#" onClick={() => handleSearchClickEvent(siteName)}>
                  {!!favIcon && <img src={favIcon} className="site-icon" />}
                  {siteName}
                </a>
                <span>|</span>
              </li>;
            }
          }
          return '';
        })
      }
    </ul>
  </>;
};
export default SearchList;
