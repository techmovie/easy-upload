import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import {
  $t,
  getDoubanBasicDataByQuery,
  getSubTitleFromDoubanInfo,
  getDoubanInfoByIdOrDoubanUrl,
  getDoubanTVItemData,
} from '@/common';
import $ from 'jquery';

async function autoFillDoubanInfo(selfDom: JQuery, info: TorrentInfo.Info) {
  try {
    $(selfDom).text($t('获取中...'));
    const {
      imdbUrl,
      movieName,
      doubanUrl,
      description: descriptionData,
      title: torrentTitle,
    } = info;
    if (!imdbUrl && !doubanUrl) {
      throw new Error($t('请填写正确链接'));
    }
    let doubanLink = '';
    if (doubanUrl?.match(/movie\.douban\.com/)) {
      doubanLink = doubanUrl;
    } else {
      const doubanData = await getDoubanBasicDataByQuery(imdbUrl || movieName);
      if (doubanData) {
        let { id, isTV } = doubanData;
        if (isTV) {
          const tvData = await getDoubanTVItemData(doubanData, torrentTitle);
          if (tvData) {
            id = tvData && tvData.id;
          }
        }
        doubanLink = `https://movie.douban.com/subject/${id}`;
      }
    }
    if (doubanLink) {
      const { douban, imdb, subtitle, description, name } = CURRENT_SITE_INFO;
      if (CURRENT_SITE_NAME === 'SSD') {
        $(imdb.selector).val(doubanLink);
      } else {
        $(douban?.selector).val(doubanLink);
      }
      if (!descriptionData?.match(/(片|译)\s*名/)) {
        const movieData = await getDoubanInfoByIdOrDoubanUrl(doubanLink);
        if (movieData) {
          const imdbLink = movieData.imdbLink;
          if (
            $(imdb.selector).val() !== imdbLink &&
            CURRENT_SITE_NAME !== 'SSD'
          ) {
            $(imdb.selector).val(imdbLink);
          }
          const torrentSubtitle = getSubTitleFromDoubanInfo(movieData, info);

          if (CURRENT_SITE_NAME === 'TTG') {
            $(name.selector).val(`${torrentTitle || ''}[${torrentSubtitle}]`);
          } else {
            $(subtitle.selector).val(torrentSubtitle);
          }
          if (CURRENT_SITE_NAME !== 'SSD') {
            $(description.selector).val(
              `${movieData.format}\n${$(description.selector).val()}`,
            );
          }
        }
      }
    }
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    $(selfDom).text($t('获取豆瓣简介'));
  }
}
export default (info: TorrentInfo.Info) => {
  if (info.doubanInfo) {
    return;
  }
  if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
    const { imdb, douban } = CURRENT_SITE_INFO;
    let selector: JQuery = $('');
    if (douban?.selector && $(douban.selector) && $(douban.selector).val()) {
      selector = $(douban.selector);
    } else if (imdb) {
      selector = $(imdb.selector);
    }
    if (selector) {
      selector.after(
        `<span id="auto-fill-douban">${$t('获取豆瓣简介')}</span>`,
      );
    }
    $('#auto-fill-douban').on('click', () => {
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
