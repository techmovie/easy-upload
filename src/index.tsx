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

    const target = $(CURRENT_SITE_INFO.seedDomSelector)[0];

    const element = target.parentNode.cloneNode();
    render(<App />, element);

    Array.from(element.childNodes).forEach(node => {
      target.parentNode.insertBefore(node, target);
    });
  }
}
