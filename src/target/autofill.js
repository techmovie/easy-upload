import { CURRENT_SITE_INFO } from '../const';
import { $t } from '../common';
import {
  autoFillDoubanInfo,
} from '../site-dom/button-function';
export default (info = {}) => {
  if (info.doubanInfo) {
    return;
  }
  if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
    const { imdb, douban } = CURRENT_SITE_INFO;
    let selector;
    if ((douban?.selector && $(douban.selector)) && $(douban.selector).val()) {
      selector = $(douban.selector);
    } else {
      selector = $(imdb.selector);
    }
    selector.after(`<span id="auto-fill-douban">${$t('获取豆瓣简介')}</span>`);
    $('#auto-fill-douban').click(function (e) {
      const url = selector.val();
      if (url.match(/subject\/(\d+)/)) {
        info.doubanUrl = url;
      } else if (url.match(/imdb\.com\/title\/tt\d+/)) {
        info.imdbUrl = url;
      }
      autoFillDoubanInfo(this, info);
    });
  }
};
