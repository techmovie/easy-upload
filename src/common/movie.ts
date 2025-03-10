/* eslint-disable no-irregular-whitespace */
import {
  EUROPE_LIST, TMDB_API_KEY, TMDB_API_URL,
  PT_GEN_API, DOUBAN_SUGGEST_API, DOUBAN_MOBILE_API,
  TORRENT_INFO,
} from '../const';
import { $t, handleError, getValue, GMFetch } from './utils';
import $ from 'jquery';

export const getAreaCode = (area:string) => {
  const europeList = EUROPE_LIST;
  if (area) {
    if (area.match(/USA|US|Canada|CA|美国|加拿大|United States/i)) {
      return 'US';
    } else if (europeList.includes(area) || area.match(/欧|英|法|德|俄|意|苏联|EU/i)) {
      return 'EU';
    } else if (area.match(/Japan|日本|JP/i)) {
      return 'JP';
    } else if (area.match(/Korea|韩国|KR/i)) {
      return 'KR';
    } else if (area.match(/Taiwan|台湾|TW/i)) {
      return 'TW';
    } else if (area.match(/Hong\s?Kong|香港|HK/i)) {
      return 'HK';
    } else if (area.match(/CN|China|大陆|中|内地|Mainland/i)) {
      return 'CN';
    }
  }
  return 'OT';
};
export const getTMDBIdByIMDBId = async (imdbid: string) => {
  try {
    const url = `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`;
    const data = await GMFetch(url);
    const isMovie = data.movie_results && data.movie_results.length > 0;
    const isTV = data.tv_results && data.tv_results.length > 0;
    if (!isMovie && !isTV) {
      throw $t('请求失败');
    }
    const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
    return tmdbData;
  } catch (error) {
    console.log('getTMDBIdByIMDBId:', error);
    return {};
  }
};

export const getTMDBVideos = async (tmdbId: string) => {
  const url = `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`;
  const data = await GMFetch(url);
  return data.results || [];
};
export const getIMDBIdByUrl = (imdbLink: string) => {
  const imdbIdArray = /tt\d+/.exec(imdbLink);
  if (imdbIdArray && imdbIdArray[0]) {
    return imdbIdArray[0];
  }
  return '';
};
export const getIMDBData = async (imdbUrl: string):Promise<IMDB.ImdbData|undefined> => {
  try {
    if (!imdbUrl) {
      throw new Error('$t(缺少IMDB信息)');
    }
    const data = await GMFetch(`${PT_GEN_API}?url=${imdbUrl}`);
    if (data && data.success) {
      return data;
    }
    throw data.error || $t('请求失败');
  } catch (error) {
    handleError(error);
  }
};

