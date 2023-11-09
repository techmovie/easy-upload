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
const torrentInfoMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
const timestampMatchArray = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
const torrentTimestamp = (timestampMatchArray && timestampMatchArray.length > 0) ? timestampMatchArray[2] : null;
const torrentInfoRaw = (torrentInfoMatchArray && torrentInfoMatchArray.length > 0) ? torrentInfoMatchArray[2] : null;
let torrentInfo = null;
if (CURRENT_SITE_NAME) {
  fillSearchImdb();
  if (currentSiteInfo.asTarget) {
    if (torrentInfoRaw) {
      torrentInfo = JSON.parse(decodeURIComponent(torrentInfoRaw));
    } else if (torrentTimestamp) {
      torrentInfo = GM_getValue('uploadInfo');
    }
    fillTargetForm(torrentInfo as TorrentInfo.Info);
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

    let refNode = $(currentSiteInfo.seedDomSelector)[0] as HTMLElement|null;
    const app = document.createElement('div');
    render(<App />, app);
    if (['PTP', 'BTN', 'GPW', 'EMP', 'RED', 'DicMusic', 'MTV'].includes(CURRENT_SITE_NAME)) {
      const torrentId = getUrlParam('torrentid');
      if (CURRENT_SITE_NAME === 'GPW') {
        refNode = document.querySelector(`#torrent_detail_${torrentId} >td`);
      } else if (CURRENT_SITE_NAME === 'EMP') {
        const groupId = getUrlParam('id');
        refNode = document.querySelector(`.groupid_${groupId}.torrentdetails>td`);
      } else if (CURRENT_SITE_NAME === 'MTV') {
        refNode = document.querySelector(`#torrentinfo${torrentId}>td`);
      } else {
        refNode = document.querySelector(`#torrent_${torrentId} >td`);
      }
      refNode?.prepend(app);
    } else if (CURRENT_SITE_NAME === 'UHDBits') {
      const torrentId = getUrlParam('torrentid');
      $(`#torrent_${torrentId} >td`).prepend(document.createElement('blockquote'));
      $(`#torrent_${torrentId} >td blockquote:first`)?.prepend(app);
    } else if (CURRENT_SITE_NAME === 'SpeedApp') {
      const div = document.createElement('div');
      div.setAttribute('class', 'row col-md-12 mt-5');
      app.setAttribute('class', 'card-body card');
      div.appendChild(app);
      refNode?.parentNode?.insertBefore(div, refNode);
    } else {
      Array.from(app.childNodes).forEach(child => {
        refNode?.parentNode?.insertBefore(child, refNode);
      });
    }
  }
}
