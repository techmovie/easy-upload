import {
  getUrlParam, $t,
} from '../common';
import {
  CURRENT_SITE_NAME, CURRENT_SITE_INFO, PT_SITE,
  SORTED_SITE_KEYS,
} from '../const';
const getSearchList = () => {
  const searchSitesEnabled = GM_getValue('easy-seed.enabled-search-site-list') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-search-site-list'));
  const siteFaviconClosed = GM_getValue('easy-seed.site-favicon-closed') === undefined
    ? ''
    : GM_getValue('easy-seed.site-favicon-closed');
  const searchList = SORTED_SITE_KEYS.map(siteName => {
    const siteInfo = PT_SITE[siteName];
    if (siteInfo.search) {
      if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
        const favIcon = (siteFaviconClosed === '' && PT_SITE[siteName].icon) ? PT_SITE[siteName].icon : '';
        return `<li><a href="javascript:void(0);" data-site="${siteName}">${favIcon} ${siteName}</a> <span>|</span></li>`;
      }
    }
    return '';
  });
  return searchList;
};
const getFunctionItems = () => {
  const doubanSearchDom = (CURRENT_SITE_INFO.needDoubanBookInfo || CURRENT_SITE_INFO.needDoubanInfo)
    ? `<div class="function-list-item">
  <div class="douban-book-section">
    <input type="text" placeholder="${$t('手动输入豆瓣链接')}" id="douban-link">
  </div>
  </div>`
    : '';
  const transferImgClosed = GM_getValue('easy-seed.transfer-img-closed') === undefined
    ? ''
    : GM_getValue('easy-seed.transfer-img-closed');
  const doubanDom = CURRENT_SITE_INFO.needDoubanInfo
    ? `${doubanSearchDom}
  <div class="function-list-item">
    <div class="douban-section">
      <button id="douban-info">${$t('获取豆瓣简介')}</button>
    </div>
  </div>`
    : '';
  const doubanBookDom = CURRENT_SITE_INFO.needDoubanBookInfo
    ? `${doubanSearchDom}
<div class="function-list-item">
  <div class="douban-book-section">
    <button id="douban-book-info">${$t('获取豆瓣读书简介')}</button>
  </div>
</div>`
    : '';
  const transferDom = transferImgClosed || CURRENT_SITE_NAME === 'BTN'
    ? ''
    : `
      <div class="function-list-item">
      <div class="upload-section">
        <button id="img-transfer">${$t('转缩略图')}</button>
      </div>
    </div>`;
  const uploadImgClosed = GM_getValue('easy-seed.upload-img-closed') || '';
  const uploadImgDom = uploadImgClosed || CURRENT_SITE_NAME === 'BTN'
    ? ''
    : `
<div class="function-list-item">
<div class="upload-section">
  <button id="upload-to-ptp">${$t('转存截图到ptpimg')}</button>
</div>
</div>`;
  return (doubanDom || transferDom || doubanSearchDom)
    ? `<section class="easy-seed-function-list">
        ${doubanDom}
        ${doubanBookDom} 
        ${transferDom}
        ${uploadImgDom}
      </section>`
    : '';
};
/*
* 向源站点页面注入DOM
* @param {torrentDom} DOM的父节点JQ对象
* @param {titleDom} 标题
* @param {searchListDom} 快速检索Dom
* @return
* */
const createSeedDom = (torrentDom, titleDom = '', searchListDom = '') => {
  const targetSitesEnabled = GM_getValue('easy-seed.enabled-target-sites') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-target-sites'));
  const siteFaviconClosed = GM_getValue('easy-seed.site-favicon-closed') === undefined
    ? ''
    : GM_getValue('easy-seed.site-favicon-closed');
  const siteList = SORTED_SITE_KEYS.map((siteName, index) => {
    const { url, uploadPath } = PT_SITE[siteName];
    const favIcon = (siteFaviconClosed === '' && PT_SITE[siteName].icon) ? PT_SITE[siteName].icon : '';
    if (PT_SITE[siteName].asTarget) {
      if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
        return `<li>
        <a href="javascript:void(0);" data-link="${url}${uploadPath}#torrentInfo=null">${favIcon} ${siteName} </a>
        <span>|</span>
        </li>`;
      }
    }
    return '';
  });
  const gazelleSearchListDom = searchListDom.match(/<ul(.|\n)+?<\/ul>/)?.[0]
    ?.replace(/(<ul.+?>)/, `$1\n<div class="ptp-seed-title"><h4>${$t('快速检索')}</h4></div>`);
  const seedDom = `
  <div class="seed-dom movie-page__torrent__panel">
    <ul class="site-list">
      <div class="ptp-seed-title">${CURRENT_SITE_INFO.siteType === 'gazelle' ? titleDom : ''}</div>
      ${siteList.join('')}
      <li>
        <button id="batch-seed-btn">${$t('一键群转')}</button>
      </li>
    </ul>
    ${CURRENT_SITE_INFO.siteType === 'gazelle'
    ? `${getFunctionItems()}
    <div class="ptp-search-list">
        ${gazelleSearchListDom}
    <div/> `
    : ''}
  </div>
  `;
  torrentDom.prepend(seedDom);
};
// 将easy-upload插入种子页面
const insertTorrentPage = () => {
  let torrentInsertDom = $(CURRENT_SITE_INFO.seedDomSelector);
  const searchList = getSearchList();
  const searchListDom = `<td class="rowhead nowrap title-td detailsleft">
  <h4>${$t('快速检索')}</h4>
  </td>
  <td class="rowfollow detailshash"> 
  <ul class="search-list ">
    ${searchList.join('')}
  </ul>
  </td>`;
  const functionItems = getFunctionItems();
  const functionDom = functionItems
    ? `<tr><td class="rowhead nowrap title-td detailsleft">
  <h4>${$t('快捷操作')}</h4>
  </td>
  <td class="rowfollow detailshash"> 
    ${functionItems}
  </td></tr>`
    : '';
  const easySeedTitleDom = `
  <h4>${$t('一键转种')} <span id="easy-seed-setting" class="easy-seed-setting-btn">
  <svg t="1620919074628" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11010" width="32" height="32"><path d="M512 0c409.6 0 512 102.4 512 512S921.6 1024 512 1024 0 921.6 0 512 102.4 0 512 0z" fill="#3A4BFC" p-id="11011"></path><path d="M824.501394 507.681646l-47.542857-10.743223a252.986514 252.986514 0 0 0-36.115017-87.086812l27.431497-43.429302a8.97024 8.97024 0 0 0 0-12.568869l-47.203474-47.203474a8.97024 8.97024 0 0 0-12.568869 0l-43.885714 27.659703a253.343451 253.343451 0 0 0-83.769051-34.628755l-12.00128-53.259703c0-4.9152-4.002377-8.911726-8.917578-8.911725H493.187657c-4.9152 0-8.911726 3.996526-8.911726 8.911725l-12.00128 53.259703a254.858971 254.858971 0 0 0-81.369965 33.142492l-47.999269-30.286995a8.97024 8.97024 0 0 0-12.57472 0l-47.197623 47.203475a8.97024 8.97024 0 0 0 0 12.568868l29.596526 46.85824a252.957257 252.957257 0 0 0-34.968137 80.340115l-54.857143 12.463542c-4.9152 0-8.917577 3.996526-8.917577 8.911726v66.741394c0 4.9152 4.002377 8.911726 8.917577 8.911726l52.341029 11.890103a253.103543 253.103543 0 0 0 32.457874 84.114286l-28.572526 45.254948a8.97024 8.97024 0 0 0 0 12.568869l47.203474 47.203474a8.97024 8.97024 0 0 0 12.568869 0l42.744686-26.975086a253.893486 253.893486 0 0 0 85.828754 38.057692l11.082606 49.034971c0 4.909349 4.002377 8.911726 8.917577 8.911726h66.741394c4.9152 0 8.911726-4.002377 8.911726-8.917577l10.515017-46.630034a253.987109 253.987109 0 0 0 89.942309-35.313372l40.802011 25.717029a8.97024 8.97024 0 0 0 12.568869 0l47.203474-47.203475a8.97024 8.97024 0 0 0 0-12.568868l-24.915383-39.426926a255.210057 255.210057 0 0 0 37.712457-89.257691l47.542857-10.743223c4.9152 0 8.917577-4.002377 8.917577-8.917577V516.593371c0-4.9152-4.002377-8.911726-8.917577-8.911725z m-300.453303 180.341028c-77.829851 0-140.802926-63.084251-140.802925-140.797074 0-77.718674 63.084251-140.802926 140.802925-140.802926 77.824 0 140.797074 63.084251 140.797075 140.802926 0 77.706971-63.084251 140.797074-140.797075 140.797074z" fill="#2A3BF0" p-id="11012"></path><path d="M812.798537 472.573074l-47.542857-10.743223a252.986514 252.986514 0 0 0-36.115017-87.086811l27.431497-43.429303a8.97024 8.97024 0 0 0 0-12.568868l-47.203474-47.203475a8.97024 8.97024 0 0 0-12.568869 0l-43.885714 27.659703a253.343451 253.343451 0 0 0-83.769052-34.628754l-12.00128-53.259703c0-4.9152-4.002377-8.911726-8.917577-8.911726H481.4848c-4.9152 0-8.911726 3.996526-8.911726 8.911726l-12.00128 53.259703a254.858971 254.858971 0 0 0-81.369965 33.142491l-47.999269-30.286994a8.97024 8.97024 0 0 0-12.57472 0l-47.197623 47.203474a8.97024 8.97024 0 0 0 0 12.568869l29.596526 46.85824a252.957257 252.957257 0 0 0-34.968137 80.340114l-54.857143 12.463543c-4.9152 0-8.917577 3.996526-8.917577 8.911726v66.741394c0 4.9152 4.002377 8.911726 8.917577 8.911726l52.341028 11.890103a253.103543 253.103543 0 0 0 32.457875 84.114285l-28.572526 45.254949a8.97024 8.97024 0 0 0 0 12.568868l47.203474 47.203475a8.97024 8.97024 0 0 0 12.568869 0l42.744686-26.975086a253.893486 253.893486 0 0 0 85.828754 38.057691l11.082606 49.034972c0 4.909349 4.002377 8.911726 8.917577 8.911726h66.741394c4.9152 0 8.911726-4.002377 8.911726-8.917578l10.515017-46.630034a253.987109 253.987109 0 0 0 89.942308-35.313371l40.802012 25.717028a8.97024 8.97024 0 0 0 12.568868 0l47.203475-47.203474a8.97024 8.97024 0 0 0 0-12.568869l-24.915383-39.426925a255.210057 255.210057 0 0 0 37.712457-89.257692l47.542857-10.743223c4.9152 0 8.917577-4.002377 8.917577-8.917577V481.4848c0-4.9152-4.002377-8.911726-8.917577-8.911726z m-300.453303 180.341029c-77.829851 0-140.802926-63.084251-140.802925-140.797074 0-77.718674 63.084251-140.802926 140.802925-140.802926 77.824 0 140.797074 63.084251 140.797075 140.802926 0 77.706971-63.084251 140.797074-140.797075 140.797074z" fill="#FFFFFF" p-id="11013"></path></svg> 
  </span></h4>`;
  if (CURRENT_SITE_INFO.siteType === 'NexusPHP' ||
   CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS/)) {
    const trDom = `<tr>
    <td class="rowhead nowrap title-td">
    ${easySeedTitleDom}
    </td>
    <td class="rowfollow easy-seed-td"></td>
    </tr>
    ${functionDom}
    <tr>
    ${searchListDom}
    </tr>`;
    torrentInsertDom.after(trDom);
    torrentInsertDom = $('.easy-seed-td');
  } else if (CURRENT_SITE_NAME === 'HDT') {
    const trDom = `<tr>
    <td class="detailsleft" title-td" align="right">
    ${easySeedTitleDom}
    </td>
    <td class="detailshash easy-seed-td" align="center"></td>
    </tr>
    ${functionDom}
    <tr>
    ${searchListDom}
    </tr>`;
    torrentInsertDom.after(trDom);
    torrentInsertDom = $('.easy-seed-td');
  } else if (CURRENT_SITE_NAME === 'HDBits') {
    const trDom = `<tr class="hdb-tr">
    <td class="rowfollow title-td hdb-td">${easySeedTitleDom}</td>
    <td class="rowfollow easy-seed-td hdb-td"></td>
    </tr>
    <tr class="hdb-tr">
    ${functionDom.replace(/<\/?tr>/g, '')}
    </tr>
    <tr class="hdb-tr">
    ${searchListDom}
    </tr>`;
    torrentInsertDom.after(trDom);
    torrentInsertDom = $('.easy-seed-td');
  } else if (['PTP', 'BTN'].includes(CURRENT_SITE_NAME)) {
    const torrentId = getUrlParam('torrentid');
    torrentInsertDom = $(`#torrent_${torrentId} >td`);
  } else if (CURRENT_SITE_NAME === 'UHDBits') {
    const torrentId = getUrlParam('torrentid');
    $(`#torrent_${torrentId} >td`).prepend(document.createElement('blockquote'));
    torrentInsertDom = $(`#torrent_${torrentId} >td blockquote:first`);
  }
  createSeedDom(torrentInsertDom, easySeedTitleDom, searchListDom);
};
export {
  insertTorrentPage,
};
