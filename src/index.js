// 入口文件
import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, DOUBAN_SEARCH_API, API_KEY, DOUBAN_API_URL, PT_GEN_API, PT_SITE, SEARCH_SITE_MAP, TORRENT_INFO } from './const';
import { fillTargetForm } from './target';
import { getSubTitle, getUrlParam, replaceTorrentInfo } from './common';
import getTorrentInfo from './source';
// eslint-disable-next-line no-unused-vars
import style from './style';

/*
  * 向源站点页面注入DOM
  * @param {torrentDom} DOM的父节点JQ对象
  * @param {torrentDom} 当前种子的详情
  * @return
  * */
const createSeedDom = (torrentDom) => {
  const siteKeys = Object.keys(PT_SITE);
  const siteList = siteKeys.map((siteName, index) => {
    const { url, uploadPath } = PT_SITE[siteName];
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    if (PT_SITE[siteName].asTarget && siteName !== CURRENT_SITE_NAME) {
      return `<li>
      <a href="${url}${uploadPath}#torrentInfo=${torrentInfo}" target="_blank">${siteName} </a>
      <span>|</span>
      </li>`;
    }
    return '';
  });
  const searchList = Object.keys(SEARCH_SITE_MAP).map(siteName => {
    const imdbId = TORRENT_INFO.imdbUrl ? /tt\d+/.exec(TORRENT_INFO.imdbUrl)[0] : '';
    let url = '';
    let searchKeyWord = imdbId || TORRENT_INFO.movieAkaName || TORRENT_INFO.movieName;
    if (siteName === 'TTG' && imdbId) {
      searchKeyWord = searchKeyWord.replace('tt', 'imdb');
    }
    url = SEARCH_SITE_MAP[siteName].replace('{imdbid}', searchKeyWord);
    url = url.replace('{searchArea}', imdbId ? '4' : '0');
    return `<li><a href="${url}" target="_blank">${siteName}</a> <span>|</span></li>`;
  });
  const doubanDom = CURRENT_SITE_INFO.needDoubanInfo
    ? `<h4>获取豆瓣简介</h4>
  <div class="douban-section">
    <button id="douban-info">开始获取</button>
    <div class="douban-status"></div>
  </div>`
    : '';
  const seedDom = `
  <div class="seed-dom movie-page__torrent__panel">
    <h4>一键转种 🎬</h4>
    <ul class="site-list">
      ${siteList.join('')}
    </ul>
    ${doubanDom}
    <h4>转缩略图 ⏫</h4>
    <div class="upload-section">
      <button id="img-transfer">开始转换</button>
      <div class="checkbox">
        <input type="checkbox" id="nsfw">
        <label for="nsfw">是否为NSFW</label>
      </div>
      <div class="upload-status"></div>
    </div>
    <h4>快速检索 🔍</h4>
    <ul class="search-list">
      ${searchList.join('')}
    </ul>
  </div>
  `;
  torrentDom.prepend(seedDom);
};

