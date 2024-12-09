import {
  PT_SITE, SORTED_SITE_KEYS,
} from '../const';
import {
  getValue, $t,
} from '../common';
import { getQuickSearchUrl } from './common';
import $ from 'jquery';

type SiteName = keyof typeof PT_SITE
const SearchList = () => {
  const handleSearchClickEvent = (siteName:SiteName) => {
    let openUrl = '';
    const attrUrl = $(`.search-list li>a[data-site="${siteName}"]`).data('url');
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

  const getSearchSites = () => {
    const commonSites:SiteName[] = [];
    const subtitlesSites:SiteName[] = [];
    (SORTED_SITE_KEYS as SiteName[]).forEach((siteName) => {
      const siteInfo = PT_SITE[siteName] as Site.SiteInfo;
      if (siteInfo.search) {
        if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
          if (siteInfo.siteType === 'subtitles') {
            subtitlesSites.push(siteName);
          } else {
            commonSites.push(siteName);
          }
        }
      }
    });
    return {
      commonSites,
      subtitlesSites,
    };
  };
  const batchSearchClick = () => {
    const { commonSites, subtitlesSites } = getSearchSites();
    [...commonSites, ...subtitlesSites].forEach(site => {
      handleSearchClickEvent(site);
    });
  };
  return <>
    {
      ['commonSites', 'subtitlesSites'].map((key, index) => {
        const siteList = getSearchSites()[key as 'commonSites' | 'subtitlesSites'];
        return siteList.length > 0
          ? <ul className="search-list">
            {
              siteList.map((siteName) => {
                const siteInfo = PT_SITE[siteName] as Site.SiteInfo;
                const favIcon = (!siteFaviconClosed && siteInfo.icon) ? siteInfo.icon : '';
                return <li key={siteName} >
                  <a
                    data-site={siteName}
                    onClick={() => handleSearchClickEvent(siteName)}>
                    {!!favIcon && <img src={favIcon} className="site-icon" />}
                    {siteName}
                  </a>
                  <span>|</span>
                </li>;
              })
            }
            {
              index === 0 && <li id="batch-search-btn" onClick={batchSearchClick} title={$t('同时打开多个搜索标签页')}>
                {$t('批量检索')}
              </li>
            }
          </ul>
          : '';
      })
    }

  </>;
};
export default SearchList;
