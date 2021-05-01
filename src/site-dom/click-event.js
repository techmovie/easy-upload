import {
  CURRENT_SITE_NAME, TORRENT_INFO,
} from '../const';
import { $t } from '../common';
import { openSettingPanel, openBatchSeedTabs } from './setting-panel';
import { getThumbnailImgs, getDoubanLink, getDoubanBookInfo } from './button-function';
export default () => {
  if ($('#easy-seed-setting')[0]) {
    $('#easy-seed-setting').on('click', () => {
      openSettingPanel();
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
    $('#douban-info').click(() => {
      getDoubanLink();
    });
  }
  if ($('#douban-book-info')[0]) {
    $('#douban-book-info').click(() => {
      getDoubanBookInfo();
    });
  }
  handleSiteClickEvent();
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
        GM_xmlhttpRequest({
          method: 'GET',
          url: `https://baconbits.org/ajax.php?action=upload_section&section=${catMap[TORRENT_INFO.category]}`,
          onload (res) {
            resolve(res.responseText);
          },
        });
      });
      TORRENT_INFO.formDom = formDom;
    }
    if (TORRENT_INFO.isForbidden) {
      const result = window.confirm($t('本种子禁止转载，确定要继续转载么？'));
      if (!result) {
        return;
      }
    }
    if (CURRENT_SITE_NAME === 'TTG' && !TORRENT_INFO.description) {
      alert($t('请等待页面加载完成'));
      return;
    }
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    url = url.replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`);
    window.open(url);
  });
};
