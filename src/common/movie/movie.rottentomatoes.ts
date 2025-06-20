import { getRottenTomatoesDataByQuery } from './movie.helper';
import type { RottenTomatoesHit } from './movie.types';
/**
 * Try Best to get Rotten Tomatoes match by title and year.
 *
 * @async
 * @param {string} title
 * @param {string} year
 * @param {boolean} isTV
 * @returns {Promise<RottenTomatoesHit>}
 */
export const getMatchRottenTomatoes = async (
  title: string,
  year?: string,
  isTV?: boolean,
): Promise<RottenTomatoesHit | null> => {
  try {
    const MAX_YEAR_DIFF = 2;
    const releaseYear = parseInt(year || '1800', 10);
    const searchResultHits = await getRottenTomatoesDataByQuery(title);
    const filteredHits = searchResultHits.filter(
      (hit) => hit.type === (isTV ? 'tv' : 'movie'),
    );
    if (!filteredHits.length) return null;
    filteredHits.sort((a, b) => {
      const diffA = Math.abs(a.releaseYear - releaseYear);
      const diffB = Math.abs(b.releaseYear - releaseYear);
      return diffA !== diffB
        ? diffA - diffB // first sort by year difference
        : b.releaseYear - a.releaseYear; // then sort by release year
    });
    const normalizedTitle = title.toLowerCase();

    let bestMatch, closeMatch;
    for (const hit of filteredHits) {
      const itemTitle = hit.title?.toLowerCase() || '';
      if (itemTitle === normalizedTitle) {
        bestMatch = hit;
      } else if (itemTitle.startsWith(normalizedTitle)) {
        closeMatch = closeMatch || hit;
      }

      if (bestMatch) break; // if found exact match, break
    }
    const isYearCompatible = (rtYear: number): boolean =>
      Math.abs(rtYear - releaseYear) <= MAX_YEAR_DIFF;

    if (
      releaseYear &&
      (!bestMatch || !isYearCompatible(bestMatch.releaseYear))
    ) {
      if (closeMatch && isYearCompatible(closeMatch.releaseYear)) {
        bestMatch = closeMatch;
      } else if (
        filteredHits.length > 0 &&
        isYearCompatible(filteredHits[0].releaseYear)
      ) {
        bestMatch = filteredHits[0];
      }
    }

    bestMatch = bestMatch || closeMatch || searchResultHits[0];

    return bestMatch;
  } catch (error) {
    console.error('Error fetching data from Rotten Tomatoes:', error);
    return null;
  }
};
