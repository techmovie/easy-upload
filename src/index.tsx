// 入口文件
import { render } from 'preact';
import {
  CURRENT_SITE_NAME, CURRENT_SITE_INFO,
  TORRENT_INFO,
} from './const';

import { getUrlParam } from './common';
import { fillTargetForm } from './target';
import getTorrentInfo from './source';
import { fillSearchImdb } from './site-dom/quick-search';
import './site-dom/ptpimg';
import './style';
import App from './components/Container';

const currentSiteInfo = CURRENT_SITE_INFO as Site.SiteInfo;
const paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
const torrentParams = (paramsMatchArray && paramsMatchArray.length > 0) ? paramsMatchArray[2] : null;
let torrentInfo = null;
if (CURRENT_SITE_NAME) {
  fillSearchImdb();
  if (currentSiteInfo.asTarget) {
    if (torrentParams) {
      torrentInfo = JSON.parse(decodeURIComponent(torrentParams));
    }
    fillTargetForm(torrentInfo);
  }
  if (currentSiteInfo.asSource &&
    (!location.href.match(/upload/ig)) &&
    !(currentSiteInfo.search &&
      location.pathname.match(currentSiteInfo.search.path) &&
      (getUrlParam('imdb') || getUrlParam('name')))) {
    getTorrentInfo().then(() => {
      // 向当前所在站点添加按钮等内容
      console.log(TORRENT_INFO);
    });

    let target = $(currentSiteInfo.seedDomSelector)[0] as HTMLElement|null;
    const element = document.createElement('div');
    render(<App />, element);
    if (['PTP', 'BTN', 'GPW', 'EMP', 'RED', 'DicMusic', 'MTV'].includes(CURRENT_SITE_NAME)) {
      const torrentId = getUrlParam('torrentid');
      if (CURRENT_SITE_NAME === 'GPW') {
        target = document.querySelector(`#torrent_detail_${torrentId} >td`);
      } else if (CURRENT_SITE_NAME === 'EMP') {
        const groupId = getUrlParam('id');
        target = document.querySelector(`.groupid_${groupId}.torrentdetails>td`);
      } else if (CURRENT_SITE_NAME === 'MTV') {
        target = document.querySelector(`#torrentinfo${torrentId}>td`);
      } else {
        target = document.querySelector(`#torrent_${torrentId} >td`);
      }
      target?.prepend(element);
    } else if (CURRENT_SITE_NAME === 'UHDBits') {
      const torrentId = getUrlParam('torrentid');
      $(`#torrent_${torrentId} >td`).prepend(document.createElement('blockquote'));
      $(`#torrent_${torrentId} >td blockquote:first`)?.prepend(element);
    } else {
      Array.from(element.childNodes).forEach(node => {
        target?.parentNode?.insertBefore(node, target);
      });
    }
  }
}
