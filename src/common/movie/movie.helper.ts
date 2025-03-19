import { CONFIG } from './movie.config';
import { RottenTomatoesResponse } from './movie.types';
import { GMFetch } from '@/common/utils';
/**
 * Get area code by area string.
 *
 * @param {string} area
 * @returns {string} Area code
 */
export const getAreaCode = (area: string) => {
  const europeList = CONFIG.EUROPE_LIST;
  if (!area) return 'OT';
  if (europeList.includes(area)) return 'EU';
  for (const [code, pattern] of Object.entries(CONFIG.REGION_PATTERNS)) {
    if (pattern.test(area)) return code;
  }
  return 'OT';
};

/**
 * Get Rotten Tomatoes search result by query
 *
 * @async
 * @param {string} query
 * @returns {Promise<RottenTomatoesHit[]>}
 */
export const getRottenTomatoesDataByQuery = async (query: string) => {
  const res = await GMFetch<RottenTomatoesResponse>(CONFIG.URLS.ROTTEN_TOMATOES_API, {
    data: {
      requests: [
        {
          indexName: 'content_rt',
          query,
        }],
    },
    responseType: 'json',
  });
  return res?.results?.[0]?.hits ?? [];
};
