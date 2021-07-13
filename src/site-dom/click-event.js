import {
  CURRENT_SITE_NAME, TORRENT_INFO, PT_SITE,
} from '../const';
import { $t, showNotice, getIMDBIdByUrl, fetch } from '../common';
import { openSettingPanel, openBatchSeedTabs } from './setting-panel';
import {
  getThumbnailImgs,
  getDoubanBookInfo,
  getDoubanData,
  uploadScreenshotsToAnother,
} from './button-function';
const getPTPGroupId = async (imdbUrl) => {
  const imdbId = getIMDBIdByUrl(imdbUrl);
  if (imdbId) {
    const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
    const data = await fetch(url);
    if (data && data.Movies && data.Movies.length > 0) {
      return data.Movies[0].GroupId;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
const getGPWGroupId = async (imdbUrl) => {
  const imdbId = getIMDBIdByUrl(imdbUrl);
  if (imdbId) {
    const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
    const data = await fetch(url);
    if (data && data.GroupID) {
      return data.GroupID;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

export default () => {
  if ($('#easy-seed-setting')[0]) {
    $('#easy-seed-setting').on('click', () => {
      openSettingPanel();
    });
  }
  if ($('#batch-seed-btn')[0]) {
    $('#batch-seed-btn').on('click', () => {
      openBatchSeedTabs();
    });
  }
  if ($('#img-transfer')[0]) {
    $('#img-transfer').click(() => {
      getThumbnailImgs();
    });
  }
  if ($('#douban-info')[0]) {
    $('#douban-info').click(function () {
      getDoubanData(this);
    });
  }
  if ($('#douban-book-info')[0]) {
    $('#douban-book-info').click(() => {
      getDoubanBookInfo();
    });
  }
  if (document.querySelector('#upload-to-another')) {
    $('#upload-to-another').click(function () {
      uploadScreenshotsToAnother(this);
    });
  }
  handleSiteClickEvent();
  handleSearchClickEvent();
};
const handleSiteClickEvent = () => {
  $('.site-list li>a').click(async function () {
    let url = $(this).data('link');
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
    if (url.match(/hdpost|blutopia|asiancinema|aither/)) {
      const catMap = {
        movie: '1',
        tv: '2',
        tvPack: '2',
        documentary: '1',
        // 以下为aither的配置
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
      const bBDomUrl = `https://baconbits.org/ajax.php?action=upload_section&section=${catMap[TORRENT_INFO.category]}`;
      const formDom = await fetch(bBDomUrl, {
        responseType: 'text',
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
    url = url.replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`);
    GM_openInTab(url);
  });
};
const handleSearchClickEvent = () => {
  $('.search-list li>a').click(async function () {
    const siteName = $(this).data('site');
    const siteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const { params = {}, imdbOptionKey, nameOptionKey, path, replaceKey } = searchConfig;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let searchKeyWord = '';
    const { movieAkaName, movieName, title } = TORRENT_INFO;
    if (imdbId && !siteName.match(/nzb|HDF|bB|TMDB|豆瓣读书|TeamHD|NPUBits|SC/) &&
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
    if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    GM_openInTab(url);
  });
};
