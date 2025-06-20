import { useCallback, useMemo } from 'preact/hooks';
import {
  SORTED_SITE_KEYS,
  PT_SITE,
  CURRENT_SITE_INFO,
  SiteName,
} from '@/const';
import { $t, GMFetch, getIdByIMDbUrl } from '@/common';
import { getTorrentFileData } from '@/source/helper';
import { PTPSearchResult, GPWSearchResult } from '@/components/types';
import { useTorrentInfo } from '@/hooks/useTorrentInfo';
import { toast } from 'sonner';

const SITE_URL_PROCESSORS = {
  handleCommonSiteUrl: (
    url: string,
    category: string,
    sitePattern: RegExp,
    categoryMap: Record<string, string>,
  ) => {
    if (url.match(sitePattern)) {
      const path = categoryMap[category] || '1';
      return url.replace(
        /\/upload\.php\?category=\d+/,
        `/upload.php?category=${path}`,
      );
    }
    return url;
  },

  handleUnit3dUrl: (url: string, category: string) => {
    if (url.match(/hdpost|blutopia|fearnopeer|asiancinema|monikadesign|lst/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
      };
      const path = catMap[category as keyof typeof catMap] || '1';
      return url.replace(/\/upload\/\d+/, `/upload/${path}`);
    }
    return url;
  },

  handleAitherUrl: (url: string, category: string) => {
    if (url.match(/aither/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
        concert: '1',
        sport: '9',
        cartoon: '1',
        app: '10',
        ebook: '11',
        magazine: '11',
        audioBook: '14',
      };
      const path = catMap[category as keyof typeof catMap] || '1';
      return url.replace(/\/upload\/\d+/, `/upload/${path}`);
    }
    return url;
  },

  handleBibliotikUrl: (url: string, category: string) => {
    if (url.match(/bibliotik/)) {
      const catMap = {
        ebook: 'ebooks',
        magazine: 'magazines',
        audioBook: 'audiobooks',
      };
      const subPath = catMap[category as keyof typeof catMap] || 'ebooks';
      return url.replace('/upload', `/upload/${subPath}`);
    }
    return url;
  },

  handleBYRUrl: (url: string, category: string) => {
    if (url.match(PT_SITE.BYR.host)) {
      const catMap = {
        movie: '408',
        tv: '401',
        tvPack: '401',
        documentary: '410',
        concert: '402',
        sport: '409',
        cartoon: '404',
        variety: '405',
      };
      const typeId = catMap[category as keyof typeof catMap];
      return typeId
        ? url.replace('/upload.php', `/upload.php?type=${typeId}&ckeditor=1`)
        : url;
    }
    return url;
  },
};

const getPTPGroupId = async (imdbUrl = '') => {
  if (!imdbUrl) return '';

  try {
    const imdbId = getIdByIMDbUrl(imdbUrl);
    if (!imdbId) return '';

    const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
    const data = await GMFetch<PTPSearchResult>(url, {
      responseType: 'json',
    });

    if (data?.Movies?.length > 0) {
      return data.Movies[0].GroupId;
    }
  } catch (error) {
    console.error('fail to obtain ptp group id:', error);
  }

  return '';
};

const getGPWGroupId = async (imdbUrl = '') => {
  if (!imdbUrl) return '';

  try {
    const imdbId = getIdByIMDbUrl(imdbUrl);
    if (!imdbId) return '';

    const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
    const data = await GMFetch<GPWSearchResult>(url, {
      responseType: 'json',
    });

    if (data?.response?.GroupID) {
      return data.response.GroupID;
    }
  } catch (error) {
    console.error('fail to obtain gpw group id:', error);
  }

  return '';
};

