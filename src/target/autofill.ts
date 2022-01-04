import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, PT_SITE } from '../const';
import {
  $t, getDoubanIdByIMDB, getTvSeasonData,
  getDoubanInfo, getSubTitle,
} from '../common';
import Notification from '../components/Notification';

async function autoFillDoubanInfo (selfDom: JQuery, info: TorrentInfo.Info) {
  try {
    $(selfDom).text($t('获取中...'));
    const {
      imdbUrl, movieName,
      doubanUrl, description:
      descriptionData, title: torrentTitle,
    } = info;
    if (!imdbUrl && !doubanUrl) {
      throw new Error($t('请填写正确链接'));
    }
    let doubanLink: string = '';
    if (doubanUrl && doubanUrl.match('movie.douban.com')) {
      doubanLink = doubanUrl;
    } else {
      const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
      if (doubanData) {
        let { id, season = '' } = doubanData;
        const tvData = await getTvSeasonData(doubanData);
        if (season && tvData) {
          id = tvData && tvData.id;
        }
        doubanLink = `https://movie.douban.com/subject/${id}`;
      }
    }
    if (doubanLink) {
      const {
        douban, imdb, subtitle,
        description, name,
      } = CURRENT_SITE_INFO as typeof PT_SITE.PTer;
      if (CURRENT_SITE_NAME === 'SSD') {
        $(imdb.selector).val(doubanLink);
      } else {
        $(douban?.selector).val(doubanLink);
      }
      if (!descriptionData?.match(/(片|译)\s*名/)) {
        const movieData = await getDoubanInfo(doubanLink);
        if (movieData) {
          Notification.open({
            message: $t('成功'),
            description: $t('获取成功'),
          });
          const imdbLink = movieData.imdbLink;
          if ($(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== 'SSD') {
            $(imdb.selector).val(imdbLink);
          }
          const torrentSubtitle = getSubTitle(movieData);
          if (CURRENT_SITE_NAME === 'TTG') {
            $(name.selector).val(`${torrentTitle || ''}[${torrentSubtitle}]`);
          } else {
            $(subtitle.selector).val(torrentSubtitle);
          }
          if (CURRENT_SITE_NAME !== 'SSD') {
            $(description.selector).val(`${movieData.format}\n${$(description.selector).val()}`);
          }
        }
      } else {
        Notification.open({
          message: $t('成功'),
          description: $t('获取成功'),
        });
      }
    }
  } catch (error) {
    Notification.open({
      message: $t('错误'),
      description: (error as Error).message,
    });
  } finally {
    $(selfDom).text($t('获取豆瓣简介'));
  }
}
export default (info: TorrentInfo.Info) => {
  if (info.doubanInfo) {
    return;
  }
  if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
    const { imdb, douban } = CURRENT_SITE_INFO as typeof PT_SITE.PTer;
    let selector: JQuery = $('');
    if ((douban.selector && $(douban.selector)) && $(douban.selector).val()) {
      selector = $(douban.selector);
    } else if (imdb) {
      selector = $(imdb.selector);
    }
    if (selector) {
      selector.after(`<span id="auto-fill-douban">${$t('获取豆瓣简介')}</span>`);
    }
    $('#auto-fill-douban').on('click', (e) => {
      const url = <string>selector.val();
      if (url.match(/subject\/(\d+)/)) {
        info.doubanUrl = url;
      } else if (url.match(/imdb\.com\/title\/tt\d+/)) {
        info.imdbUrl = url;
      }
      autoFillDoubanInfo($('#auto-fill-douban'), info);
    });
  }
};
