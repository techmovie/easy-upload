import {
  PT_SITE, SORTED_SITE_KEYS,
} from '../const';
import {
  getValue,
} from '../common';
import { getQuickSearchUrl } from './common';

const SearchList = () => {
  const handleSearchClickEvent = (siteName:keyof typeof PT_SITE) => {
    let openUrl = '';
    const attrUrl = $('.search-list li>a').data('url');
    if (attrUrl) {
      openUrl = attrUrl;
    } else {
      openUrl = getQuickSearchUrl(siteName);
    }
    GM_openInTab(openUrl);
  };
  const searchListSetting = getValue('easy-seed.enabled-search-site-list');
  const searchSitesEnabled = searchListSetting || [];
  const siteFaviconClosed = getValue('easy-seed.site-favicon-closed', false);
  return <>
    <ul className="search-list">
      {
        SORTED_SITE_KEYS.map((siteName, index) => {
          const siteInfo = PT_SITE[siteName as keyof typeof PT_SITE] as Site.SiteInfo;
          if (siteInfo.search) {
            if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
              const favIcon = (!siteFaviconClosed && siteInfo.icon) ? siteInfo.icon : '';
              return <li key={siteName} >
                <a
                data-site={siteName}
                onClick={() => handleSearchClickEvent(siteName as keyof typeof PT_SITE)}>
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