export const getDataFromDoubanPage = async (domString:string): Promise<Douban.DoubanData> => {
  const dom = new DOMParser().parseFromString(domString, 'text/html');
  const fetchAnchor = function (anchor:JQuery) {
    return anchor[0]?.nextSibling?.nodeValue?.trim() ?? '';
  };
  // title
  const chineseTitle = $('title', dom).text().replace('(豆瓣)', '').trim();
  const foreignTitle = $('span[property="v:itemreviewed"]', dom).text().replace(chineseTitle, '').trim();
  let aka:string[] = []; let transTitle: string; let thisTitle: string;
  const akaAnchor = $('#info span.pl:contains("又名")', dom);
  if (akaAnchor.length > 0) {
    const data = fetchAnchor(akaAnchor).split(' / ').sort((a:string, b:string) => { // 首字(母)排序
      return a.localeCompare(b);
    }).join('/');
    aka = data.split('/');
  }
  if (foreignTitle) {
    transTitle = chineseTitle + (aka.length > 0 ? (`/${aka.join('/')}`) : '');
    thisTitle = foreignTitle;
  } else {
    transTitle = aka.join('/') || '';
    thisTitle = chineseTitle;
  }

  // json
  const jsonData = JSON.parse($('head > script[type="application/ld+json"]', dom).html().replace(/(\r\n|\n|\r|\t)/gm, ''));
  const rating = jsonData.aggregateRating ? jsonData.aggregateRating.ratingValue : 0;
  const votes = jsonData.aggregateRating ? jsonData.aggregateRating.ratingCount : 0;
  const director = jsonData.director ? jsonData.director : [];
  const writer = jsonData.author ? jsonData.author : [];
  const cast = jsonData.actor ? jsonData.actor : [];
  const poster = jsonData.image
    .replace(/s(_ratio_poster|pic)/g, 'l$1')
    .replace(/img\d/, 'img9');

  // rate
  const doubanLink = `https://movie.douban.com${jsonData.url}`;
  let imdbId = ''; let imdbLink = ''; let imdbAverageRating = '0'; let imdbVotes = '0'; let imdbRating = '';
  const imdbLinkAnchor = $('#info span.pl:contains("IMDb")', dom);
  const hasImdb = imdbLinkAnchor.length > 0;
  if (hasImdb) {
    imdbId = fetchAnchor(imdbLinkAnchor);
    imdbLink = `https://www.imdb.com/title/${imdbId}/`;
    const imdbData = await GMFetch(
      `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`,
      {
        responseType: undefined,
      },
    );
    imdbAverageRating = imdbData.match(/rating":(\d\.\d)/)?.[1] ?? '0';
    imdbVotes = imdbData.match(/ratingCount":(\d+)/)?.[1] ?? '0';
    imdbRating = `${imdbAverageRating}/10 from ${imdbVotes} users`;
  }

  const year = ` ${$('#content > h1 > span.year', dom).text().substr(1, 4)}`;
  const playDate = $('#info span[property="v:initialReleaseDate"]', dom).map(function () { // 上映日期
    return $(this).text().trim();
  }).toArray().sort((a, b) => { // 按上映日期升序排列
    return new Date(a).getTime() - new Date(b).getTime();
  });
  const introductionDom = $('#link-report > span.all.hidden, #link-report > [property="v:summary"]', dom);
  const summary = (
    introductionDom.length > 0 ? introductionDom.text() : '暂无相关剧情介绍'
  ).split('\n').map(a => a.trim()).filter(a => a.length > 0).join('\n'); // 处理简介缩进
  const genre = $('#info span[property="v:genre"]', dom).map(function () { // 类别
    return $(this).text().trim();
  }).toArray(); // 类别
  const language = fetchAnchor($('#info span.pl:contains("语言")', dom));
  const region = fetchAnchor($('#info span.pl:contains("制片国家/地区")', dom)); // 产地
  const runtimeAnchor = $('#info span.pl:contains("单集片长")', dom);
  const runtime = runtimeAnchor[0] ? fetchAnchor(runtimeAnchor) : $('#info span[property="v:runtime"]', dom).text().trim();
  const episodesAnchor = $('#info span.pl:contains("集数")'); // 集数
  const episodes = episodesAnchor[0] ? fetchAnchor(episodesAnchor) : '';
  let tags;
  const tagAnother = $('div.tags-body > a[href^="/tag"]', dom);
  if (tagAnother.length > 0) {
    tags = tagAnother.map(function () {
      return $(this).text();
    }).get();
  }
  // awards
  const awardsPage = await GMFetch(`${doubanLink}/awards`, {
    responseType: undefined,
  });
  const awardsDoc = new DOMParser().parseFromString(awardsPage, 'text/html');
  const awards = $('#content > div > div.article', awardsDoc).html()
    .replace(/[ \n]/g, '')
    .replace(/<\/li><li>/g, '</li> <li>')
    .replace(/<\/a><span/g, '</a> <span')
    .replace(/<(div|ul)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/ +\n/g, '\n')
    .trim();
  return {
    imdbLink,
    imdbId,
    imdbAverageRating,
    imdbVotes,
    imdbRating,
    chineseTitle,
    foreignTitle,
    aka,
    transTitle: transTitle.split('/'),
    thisTitle: thisTitle.split('/'),
    year,
    playDate,
    region,
    genre,
    language: language.split(','),
    episodes,
    duration: runtime,
    introduction: summary,
    doubanLink,
    doubanRatingAverage: rating || 0,
    doubanVotes: votes,
    doubanRating: `${rating || 0}/10 from ${votes} users`,
    poster,
    director,
    cast,
    writer,
    awards,
    tags,
  };
};
export const getDoubanAwards = async (doubanId:string) => {
  const data = await GMFetch(`https://movie.douban.com/subject/${doubanId}/awards/`, {
    responseType: undefined,
  });
  const doc = new DOMParser().parseFromString(data, 'text/html');
  const linkDom: HTMLLinkElement|null = doc.querySelector('#content > div > div.article');
  return linkDom?.innerHTML
    .replace(/[ \n]/g, '')
    .replace(/<\/li><li>/g, '</li> <li>')
    .replace(/<\/a><span/g, '</a> <span')
    .replace(/<(div|ul)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/ +\n/g, '\n')
    .trim();
};
export const getIMDBFromDouban = async (doubanLink:string) => {
  const doubanPage = await GMFetch(doubanLink, {
    responseType: undefined,
  });
  const dom = new DOMParser().parseFromString(doubanPage, 'text/html');
  const imdbId = $('#info span.pl:contains("IMDb")', dom)[0]?.nextSibling?.nodeValue?.trim() ?? '';
  return imdbId;
};
export const getMobileDoubanInfo = async (doubanUrl:string, isTV?:boolean): Promise<Douban.DoubanData|void> => {
  try {
    if (doubanUrl) {
      const doubanId = doubanUrl.match(/subject\/(\d+)/)?.[1] ?? '';
      if (!doubanId) {
        throw $t('豆瓣ID获取失败');
      }
      const catPath = isTV ? 'tv' : 'movie';
      const url = `${DOUBAN_MOBILE_API}/${catPath}/${doubanId}`;
      const options = {
        headers: {
          Referer: `https://m.douban.com/${catPath}/subject/${doubanId}`,
        },
        cookie: '',
        anonymous: false,
      };
      const cookie = getValue('easy-seed.douban-cookie', false);
      const ckValue = cookie?.match(/ck=([^;]+)?/)?.[1] ?? '';

      if (cookie) {
        options.cookie = cookie;
        options.anonymous = true;
      }
      const data = await GMFetch(`${url}?for_mobile=1&ck=${ckValue}`, options);
      if (data && data.title === '未知电影') {
        throw $t('请配置豆瓣Cookie');
      }
      if (data && data.id) {
        const creditsData = await GMFetch(`${url}/credits`, options);
        data.credits = creditsData.credits;
        const awards = await getDoubanAwards(doubanId);
        data.awards = awards;
        return await formatDoubanInfo(data);
      }
      throw $t('获取豆瓣信息失败');
    } else {
      throw $t('豆瓣链接获取失败');
    }
  } catch (error) {
    handleError(error);
  }
};
export const getIMDBRating = async (imdbId:string) => {
  const url = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`;
  const data = await GMFetch(url, {
    responseType: undefined,
  });
  const { resource } = JSON.parse(data.match(/[^(]+\((.+)\)/)?.[1] ?? '') ?? {};
  return {
    count: resource?.ratingCount,
    value: resource?.rating,
    id: resource?.id.match(/tt\d+/)?.[0] ?? '',
  };
};

export const formatDoubanInfo = async (data:Douban.DoubanMobileData) => {
  const {
    rating, pubdate, year, languages, genres, title, intro,
    actors, durations, cover_url: coverUrl, countries, url, original_title: originalTitle,
    directors, aka, episodes_count: epCount, credits, awards,
  } = data;
  const { imdbUrl } = TORRENT_INFO;
  let imdbId = '';
  if (!imdbUrl) {
    imdbId = await getIMDBFromDouban(url);
  } else {
    imdbId = getIMDBIdByUrl(imdbUrl);
  }
  let imdbRate = {
    id: '',
    value: '0',
    count: '0',
  };
  if (imdbId) {
    imdbRate = await getIMDBRating(imdbId);
  }

  let foreignTitle = '';
  if (originalTitle && title !== originalTitle) {
    foreignTitle = originalTitle;
  }
  let poster = coverUrl;
  if (poster.includes('img3')) {
    poster = poster.replace('img3', 'img1').replace(/m(_ratio_poster)/, 'l$1');
  }
  const formatData: Douban.DoubanData = {
    imdbId: imdbRate.id,
    imdbLink: `https://www.imdb.com/title/${imdbRate.id}/`,
    imdbAverageRating: imdbRate.value,
    imdbVotes: imdbRate.count,
    imdbRating: `${imdbRate?.value ?? 0}/10 from ${imdbRate?.count ?? 0} users`,
    chineseTitle: title,
    foreignTitle,
    aka,
    transTitle: Array.from(new Set([originalTitle ? title : '', ...aka])).filter(Boolean),
    thisTitle: [originalTitle || title], // original_title
    year,
    playDate: pubdate,
    region: countries.join(' / '),
    genre: genres,
    language: languages,
    episodes: epCount > 0 ? `${epCount}` : '',
    duration: durations.join(' / '),
    introduction: intro,
    doubanLink: url,
    doubanRatingAverage: rating.value,
    doubanVotes: `${rating.count}`,
    doubanRating: `${rating.value}/10 from ${rating.count} users`,
    poster,
    director: directors,
    cast: actors,
    writer: [],
    credits,
    awards,
  };
  formatData.format = getDoubanFormat(formatData);
  return formatData;
};
export const getDoubanFormat = (data: Douban.DoubanData) => {
  const {
    poster, thisTitle, transTitle, genre,
    year: movieYear, region, language, playDate,
    imdbRating, imdbLink, doubanRating, doubanLink,
    episodes: showEpisodes, duration: movieDuration,
    introduction, awards, tags, credits = [],
  } = data;
  const spaceStr = '\xa0'.repeat(7);
  const creditsData = credits.map(credit => {
    const celebrity = credit.celebrities.map(item => {
      return `${item.name} ${item.latin_name}`;
    });
    const repeatMap = {
      2: 7,
      3: 2,
      4: 0,
      5: 0,
    };
    const celebrityKey = credit.title.split('').join('\xa0'.repeat(repeatMap?.[credit.title.length as 2|3|4|5] || 0));
    const celebrityValue = celebrity.join(`\n${'\xa0'.repeat(24)}`).trim();
    return `◎${celebrityKey}${spaceStr}${celebrityValue}`;
  });
  let descr = poster ? `[img]${poster}[/img]\n\n` : '';
  descr += transTitle ? `◎译${spaceStr}名${spaceStr}${transTitle.join(' / ')}\n` : '';
  descr += thisTitle ? `◎片${spaceStr}名${spaceStr}${thisTitle.join(' / ')}\n` : '';
  descr += movieYear ? `◎年${spaceStr}代${spaceStr}${movieYear.trim()}\n` : '';
  descr += region ? `◎产${spaceStr}地${spaceStr}${region}\n` : '';
  descr += genre ? `◎类${spaceStr}别${spaceStr}${genre.join(' / ')}\n` : '';
  descr += language ? `◎语${spaceStr}言${spaceStr}${language.join(' / ')}\n` : '';
  descr += playDate ? `◎上映日期${spaceStr} ${playDate.join(' / ')}\n` : '';
  descr += imdbRating ? `◎IMDb评分${spaceStr}${imdbRating}\n` : '';
  descr += imdbLink ? `◎IMDb链接${spaceStr}${imdbLink}\n` : '';
  descr += doubanRating ? `◎豆瓣评分${spaceStr} ${doubanRating}\n` : '';
  descr += doubanLink ? `◎豆瓣链接${spaceStr} ${doubanLink}\n` : '';
  descr += showEpisodes ? `◎集${spaceStr}数${spaceStr}${showEpisodes}\n` : '';
  descr += movieDuration ? `◎片${spaceStr}长${spaceStr}${movieDuration}\n` : '';
  descr += creditsData.length > 0 ? creditsData.join('\n') : '';
  descr += tags && tags.length > 0 ? `\n◎标${spaceStr}签${spaceStr}${tags.join(' | ')} \n` : '';
  descr += introduction ? `\n◎简${spaceStr}介\n\n  ${introduction.replace(/\n/g, `\n${'\xa0'.repeat(2)}`)} \n` : '';
  descr += awards ? `\n◎获奖情况\n\n　　${awards.replace(/\n/g, `\n${'\xa0'.repeat(6)}`)} \n` : '';
  return descr.trim();
};
export const getDoubanIdByIMDB = async (query:string):(Promise<Douban.Season|undefined>) => {
  try {
    const imdbId = getIMDBIdByUrl(query);
    const params = imdbId || query;
    const url = DOUBAN_SUGGEST_API.replace('{query}', params);
    const options = {
      cookie: '',
      anonymous: false,
      responseType: undefined,
    };
    const cookie = getValue('easy-seed.douban-cookie', false);
    if (cookie) {
      options.cookie = cookie;
      options.anonymous = true;
    }
    const data = await GMFetch(url, options);
    const doc = new DOMParser().parseFromString(data, 'text/html');
    const linkDom: HTMLLinkElement|null = doc.querySelector('.result-list .result h3 a');
    if (!linkDom) {
      throw $t('豆瓣ID获取失败');
    } else {
      const { href, textContent } = linkDom;
      const season = textContent?.match(/第(.+?)季/)?.[1] ?? '';
      const doubanId = decodeURIComponent(href).match(/subject\/(\d+)/)?.[1] ?? '';
      return ({
        id: doubanId,
        season,
        title: textContent || '',
      });
    }
  } catch (error) {
    handleError(error);
  }
};
export const getDoubanInfo = async (doubanUrl:string, isTV?: boolean) => {
  try {
    if (doubanUrl) {
      const doubanInfo = await getMobileDoubanInfo(doubanUrl, isTV);
      return doubanInfo;
    }
    throw $t('豆瓣链接获取失败');
  } catch (error) {
    handleError(error);
  }
};
export const getDoubanBookInfo = async (doubanUrl:string):Promise<Douban.BookData|undefined> => {
  const reqUrl = `${PT_GEN_API}?url=${doubanUrl}`;
  const data = await GMFetch(reqUrl);
  const { chinese_title: chineseTitle, origin_title: originalTitle } = data;
  let foreignTitle = '';
  if (chineseTitle !== originalTitle) {
    foreignTitle = originalTitle;
  }
  if (data) {
    return {
      ...data,
      chineseTitle,
      foreignTitle,
    };
  }
};

// https://greasyfork.org/zh-CN/scripts/389810-rottentomatoes-utility-library-custom-api
export const getRtIdFromTitle = async (title:string, tv:boolean, year:string) => {
  console.log('%s', title, year);
  const MAX_YEAR_DIFF = 2;
  tv = tv || false;
  const yearVal = parseInt(year, 10) || 1800;
  const url = `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`;
  const data = await GMFetch(url);
  const movies = tv ? data.tvSeries : data.movies;
  if (!Array.isArray(movies) || movies.length < 1) {
    console.log('no search results');
    return {};
  }
  const sorted = movies.concat();
  if (year && sorted) {
    sorted.sort((a, b) => {
      if (Math.abs(a.year - yearVal) !== Math.abs(b.year - yearVal)) {
        // Prefer closest year to the given one
        return Math.abs(a.year - yearVal) - Math.abs(b.year - yearVal);
      }
      return b.year - a.year; // In a tie, later year should come first
    });
  }
  // Search for matches with exact title in order of proximity by year
  let bestMatch, closeMatch;
  for (const m of sorted) {
    m.title = m.title || m.name;
    if (m.title.toLowerCase() === title.toLowerCase()) {
      bestMatch = bestMatch || m;
      console.log('bestMatch', bestMatch);
      // RT often includes original titles in parentheses for foreign films, so only check if they start the same
    } else if (m.title.toLowerCase().startsWith(title.toLowerCase())) {
      closeMatch = closeMatch || m;
      console.log('closeMatch', closeMatch);
    }
    if (bestMatch && closeMatch) {
      break;
    }
  }
  // Fall back on closest year match if within 2 years, or whatever the first result was.
  // RT years are often one year later than imdb, or even two
  const yearComp = (imdb: number, rt: number) => {
    return rt - imdb <= MAX_YEAR_DIFF && imdb - rt < MAX_YEAR_DIFF;
  };
  if (yearVal && (!bestMatch || !yearComp(yearVal, bestMatch.year))) {
    if (closeMatch && yearComp(yearVal, closeMatch.year)) {
      bestMatch = closeMatch;
    } else if (yearComp(yearVal, sorted[0].year)) {
      bestMatch = sorted[0];
    }
  }
  bestMatch = bestMatch || closeMatch || movies[0];

  if (bestMatch) {
    const id = bestMatch && bestMatch.url.replace(/\/s\d{2}\/?$/, ''); // remove season suffix from tv matches
    const score = bestMatch?.meterScore ?? '0';
    return {
      id,
      score,
    };
  }
  console.log('no match found on rt');
  return {};
};

export const getTvSeasonData = async (data:Douban.Season) => {
  const { title: torrentTitle } = TORRENT_INFO;
  const { season = '', title } = data;
  if (season) {
    const seasonNumber = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)?.[1] ?? '1';
    if (parseInt(seasonNumber, 10) === 1) {
      return data;
    }
    const query = title.replace(/第.+?季/, `第${seasonNumber}季`);
    const response = await getDoubanIdByIMDB(query);
    return response;
  }
};
