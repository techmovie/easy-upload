import { URLStrategies } from './image.utils';
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
  const urlBBCodeMatch = urlBBcode.match(/\[url=(http(s)*:([^\]]+)?)/);
  const directUrlMatch = urlBBcode.match(/http(s)*:([^[])+/);
  if (urlBBCodeMatch) {
    const imgUrl = urlBBCodeMatch[1];
    for (const strategy of URLStrategies) {
      if (strategy.matches(imgUrl, urlBBcode)) {
        return await strategy.transform(imgUrl, urlBBcode);
      }
    }
    return imgUrl.trim();
  } else if (urlBBcode.match(/\[img\]/)) {
    return urlBBcode.match(/img\](([^[])+)/)?.[1]?.trim() ?? '';
  } else if (directUrlMatch) {
    return directUrlMatch[0].trim();
  }
  throw new Error('Invalid BBCode - No valid image URL found');
};
