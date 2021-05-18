import {
  CURRENT_SITE_NAME, TORRENT_INFO, PT_SITE,
} from '../const';
import { $t, showNotice, getIMDBIdByUrl, fetch } from '../common';
import { openSettingPanel, openBatchSeedTabs } from './setting-panel';
import {
  getThumbnailImgs,
  getDoubanBookInfo,
  getDoubanData,
  uploadScreenshotsToPtpimg,
} from './button-function';
const getPTPGroupId = (imdbUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const imdbId = getIMDBIdByUrl(imdbUrl);
      if (imdbId) {
        const url = `https://passthepopcorn.me/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
        fetch(url).then(data => {
          if (data && data.Movies && data.Movies.length > 0) {
            resolve(data.Movies[0].GroupId);
          } else {
            resolve('');
          }
        });
      } else {
        resolve('');
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};

export default () => {
  if ($('#easy-seed-setting')[0]) {
    $('#easy-seed-setting').on('click', () => {
      openSettingPanel();
    });
  }
  if ($('#quick-search')[0]) {
    $('#quick-search').on('click', () => {
      quickSearch();
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
  if (document.querySelector('#upload-to-ptp')) {
    $('#upload-to-ptp').click(function () {
      uploadScreenshotsToPtpimg(this);
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
      const formDom = await new Promise((resolve, reject) => {
        const url = `https://baconbits.org/ajax.php?action=upload_section&section=${catMap[TORRENT_INFO.category]}`;
        fetch(url, {
          responseType: 'text',
        }).then(data => {
          resolve(data);
        });
      });
      TORRENT_INFO.formDom = formDom;
    }
    if (url.match(/passthepopcorn/)) {
      const groupId = await getPTPGroupId(TORRENT_INFO.imdbUrl);
      url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
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
    if (imdbId && !siteName.match(/nzb|HDF|bB|TMDB|豆瓣读书/)) {
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
    if (siteName.match(/nzb|TMDB|豆瓣读书/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    if ($(this).attr('torrentUrl')) {
      url = $(this).attr('torrentUrl');
    }
    console.log(url);
    GM_openInTab(url);
  });
};
const quickSearch = () => {
  $('.search-list li>a').each(function () {
    const $this = $(this);
    $this.css('background', 'white');
    const siteName = $(this).data('site');
    const siteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const { params = {}, imdbOptionKey, nameOptionKey, path, replaceKey } = searchConfig;
    const torrentTitle = TORRENT_INFO.title;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let searchKeyWord = '';
    const { movieAkaName, movieName, title } = TORRENT_INFO;
    if (imdbId && !siteName.match(/nzb|HDF|bB|TMDB|豆瓣读书/)) {
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
    if (siteName.match(/nzb|TMDB|豆瓣读书/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    $this.attr('torrentUrl', url);
    // 以上直接照搬的上面的handleSearchClickEvent
    // 以下是通过GET搜索页面来判断是否有重复种子
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      timeout: 45e3,
      onload: function (res) {
        const doc = (new DOMParser()).parseFromString(res.responseText, 'text/html');
        const body = doc.querySelector('body');
        const torrentRes = $(body).find('table.torrents:last > tbody > tr:gt(0)');
        const torrentTotalNum = torrentRes.length;
        if (torrentTotalNum > 0) {
          $this.css('background', 'yellow');// 存在相同imdbid的种子则背景变成黄色
          if (res.responseText.match(torrentTitle) != null) {
            $this.css('background', 'red');// 存在完全同名的种子则背景变红
            torrentRes.each(function () {
              if ($(this).text().match(torrentTitle)) {
                url = siteInfo.url + '/' + $(this).find('.torrentname a:first').attr('href');// 获取到同名种子的url，但是这里还没有完成点击站名跳转到重名种子的功能
                $this.attr('torrentUrl', url);
              }
            });
          }
        }
      },
    });
  });
};
