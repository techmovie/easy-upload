import { CONFIG } from './movie.config';
import { GMFetch } from '@/common/utils';
import {
  IMDBDataResponse,
  IMDBRatingResponse,
  IMDBRating,
} from './movie.types';

/**
 * Get IMDB data from PT-GEN API
 *
 * @async
 * @param {string} imdbUrl
 * @returns {Promise<IMDBDataResponse>}
 * @throws {Error} if no IMDB URL is provided or the request fails
 */
export const getIMDBData = async (
  imdbUrl: string,
): Promise<IMDBDataResponse> => {
  if (!imdbUrl) {
    throw new Error('No IMDB URL provided');
  }
  const data = await GMFetch<IMDBDataResponse>(
    CONFIG.URLS.PT_GEN_API(imdbUrl),
    {
      responseType: 'json',
    },
  );
  if (!data || !data.success) {
    throw new Error(data?.error || 'Failed to get IMDB data');
  }
  return data;
};

/**
 * Get IMDB rating from IMDB API
 *
 * @async
 * @param {string} imdbId
 * @returns {Promise<IMDBRating>}
 * @throws {Error} if no IMDB ID is provided or the request fails
 */
export const getIMDBRating = async (imdbId: string): Promise<IMDBRating> => {
  if (!imdbId) {
    throw new Error('No IMDB ID provided');
  }
  const url = CONFIG.URLS.IMDB_RATING_API(imdbId);
  const data = await GMFetch<string>(url);
  const matchData = data?.match(/[^(]+\((.+)\)/)?.[1] ?? '';
  if (!matchData) {
    throw new Error('No rating data found');
  }
  try {
    const ratingData: IMDBRatingResponse = JSON.parse(matchData);
    return {
      ...ratingData.resource,
      id: ratingData.resource?.id.match(/tt\d+/)?.[0] ?? '',
    };
  } catch {
    throw new Error('Failed to parse rating data');
  }
};

/**
 * Get IMDb ID from IMDb URL
 *
 * @param {string} imdbUrl
 * @returns {string}
 */
export const getIdByIMDbUrl = (imdbUrl: string) => {
  const imdbIdArray = /tt\d+/.exec(imdbUrl);
  if (imdbIdArray && imdbIdArray[0]) {
    return imdbIdArray[0];
  }
  return '';
};
