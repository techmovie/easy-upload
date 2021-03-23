// 入口文件
import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, PT_SITE, SEARCH_SITE_MAP, TORRENT_INFO } from './const';
import { fillTargetForm } from './target';
import { getSubTitle, getUrlParam, transferImgs, getDoubanInfo, getDoubanLinkByIMDB, getIMDBIdByUrl, getAreaCode } from './common';
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
  const GMTargetSiteEnabled = GM_getValue('easy-seed.enabled-target-sites');
  const GMSearchtSiteEnabled = GM_getValue('easy-seed.enabled-search-sites');
  const targetSitesEnabled = GMTargetSiteEnabled === 'undefined' ? [] : JSON.parse(GMTargetSiteEnabled);
  const searchSitesEnabled = GMSearchtSiteEnabled === 'undefined' ? [] : JSON.parse(GMSearchtSiteEnabled);
  const siteKeys = Object.keys(PT_SITE).sort();
  const siteList = siteKeys.map((siteName, index) => {
    const { url, uploadPath } = PT_SITE[siteName];
    if (PT_SITE[siteName].asTarget) {
      if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
        return `<li>
        <a href="javascript:void(0);" data-link="${url}${uploadPath}#torrentInfo=null">${siteName} </a>
        <span>|</span>
        </li>`;
      }
    }
    return '';
  });
  const searchList = Object.keys(SEARCH_SITE_MAP).map(siteName => {
    const imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let url = '';
    const { movieAkaName, movieName } = TORRENT_INFO;
    let searchKeyWord = imdbId || movieAkaName || movieName;
    if (siteName === 'TTG' && imdbId) {
      searchKeyWord = searchKeyWord.replace('tt', 'imdb');
    }
    if (siteName === 'nzb.in' && (movieAkaName || movieName)) {
      searchKeyWord = movieAkaName || movieName;
    }
    url = SEARCH_SITE_MAP[siteName].replace('{imdbid}', searchKeyWord);
    url = url.replace('{searchArea}', imdbId ? '4' : '0');
    if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
      return `<li><a href="${url}" target="_blank">${siteName}</a> <span>|</span></li>`;
    }
    return '';
  });
  const doubanDom = CURRENT_SITE_INFO.needDoubanInfo
    ? `
  <div class="function-list-item">
    <h4>获取豆瓣简介</h4>
    <div class="douban-section">
      <button id="douban-info">开始获取</button>
      <div class="douban-status"></div>
    </div>
  </div>`
    : '';
  const seedDom = `
  <div class="seed-dom movie-page__torrent__panel">
    <h4>EASY SEED 一键转种 <button id="easy-seed-setting" class="easy-seed-setting-btn">Setting</button></h4>
    <ul class="site-list">
      ${siteList.join('')}
    </ul>
    <section class="function-list">
      ${doubanDom}
      <div class="function-list-item">
        <h4>转缩略图</h4>
        <div class="upload-section">
          <button id="img-transfer">开始转换</button>
          <div class="checkbox">
            <input type="checkbox" id="nsfw">
            <label for="nsfw">是否包含NSFW</label>
          </div>
          <div class="upload-status"></div>
        </div>
      </div>
    </section>
    <h4>快速检索</h4>
    <ul class="search-list">
      ${searchList.join('')}
    </ul>
  </div>
  `;
  torrentDom.prepend(seedDom);
};

