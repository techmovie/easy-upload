import { GMFetch } from '@/common/utils';
import { CONFIG } from './movie.config';
import {
  DoubanMobileData,
  DoubanBasicData,
  DoubanMobileCredits,
  DoubanBookData,
} from './movie.types';
import { getIdByIMDbUrl } from './movie.imdb';

/**
 * Get Douban Awards by Douban ID
 *
 * @async
 * @param {string} doubanId
 * @returns {Promise<string>}
 */
export const getDoubanAwards = async (doubanId: string) => {
  const url = `${CONFIG.URLS.DOUBAN_SUBJECT(doubanId)}awards/`;
  const data = await GMFetch<string>(url);
  const doc = new DOMParser().parseFromString(data, 'text/html');
  const awardsDom = doc.querySelector('#content > div > div.article');
  if (!awardsDom) {
    return '';
  }
  return awardsDom?.innerHTML
    .replace(/[ \n]/g, '')
    .replace(/<\/li><li>/g, '</li> <li>')
    .replace(/<\/a><span/g, '</a> <span')
    .replace(/<(div|ul)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/ +\n/g, '\n')
    .trim();
};

/**
 * Get IMDb ID from Douban URL
 *
 * @async
 * @param {string} doubanItemUrl
 * @returns {Promise<string>}
 */
export const getIMDbIDFromDouban = async (doubanItemUrl: string) => {
  const doubanPage = await GMFetch<string>(doubanItemUrl);
  const dom = new DOMParser().parseFromString(doubanPage, 'text/html');
  const imdbId =
    dom
      .querySelector('#info > span.pl:contains("IMDb")')
      ?.nextSibling?.nodeValue?.trim() ?? '';
  return imdbId;
};

/**
 * Get douban movie data from mobile api
 *
 * @async
 * @param {string} id
 * @param {('movie' | 'tv')} type
 * @returns {Promise<DoubanMobileData>}
 */
export const getMobileDoubanInfo = async (id: string, type: 'movie' | 'tv') => {
  if (!id) {
    throw new Error('No Douban ID found');
  }
  const url = `${CONFIG.URLS.DOUBAN_MOBILE_API}/${type}/${id}`;

  const data = await GMFetch<DoubanMobileData>(`${url}?for_mobile=1&ck=`, {
    headers: {
      Referer: `https://m.douban.com/${type}/subject/${id}`,
    },
    responseType: 'json',
  });
  if (data && data.title === '未知电影') {
    throw new Error('Please login in Douban to and try again');
  }
  return data;
};

/**
 * Get Douban Basic Data by Query
 *
 * @async
 * @param {string} query imdbUrl or keyword
 * @returns {Promise<DoubanBasicData>}
 */
export const getDoubanBasicDataByQuery = async (
  query: string,
): Promise<DoubanBasicData> => {
  const imdbId = getIdByIMDbUrl(query);
  const searchParams = imdbId || query;
  const url = CONFIG.URLS.DOUBAN_SUGGEST_API(searchParams);
  const data = await GMFetch<string>(url);
  const doc = new DOMParser().parseFromString(data, 'text/html');
  const linkDom = doc.querySelector('.result-list .result h3 a');
  if (!linkDom) {
    throw new Error('No Douban Item was found');
  } else {
    const { href, textContent } = linkDom as HTMLAnchorElement;
    const season = textContent?.match(/第(.+?)季/)?.[1] ?? '';
    const doubanId = decodeURIComponent(href).match(/subject\/(\d+)/)?.[1] ?? '';
    return {
      id: doubanId,
      season,
      isTV: !!season,
      title: textContent || '',
    };
  }
};

/**
 * Get Douban Credits Data
 *
 * @async
 * @param {string} url
 * @param {('tv' | 'movie')} type
 * @returns {Promise<DoubanMobileCredits[]>}
 */
export const getDoubanCreditsData = async (id: string, type: 'tv' | 'movie') => {
  const url = `${CONFIG.URLS.DOUBAN_MOBILE_API}/${type}/${id}/credits`;
  const data = await GMFetch<DoubanMobileCredits[]>(url, {
    responseType: 'json',
  });
  return data;
};

/**
 * Get Douban Book Info
 * @todo: update title
 * @async
 * @param {string} doubanUrl
 * @returns {Promise<DoubanBookData>}
 */
export const getDoubanBookInfo = async (doubanUrl: string) => {
  const reqUrl = CONFIG.URLS.PT_GEN_API(doubanUrl);
  const data = await GMFetch<DoubanBookData>(reqUrl, {
    responseType: 'json',
  });
  return data;
};
