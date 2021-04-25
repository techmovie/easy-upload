import {
  TORRENT_INFO,
} from '../const';
import {
  getSubTitle, transferImgs, getDoubanInfo,
  getDoubanLinkByIMDB, getAreaCode, getPreciseCategory,
} from '../common';

const getThumbnailImgs = () => {
  const statusDom = $('.upload-section .upload-status');
  const allImgs = TORRENT_INFO.screenshots.concat(TORRENT_INFO.comparisonImgs);
  const imgList = [...new Set(allImgs)];
  if (imgList.length < 1) {
    throw new Error('获取图片列表失败');
  }
  statusDom.text('转换中...');
  $('#img-transfer').attr('disabled', true).addClass('is-disabled');
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
      statusDom.text('转换成功！');
    }
  }).catch(error => {
    statusDom.text(error.message);
  }).finally(() => {
    $('#img-transfer').removeAttr('disabled').removeClass('is-disabled');
  });
};
const getDoubanLink = () => {
  $('#douban-info').attr('disabled', true).addClass('is-disabled');
  const statusDom = $('.douban-section .douban-status');
  const doubanLink = $('.page__title>a').attr('href') || TORRENT_INFO.doubanUrl || $('#douban-link').val();
  statusDom.text('获取中...');
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
    if (!doubanUrl) {
      throw new Error('豆瓣链接获取失败');
    }
    TORRENT_INFO.doubanUrl = doubanUrl;
    $('#douban-link').val(doubanUrl);
    getDoubanData();
  }).catch(error => {
    statusDom.text(error.message);
  });
};
const getDoubanData = () => {
  const { doubanUrl } = TORRENT_INFO;
  const statusDom = $('.douban-section .douban-status');
  try {
    if (doubanUrl) {
      getDoubanInfo(doubanUrl).then(data => {
        updateTorrentInfo(data);
        statusDom.text('获取成功');
      }).catch(error => {
        statusDom.text(error.message);
      }).finally(() => {
        $('#douban-info').removeAttr('disabled').removeClass('is-disabled');
      });
    }
  } catch (error) {
    statusDom.text(error.message);
  }
};
const getDoubanBookInfo = () => {
  let { doubanUrl } = TORRENT_INFO;
  if (!doubanUrl) {
    doubanUrl = $('#douban-link').val();
  } else {
    $('#douban-link').val(doubanUrl);
  }
  const statusDom = $('.douban-book-section .douban-book-status');
  statusDom.text('获取中...');
  try {
    if (doubanUrl) {
      getDoubanInfo(doubanUrl).then(data => {
        TORRENT_INFO.title = data.chinese_title || data.origin_title;
        TORRENT_INFO.image = data.poster;
        TORRENT_INFO.description = data.book_intro;
        TORRENT_INFO.doubanBookInfo = data;
        statusDom.text('获取成功');
      }).catch(error => {
        statusDom.text(error.message);
      }).finally(() => {
        $('#douban-book-info').removeAttr('disabled').removeClass('is-disabled');
      });
    } else {
      throw new Error('缺少豆瓣链接');
    }
  } catch (error) {
    statusDom.text(error.message);
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