const UploadSiteList = () => {
  const { torrentInfo, updateTorrentInfo } = useTorrentInfo();

  const targetSitesEnabled = useMemo(
    () => GM_getValue<string[]>('easy-upload.enabled-target-sites', []),
    [],
  );

  const siteFaviconClosed = useMemo(
    () => GM_getValue<boolean>('easy-upload.site-favicon-closed', false),
    [],
  );

  const fetchTorrentData = useCallback(
    async (siteName: string) => {
      if (torrentInfo.torrentData) return torrentInfo.torrentData;

      try {
        const torrentData = await getTorrentFileData(
          CURRENT_SITE_INFO.torrentDownloadLinkSelector,
          CURRENT_SITE_INFO.torrentLink,
          siteName,
        );

        if (torrentData) {
          updateTorrentInfo({ torrentData });
          return torrentData;
        }
      } catch (error) {
        console.error('fail to fetch torrent file data:', error);
      }

      return null;
    },
    [torrentInfo.torrentData, updateTorrentInfo],
  );

  const processSiteUrl = useCallback(
    async (baseUrl: string) => {
      if (!torrentInfo) return baseUrl;

      let url = baseUrl;
      const { category, imdbUrl } = torrentInfo;

      url = SITE_URL_PROCESSORS.handleUnit3dUrl(url, category);
      url = SITE_URL_PROCESSORS.handleAitherUrl(url, category);
      url = SITE_URL_PROCESSORS.handleBibliotikUrl(url, category);
      url = SITE_URL_PROCESSORS.handleBYRUrl(url, category);

      if (url.match(PT_SITE.PTP.host) && imdbUrl) {
        const groupId = await getPTPGroupId(imdbUrl);
        if (groupId) {
          url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
        }
      }

      if (url.match(PT_SITE.GPW.host) && imdbUrl) {
        const groupId = await getGPWGroupId(imdbUrl);
        if (groupId) {
          url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
        }
      }

      return `${url}#timestamp=${Date.now()}`;
    },
    [torrentInfo],
  );

  const handleSiteClick = useCallback(
    async (baseUrl: string, siteName: string) => {
      try {
        if (!torrentInfo) {
          toast.error($t('请先获取种子信息'));
          return false;
        }

        if (torrentInfo.isForbidden) {
          const result = window.confirm(
            $t('本种子可能禁止转载，确定要继续转载么？'),
          );
          if (!result) return false;
        }

        await fetchTorrentData(siteName);

        const processedUrl = await processSiteUrl(baseUrl);
        GM_openInTab(processedUrl);

        return true;
      } catch (error) {
        console.error('处理站点点击失败:', error);
        toast.error($t('打开上传页面失败'));
        return false;
      }
    },
    [torrentInfo, fetchTorrentData, processSiteUrl],
  );

  const handleBatchSeed = useCallback(async () => {
    try {
      const batchSeedSetting = GM_getValue<string[]>(
        'easy-upload.enabled-batch-seed-sites',
        [],
      );

      if (batchSeedSetting.length === 0) {
        toast.error($t('请先设置群转列表'));
        return;
      }

      if (!torrentInfo.torrentData) {
        await fetchTorrentData(batchSeedSetting[0]);
      }

      const sitesToOpen = SORTED_SITE_KEYS.filter((siteName) => {
        const siteInfo = PT_SITE[siteName as SiteName] as Site.SiteInfo;
        return siteInfo.asTarget && batchSeedSetting.includes(siteName);
      });

      for (const siteName of sitesToOpen) {
        const siteInfo = PT_SITE[siteName as SiteName] as Site.SiteInfo;
        const baseUrl = `${siteInfo.url}${siteInfo.uploadPath || ''}`;
        const processedUrl = await processSiteUrl(baseUrl);
        GM_openInTab(processedUrl);

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      toast.success($t('转种页面已打开，请前往对应页面操作'));
    } catch (error) {
      console.error('批量转种失败:', error);
      toast.error($t('批量转种失败'));
    }
  }, [torrentInfo, fetchTorrentData, processSiteUrl]);

  const renderSiteItem = useCallback(
    (siteName: SiteName) => {
      const siteInfo = PT_SITE[siteName] as Site.SiteInfo;

      if (!siteInfo.asTarget) return null;

      const isEnabled =
        targetSitesEnabled.length === 0 ||
        targetSitesEnabled.includes(siteName);
      if (!isEnabled) return null;

      const { url, uploadPath = '', icon = '' } = siteInfo;
      const baseUrl = `${url}${uploadPath}`;
      const showIcon = !siteFaviconClosed && icon;

      return (
        <li key={siteName}>
          <a
            className="site-item"
            onClick={() => handleSiteClick(baseUrl, siteName)}
          >
            {showIcon && (
              <img src={icon} className="site-icon" alt={`${siteName} icon`} />
            )}
            {siteName}
          </a>
          <span>|</span>
        </li>
      );
    },
    [handleSiteClick, targetSitesEnabled, siteFaviconClosed],
  );

  return (
    <ul className="site-list">
      {SORTED_SITE_KEYS.map((siteName) => renderSiteItem(siteName))}
      <li>
        <button id="batch-seed-btn" onClick={handleBatchSeed}>
          {$t('一键群转')}
        </button>
      </li>
    </ul>
  );
};
export default UploadSiteList;
