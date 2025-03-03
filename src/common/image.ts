import { handleError, urlToFile, $t, fetch, RequestOptions, getValue } from './utils';
import { toast } from 'sonner';
export const uploadToHDB = async (screenshots: string[], galleryName: string) => {
  const apiUrl = 'https://img.hdbits.org/upload_api.php';
  try {
    const promiseArray = screenshots.map(item => {
      return urlToFile(item);
    });
    const fileArray = await Promise.all(promiseArray);
    const formData = new FormData();
    formData.append('galleryoption', '1');
    formData.append('galleryname', galleryName);
    fileArray.forEach(file => {
      formData.append('images_files[]', file);
    });
    const data = await fetch(apiUrl, {
      data: formData,
      method: 'POST',
    });
    if (data.includes('error')) {
      throw data;
    }
    return data;
  } catch (error) {
    handleError(error);
  }
};
interface TokenSecret {
  token_id: string
  token_secret: string
}

export const uploadToImgbox = async (screenshot: string, authToken:string, tokenSecret:TokenSecret) => {
  const file = await urlToFile(screenshot);
  const { token_id: tokenId, token_secret: secret } = tokenSecret;
  const options:RequestOptions = {
    method: 'POST',
    headers: {
      'X-CSRF-Token': authToken,
    },
    data: {},
  };
  const formData = new FormData();
  formData.append('token_id', tokenId);
  formData.append('token_secret', secret);
  formData.append('content_type', '1');
  formData.append('thumbnail_size', '350r');
  formData.append('gallery_id', 'null');
  formData.append('gallery_secret', 'null');
  formData.append('comments_enabled', '0');
  formData.append('files[]', file);
  options.data = formData;
  const data = await fetch('https://imgbox.com/upload/process', options);
  if (data && data.files && data.files.length) {
    return data.files[0];
  }
};
export const uploadToPixhost = async (screenshots: string[]) => {
  try {
    const params = encodeURI(`imgs=${screenshots.join('\n')}&content_type=1&max_th_size=300`);
    const data = await fetch('https://pixhost.to/remote/', {
      method: 'POST',
      data: params,
      timeout: 3e5,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const result = data.match(/(upload_results = )({.*})(;)/);
    if (!result) {
      throw $t('上传失败，请重试');
    }
    let imgResultList = [];
    if (data && data.length) {
      imgResultList = JSON.parse(data[2]).images;
      if (imgResultList.length < 1) {
        throw new Error($t('上传失败，请重试'));
      }
      return imgResultList;
    }
    throw new Error($t('上传失败，请重试'));
  } catch (error) {
    handleError(error);
  }
};
/*
* 过滤真实原始截图地址
* 如果原图地址没有文件名后缀，截图地址则为缩略图地址
* */
export const getOriginalImgUrl = async (urlBBcode:string) => {
  let imgUrl = urlBBcode;
  if (urlBBcode.match(/\[url=http(s)*:.+/)) {
    imgUrl = urlBBcode.match(/=(([^\]])+)/)?.[1] ?? '';
    if (imgUrl.match(/img\.hdbits\.org/)) {
      const data = await fetch(imgUrl, {
        responseType: undefined,
      });
      const doc = new DOMParser().parseFromString(data, 'text/html');
      imgUrl = $('#viewimage', doc).attr('src') as string;
    } else if (urlBBcode.match(/img\.pterclub\.com/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/\.th/g, '');
    } else if (urlBBcode.match(/https?:\/\/imgbox\.com/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/thumbs(\d)/, 'images$1').replace(/_t(\.png)/, '_o.png');
    } else if (imgUrl.match(/imagebam\.com/)) {
      const originalPage = await fetch(imgUrl, {
        responseType: undefined,
      });
      const doc = new DOMParser().parseFromString(originalPage, 'text/html');
      imgUrl = $('.main-image', doc).attr('src') as string;
    } else if (imgUrl.match(/beyondhd\.co/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/\.(th|md)\.(png|jpg|gif)/, '.$2');
    } else if (!imgUrl.match(/\.(jpg|png|gif|bmp|webp)$/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
    } else if (urlBBcode.match(/https:\/\/pixhost\.to/)) {
      const hostNumber = urlBBcode.match(/img\]https:\/\/t(\d+)\./)?.[1];
      imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, `img${hostNumber}.$1/images`);
    }
  } else if (urlBBcode.match(/\[img\]/)) {
    imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
  }
  return imgUrl;
};

export const getFilterImages = (bbcode:string): string[] => {
  if (!bbcode) {
    return [];
  }
  let allImages = Array.from(bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig) ?? []);
  if (allImages && allImages.length > 0) {
    allImages = allImages.map(img => {
      if (img.match(/\[url=.+?\]/)) {
        return `${img}[/url]`;
      }
      return img;
    });
    // 过滤imdb、豆瓣、chd、柠檬无关图片
    return allImages.filter(item => {
      return !item.match(/poster\.jpg|2019\/01\/04\/info\.png|MoreScreens|PTer\.png|ms\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
    });
  }
  return [];
};
export const getScreenshotsFromBBCode = async (bbcode: string) => {
  const allImages = getFilterImages(bbcode);
  if (allImages && allImages.length > 0) {
    const result = [];
    for (const img of allImages) {
      const originalUrl = await getOriginalImgUrl(img);
      if (originalUrl !== undefined) { result.push(originalUrl); }
    }
    return result;
  }
  return [];
};
export const transferImgs = async (screenshot: string, authToken: string, imgHost = 'https://imgbb.com/json') => {
  try {
    const isHdbHost = !!screenshot.match(/i\.hdbits\.org/);
    const formData = new FormData();
    if (isHdbHost || imgHost.includes('gifyu')) {
      const promiseArray = [urlToFile(screenshot)];
      const [fileData] = await Promise.all(promiseArray);
      formData.append('type', 'file');
      formData.append('source', fileData);
    } else {
      formData.append('type', 'url');
      formData.append('source', screenshot);
    }
    formData.append('action', 'upload');
    formData.append('timestamp', `${Date.now()}`);
    formData.append('auth_token', authToken);
    const res = await fetch(imgHost, {
      method: 'POST',
      data: formData,
      timeout: 3e5,
    });

    if (res.status_txt !== 'OK') {
      throw $t('上传失败，请重试');
    }
    if (res.image) {
      return res.image;
    }
    throw $t('上传失败，请重试');
  } catch (error) {
    console.log('err:', error);
    handleError(error);
  }
};

export const uploadToPtpImg = async (imgArray: Array<string | File>, isFiles = false) => {
  try {
    const apiKey = getValue('easy-seed.ptp-img-api-key', false);
    if (!apiKey) {
      toast.error(`${$t('ptpimg上传失败')} ${$t('请到配置面板中填入ptpimg的api_key')}`);
      return;
    }

    const options: RequestOptions = {
      method: 'POST',
      responseType: 'json',
    };
    if (isFiles) {
      const formData = new FormData();
      imgArray.forEach((img, index) => {
        formData.append(`file-upload[${index}]`, img);
      });
      formData.append('api_key', apiKey);
      options.data = formData;
    } else {
      const data = `link-upload=${imgArray.join('\n')}&api_key=${apiKey}`;
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      };
      options.data = data;
    }
    interface PTPImg{
      code:string
      ext:string
    }
    const data:PTPImg[] = await fetch('https://ptpimg.me/upload.php', options);
    if (!data) {
      throw $t('上传失败，请重试');
    }
    let imgResultList = [];
    if (data && data.length) {
      imgResultList = data.map(img => {
        return `https://ptpimg.me/${img.code}.${img.ext}`;
      });
      return imgResultList;
    }
    throw $t('上传失败，请重试');
  } catch (error) {
    handleError(error);
  }
};

export const saveScreenshotsToPtpimg = async (imgArray: Array<string>) => {
  try {
    const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
    const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
    if (isPtpHost) {
      throw $t('无需转存');
    } else if (isHdbHost) {
      const promiseArray = imgArray.map(item => {
        return urlToFile(item);
      });
      const fileArray = await Promise.all(promiseArray);
      const data = uploadToPtpImg(fileArray, true);
      return data;
    } else {
      const data = await uploadToPtpImg(imgArray);
      return data;
    }
  } catch (error) {
    handleError(error);
  }
};
