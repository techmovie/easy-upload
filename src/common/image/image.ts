import {
  $t,
  GMFetch,
  RequestOptions,
  getValue,
} from '@/common/utils';
import { CONFIG } from './image.config';
import { cachedUrlToFile, createFormData, throwUploadError, ImageUploadError, URLStrategies, withUploadErrorHandling } from './image.utils';
import { ImgBoxResponse, CheveretoResponse, PixHostResponse, PTPImg, TokenSecret, ImgInfo } from './image.types';

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

/**
 * Upload images to HDBits
 *
 * @async
 * @param {string[]} imgUrls
 * @param {string} galleryName
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<ImgInfo[]>}
 */
export const uploadToHDB = withUploadErrorHandling(async (imgUrls: string[], galleryName: string): Promise<ImgInfo[]> => {
  const { url, options } = await createHDBRequestConfig(imgUrls, galleryName);
  const data = await GMFetch<string>(url, options);
  return await parseHDBResponse(data);
}, 'HBD');

const getImgboxToken = async (): Promise<{
  tokenSecret: TokenSecret;
  authToken: string;
}> => {
  const rawHtml = await GMFetch<string>(CONFIG.URLS.IMGBOX, {
    responseType: undefined,
  });
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
  }, [{ fieldName: 'files[]', file }]);
  const options: RequestOptions = {
    method: 'POST',
    headers: {
      'X-CSRF-Token': authToken,
    },
    data: formData,
  };
  return options;
};

export const sendImgboxRequest = async (imgUrls:string[]): Promise<ImgBoxResponse[]> => {
  const { tokenSecret, authToken } = await getImgboxToken();

  const files = await Promise.all(
    imgUrls.map((item) => cachedUrlToFile(item)),
  );
  if (!files || files.length < 1) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Empty File`);
  }
  const fileUploadPromises = files.map((file) => {
    if (!file) {
      throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Empty File`);
    }
    const requestOptions = createImgboxRequestConfig(tokenSecret, authToken, file);
    return GMFetch<ImgBoxResponse>(CONFIG.URLS.IMGBOX_UPLOAD, requestOptions);
  });
  const data = await Promise.all(fileUploadPromises);
  return data;
};

export const parseImgboxResponse = (data: ImgBoxResponse[]): ImgInfo[] => {
  const imgResultList = data.map((result) => {
    if (result && result.files && result.files.length) {
      return result.files[0];
    }
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - ${data}`);
    return null;
  }).filter((item) => item !== null);
  return imgResultList.map(item => {
    return {
      original: item.original_url,
      thumbnail: item.thumbnail_url,
    };
  });
};

/**
 * Upload images to Imgbox
 *
 * @async
 * @param {string[]} imgUrls
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<ImgInfo[]>}
 */

export const uploadToImgbox = withUploadErrorHandling(async (imgUrls: string[]): Promise<ImgInfo[]> => {
  const data = await sendImgboxRequest(imgUrls);
  return parseImgboxResponse(data);
}, 'Imgbox', { validateFirstArg: true, defaultResult: [] });

const createPixhostRequestConfig = (imgUrls: string[]): {url: string, options: RequestOptions} => {
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
    url: CONFIG.URLS.PIXHOST,
    options,
  };
};

const parsePixhostResponse = (data: string): ImgInfo[] => {
  const result = data.match(/(upload_results = )({.*})(;)/);
  if (!result) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)}-Empty Result`);
    return [];
  }
  const parsedData: PixHostResponse = JSON.parse(result?.[2]);
  const imgResultList = parsedData.images;
  if (!imgResultList || imgResultList.length < 1) {
    throwUploadError();
    return [];
  }
  return imgResultList.map((item) => {
    return {
      thumbnail: item.th_url,
      original: item.show_url,
    };
  });
};

/**
 * Upload images to Pixhost
 *
 * @async
 * @param {string[]} imgUrls
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<ImgInfo[]>}
 */
