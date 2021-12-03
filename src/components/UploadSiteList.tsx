
import {
  TORRENT_INFO, SORTED_SITE_KEYS, PT_SITE, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, showNotice, fetch, getIMDBIdByUrl, getValue,
} from '../common';
const getPTPGroupId = async (imdbUrl) => {
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
  const batchSeedSetting = GM_getValue('easy-seed.enabled-batch-seed-sites');
  if (typeof batchSeedSetting === 'string') {
    const batchSeedSiteEnabled = batchSeedSetting
      ? JSON.parse(batchSeedSetting)
      : [];
    if (batchSeedSiteEnabled.length === 0) {
      showNotice({ title: $t('错误'), text: $t('请先设置群转列表') });
      return false;
    }
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    SORTED_SITE_KEYS.forEach((siteName) => {
      const { url, uploadPath } = PT_SITE[siteName];
      if (PT_SITE[siteName].asTarget) {
        if (batchSeedSiteEnabled.includes(siteName)) {
          GM_openInTab(`${url + uploadPath}#torrentInfo=${torrentInfo}`);
        }
      }
    });
    showNotice({ title: $t('成功'), text: $t('转种页面已打开，请前往对应页面操作') });
  }
};
const getGPWGroupId = async (imdbUrl) => {
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
  const handleSiteClickEvent = async (url) => {
    if (url.match(/lemonhd/)) {
      const catMap = {
        movie: 'movie',
        tv: 'tv',
        tvPack: 'tv',
        variety: 'tv',
        documentary: 'doc',
        concert: 'mv',
      };
      const path = catMap[TORRENT_INFO.category] || 'movie';
      url = url.replace('upload_movie', `upload_${path}`);
    }
    if (url.match(/hdpost|blutopia|asiancinema/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
      };
      const path = catMap[TORRENT_INFO.category] || '1';
      url = url.replace('1', path);
    }
    if (url.match(/aither/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
        concert: '3',
        sport: '9',
        cartoon: '405',
        app: '10',
        ebook: '11',
        magazine: '11',
        audioBook: '14',
      };
      const path = catMap[TORRENT_INFO.category] || '1';
      url = url.replace('1', path);
    }
    if (url.match(/bibliotik/)) {
      const catMap = {
        ebook: 'ebooks',
        magazine: 'magazines',
        audioBook: 'audiobooks',
      };
      url = url.replace('/upload', `/upload/${catMap[TORRENT_INFO.category] || 'ebooks'}`);
    }
    if (url.match(/baconbits/)) {
      const catMap = {
        movie: 'Movies',
        tv: 'TV',
        tvPack: 'TV',
        documentary: 'Movies',
        cartoon: 'Anime',
        app: 'Applications',
        ebook: 'E-Books',
        magazine: 'Magazines',
        audioBook: 'Audiobooks',
        comics: 'Comics',
      };
      const bBDomUrl = `${PT_SITE.bB.url}/ajax.php?action=upload_section&section=${catMap[TORRENT_INFO.category]}`;
      const formDom = await fetch(bBDomUrl, {
        responseType: undefined,
      });
      TORRENT_INFO.formDom = formDom;
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
      url = url.replace('/upload.php', `/upload.php?type=${catMap[TORRENT_INFO.category]}`);
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
      const result = window.confirm($t('本种子禁止转载，确定要继续转载么？'));
      if (!result) {
        return;
      }
    }
    if (CURRENT_SITE_NAME === 'TTG' && !TORRENT_INFO.description) {
      showNotice({
        text: $t('请等待页面加载完成'),
      });
      return;
    }
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    url = `${url}#torrentInfo=${torrentInfo}`;
    GM_openInTab(url);
  };
  const targetSitesEnabled = getValue('easy-seed.enabled-target-sites') || [];
  const siteFaviconClosed = getValue('easy-seed.site-favicon-closed', false) || '';
  return <div className="seed-dom">
    <ul className="site-list">
      {SORTED_SITE_KEYS.map((siteName) => {
        const { url, uploadPath } = PT_SITE[siteName];
        const favIcon = (siteFaviconClosed === '' && PT_SITE[siteName].icon)
          ? PT_SITE[siteName].icon
          : '';

        if (PT_SITE[siteName].asTarget) {
          if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
            return <li>
              <a
                href="javascript:void(0);"
                className="site-item"
                onClick={() => handleSiteClickEvent(`${url}${uploadPath}`)}>
                <img src={favIcon} alt={siteName} className="site-icon" />
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
    </ul>
  </div>;
};
export default UploadSiteList;
