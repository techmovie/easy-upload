import {
  TORRENT_INFO, SORTED_SITE_KEYS, PT_SITE, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, fetch, getIMDBIdByUrl, getValue,
} from '../common';
import Notification from './Notification';

const getPTPGroupId = async (imdbUrl:string|undefined) => {
  if (!imdbUrl) {
    return '';
  }
  const imdbId = getIMDBIdByUrl(imdbUrl);
  if (imdbId) {
    const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
    const data = await fetch(url);
    if (data && data.Movies && data.Movies.length > 0) {
      return data.Movies[0].GroupId;
    }
    return '';
  }
  return '';
};
const openBatchSeedTabs = () => {
  const batchSeedSetting = getValue('easy-seed.enabled-batch-seed-sites') || [];
  if (batchSeedSetting.length === 0) {
    Notification.open({
      message: $t('错误'),
      description: $t('请先设置群转列表'),
    });
    return false;
  }
  SORTED_SITE_KEYS.forEach((siteName) => {
    const siteInfo = PT_SITE[siteName as keyof typeof PT_SITE] as Site.SiteInfo;
    const { url, uploadPath = '' } = siteInfo;
    if (siteInfo.asTarget) {
      if (batchSeedSetting.includes(siteName)) {
        const timestamp = `${Date.now()}`;
        GM_setValue('uploadInfo', TORRENT_INFO);
        GM_openInTab(`${url + uploadPath}#timestamp=${timestamp}`);
      }
    }
  });
  Notification.open({
    message: $t('成功'),
    description: $t('转种页面已打开，请前往对应页面操作'),
  });
};
const getGPWGroupId = async (imdbUrl:string|undefined) => {
  if (!imdbUrl) {
    return '';
  }
  const imdbId = getIMDBIdByUrl(imdbUrl);
  if (imdbId) {
    const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
    const data = await fetch(url);
    if (data && data.response && data.response.GroupID) {
      return data.response.GroupID;
    }
    return '';
  }
  return '';
};
const UploadSiteList = () => {
  const handleSiteClickEvent = async (url:string) => {
    if (url.match(/hdpost|blutopia|fearnopeer|asiancinema|monikadesign|lst/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
      };
      const path = catMap[TORRENT_INFO.category as keyof typeof catMap] || '1';
      url = url.replace('1', path);
    }
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
      const path = catMap[TORRENT_INFO.category as keyof typeof catMap] || '1';
      url = url.replace('1', path);
    }
    if (url.match(/bibliotik/)) {
      const catMap = {
        ebook: 'ebooks',
        magazine: 'magazines',
        audioBook: 'audiobooks',
      };
      url = url.replace('/upload', `/upload/${catMap[TORRENT_INFO.category as keyof typeof catMap] || 'ebooks'}`);
    }
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
      url = url.replace('/upload.php', `/upload.php?type=${catMap[TORRENT_INFO.category as keyof typeof catMap]}`);
    }
    if (url.match(PT_SITE.PTP.host)) {
      const groupId = await getPTPGroupId(TORRENT_INFO.imdbUrl);
      url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
    }
    if (url.match(PT_SITE.GPW.host)) {
      const groupId = await getGPWGroupId(TORRENT_INFO.imdbUrl);
      if (groupId) {
        url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
      }
    }
    if (TORRENT_INFO.isForbidden) {
      const result = window.confirm($t('本种子可能禁止转载，确定要继续转载么？'));
      if (!result) {
        return;
      }
    }
    if (CURRENT_SITE_NAME === 'TTG' && !TORRENT_INFO.description) {
      Notification.open({
        description: $t('请等待页面加载完成'),
      });
      return;
    }
    const timestamp = `${Date.now()}`;
    GM_setValue('uploadInfo', TORRENT_INFO);
    url = `${url}#timestamp=${timestamp}`;
    GM_openInTab(url);
  };
  const targetSitesEnabled = getValue('easy-seed.enabled-target-sites') || [];
  const siteFaviconClosed = getValue('easy-seed.site-favicon-closed', false) || '';
  return <ul className="site-list">
    {SORTED_SITE_KEYS.map((siteName) => {
      const siteInfo = PT_SITE[siteName as keyof typeof PT_SITE] as Site.SiteInfo;
      const { url, uploadPath } = siteInfo;
      const favIcon = (siteFaviconClosed === '' && siteInfo.icon)
        ? siteInfo.icon
        : '';

      if (siteInfo.asTarget) {
        if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
          return <li key={siteName}>
            <a
              className="site-item"
              onClick={() => handleSiteClickEvent(`${url}${uploadPath}`)}>
              {
                !!favIcon && <img src={favIcon} className="site-icon" />
              }
              {siteName}
            </a>
            <span>|</span>
          </li>;
        }
      }
      return '';
    })}
    <li>
      <button id="batch-seed-btn" onClick={openBatchSeedTabs}>{$t('一键群转')}</button>
    </li>
  </ul>;
};
export default UploadSiteList;
