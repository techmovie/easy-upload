// 入口文件
import { render } from 'preact';
import { CURRENT_SITE_NAME, CURRENT_SITE_INFO } from './const';

import { getLocationSearchValueByKey } from '@/common';
import { fillTargetForm } from './target';
import { getTorrentInfo } from '@/source';
import { fillSearchImdb } from './site-dom/quick-search';
import { torrentInfoStore } from '@/components/torrentInfoStore';
import './site-dom/ptpimg';
import './site-dom/AnalyzeUploadPage';
import './style.css';
import App from './components/Container';
import $ from 'jquery';

const torrentInfoMatchArray =
  location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
const timestampMatchArray =
  location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
const torrentTimestamp =
  timestampMatchArray && timestampMatchArray.length > 0
    ? timestampMatchArray[2]
    : null;
const torrentInfoRaw =
  torrentInfoMatchArray && torrentInfoMatchArray.length > 0
    ? torrentInfoMatchArray[2]
    : null;
let torrentInfo = null;
if (CURRENT_SITE_NAME) {
  fillSearchImdb();
  if (CURRENT_SITE_INFO.asTarget) {
    if (torrentInfoRaw) {
      torrentInfo = JSON.parse(decodeURIComponent(torrentInfoRaw));
    } else if (torrentTimestamp) {
      torrentInfo = GM_getValue('cachedTorrentInfo');
    }
    fillTargetForm(torrentInfo as TorrentInfo.Info);
  }
  if (
    CURRENT_SITE_INFO.asSource &&
    !location.href.match(/upload|offer|create/gi) &&
    !(
      CURRENT_SITE_INFO.search &&
      location.pathname.match(CURRENT_SITE_INFO.search.path) &&
      (getLocationSearchValueByKey('imdb') ||
        getLocationSearchValueByKey('name'))
    )
  ) {
    getTorrentInfo().then((info) => {
      console.log(info);
      if (!info) return;
      torrentInfoStore.setInfo(info);
    });

    let refNode = $(CURRENT_SITE_INFO.seedDomSelector)[0] as HTMLElement | null;
    const app = document.createElement('div');
    render(<App />, app);
    if (
      [
        'PTP',
        'BTN',
        'GPW',
        'EMP',
        'RED',
        'DicMusic',
        'MTV',
        'Orpheus',
      ].includes(CURRENT_SITE_NAME)
    ) {
      const torrentId = getLocationSearchValueByKey('torrentid');
      if (CURRENT_SITE_NAME === 'GPW') {
        refNode = document.querySelector(`#torrent_detail_${torrentId} >td`);
      } else if (CURRENT_SITE_NAME === 'MTV') {
        refNode = document.querySelector(`#torrentinfo${torrentId}>td`);
      } else {
        refNode = document.querySelector(`#torrent_${torrentId} >td`);
      }
      refNode?.prepend(app);
    } else if (CURRENT_SITE_NAME === 'UHDBits') {
      const torrentId = getLocationSearchValueByKey('torrentid');
      $(`#torrent_${torrentId} >td`).prepend(
        document.createElement('blockquote'),
      );
      $(`#torrent_${torrentId} >td blockquote:first`)?.prepend(app);
    } else if (CURRENT_SITE_NAME === 'SpeedApp') {
      const div = document.createElement('div');
      div.setAttribute('class', 'row col-md-12 mt-5');
      app.setAttribute('class', 'card-body card');
      div.appendChild(app);
      refNode?.parentNode?.insertBefore(div, refNode);
    } else if (CURRENT_SITE_NAME === 'MTeam') {
      const targetNode = document.getElementById('root');
      const config = { childList: true, subtree: true };
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const targetElement = $(CURRENT_SITE_INFO.seedDomSelector)[0];
            if (targetElement) {
              observer.disconnect();
              refNode = $(
                CURRENT_SITE_INFO.seedDomSelector,
              )[0] as HTMLElement | null;
              Array.from(app.childNodes).forEach((child) => {
                refNode?.parentNode?.insertBefore(child, refNode);
              });
              break;
            }
          }
        }
      });
      observer.observe(targetNode as HTMLElement, config);
    } else {
      Array.from(app.childNodes).forEach((child) => {
        refNode?.parentNode?.insertBefore(child, refNode);
      });
    }
  }
}
