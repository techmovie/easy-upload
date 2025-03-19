import parseTorrent, { toTorrentFile } from 'parse-torrent';
import { GMFetch, $t } from '../common';
import { Buffer } from 'buffer/index.js';
import { CURRENT_SITE_INFO, PT_SITE } from '../const';
import { toast } from 'sonner';
import $ from 'jquery';

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

const getTorrentFileData = async (selector = '', torrentLink = '', targetSiteName:string) => {
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
    const file = await GMFetch<ArrayBuffer>(downloadLink, {
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 10000,
    });
    const result = await parseTorrent(Buffer.from(file));
    const siteInfo = PT_SITE[targetSiteName as keyof typeof PT_SITE] as Site.SiteInfo;
    const announceUrl = siteInfo?.torrent?.announce || 'tracker.com';
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
  getCategory,
  getFormat,
  getTorrentFileData,
};