export const uploadToPixhost = withUploadErrorHandling(async (imgUrls: string[]): Promise<ImgInfo[]> => {
  const { url, options } = createPixhostRequestConfig(imgUrls);
  const data = await GMFetch<string>(url, options);
  return parsePixhostResponse(data);
},
'Pixhost', { validateFirstArg: true, defaultResult: [] });

const createPTPImgRequestConfig = (imgArray: Array<string | File>, isFiles = false): {url: string, options: RequestOptions} => {
  const apiKey = getValue('easy-seed.ptp-img-api-key', false);
  if (!apiKey) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.PTPIMG_UPLOAD_FAILED)} ${$t(CONFIG.ERROR_MESSAGES.NO_API_KEY)}`);
  }

  const options: RequestOptions = {
    method: 'POST',
    responseType: 'json',
  };

  if (isFiles) {
    const formData = createFormData(
      { api_key: apiKey },
      [{ fieldName: 'file-upload', file: imgArray as File[] }],
    );
    options.data = formData;
  } else {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    options.data = `link-upload=${(imgArray as string[]).join('\n')}&api_key=${apiKey}`;
  }
  return {
    url: CONFIG.URLS.PTPIMG_UPLOAD,
    options,
  };
};

const parsePTPImgResponse = (data: PTPImg[]): string[] => {
  if (!data || !Array.isArray(data)) {
    throwUploadError();
    return [];
  }
  return data.map(
    (img) => `https://ptpimg.me/${img.code}.${img.ext}`,
  );
};

/**
 * Upload images to PTPImg
 *
 * @async
 * @param {string[] | File[]} imgArray
 * @param {boolean} isFiles
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<string[]>}
 */

export const uploadToPtpImg = withUploadErrorHandling(async (imgArray: Array<string | File>, isFiles:boolean = false): Promise<string[]> => {
  const { url, options } = createPTPImgRequestConfig(imgArray, isFiles);
  const data = await GMFetch<PTPImg[]>(url, options);
  return parsePTPImgResponse(data);
}, 'PTPImg', { validateFirstArg: true, defaultResult: [] });

const getCheveretoToken = async (imgHost: string): Promise<string> => {
  const rawHtml = await GMFetch<string>(imgHost.replace('/json', ''), {
    responseType: undefined,
  });
  const authToken = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)?.[1] ?? '';
  return authToken;
};
const createCheveretoRequestConfig = async (imgUrl: string, imgHost: string, authToken:string): Promise<RequestOptions> => {
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

const sendCheveretoRequest = async (imgUrls: string[], imgHost: string): Promise<CheveretoResponse[]> => {
  const authToken = await getCheveretoToken(imgHost);
  if (!authToken) {
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - Invalid AuthToken`);
  }
  const imgUploadPromises = imgUrls.map(async (imgUrl) => {
    const requestOptions = await createCheveretoRequestConfig(imgUrl, imgHost, authToken);
    return GMFetch<CheveretoResponse>(imgHost, requestOptions);
  });
  return Promise.all(imgUploadPromises);
};

const parseCheveretoResponse = (data: CheveretoResponse[]): ImgInfo[] => {
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

/**
 * Transfer images from other Image hostings to Chevereto site
 *
 * @async
 * @param {string} imgUrls - The image URLs to be uploaded
 * @param {string} imgHost - The image hosting service URL (default is CONFIG.URLS.IMGBB)
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<ImgInfo[]>}
 */

export const transferImgToCheveretoSite = withUploadErrorHandling(async (imgUrls: string[], imgHost: string = CONFIG.URLS.IMGBB): Promise<ImgInfo[]> => {
  const data = await sendCheveretoRequest(imgUrls, imgHost);
  return parseCheveretoResponse(data);
}, 'Chevereto');

/**
 * Transfer images from other Image hostings to PTPImg
 *
 * @async
 * @param {string[]} imgArray - Array of image URLs
 * @throws {ImageUploadError} If the upload fails
 * @throws {Error} If the upload fails with a non-ImageUploadError
 * @returns {Promise<string[]>}
 */

export const transferImgsToPtpimg = async (
  imgArray: Array<string>,
): Promise<string[]> => {
  try {
    if (!imgArray || imgArray.length < 1) {
      return [];
    }
    const uploadFn = await uploadToPtpImg;
    const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
    const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
    if (isPtpHost) {
      throwUploadError($t(CONFIG.ERROR_MESSAGES.NO_TRANSFER_NEEDED));
      return [];
    } else if (isHdbHost) {
      const fileArray = await Promise.all(
        imgArray.map((item) => cachedUrlToFile(item)),
      );
      return await uploadFn(fileArray, true);
    }
    return await uploadFn(imgArray);
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.PTPIMG_UPLOAD_FAILED)}`, error);
    return [];
  }
};

