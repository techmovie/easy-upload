import {
  $t,
  GMFetch,
  RequestOptions,
} from '@/common/utils';
import { CONFIG } from './image.config';
import { cachedUrlToFile, createFormData, throwUploadError } from './image.utils';
import { ImgInfo, ImgBoxResponse, PTPImg, TokenSecret, PixHostResponse, CheveretoResponse } from './image.types';
import { getImgInfoFromBBCode } from './image.info';

export { getOriginalImgUrl } from './image.url';

export const createHDBRequestConfig = async (imgUrls: string[], galleryName: string): Promise<{url: string, options: RequestOptions}> => {
  const imgFiles = await Promise.all(
    imgUrls.map((item) => cachedUrlToFile(item)),
  );
  const formData = createFormData({
    galleryoption: '1',
    galleryname: galleryName,
  }, [{
    fieldName: 'images_files',
    file: imgFiles,
  }]);
  return {
    url: CONFIG.URLS.HDB_UPLOAD,
    options: {
      data: formData,
      method: 'POST',
    },
  };
};
export const parseHDBResponse = async (data: string): Promise<ImgInfo[]> => {
  if (!data || data.includes('error')) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - ${data}`);
  }
  const urls = data.split('\n').filter(url => url.trim().length > 0);
  if (urls.length < 1) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Empty Result`);
  }
  const promiseResult = urls.map(urlBBcode => {
    return getImgInfoFromBBCode(urlBBcode);
  });
  return Promise.all(promiseResult);
};

export const getImgboxToken = async (): Promise<{
  tokenSecret: TokenSecret;
  authToken: string;
}> => {
  const rawHtml = await GMFetch<string>(CONFIG.URLS.IMGBOX);
  const authToken = rawHtml.match(/content="(.+)" name="csrf-token"/)?.[1] ?? '';
  if (!authToken) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Invalid AuthToken`);
  }
  const tokenSecret = await GMFetch<TokenSecret>(`${CONFIG.URLS.IMGBOX}/ajax/token/generate`, {
    responseType: 'json',
    method: 'POST',
    headers: {
      'X-CSRF-Token': authToken,
    },
  });
  if (!tokenSecret || !tokenSecret.token_id || !tokenSecret.token_secret) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Invalid Token`);
  }
  return {
    tokenSecret,
    authToken,
  };
};

export const createImgboxRequestConfig = (tokenSecret: TokenSecret, authToken:string, file: File): RequestOptions => {
  const { token_id: tokenId, token_secret: secret } = tokenSecret;
  const formData = createFormData({
    token_id: tokenId,
    token_secret: secret,
    content_type: '1',
    thumbnail_size: '350r',
    gallery_id: 'null',
    gallery_secret: 'null',
    comments_enabled: '0',
  }, [{ fieldName: 'files', file }]);
  const options: RequestOptions = {
    method: 'POST',
    headers: {
      'X-CSRF-Token': authToken,
    },
    data: formData,
  };
  return options;
};

export const parseImgboxResponse = (data: ImgBoxResponse[]): ImgInfo[] => {
  const imgResultList = data.map((result) => {
    if (result && result.files && result.files.length) {
      return result.files[0];
    }
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} -  Empty Data to Parse`);
    return null;
  }).filter((item) => item !== null);
  return imgResultList.map(item => {
    return {
      original: item.original_url,
      thumbnail: item.thumbnail_url,
    };
  });
};

export const createPixhostRequestConfig = (imgUrls: string[]): {url: string, options: RequestOptions} => {
  if (imgUrls.length < 1) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Empty URLs`);
  }
  const params = encodeURI(
    `imgs=${imgUrls.join('\n')}&content_type=1&max_th_size=300`,
  );
  const options: RequestOptions = {
    method: 'POST',
    data: params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };
  return {
    url: CONFIG.URLS.PIXHOST_UPLOAD,
    options,
  };
};

export const parsePixhostResponse = (data: string): ImgInfo[] => {
  const result = data.match(/(upload_results = )({.*})(;)/);
  if (!result || result.length < 3) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Empty Result`);
    return [];
  }
  const parsedData: PixHostResponse = JSON.parse(result[2]);
  const imgResultList = parsedData.images;
  if (!imgResultList || imgResultList.length < 1) {
    throwUploadError('No images found in the response');
    return [];
  }
  return imgResultList.map((item) => {
    return {
      thumbnail: item.th_url,
      original: item.show_url,
    };
  });
};

export const createPTPImgRequestConfig = (imgArray: Array<string | File>): {url: string, options: RequestOptions} => {
  const apiKey = GM_getValue('easy-seed.ptp-img-api-key', '');
  if (!apiKey) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.PTPIMG_UPLOAD_FAILED)} ${$t(CONFIG.ERROR_MESSAGES.NO_API_KEY)}`);
  }

  const options: RequestOptions = {
    method: 'POST',
    responseType: 'json',
  };

  const isFileUpload = imgArray.length > 0 && imgArray[0] instanceof File;

  if (isFileUpload) {
    const fileArray = imgArray.filter((item): item is File => item instanceof File);
    const formData = createFormData(
      { api_key: apiKey },
      [{ fieldName: 'file-upload', file: fileArray }],
    );
    options.data = formData;
  } else {
    const linkArray = imgArray.filter((item): item is string => typeof item === 'string');
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    options.data = `link-upload=${linkArray.join('\n')}&api_key=${apiKey}`;
  }
  return {
    url: CONFIG.URLS.PTPIMG_UPLOAD,
    options,
  };
};

export const parsePTPImgResponse = (data: PTPImg[]): string[] => {
  if (!data || !Array.isArray(data) || data.length < 1) {
    throwUploadError();
    return [];
  }
  return data.map(
    (img) => `${CONFIG.URLS.PTPIMG}/${img.code}.${img.ext}`,
  );
};

export const getCheveretoToken = async (imgHost: string): Promise<string> => {
  const rawHtml = await GMFetch<string>(imgHost.replace('/json', ''));
  const authToken = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)?.[1] ?? '';
  if (!authToken) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Invalid AuthToken`);
  }
  return authToken;
};
export const createCheveretoRequestConfig = async (imgUrl: string, imgHost: string, authToken:string): Promise<RequestOptions> => {
  const isHdbHost = !!imgUrl.match(/i\.hdbits\.org/);
  let formData: FormData;
  const options = {
    action: 'upload',
    timestamp: `${Date.now()}`,
    auth_token: authToken,
  };
  if (isHdbHost || imgHost.includes('gifyu')) {
    const fileData = await cachedUrlToFile(imgUrl);
    formData = createFormData({
      type: 'file',
      ...options,
    }, [{ fieldName: 'source', file: fileData }]);
  } else {
    formData = createFormData({
      type: 'url',
      source: imgUrl,
      ...options,
    });
  }
  return {
    method: 'POST',
    data: formData,
  };
};

export const parseCheveretoResponse = (data: CheveretoResponse[]): ImgInfo[] => {
  const imgResultList = data.map((res) => {
    if (res.status_txt !== 'OK') {
      throwUploadError(
        `${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} ${res.status_txt}`,
      );
      return null;
    }
    if (res.image) {
      return res.image;
    }
    throwUploadError();
    return null;
  }).filter((item) => item !== null);
  return imgResultList.map((item) => {
    return {
      original: item.url,
      thumbnail: item.thumb.url,
    };
  });
};
