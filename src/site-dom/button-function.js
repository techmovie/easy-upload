import {
  TORRENT_INFO,
} from '../const';
import {
  getSubTitle, transferImgs, getDoubanInfo, $t,
  getDoubanLinkByIMDB, getAreaCode, getPreciseCategory,
  showNotice,
} from '../common';

const getThumbnailImgs = () => {
  const allImgs = TORRENT_INFO.screenshots.concat(TORRENT_INFO.comparisonImgs);
  const imgList = [...new Set(allImgs)];
  if (imgList.length < 1) {
    throw new Error($t('获取图片列表失败'));
  }
  $('#img-transfer').text($t('转换中...')).attr('disabled', true).addClass('is-disabled');
  transferImgs(imgList.join('\n')).then(data => {
    if (data.length) {
      const thumbnailImgs = data.map(imgData => {
        return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
      });
      TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
      let { description } = TORRENT_INFO;
      imgList.forEach((img, index) => {
        if (description.includes(img)) {
          description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]`, 'ig'), thumbnailImgs[index] || '');
        }
      });
      TORRENT_INFO.description = description;
      showNotice({
        title: $t('成功'),
        text: $t('转换成功！'),
      });
    }
  }).catch(error => {
    showNotice({
      title: $t('错误'),
      text: error.message,
    });
  }).finally(() => {
    $('#img-transfer').text($t('转缩略图')).removeAttr('disabled').removeClass('is-disabled');
  });
};
const getDoubanLink = () => {
  $('#douban-info').text($t('获取中...')).attr('disabled', true).addClass('is-disabled');
  // https://github.com/techmovie/DouBan-Info-for-PT
  const scriptDoubanLink = $('.douban-dom').attr('douban-link');
  const doubanLink = $('.page__title>a').attr('href') ||
   scriptDoubanLink ||
   TORRENT_INFO.doubanUrl ||
    $('#douban-link').val();
  if (doubanLink && doubanLink.match('movie.douban.com')) {
    TORRENT_INFO.doubanUrl = doubanLink;
    if (doubanLink) {
      $('#douban-link').val(doubanLink);
    }
    getDoubanData();
    return false;
  }
  const { imdbUrl, movieName } = TORRENT_INFO;
  getDoubanLinkByIMDB(imdbUrl, movieName).then(doubanUrl => {
    TORRENT_INFO.doubanUrl = doubanUrl;
    $('#douban-link').val(doubanUrl);
    getDoubanData();
  }).catch(error => {
    showNotice({
      title: $t('错误'),
      text: error.message,
    });
    $('#douban-info').text($t('获取豆瓣简介')).removeAttr('disabled').removeClass('is-disabled');
  });
};
const getDoubanData = () => {
  const { doubanUrl } = TORRENT_INFO;
  if (doubanUrl) {
    getDoubanInfo(doubanUrl).then(data => {
      updateTorrentInfo(data);
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
      $('#douban-info').text($t('获取豆瓣简介')).removeAttr('disabled').removeClass('is-disabled');
    });
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
export {
  getThumbnailImgs,
  getDoubanLink,
  getDoubanBookInfo,
};