const openSettingPanel = () => {
  const GMTargetSiteEnabled = GM_getValue('easy-seed.enabled-target-sites');
  const GMSearchtSiteEnabled = GM_getValue('easy-seed.enabled-search-sites');
  const targetSitesEnabled = GMTargetSiteEnabled === 'undefined' ? [] : JSON.parse(GMTargetSiteEnabled);
  const searchSitesEnabled = GMSearchtSiteEnabled === 'undefined' ? [] : JSON.parse(GMSearchtSiteEnabled);
  const siteKeys = Object.keys(PT_SITE).sort();
  const targetSiteList = siteKeys.map((siteName, index) => {
    if (PT_SITE[siteName].asTarget) {
      const checked = (targetSitesEnabled.includes(siteName)) ? 'checked' : '';
      return `<li>
      <label><input name="target-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
    }
    return '';
  });
  const searchSiteList = Object.keys(SEARCH_SITE_MAP).map(siteName => {
    const checked = (searchSitesEnabled.includes(siteName)) ? 'checked' : '';
    return `<li>
      <label><input name="search-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
  });

  const panelHtml = `
  <div style="position: fixed;background: #f2f2f2;text-align: center;max-width:800px;width:80%;left:0; right:0; top:0;  margin:auto;"  id="easy-seed-setting-panel" class="easy-seed-setting-panel">
  <h1>EASY SEED</h1>
  <h4>站点启用设置</h4>
  <section class="site-enable-setting">
      <ul class="target-sites-enable-list" style="list-style: none;display: flex;flex-direction: row;flex-wrap: wrap;">
        ${targetSiteList.join('')}
      </ul>
    </section>
    <h4>站点搜索设置</h4>
    <section class="site-enable-setting">
    <ul class="search-sites-enable-list" style="list-style: none;display: flex;flex-direction: row;flex-wrap: wrap;">
        ${searchSiteList.join('')}
      </ul>
    </section>
    <div>
      <span>
        <button id="save-setting-btn" style="margin: 20px; color: #fff; background-color: #007bff; border-color: #007bff;" class="save-setting-btn">保存</button>
        <button id="cancel-setting-btn" style="margin: 20px;color: #fff; background-color: #6c757d; border-color: #6c757d;" class="cancel-setting-btn">取消</button>
      </span>
    </div>
  </div>
  `;
  $('body').append(panelHtml);
  $('#easy-seed-setting-panel').on('click', '#save-setting-btn', () => {
    saveSetting();
  });
  $('#easy-seed-setting-panel').on('click', '#cancel-setting-btn', () => {
    $('#easy-seed-setting-panel').remove();
  });
};

const saveSetting = () => {
  const targetSitesEnabled = [];
  const searchSitesEnabled = [];
  $("input[name='target-site-enabled']:checked").each(function () {
    targetSitesEnabled.push($(this).val());
  });
  $("input[name='search-site-enabled']:checked").each(function () {
    searchSitesEnabled.push($(this).val());
  });
  console.log(targetSitesEnabled);
  try {
    GM_setValue('easy-seed.enabled-target-sites', JSON.stringify(targetSitesEnabled));
    GM_setValue('easy-seed.enabled-search-sites', JSON.stringify(searchSitesEnabled));
    $('#easy-seed-setting-panel').remove();
    window.location.reload();
  } catch (error) {
    alert('保存本地站点设置失败');
  }
};

const getThumbnailImgs = () => {
  const statusDom = $('.upload-section .upload-status');
  const allImgs = TORRENT_INFO.screenshots.concat(TORRENT_INFO.comparisonImgs);
  let imgList = allImgs;
  if (imgList.length < 1) {
    throw new Error('获取图片列表失败');
  }
  imgList = imgList.join('\n');
  const isNSFW = $('#nsfw').is(':checked');
  statusDom.text('转换中...');
  $('#img-transfer').attr('disabled', true).addClass('is-disabled');
  transferImgs(imgList, isNSFW).then(data => {
    if (data.length) {
      const thumbnailImgs = data.map(imgData => {
        return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
      });
      TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
      let { description } = TORRENT_INFO;
      allImgs.forEach((img, index) => {
        if (description.includes(img)) {
          description = description.replace(`[img]${img}[/img]`, thumbnailImgs[index]);
        }
      });
      TORRENT_INFO.description = description;
      statusDom.text('转换成功！');
    }
  }).catch(error => {
    statusDom.text(error.message);
  }).finally(() => {
    $('#img-transfer').removeAttr('disabled').removeClass('is-disabled');
  });
};
const getDoubanLink = () => {
  const doubanLink = $('.page__title>a').attr('href');
  if (doubanLink && doubanLink.match('movie.douban.com')) {
    TORRENT_INFO.doubanUrl = doubanLink;
    getDoubanData();
    return false;
  }
  const { imdbUrl, movieName } = TORRENT_INFO;
  getDoubanLinkByIMDB(imdbUrl, movieName).then(doubanUrl => {
    TORRENT_INFO.doubanUrl = doubanUrl;
    getDoubanData();
  }).catch(error => {
    throw new Error(error.message);
  });
};
const getDoubanData = () => {
  const { doubanUrl } = TORRENT_INFO;
  const statusDom = $('.douban-section .douban-status');
  try {
    if (doubanUrl) {
      statusDom.text('获取中...');
      getDoubanInfo(doubanUrl).then(data => {
        updateTorrentInfo(data);
        statusDom.text('获取成功');
      }).catch(error => {
        throw new Error(error.message);
      });
    }
  } catch (error) {
    statusDom.text(error.message);
  }
};
const updateTorrentInfo = (data) => {
  const desc = data.format;
  TORRENT_INFO.doubanInfo = data.format;
  TORRENT_INFO.subtitle = getSubTitle(data);
  const areaMatch = desc.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2];
  if (areaMatch) {
    TORRENT_INFO.area = getAreaCode(areaMatch);
  }
  let category = TORRENT_INFO.category;
  if (category === 'movie') {
    if (desc.match(/动画/)) {
      category = 'cartoon';
    } else if (desc.match(/纪录/)) {
      category = 'documentary';
    }
    TORRENT_INFO.category = category;
  }
};
const filterBluTorrent = (imdb) => {
  $('#imdb').val(imdb);
  const token = $('meta[name="csrf_token"]').attr('content');
  GM_xmlhttpRequest({
    method: 'GET',
    url: `${CURRENT_SITE_INFO.url}/torrents/filter?imdb=${imdb}&_token=${token}&sorting=size&direction=desc`,
    onload (res) {
      $('#facetedSearch').html(res.responseText);
    },
  });
};
// 某些站点需要将IMDB填入检索表单
const fillSearchImdb = () => {
  const imdbParam = getUrlParam('imdb');
  if (imdbParam) {
    if (CURRENT_SITE_NAME === 'Blutopia') {
      filterBluTorrent(imdbParam);
    } else if (CURRENT_SITE_NAME === 'Bdc') {
      $('#tsstac').val(imdbParam);
      $('#search_type').val('t_genre');
    }
  }
};
const paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
let torrentParams = (paramsMatchArray && paramsMatchArray.length > 0) ? paramsMatchArray[2] : null;
if (CURRENT_SITE_NAME) {
  fillSearchImdb();
  if (torrentParams && CURRENT_SITE_INFO.asTarget) {
    torrentParams = JSON.parse(decodeURIComponent(torrentParams));
    fillTargetForm(torrentParams);
  }
  if (CURRENT_SITE_INFO.asSource && !location.pathname.match(/upload/ig)) {
    getTorrentInfo();
    // 向当前所在站点添加按钮等内容
    console.log(TORRENT_INFO);
    let torrentInsertDom = $(CURRENT_SITE_INFO.seedDomSelector);
    if (CURRENT_SITE_INFO.siteType === 'NexusPHP' || CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST/)) {
      const trDom = `<tr>
      <td class="rowhead nowrap">
      </td>
      <td class="rowfollow easy-seed-td"></td>
      </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $('.easy-seed-td');
    }
    if (CURRENT_SITE_NAME === 'HDBits') {
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
    $('.site-list li>a').click(function () {
      const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
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
      if (url.match(/hdpost|blutopia/)) {
        const catMap = {
          movie: '1',
          tv: '2',
          tvPack: '2',
        };
        const path = catMap[TORRENT_INFO.category] || '1';
        url = url.replace('1', path);
      }
      if (CURRENT_SITE_NAME === 'TTG' && !TORRENT_INFO.description) {
        alert('请等待页面加载完成');
        return;
      }
      url = url.replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`);
      window.open(url);
    });
    // 原图转缩略图
    if ($('#img-transfer')) {
      $('#img-transfer').click(() => {
        getThumbnailImgs();
      });
    }
    if ($('#douban-info')) {
      $('#douban-info').click(() => {
        getDoubanLink();
      });
    }
    if ($('#easy-seed-setting')) {
      $('#easy-seed-setting').on('click', () => {
        openSettingPanel();
      });
    }
  }
}

;
