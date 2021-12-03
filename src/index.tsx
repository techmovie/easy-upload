// 入口文件
import { render, h } from 'preact';
import {
  CURRENT_SITE_NAME, CURRENT_SITE_INFO,
  TORRENT_INFO,
} from './const';

import { getUrlParam } from './common';
import { fillTargetForm } from './target';
import getTorrentInfo from './source';
// import { insertTorrentPage } from './site-dom/main';
import { fillSearchImdb } from './site-dom/quick-search';
import handleClickEvent from './site-dom/click-event';
import './site-dom/ptpimg';
import './style';
import App from './components/Container';

const paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
let torrentParams = (paramsMatchArray && paramsMatchArray.length > 0) ? paramsMatchArray[2] : null;
if (CURRENT_SITE_NAME) {
  fillSearchImdb();
  if (CURRENT_SITE_INFO.asTarget) {
    if (torrentParams) {
      torrentParams = JSON.parse(decodeURIComponent(torrentParams));
    }
    fillTargetForm(torrentParams);
  }
  if (CURRENT_SITE_INFO.asSource &&
    (!location.href.match(/upload/ig)) &&
    !(CURRENT_SITE_INFO.search &&
      location.pathname.match(CURRENT_SITE_INFO.search.path) &&
      (getUrlParam('imdb') || getUrlParam('name')))) {
    getTorrentInfo().then(() => {
      // 向当前所在站点添加按钮等内容
      console.log(TORRENT_INFO);
    });
    const div = document.createElement('div');
    render(<App />, div);
    const target = $(CURRENT_SITE_INFO.seedDomSelector)[0];
    Array.from(div.childNodes).forEach(node => {
      target.parentNode.insertBefore(node, target);
    });
    handleClickEvent();
  }
}
