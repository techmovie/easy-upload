import {
  TORRENT_INFO,
} from '../const';
import {
  getSubTitle, transferImgs, getDoubanInfo, $t, fetch,
  getDoubanIdByIMDB, getAreaCode, getPreciseCategory,
  showNotice, getOriginalImgUrl, saveScreenshotsToPtpimg,
} from '../common';

const getThumbnailImgs = async () => {
  try {
    const allImgs = TORRENT_INFO.screenshots.concat(...TORRENT_INFO.comparisons.map(v => v.imgs));
    const imgList = [...new Set(allImgs)];
    if (imgList.length < 1) {
      throw new Error($t('获取图片列表失败'));
    }
    $('#img-transfer').text($t('转换中...')).attr('disabled', true).addClass('is-disabled');
    const imgbbHtml = await fetch('https://imgbb.com', {
      responseType: 'text',
    });
    const authToken = imgbbHtml.match(/PF\.obj\.config\.auth_token="(.+)?"/)?.[1];
    const uploadedImgs = [];
    for (let index = 0; index < imgList.length; index++) {
      const data = await transferImgs(imgList[index], authToken);
      uploadedImgs.push(data);
    }
    if (uploadedImgs.length) {
      const thumbnailImgs = uploadedImgs.map(imgData => {
        return `[url=${imgData.url}][img]${imgData.display_url}[/img][/url]`;
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
      const movieData = await getDoubanInfo(doubanUrl);
      showNotice({
        title: $t('成功'),
        text: $t('获取成功'),
      });
      updateTorrentInfo(movieData);
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
const uploadScreenshotsToPtpimg = (selfDom) => {
  const screenshots = getOriginalImgUrl(TORRENT_INFO.screenshots);
  $(selfDom).text($t('上传中，请稍候...')).attr('disabled', true).addClass('is-disabled');
  saveScreenshotsToPtpimg(screenshots).then(data => {
    showNotice({ text: $t('成功') });
    let { description } = TORRENT_INFO;
    TORRENT_INFO.screenshots = data;
    const screenBBCode = data.map(img => {
      return `[img]${img}[/img]`;
    });
    const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages.forEach(img => {
        if (img.match(/\[url=.+?\]/)) {
          img += '[/url]';
        }
        description = description.replace(img, '');
      });
    }
    TORRENT_INFO.description = description + '\n' + screenBBCode.join('');
  }).catch(error => {
    showNotice({ title: $t('错误'), text: error.message });
  }).finally(() => {
    $(selfDom).text($t('转存截图到ptpimg'))
      .removeAttr('disabled').removeClass('is-disabled');
  });
};
export {
  getThumbnailImgs,
  getDoubanBookInfo,
  uploadScreenshotsToPtpimg,
  getDoubanData,
};
