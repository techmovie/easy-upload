import { CONFIG } from './movie.config';
import { GMFetch } from '@/common/utils';
import { RottenTomatoesResponse } from './movie.types';

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
  return res?.results[0]?.hits ?? [];
};
