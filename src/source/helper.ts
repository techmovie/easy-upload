import parseTorrent, { toTorrentFile } from 'parse-torrent';
import { fetch, $t } from '../common';
import { Buffer } from 'buffer/index.js';
import { CURRENT_SITE_INFO } from '../const';
import { toast } from 'sonner';
import $ from 'jquery';

/**
 * 格式化视频类型
 * @param {videoType} videoType
 * @return
 */
const getVideoType = (videoType:string) => {
  if (!videoType) {
    return '';
  }

  videoType = videoType.replace(/[.-]/g, '').toLowerCase();
  if (videoType.match(/encode|x264|x265|bdrip|hdrip|压制/ig)) {
    return 'encode';
  } else if (videoType.match(/remux/ig)) {
    return 'remux';
  } else if (videoType.match(/uhd|ultra/ig)) {
    return 'uhdbluray';
  } else if (videoType.match(/blu|discs/ig)) {
    return 'bluray';
  } else if (videoType.match(/webdl/ig)) {
    return 'web';
  } else if (videoType.match(/hdtv/ig)) {
    return 'hdtv';
  } else if (videoType.match(/dvdr/ig)) {
    return 'dvdrip';
  } else if (videoType.match(/dvd/ig)) {
    return 'dvd';
  }
  return '';
};
/**
 * 格式化视频分类
 * @param {category} category
 */
const getCategory = (category:string) => {
  if (!category) {
    return '';
  }
  category = category.replace(/[.-]/g, '').toLowerCase();
  if (category.match(/movie|bd|ultra|电影/ig)) {
    return 'movie';
  } else if (category.match(/综艺/ig)) {
    return 'variety';
  } else if (category.match(/tv|drama|剧集|电视/ig)) {
    return 'tv';
  } else if (category.match(/TVSeries/ig)) {
    return 'tvPack';
  } else if (category.match(/document|纪录|紀錄|Doc/ig)) {
    return 'documentary';
  } else if (category.match(/sport|体育/ig)) {
    return 'sport';
  } else if (category.match(/mv|演唱|concert/ig)) {
    return 'concert';
  } else if (category.match(/anim|动(画|漫)/ig)) {
    return 'cartoon';
  } else if (category.match(/App|软件|Software|軟體/ig)) {
    return 'app';
  } else if (category.match(/电子书|小说|Ebook/ig)) {
    return 'ebook';
  } else if (category.match(/有声书|AudioBook/ig)) {
    return 'audiobook';
  } else if (category.match(/杂志|magazine/ig)) {
    return 'magazine';
  } else if (category.match(/漫画|comics/ig)) {
    return 'comics';
  } else if (category.match(/公开课/ig)) {
    return 'onlineCourse';
  } else if (category.match(/资料/ig)) {
    return 'ebook';
  }
  return '';
};

const getResolution = (resolution:string) => {
  resolution = resolution.toLowerCase();
  if (resolution.match(/4k|2160|UHD/ig)) {
    return '2160p';
  } else if (resolution.match(/1080(p)?/ig)) { // 兼容烧包
    return '1080p';
  } else if (resolution.match(/1080i/ig)) {
    return '1080i';
  } else if (resolution.match(/720(p)?/ig)) { // 兼容烧包
    return '720p';
  } else if (resolution.match(/sd/ig)) {
    return '480p';
  }
  return resolution;
};

const getFormat = (data:string) => {
  if (data.match(/pdf/i)) {
    return 'pdf';
  } else if (data.match(/EPUB/i)) {
    return 'epub';
  } else if (data.match(/MOBI/i)) {
    return 'mobi';
  } else if (data.match(/mp3/i)) {
    return 'mp3';
  } else if (data.match(/mp4/i)) {
    return 'mp4';
  } else if (data.match(/txt/i)) {
    return 'txt';
  } else if (data.match(/azw3/i)) {
    return 'azw3';
  } else if (data.match(/镜像/i)) {
    return 'iso';
  }
  return 'other';
};

const blobToBase64 = (blob:Blob):Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
};

const getTorrentFileData = async (selector = '', torrentLink = '') => {
  let downloadLink = torrentLink || $(selector).attr('href');
  if (!downloadLink) {
    console.warn('Failed to get torrent file download link');
    return null;
  }
  if (!downloadLink.startsWith('http') && !downloadLink.startsWith('/')) {
    downloadLink = `${CURRENT_SITE_INFO.url}/${downloadLink}`;
  } else if (downloadLink.startsWith('/')) {
    downloadLink = `${CURRENT_SITE_INFO.url}${downloadLink}`;
  }
  try {
    const file = await fetch(downloadLink, {
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 10000,
    });
    const result = await parseTorrent(Buffer.from(file));
    const announceUrl = CURRENT_SITE_INFO.torrent?.announce || 'tracker.com';
    const buf = toTorrentFile({
      ...result,
      comment: '',
      announce: [announceUrl],
      info: {
        ...result.info,
        source: '',
      },
    });
    const blob = new Blob([buf], { type: 'application/x-bittorrent' });
    const base64 = await blobToBase64(blob);
    return base64;
  } catch (error) {
    toast.error(`${$t('种子文件下载失败')} ${$t('请手动下载')}`);
    console.log(error);
    return '';
  }
};
export {
  getVideoType,
  getCategory,
  getResolution,
  getFormat,
  getTorrentFileData,
};