const transferImgs = () => {
  const statusDom = $('.upload-section .upload-status');
  let imgList = TORRENT_INFO.screenshots;
  try {
    if (imgList.length < 1) {
      throw new Error('获取图片列表失败');
    }
    imgList = imgList.join('\n');
    const isNSFW = $('#nsfw').is(':checked');
    const params = encodeURI(`imgs=${imgList}&content_type=${isNSFW ? 1 : 0}&max_th_size=300`);
    statusDom.text('转换中...');
    $('#img-transfer').attr('disabled', true).addClass('is-disabled');
    GM_xmlhttpRequest({
      url: 'https://pixhost.to/remote/',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: params,
      onload (res) {
        $('#img-transfer').removeAttr('disabled').removeClass('is-disabled');
        const data = res.responseText.match(/(upload_results = )({.*})(;)/);
        if (!data) {
          throw new Error('上传失败，请重试');
        }
        let imgResultList = [];
        if (data && data.length) {
          imgResultList = JSON.parse(data[2]).images;
          if (imgResultList.length) {
            TORRENT_INFO.screenshots = imgResultList.map(imgData => {
              return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
            });
            replaceTorrentInfo(TORRENT_INFO);
            statusDom.text('转换成功！');
          }
        } else {
          throw new Error('上传失败，请重试');
        }
      },
    });
  } catch (error) {
    $('#img-transfer').removeAttr('disabled').removeClass('is-disabled');
    statusDom.text(error.message);
  }
};
const getDoubanLink = () => {
  const doubanLink = $('.page__title>a').attr('href');
  if (doubanLink && doubanLink.match('movie.douban.com')) {
    TORRENT_INFO.doubanUrl = doubanLink;
    getDoubanInfo();
    return false;
  }
  if (TORRENT_INFO.imdbUrl) {
    const imdbId = /tt\d+/.exec(TORRENT_INFO.imdbUrl)[0];
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${DOUBAN_SEARCH_API}/${imdbId}`,
      onload (res) {
        const data = JSON.parse(res.responseText);
        console.log(data);
        if (data && data.data) {
          TORRENT_INFO.doubanUrl = `https://movie.douban.com/subject/${data.data.id}`;
          getDoubanInfo();
        }
      },
    });
  } else {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${DOUBAN_API_URL}/search/weixin?q=${TORRENT_INFO.movieName}&start=0&count=1&apiKey=${API_KEY}`,
      onload (res) {
        const data = JSON.parse(res.responseText);
        console.log(data);
        if (data && data.items && data.items.length > 0) {
          TORRENT_INFO.doubanUrl = `https://movie.douban.com/subject/${data.items[0].id}`;
          getDoubanInfo();
        }
      },
    });
  }
};
const getDoubanInfo = () => {
  const { doubanUrl } = TORRENT_INFO;
  const statusDom = $('.douban-section .douban-status');
  try {
    if (doubanUrl) {
      statusDom.text('获取中...');
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${PT_GEN_API}?url=${doubanUrl}`,
        onload (res) {
          const data = JSON.parse(res.responseText);
          if (data && data.success) {
            TORRENT_INFO.doubanInfo = data.format;
            TORRENT_INFO.subtitle = getSubTitle(data);
            replaceTorrentInfo(TORRENT_INFO);
            statusDom.text('获取成功');
          } else {
            throw new Error('获取豆瓣信息失败');
          }
        },
      });
    } else {
      throw new Error('无法获取豆瓣信息');
    }
  } catch (error) {
    statusDom.text(error.message);
  }
};
const paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
let torrentParams = (paramsMatchArray && paramsMatchArray.length > 0) ? paramsMatchArray[2] : null;
if (CURRENT_SITE_NAME) {
  if (torrentParams && CURRENT_SITE_INFO.asTarget) {
    torrentParams = JSON.parse(decodeURIComponent(torrentParams));
    fillTargetForm(torrentParams);
  }
  console.log('CURRENT_SITE_NAME' + CURRENT_SITE_NAME);
  if (CURRENT_SITE_INFO.asSource && !location.pathname.match(/upload/ig)) {
    getTorrentInfo();
    // 向当前所在站点添加按钮等内容
    console.log(TORRENT_INFO);
    let torrentInsertDom = $(CURRENT_SITE_INFO.seedDomSelector);
    if (CURRENT_SITE_INFO.siteType === 'NexusPHP' || CURRENT_SITE_NAME === 'BHD') {
      const trDom = `<tr>
      <td class="rowhead nowrap">
      </td>
      <td class="rowfollow easy-seed-td"></td>
      </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $('.easy-seed-td');
    }
    if (CURRENT_SITE_NAME === 'HDB') {
      const trDom = `<tr>
      <td class="rowfollow easy-seed-td"></td>
      </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $('.easy-seed-td');
    }
    if (CURRENT_SITE_NAME === 'PTP') {
      const torrentId = getUrlParam('torrentid');
      torrentInsertDom = $(`#torrent_${torrentId} >td`);
    }

    createSeedDom(torrentInsertDom);
    // 原图转缩略图
    if ($('#img-transfer')) {
      $('#img-transfer').click(() => {
        transferImgs();
      });
    }
    if ($('#douban-info')) {
      $('#douban-info').click(() => {
        getDoubanLink();
      });
    }
  }
}

;
