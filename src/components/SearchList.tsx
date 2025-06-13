import { useCallback, useMemo } from 'preact/hooks';
import { PT_SITE, SORTED_SITE_KEYS } from '@/const';
import { $t } from '@/common';
import { getQuickSearchUrl } from './common';
import $ from 'jquery';

type SiteName = keyof typeof PT_SITE;
type SiteCategory = 'commonSites' | 'subtitlesSites';

const SearchList = () => {
  const searchListSetting = GM_getValue<string[]>(
    'easy-upload.enabled-search-site-list',
    [],
  );
  const siteFaviconClosed = GM_getValue<boolean>(
    'easy-upload.site-favicon-closed',
    false,
  );

  const handleSearchClick = useCallback((siteName: SiteName) => {
    const attrUrl = $(`.search-list li>a[data-site="${siteName}"]`).data('url');
    const openUrl = attrUrl || getQuickSearchUrl(siteName);

    GM_openInTab(openUrl);
  }, []);

  const searchSites = useMemo(() => {
    const commonSites: SiteName[] = [];
    const subtitlesSites: SiteName[] = [];

    (SORTED_SITE_KEYS as SiteName[]).forEach((siteName) => {
      const siteInfo = PT_SITE[siteName] as Site.SiteInfo;

      if (!siteInfo.search) return;

      const isEnabled =
        searchListSetting.length === 0 || searchListSetting.includes(siteName);

      if (isEnabled) {
        if (siteInfo.siteType === 'subtitles') {
          subtitlesSites.push(siteName);
        } else {
          commonSites.push(siteName);
        }
      }
    });

    return { commonSites, subtitlesSites };
  }, [searchListSetting]);

  const handleBatchSearch = useCallback(() => {
    const { commonSites, subtitlesSites } = searchSites;
    [...commonSites, ...subtitlesSites].forEach((site) => {
      handleSearchClick(site);
    });
  }, [handleSearchClick, searchSites]);

  const renderSiteList = useCallback(
    (category: SiteCategory, showBatchSearch: boolean = false) => {
      const sites = searchSites[category];

      if (sites.length === 0) return null;

      return (
        <ul className="search-list">
          {sites.map((siteName) => {
            const siteInfo = PT_SITE[siteName] as Site.SiteInfo;
            const showIcon = !siteFaviconClosed && siteInfo.icon;

            return (
              <li key={siteName}>
                <a
                  data-site={siteName}
                  onClick={() => handleSearchClick(siteName)}
                >
                  {showIcon && (
                    <img
                      src={siteInfo.icon}
                      className="site-icon"
                      alt={`${siteName} icon`}
                    />
                  )}
                  {siteName}
                </a>
                <span>|</span>
              </li>
            );
          })}

          {showBatchSearch && (
            <li
              id="batch-search-btn"
              onClick={handleBatchSearch}
              title={$t('同时打开多个搜索标签页')}
            >
              {$t('批量检索')}
            </li>
          )}
        </ul>
      );
    },
    [searchSites, siteFaviconClosed, handleSearchClick, handleBatchSearch],
  );

  const hasSites =
    searchSites.commonSites.length > 0 || searchSites.subtitlesSites.length > 0;

  if (!hasSites) return null;

  return (
    <div className="search-lists-container">
      {renderSiteList('commonSites', true)}
      {renderSiteList('subtitlesSites')}
    </div>
  );
};
export default SearchList;
