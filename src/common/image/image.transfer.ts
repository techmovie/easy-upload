import { CONFIG } from './image.config';
import { GMFetch, $t } from '@/common/utils';
import { throwUploadError, withUploadErrorHandling, cachedUrlToFile } from '@/common/image/image.utils';
import { ImgInfo, CheveretoResponse } from '@/common/image/image.types';
import { getCheveretoToken, createCheveretoRequestConfig, parseCheveretoResponse } from '@/common/image/image.upload.helper';
import { uploadToPtpImg } from './image.upload';

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
  const authToken = await getCheveretoToken(imgHost);
  const imgUploadPromises = imgUrls.map(async (imgUrl) => {
    const requestOptions = await createCheveretoRequestConfig(imgUrl, imgHost, authToken);
    return GMFetch<CheveretoResponse>(imgHost, requestOptions);
  });
  const data = await Promise.all(imgUploadPromises);
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
  if (!imgArray || imgArray.length < 1) {
    return [];
  }
  const uploadFn = await uploadToPtpImg;
  const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
  const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
  if (isPtpHost) {
    throwUploadError($t(CONFIG.ERROR_MESSAGES.NO_TRANSFER_NEEDED));
  } else if (isHdbHost) {
    const fileArray = await Promise.all(
      imgArray.map((item) => cachedUrlToFile(item)),
    );
    return await uploadFn(fileArray);
  }
  return await uploadFn(imgArray);
};
