import { CONFIG } from './movie.config';
import { GMFetch } from '@/common/utils';
import { TMDBVideoResponse, TMDBVideo, TMDBFindResponse, TMDBMovie, TMDBTV } from './movie.types';

/**
 * Get TMDB Data by IMDB ID
 *
 * @async
 * @param {string} imdbid
 * @returns {Promise<TMDBMovie | TMDBTV>}
 * @link https://developer.themoviedb.org/reference/find-by-id
 */
export const getTMDBDataByIMDBId = async (imdbid: string) : Promise<TMDBMovie | TMDBTV> => {
  const url = `${CONFIG.URLS.TMDB_API}/3/find/${imdbid}?api_key=${CONFIG.KEY.TMDB_API_KEY}&language=en&external_source=imdb_id`;
  const data = await GMFetch<TMDBFindResponse>(url, {
    responseType: 'json',
  });
  const movieFound = data.movie_results && data.movie_results.length > 0;
  const tvFound = data.tv_results && data.tv_results.length > 0;
  if (!movieFound && !tvFound) {
    throw new Error('No movie or TV found');
  }
  const tmdbData = movieFound ? data.movie_results[0] : data.tv_results[0];
  return tmdbData;
};

/**
 * Get related videos by TMDB ID
 *
 * @async
 * @param {string} tmdbId
 * @returns {Promise<TMDBVideo[]>}
 * @link https://developer.themoviedb.org/reference/movie-videos
 */
export const getTMDBVideosById = async (tmdbId: string): Promise<TMDBVideo[]> => {
  //
  const url = `${CONFIG.URLS.TMDB_API}/3/movie/${tmdbId}/videos?api_key=${CONFIG.KEY.TMDB_API_KEY}&language=en`;
  const data = await GMFetch<TMDBVideoResponse>(url, {
    responseType: 'json',
  });
  if (!data.results || data.results.length === 0) {
    throw new Error('No TMDB videos found');
  }
  return data.results;
};
