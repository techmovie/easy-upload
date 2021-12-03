import {
  CURRENT_SITE_INFO,
  CURRENT_SITE_NAME,
  PT_SITE,
  SORTED_SITE_KEYS,
  TORRENT_INFO,
} from '../const';
import {
  getSubTitle, getDoubanInfo, $t, fetch,
  getDoubanIdByIMDB,
  showNotice,
  getSize,
} from '../common';

const checkQuickResult = () => {
  const searchListSetting = <string>GM_getValue('easy-seed.enabled-search-site-list');

  let searchSitesEnabled = searchListSetting ? JSON.parse(searchListSetting) : [];
  if (searchSitesEnabled.length === 0) {
    searchSitesEnabled = SORTED_SITE_KEYS;
  }

  searchSitesEnabled.forEach(async site => {
    const resultConfig = PT_SITE[site].search?.result;
    const siteUrl = PT_SITE[site].url;
    if (resultConfig) {
      const { list, name, size, url: urlDom } = resultConfig;
      const { title, size: searchSize } = TORRENT_INFO;
      const url = getQuickSearchUrl(site);
      const domString = await fetch(url, {
        responseType: undefined,
      });
      const dom = new DOMParser().parseFromString(domString, 'text/html');
      const torrentList = $(list, dom);
      const sameTorrent = Array.prototype.find.call(torrentList, (item) => {
        let torrentName;
        if (site === 'TTG') {
          torrentName = $(item).find(name).prop('firstChild')?.textContent?.trim() ?? '';
        } else {
          torrentName = $(item).find(name).attr('title') || $(item).find(name).text();
        }
        if (site === 'TJUPT') {
          const matchArray = torrentName.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
          const realTitle = matchArray.filter(item => item.match(/\.| /))?.[0] ?? '';
          torrentName = realTitle.replace(/\[|\]/g, '');
        }
        torrentName = torrentName?.replace(/\s|\./g, '');

        const sizeBytes = Number(getSize($(item).find(size).text()));
        return torrentName === title?.replace(/\s|\./g, '') && Math.abs(sizeBytes - searchSize) < Math.pow(1024, 2) * 1000;
      });
      if (sameTorrent) {
        const url = `${siteUrl}/${$(sameTorrent).find(urlDom).attr('href')}`;
        $(`.search-list li>a[data-site=${site}]`).attr('data-url', url).css('color', '#218380');
      } else {
        $(`.search-list li>a[data-site=${site}]`).css('color', '#D81159');
      }
    }
  });
};
async function autoFillDoubanInfo(selfDom, info) {
  try {
    $(selfDom).text($t('获取中...'));
    const { imdbUrl, movieName, doubanUrl, description: descriptionData, title: torrentTitle } = info;
    if (!imdbUrl && !doubanUrl) {
      throw new Error($t('请填写正确链接'));
    }
    let doubanLink;
    if (doubanUrl && doubanUrl.match('movie.douban.com')) {
      doubanLink = doubanUrl;
    } else {
      const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
      let { id, season = '' } = doubanData;
      if (season) {
        const tvData = await getTvSeasonData(doubanData);
        id = tvData.id;
      }
      doubanLink = `https://movie.douban.com/subject/${id}`;
    }
    if (doubanLink) {
      const { douban, imdb, subtitle, description, name } = CURRENT_SITE_INFO;
      if (CURRENT_SITE_NAME === 'SSD') {
        $(imdb.selector).val(doubanLink);
      } else {
        $(douban?.selector).val(doubanLink);
      }
      if (!descriptionData?.match(/(片|译)\s*名/)) {
        const movieData = await getDoubanInfo(doubanLink);
        showNotice({
          title: $t('成功'),
          text: $t('获取成功'),
        });
        const imdbLink = movieData.imdbLink;
        if (<string>$(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== 'SSD') {
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
      } else {
        showNotice({
          title: $t('成功'),
          text: $t('获取成功'),
        });
      }
    }
  } catch (error) {
    showNotice({
      title: $t('错误'),
      text: error.message,
    });
  } finally {
    $(selfDom).text($t('获取豆瓣简介'));
  }
}
export {
  checkQuickResult,
  autoFillDoubanInfo,
};
