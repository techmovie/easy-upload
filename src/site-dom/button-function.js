import {
  CURRENT_SITE_INFO,
  CURRENT_SITE_NAME,
  PT_SITE,
  SORTED_SITE_KEYS,
  TORRENT_INFO,
} from '../const';
import { getQuickSearchUrl } from './common';
import {
  getSubTitle, transferImgs, getDoubanInfo, $t, fetch,
  getDoubanIdByIMDB, getAreaCode, getPreciseCategory,
  showNotice, getOriginalImgUrl, saveScreenshotsToPtpimg,
  getSize,
} from '../common';

const getThumbnailImgs = async () => {
  try {
    const allImgs = TORRENT_INFO.screenshots.concat(...TORRENT_INFO.comparisons.map(v => v.imgs));
    const imgList = [...new Set(allImgs)];
    if (imgList.length < 1) {
      throw new Error($t('获取图片列表失败'));
    }
    $('#img-transfer').text($t('转换中...')).attr('disabled', true).addClass('is-disabled');
    $('#transfer-progress').show().text(`0 / ${imgList.length}`);
    const imgbbHtml = await fetch('https://imgbb.com', {
      responseType: 'text',
    });
    const authToken = imgbbHtml.match(/PF\.obj\.config\.auth_token="(.+)?"/)?.[1];
    const uploadedImgs = [];
    for (let index = 0; index < imgList.length; index++) {
      const data = await transferImgs(imgList[index], authToken);
      if (data) {
        uploadedImgs.push(data);
        $('#transfer-progress').text(`${uploadedImgs.length} / ${imgList.length}`);
      }
    }
    if (uploadedImgs.length) {
      const thumbnailImgs = uploadedImgs.map(imgData => {
        return `[url=${imgData.url}][img]${imgData.thumb.url}[/img][/url]`;
      });
      TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
      let { description } = TORRENT_INFO;
      imgList.forEach((img, index) => {
        if (description.includes(img)) {
          description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]\n*`, 'ig'), thumbnailImgs[index] || '');
        }
      });
      TORRENT_INFO.description = description;
      showNotice({
        title: $t('成功'),
        text: $t('转换成功！'),
      });
    }
  } catch (error) {
    showNotice({
      title: $t('错误'),
      text: error.message,
    });
  } finally {
    $('#img-transfer').text($t('转缩略图')).removeAttr('disabled').removeClass('is-disabled');
  }
};
const getDoubanData = async (selfDom) => {
  try {
    $(selfDom).text($t('获取中...')).attr('disabled', true).addClass('is-disabled');
    let doubanUrl;
    // https://github.com/techmovie/DouBan-Info-for-PT
    const scriptDoubanLink = $('.douban-dom').attr('douban-link');
    const doubanLink = $('.page__title>a').attr('href') ||
   scriptDoubanLink ||
   TORRENT_INFO.doubanUrl ||
    $('#douban-link').val();
    if (doubanLink && doubanLink.match('movie.douban.com')) {
      doubanUrl = doubanLink;
    } else {
      const { imdbUrl, movieName } = TORRENT_INFO;
      const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
      let { id, season = '' } = doubanData;
      if (season) {
        const tvData = await getTvSeasonData(doubanData);
        id = tvData.id;
      }
      doubanUrl = `https://movie.douban.com/subject/${id}`;
    }
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
      $('#douban-link').val(doubanUrl);
      if (!TORRENT_INFO.description.match(/(片|译)\s*名/)) {
        const movieData = await getDoubanInfo(doubanUrl);
        showNotice({
          title: $t('成功'),
          text: $t('获取成功'),
        });
        updateTorrentInfo(movieData);
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
    $('#douban-info').text($t('获取豆瓣简介')).removeAttr('disabled').removeClass('is-disabled');
  }
};
const getTvSeasonData = async (data) => {
  const { title: torrentTitle } = TORRENT_INFO;
  const { season = '', title } = data;
  if (season) {
    const seasonNumber = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)?.[1] ?? 1;
    if (parseInt(seasonNumber) === 1) {
      return data;
    } else {
      const query = title.replace(/第.+?季/, `第${seasonNumber}季`);
      const response = await getDoubanIdByIMDB(query);
      return response;
    }
  }
};
const getDoubanBookInfo = () => {
  let { doubanUrl } = TORRENT_INFO;
  if (!doubanUrl) {
    doubanUrl = $('#douban-link').val();
  } else {
    $('#douban-link').val(doubanUrl);
  }
  if (doubanUrl) {
    $('#douban-book-info').text($t('获取中...')).attr('disabled', true).addClass('is-disabled');
    getDoubanInfo(doubanUrl).then(data => {
      TORRENT_INFO.title = data.chinese_title || data.origin_title;
      TORRENT_INFO.image = data.poster;
      TORRENT_INFO.description = data.book_intro;
      TORRENT_INFO.doubanBookInfo = data;
      showNotice({
        title: $t('成功'),
        text: $t('获取成功'),
      });
    }).catch(error => {
      showNotice({
        title: $t('错误'),
        text: error.message,
      });
    }).finally(() => {
      $('#douban-book-info').text($t('获取豆瓣读书简介'))
        .removeAttr('disabled').removeClass('is-disabled');
    });
  } else {
    showNotice({
      title: $t('错误'),
      text: $t('缺少豆瓣链接'),
    });
  }
};
const updateTorrentInfo = (data) => {
  const desc = data.format;
  TORRENT_INFO.doubanInfo = data.format;
  TORRENT_INFO.subtitle = getSubTitle(data);
  const areaMatch = desc.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2];
  if (areaMatch) {
    TORRENT_INFO.area = getAreaCode(areaMatch);
  }
  const category = TORRENT_INFO.category;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
};
const uploadScreenshotsToAnother = async (selfDom) => {
  const screenshots = getOriginalImgUrl(TORRENT_INFO.screenshots);
  $(selfDom).text($t('上传中，请稍候...')).attr('disabled', true).addClass('is-disabled');
  try {
    $('#copy-img').hide();
    const selectHost = $('#img-host-select').val();
    let imgData = [];
    if (selectHost === 'ptpimg') {
      imgData = await saveScreenshotsToPtpimg(screenshots);
      if (!imgData) {
        return;
      }
    } else {
      const gifyuHtml = await fetch('https://gifyu.com', {
        responseType: 'text',
      });
      const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
      for (let index = 0; index < screenshots.length; index++) {
        const data = await transferImgs(screenshots[index], authToken, 'https://gifyu.com/json');
        if (data) {
          imgData.push(data.url);
        }
      }
    }
    showNotice({ text: $t('成功') });
    let { description, originalDescription } = TORRENT_INFO;
    TORRENT_INFO.screenshots = imgData;
    const screenBBCode = imgData.map(img => {
      return `[img]${img}[/img]`;
    });
    $('#copy-img').show().click(function () {
      GM_setClipboard(screenBBCode.join(''));
      $(this).text($t('已复制')).attr('disabled', true).addClass('is-disabled');
    });
    const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig);
    if (allImages && allImages.length > 0) {
      allImages.forEach(img => {
        if (img.match(/\[url=.+?\]/)) {
          img += '[/url]';
        }
        originalDescription = originalDescription.replace(img, '');
        description = description.replace(img, '');
      });
    }
    TORRENT_INFO.originalDescription = originalDescription + '\n' + screenBBCode.join('');
    TORRENT_INFO.description = description + '\n' + screenBBCode.join('');
  } catch (error) {
    showNotice({ title: $t('错误'), text: error.message });
  } finally {
    $(selfDom).text($t('转存截图'))
      .removeAttr('disabled').removeClass('is-disabled');
  }
};
const checkQuickResult = () => {
  const searchListSetting = GM_getValue('easy-seed.enabled-search-site-list');

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
        responseType: 'text',
      });
      const dom = new DOMParser().parseFromString(domString, 'text/html');
      const torrentList = $(list, dom);
      const sameTorrent = Array.prototype.find.call(torrentList, function (item) {
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

        const sizeBytes = getSize($(item).find(size).text());
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
async function autoFillDoubanInfo (selfDom, info) {
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
        const imdbLink = movieData.imdb_link;
        if (!$(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== 'SSD') {
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
  getThumbnailImgs,
  getDoubanBookInfo,
  uploadScreenshotsToAnother,
  getDoubanData,
  checkQuickResult,
  autoFillDoubanInfo,
};