/**
 * Get the original image URL from a BBCode string
 *
 * @async
 * @param {string} urlBBcode - The BBCode string containing the image URL
 * @throws {Error} If no valid image URL is found in the BBCode
 * @returns {Promise<string>} The original image URL
 */
export const getOriginalImgUrl = async (urlBBcode: string): Promise<string> => {
  if (!urlBBcode) {
    throw new Error('Invalid BBCode - No BBCode found');
  }
  if (urlBBcode.match(/\[url=http(s)*:.+/)) {
    const imgUrl = urlBBcode.match(/=(([^\]])+)/)?.[1] ?? '';
    for (const strategy of URLStrategies) {
      if (strategy.matches(imgUrl, urlBBcode)) {
        return await strategy.transform(imgUrl);
      }
    }
  } else if (urlBBcode.match(/\[img\]/)) {
    return urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
  } else if (urlBBcode.match(/http(s)*:.+/)) {
    return urlBBcode;
  }
  throw new Error('Invalid BBCode - No valid image URL found');
};

/**
 * Regular expression to match image BBCode
 * [url=http(s)*://...][img]...[/img][/url]
 * @returns {RegExp} The regular expression for matching image BBCode
 */

export const imageBBCodeMatcher = (): RegExp => {
  return /(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/gi;
};

/**
 * Extract and filter images from BBCode
 *
 * @param {string} bbcode - The BBCode string containing the image URLs
 * @returns {string[]} An array of filtered image URLs or image BBCode
 */

export const getFilterImages = (bbcode: string): string[] => {
  if (!bbcode) {
    return [];
  }
  let allImages = Array.from(
    bbcode.match(imageBBCodeMatcher()) ?? [],
  );
  if (allImages && allImages.length > 0) {
    allImages = allImages.map((img) => {
      if (img.match(/\[url=.+?\]/)) {
        return `${img}[/url]`;
      }
      return img;
    });
    // 过滤imdb、豆瓣、chd、柠檬无关图片
    return allImages.filter((item) => {
      return !item.match(
        /poster\.jpg|2019\/01\/04\/info\.png|MoreScreens|PTer\.png|ms\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/,
      );
    });
  }
  return [];
};

export const getScreenshotsFromBBCode = async (
  bbcode: string,
): Promise<string[]> => {
  if (!bbcode) {
    return [];
  }
  const allImages = getFilterImages(bbcode);
  if (allImages && allImages.length > 0) {
    const originalUrls = await Promise.all(
      allImages.map((img) => getOriginalImgUrl(img)),
    );
    return originalUrls.filter((url) => url);
  }
  return [];
};

/**
 * Get image information from BBCode
 *
 * @async
 * @param {string} bbcode - The BBCode string containing the image URLs
 * @throws {Error} If no valid image URLs are found in the BBCode
 * @returns {Promise<ImgInfo>} An object containing the original and thumbnail image URLs
 */

export const getImgInfoFromBBCode = async (bbcode:string):Promise<ImgInfo> => {
  if (!bbcode) {
    throw new Error('Invalid BBCode - No BBCode found');
  }
  const originalUrl = await getOriginalImgUrl(bbcode);
  if (!originalUrl) {
    throw new Error('Invalid BBCode - No original URL found');
  }
  const thumbnailUrl = bbcode.match(/\[img\](.+)?\[/)?.[1] ?? '';
  if (!thumbnailUrl) {
    throw new Error('Invalid BBCode - No thumbnail URL found');
  }
  return {
    original: originalUrl,
    thumbnail: thumbnailUrl,
  };
};
