/* eslint-disable no-irregular-whitespace */
/* eslint-disable camelcase */
import {
  CURRENT_SITE_NAME, EUROPE_LIST, TMDB_API_KEY,
  TMDB_API_URL, PT_GEN_API,
  DOUBAN_SUGGEST_API, CURRENT_SITE_INFO, USE_CHINESE,
  TORRENT_INFO, DOUBAN_MOBILE_API,
} from './const';
import i18nConfig from './i18n.json';
import Notification from './components/Notification';
interface RequestOptions {
  method?: 'GET' | 'POST'
  responseType?: 'json' | 'blob' | 'arraybuffer' | undefined
  headers?: Tampermonkey.RequestHeaders
  data?: any
  timeout?: number
}
const formatTorrentTitle = (title:string) => {
  // 保留5.1 H.264中间的点
  return title.replace(/\.(?!(\d+))/ig, ' ')
    .replace(/\.(?=\d{4}|48|57|72|2k|4k|7.1|6.1|5.1|4.1|2.0|1.0)/ig, ' ').trim();
};
const handleError = (error:any) => {
  Notification.open({
    description: error.message || error,
  });
};
const getDoubanInfo = async (doubanUrl:string) => {
  try {
    if (doubanUrl) {
      const doubanInfo = await getMobileDoubanInfo(doubanUrl);
      return doubanInfo;
    }
    throw $t('豆瓣链接获取失败');
  } catch (error) {
    handleError(error);
  }
};
const getDoubanBookInfo = async (doubanUrl:string):Promise<Douban.BookData|undefined> => {
  const reqUrl = `${PT_GEN_API}?url=${doubanUrl}`;
  const data = await fetch(reqUrl, {
    responseType: 'json',
  });
  const { chinese_title, origin_title } = data;
  let foreignTitle = '';
  if (chinese_title !== origin_title) {
    foreignTitle = origin_title;
  }
  if (data) {
    return {
      ...data,
      chineseTitle: chinese_title,
      foreignTitle,
    };
  }
};

// eslint-disable-next-line no-unused-vars
const getDataFromDoubanPage = async (domString:string): Promise<Douban.DoubanData> => {
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
  let imdbId = ''; let imdbLink = ''; let imdbAverageRating; let imdbVotes; let imdbRating = '';
  const imdbLinkAnchor = $('#info span.pl:contains("IMDb")', dom);
  const hasImdb = imdbLinkAnchor.length > 0;
  if (hasImdb) {
    imdbId = fetchAnchor(imdbLinkAnchor);
    imdbLink = `https://www.imdb.com/title/${imdbId}/`;
    const imdbData = await fetch(
      `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`,
      {
        responseType: undefined,
      },
    );
    imdbAverageRating = imdbData.match(/rating":(\d\.\d)/)?.[1] ?? 0;
    imdbVotes = imdbData.match(/ratingCount":(\d+)/)?.[1] ?? 0;
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
  const tag_another = $('div.tags-body > a[href^="/tag"]', dom);
  if (tag_another.length > 0) {
    tags = tag_another.map(function () {
      return $(this).text();
    }).get();
  }
  // awards
  const awardsPage = await fetch(`${doubanLink}/awards`, {
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
const getDoubanAwards = async (doubanId:string) => {
  const data = await fetch(`https://movie.douban.com/subject/${doubanId}/awards`, {
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
const getIMDBFromDouban = async (doubanLink:string) => {
  const doubanPage = await fetch(doubanLink, {
    responseType: undefined,
  });
  const dom = new DOMParser().parseFromString(doubanPage, 'text/html');
  const imdbId = $('#info span.pl:contains("IMDb")', dom)[0]?.nextSibling?.nodeValue?.trim() ?? '';
  return imdbId;
};
const getMobileDoubanInfo = async (doubanUrl:string, imdbLink?:string): Promise<Douban.DoubanData|void> => {
  try {
    if (doubanUrl) {
      const doubanId = doubanUrl.match(/subject\/(\d+)/)?.[1] ?? '';
      if (!doubanId) {
        throw $t('豆瓣ID获取失败');
      }
      const url = `${DOUBAN_MOBILE_API}/movie/${doubanId}/`;
      const options = {
        headers: {
          Referer: `https://m.douban.com/movie/subject/${doubanId}`,
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
      const data = await fetch(`${url}?for_mobile=1&ck=${ckValue}`, options);
      if (data && data.title === '未知电影') {
        throw $t('请配置豆瓣Cookie');
      }
      if (data && data.id) {
        const creditsData = await fetch(`${url}/credits`, options);
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
const getIMDBRating = async (imdbId:string) => {
  const url = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`;
  const data = await fetch(url, {
    responseType: undefined,
  });
  const { resource } = JSON.parse(data.match(/[^(]+\((.+)\)/)?.[1]) ?? {};
  return {
    count: resource.ratingCount,
    value: resource.rating,
    id: resource.id.match(/tt\d+/)?.[0] ?? '',
  };
};

const formatDoubanInfo = async (data:Douban.DoubanMobileData) => {
  const {
    rating, pubdate, year, languages, genres, title, intro,
    actors, durations, cover_url, countries, url, original_title,
    directors, aka, episodes_count, credits, awards,
  } = data;
  const { imdbUrl } = TORRENT_INFO;
  let imdbId = '';
  if (!imdbUrl) {
    imdbId = await getIMDBFromDouban(url);
  } else {
    imdbId = getIMDBIdByUrl(imdbUrl);
  }
  const imdbRate = await getIMDBRating(imdbId);
  let foreignTitle = '';
  if (title !== original_title) {
    foreignTitle = original_title;
  }
  let poster = cover_url;
  if (poster.includes('img3')) {
    poster = poster.replace('img3', 'img1').replace(/m(_ratio_poster)/, 'l$1');
  }
  const formatData: Douban.DoubanData = {
    imdbId: imdbRate.id,
    imdbLink: `https://www.imdb.com/title/${imdbRate.id}/`,
    imdbAverageRating: imdbRate.value,
    imdbVotes: imdbRate.count,
    imdbRating: `${imdbRate.value}/10 from ${imdbRate.count} users`,
    chineseTitle: title,
    foreignTitle,
    aka,
    transTitle: Array.from(new Set([original_title ? title : '', ...aka])).filter(Boolean),
    thisTitle: [original_title || title],
    year,
    playDate: pubdate,
    region: countries.join(' / '),
    genre: genres,
    language: languages,
    episodes: episodes_count > 0 ? `${episodes_count}` : '',
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
const getDoubanFormat = (data: Douban.DoubanData) => {
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
const getDoubanIdByIMDB = async (query:string):(Promise<Douban.Season|undefined>) => {
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
    const data = await fetch(url, options);
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
const getIMDBData = async (imdbUrl: string):Promise<IMDB.ImdbData|undefined> => {
  try {
    if (!imdbUrl) {
      throw new Error('$t(缺少IMDB信息)');
    }
    const data = await fetch(`${PT_GEN_API}?url=${imdbUrl}`);
    if (data && data.success) {
      return data;
    }
    throw data.error || $t('请求失败');
  } catch (error) {
    handleError(error);
  }
};
const transferImgs = async (screenshot: string, authToken: string, imgHost = 'https://imgbb.com/json') => {
  try {
    const isHdbHost = !!screenshot.match(/i\.hdbits\.org/);
    const formData = new FormData();
    if (isHdbHost || imgHost.includes('gifyu')) {
      const promiseArray = [urlToFile(screenshot)];
      const [fileData] = await Promise.all(promiseArray);
      formData.append('type', 'file');
      formData.append('source', fileData);
    } else {
      formData.append('type', 'url');
      formData.append('source', screenshot);
    }
    formData.append('action', 'upload');
    formData.append('timestamp', `${Date.now()}`);
    formData.append('auth_token', authToken);
    const res = await fetch(imgHost, {
      method: 'POST',
      data: formData,
      timeout: 3e5,
    });
    if (res.status_txt !== 'OK') {
      throw $t('上传失败，请重试');
    }
    if (res.image) {
      return res.image;
    }
    throw $t('上传失败，请重试');
  } catch (error) {
    console.log('err:', error);
    handleError(error);
  }
};
const uploadToPixhost = async (screenshots: string[]) => {
  try {
    const params = encodeURI(`imgs=${screenshots.join('\n')}&content_type=1&max_th_size=300`);
    const res = await fetch('https://pixhost.to/remote/', {
      method: 'POST',
      data: params,
      timeout: 3e5,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      responseType: undefined,
    });
    const data = res.match(/(upload_results = )({.*})(;)/);
    if (!data) {
      throw $t('上传失败，请重试');
    }
    let imgResultList = [];
    if (data && data.length) {
      imgResultList = JSON.parse(data[2]).images;
      if (imgResultList.length < 1) {
        throw new Error($t('上传失败，请重试'));
      }
      return imgResultList;
    }
    throw new Error($t('上传失败，请重试'));
  } catch (error) {
    handleError(error);
  }
};
interface TokenSecret {
  token_id: string
  token_secret: string
}
const uploadToImgbox = async (screenshot: string, authToken:string, tokenSecret:TokenSecret) => {
  const file = await urlToFile(screenshot);
  const { token_id, token_secret } = tokenSecret;
  const options: RequestOptions = {
    method: 'POST',
    headers: {
      'X-CSRF-Token': authToken,
    },
  };
  const formData = new FormData();
  formData.append('token_id', token_id);
  formData.append('token_secret', token_secret);
  formData.append('content_type', '1');
  formData.append('thumbnail_size', '350r');
  formData.append('gallery_id', 'null');
  formData.append('gallery_secret', 'null');
  formData.append('comments_enabled', '0');
  formData.append('files[]', file);
  options.data = formData;
  const data = await fetch('https://imgbox.com/upload/process', options);
  if (data && data.files && data.files.length) {
    return data.files[0];
  }
};
const uploadToHDB = async (screenshots: string[], galleryName: string) => {
  const apiUrl = 'https://img.hdbits.org/upload_api.php';
  try {
    const promiseArray = screenshots.map(item => {
      return urlToFile(item);
    });
    const files = await Promise.all(promiseArray);
    const firstFile = files.shift();
    const formData = new FormData();
    formData.append('galleryoption', '1');
    formData.append('galleryname', galleryName);
    // @ts-ignore
    formData.append('images_files[]', firstFile);
    const firstResp = await fetch(apiUrl, {
      data: formData,
      method: 'POST',
      responseType: undefined,
    });
    if (firstResp.includes('error')) {
      throw firstResp;
    }

    const reqs = files.map(file => {
      const formData = new FormData();
      formData.append('galleryoption', '2');
      formData.append('galleryname', galleryName);
      formData.append('images_files[]', file);
      return fetch(apiUrl, {
        data: formData,
        method: 'POST',
        responseType: undefined,
      });
    });

    const resp: string[] = await Promise.all(reqs);
    const respStr = resp.join('');
    if (respStr.includes('error')) {
      throw respStr;
    }

    return firstResp + respStr;
  } catch (error) {
    handleError(error);
  }
};
// 获取更加准确的分类
const getPreciseCategory = (torrentInfo: TorrentInfo.Info, category: string) => {
  const { description, title, subtitle, doubanInfo } = torrentInfo;
  const movieGenre = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)?.[2] ?? '';
  if (movieGenre.match(/动画/)) {
    return 'cartoon';
  } else if (movieGenre.match(/纪录/)) {
    return 'documentary';
  } else if (subtitle?.match(/全.+?集/) || title.match(/s0?\d{1,2}[^(e|.e)]/i)) {
    return 'tvPack';
  }
  if (category?.match(/tv/)) {
    if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || subtitle?.match(/第[^\s]集/)) {
      return 'tv';
    }
    return 'tvPack';
  }
  return category;
};
const getUrlParam = (key:string) => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const regArray = location.search.substring(1).match(reg);
  if (regArray) {
    return decodeURIComponent(regArray[2]);
  }
  return '';
};
// 获取音频编码
const getAudioCodecFromTitle = (title:string) => {
  if (!title) {
    return '';
  }
  title = title.replace(/:|-|\s/g, '');
  if (title.match(/atmos/i)) {
    return 'atmos';
  } else if (title.match(/dtshdma/i)) {
    return 'dtshdma';
  } else if (title.match(/dtsx/i)) {
    return 'dtsx';
  } else if (title.match(/dts/i)) {
    return 'dts';
  } else if (title.match(/truehd/i)) {
    return 'truehd';
  } else if (title.match(/lpcm/i)) {
    return 'lpcm';
  } else if (title.match(/flac/i)) {
    return 'flac';
  } else if (title.match(/aac/i)) {
    return 'aac';
  } else if (title.match(/DD\+|DDP|DolbyDigitalPlus/i)) {
    return 'dd+';
  } else if (title.match(/DD|DolbyDigital/i)) {
    return 'dd';
  } else if (title.match(/ac3/i)) {
    return 'ac3';
  }
  return '';
};
const getVideoCodecFromTitle = (title:string, videoType = '') => {
  title = title.replace(/\.|-/g, '');
  if (title.match(/x264/i) || (title.match(/h264|avc/i) && videoType === 'encode')) {
    return 'x264';
  } else if (title.match(/h264|AVC/i)) {
    return 'h264';
  } else if (title.match(/x265/i) || (title.match(/h265|hevc/i) && videoType === 'encode')) {
    return 'x265';
  } else if (title.match(/hevc|h265/i)) {
    return 'hevc';
  } else if (title.match(/vc-?1/i)) {
    return 'vc1';
  } else if (title.match(/mpeg-?2/i)) {
    return 'mpeg2';
  } else if (title.match(/mpeg-?4/i)) {
    return 'mpeg4';
  } else if (title.match(/vvc/i)) {
    return 'vvc';
  }
  return '';
};

const getFilterImages = (bbcode:string): string[] => {
  if (!bbcode) {
    return [];
  }
  let allImages = Array.from(bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g) ?? []);
  if (allImages && allImages.length > 0) {
    allImages = allImages.map(img => {
      if (img.match(/\[url=.+?\]/)) {
        return `${img}[/url]`;
      }
      return img;
    });
    // 过滤imdb、豆瓣、chd、柠檬无关图片
    return allImages.filter(item => {
      return !item.match(/poster\.jpg|2019\/01\/04\/info\.png|MoreScreens|PTer\.png|ms\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
    });
  }
  return [];
};
const getScreenshotsFromBBCode = async (bbcode: string) => {
  const allImages = getFilterImages(bbcode);
  if (allImages && allImages.length > 0) {
    const result = [];
    for (const img of allImages) {
      const originalUrl = await getOriginalImgUrl(img);
      if (originalUrl !== undefined) { result.push(originalUrl); }
    }
    return result;
  }
  return [];
};
/*
* 过滤真实原始截图地址
* 如果原图地址没有文件名后缀，截图地址则为缩略图地址
* */
const getOriginalImgUrl = async (urlBBcode:string) => {
  let imgUrl = urlBBcode;
  if (urlBBcode.match(/\[url=http(s)*:.+/)) {
    imgUrl = urlBBcode.match(/=(([^\]])+)/)?.[1] ?? '';
    if (imgUrl.match(/img\.hdbits\.org/)) {
      const imgId = urlBBcode.match(/\[url=https:\/\/img\.hdbits\.org\/(\w+)?\]/)?.[1] ?? '';
      imgUrl = `https://i.hdbits.org/${imgId}.png`;
    } else if (urlBBcode.match(/img\.pterclub\.com/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/\.th/g, '');
    } else if (urlBBcode.match(/https?:\/\/imgbox\.com/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/thumbs(\d)/, 'images$1').replace(/_t(\.png)/, '_o.png');
    } else if (imgUrl.match(/imagebam\.com/)) {
      const originalPage = await fetch(imgUrl, {
        responseType: undefined,
      });
      const doc = new DOMParser().parseFromString(originalPage, 'text/html');
      imgUrl = $('.main-image', doc).attr('src') as string;
    } else if (imgUrl.match(/beyondhd\.co/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
      imgUrl = imgUrl.replace(/\.(th|md)\.(png|jpg|gif)/, '.$2');
    } else if (!imgUrl.match(/\.(jpg|png|gif|bmp|webp)$/)) {
      imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
    } else if (urlBBcode.match(/https:\/\/pixhost\.to/)) {
      const hostNumber = urlBBcode.match(/img\]https:\/\/t(\d+)\./)?.[1];
      imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, `img${hostNumber}.$1/images`);
    }
  } else if (urlBBcode.match(/\[img\]/)) {
    imgUrl = urlBBcode.match(/img\](([^[])+)/)?.[1] ?? '';
  }
  return imgUrl;
};
// 从标题获取source
const getSourceFromTitle = (title: string) => {
  if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
    return 'uhdbluray';
  } else if (title.match(/blu(-)?ray|remux/i)) {
    return 'bluray';
  } else if (title.match(/hdtv/i)) {
    return 'hdtv';
  } else if (title.match(/web(-?(rip|dl))+/i)) {
    return 'web';
  } else if (title.match(/hddvd/i)) {
    return 'hddvd';
  } else if (title.match(/dvd/i)) {
    return 'dvd';
  } else if (title.match(/vhs/i)) {
    return 'vhs';
  }
  return 'other';
};
// 获取副标题
const getSubTitle = (data: Douban.DoubanData) => {
  const { chineseTitle, thisTitle: originalTitle, transTitle } = data;
  let title = '';
  if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
    title += chineseTitle;
  }
  const moreTitle = originalTitle.concat(transTitle).filter(item => title !== item);
  let seasonEpisode = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)?.[1] ?? '';
  seasonEpisode = seasonEpisode.replace(/^0/i, '');
  const episode = seasonEpisode ? ` 第${seasonEpisode}集` : '';
  const hardcodedSub = TORRENT_INFO.hardcodedSub ? '| 硬字幕' : '';
  return `${title}${moreTitle.length > 0 ? '/' : ''}${moreTitle.join('/')}${episode} ${hardcodedSub}`;
};
/*
* 替换豆瓣演员中的英文名称
* @param {any}
* @return
* */
const replaceEngName = (string:string) => {
  return string.replace(/\s+[A-Za-z\s]+/, '');
};

const getAreaCode = (area:string) => {
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

/*
* 获取蓝光类型
* @param {size}文件大小单位Bytes
* @return
* */
const getBDType = (size: number) => {
  const GBSize = size / 1e9;
  if (GBSize < 5) {
    return 'DVD5';
  } else if (GBSize < 9) {
    return 'DVD9';
  } else if (GBSize < 25) {
    return 'BD25';
  } else if (GBSize < 50) {
    return 'BD50';
  } else if (GBSize < 66) {
    return 'BD66';
  } else if (GBSize < 100) {
    return 'BD100';
  }
};

const getTMDBIdByIMDBId = async (imdbid: string) => {
  try {
    const url = `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`;
    const data = await fetch(url);
    const isMovie = data.movie_results && data.movie_results.length > 0;
    const isTV = data.tv_results && data.tv_results.length > 0;
    if (!isMovie && !isTV) {
      throw $t('请求失败');
    }
    const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
    return tmdbData;
  } catch (error) {
    return {};
  }
};

const getTMDBVideos = async (tmdbId: string) => {
  const url = `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`;
  const data = await fetch(url);
  return data.results || [];
};
const getIMDBIdByUrl = (imdbLink: string) => {
  const imdbIdArray = /tt\d+/.exec(imdbLink);
  if (imdbIdArray && imdbIdArray[0]) {
    return imdbIdArray[0];
  }
  return '';
};

const getSize = (size: string) => {
  if (!size) {
    return 0;
  }
  if (size.match(/T/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/G/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/M/i)) {
    return (parseFloat(size) * 1024 * 1024) || 0;
  } else if (size.match(/K/i)) {
    return (parseFloat(size) * 1024) || 0;
  }
  return 0;
};

const getInfoFromMediaInfo = (mediaInfo:string) => {
  if (!mediaInfo) {
    return {};
  }
  const mediaArray = mediaInfo.split(/\n\s*\n/).filter(item => !!item.trim());
  const [generalPart, videoPart] = mediaArray;
  const secondVideoPart = mediaArray.filter(item => item.startsWith('Video #2'));
  const [audioPart, ...otherAudioPart] = mediaArray.filter(item => item.startsWith('Audio'));
  const textPart = mediaArray.filter(item => item.startsWith('Text'));
  const completeName = getMediaValueByKey('Complete name', generalPart);
  const format = completeName?.match(/\.(\w+)$/i)?.[1]?.toLowerCase() ?? '';
  const fileName = completeName.replace(/\.\w+$/i, '');
  const fileSize = getSize(getMediaValueByKey('File size', generalPart));
  const { videoCodec, hdrFormat, isDV } = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
  const { audioCodec, channelName, languageArray } = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
  const subtitleLanguageArray = textPart.map(item => {
    return getMediaValueByKey('Language', item);
  }).filter(sub => !!sub);
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
  const resolution = getResolution(videoPart);
  return {
    fileName,
    fileSize,
    format,
    subtitles: subtitleLanguageArray,
    videoCodec,
    audioCodec,
    resolution,
    mediaTags,
  };
};
const getMediaValueByKey = (key:string, mediaInfo:string) => {
  if (!mediaInfo) {
    return '';
  }
  const keyRegStr = key.replace(/\s/, '\\s*').replace(/(\(|\))/g, '\\$1');
  const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\\n]+)`, 'i');
  return mediaInfo.match(reg)?.[1] ?? '';
};
const getResolution = (mediaInfo:string) => {
  const height = parseInt(getMediaValueByKey('Height', mediaInfo).replace(/\s/g, ''), 10);
  const width = parseInt(getMediaValueByKey('Width', mediaInfo).replace(/\s/g, ''), 10);
  const ScanType = getMediaValueByKey('Scan type', mediaInfo);
  if (height > 1080) {
    return '2160p';
  } else if (height > 720 && (ScanType === 'Progressive' || !ScanType)) {
    return '1080p';
  } else if (height > 720 && ScanType !== 'Progressive') {
    return '1080i';
  } else if (height > 576 || width > 1024) {
    return '720p';
  } else if (height > 480 || width === 1024) {
    return '576p';
  } else if (width >= 840 || height === 480) {
    return '480p';
  } else if (width && height) {
    return `${width}x${height}`;
  }
  return '';
};
const getMediaTags = (
  audioCodec:string,
  channelName:string,
  languageArray:string[],
  subtitleLanguageArray:string[],
  hdrFormat:string, isDV:boolean): TorrentInfo.MediaTags => {
  const hasChineseAudio = languageArray.includes('Chinese');
  const hasChineseSubtitle = subtitleLanguageArray.includes('Chinese');
  const mediaTags: TorrentInfo.MediaTags = {};
  if (hasChineseAudio) {
    mediaTags.chinese_audio = true;
  }
  if (languageArray.includes('Cantonese')) {
    mediaTags.cantonese_audio = true;
  }
  if (hasChineseSubtitle) {
    mediaTags.chinese_subtitle = true;
  }
  if (hdrFormat) {
    if (hdrFormat.match(/HDR10\+/i)) {
      mediaTags.hdr10_plus = true;
    } else if (hdrFormat.match(/HDR/i)) {
      mediaTags.hdr = true;
    }
  }
  if (isDV) {
    mediaTags.dolby_vision = true;
  }
  if (audioCodec.match(/dtsx|atmos/ig)) {
    mediaTags.dts_x = true;
  } else if (audioCodec.match(/atmos/ig)) {
    mediaTags.dolby_atmos = true;
  }
  return mediaTags;
};
const getVideoCodecByMediaInfo = (mainVideo:string, generalPart:string, secondVideo:string[]) => {
  const generalFormat = getMediaValueByKey('Format', generalPart);
  const videoFormat = getMediaValueByKey('Format', mainVideo);
  const videoFormatVersion = getMediaValueByKey('Format version', mainVideo);
  const videoCodeId = getMediaValueByKey('Codec ID', mainVideo);
  const hdrFormat = getMediaValueByKey('HDR format', mainVideo);
  const isDV = hdrFormat.match(/Dolby\s*Vision/i) ||
   (secondVideo.length > 0 && getMediaValueByKey('HDR format', secondVideo[0]).match(/Dolby\s*Vision/i));
  const isEncoded = !!getMediaValueByKey('Encoding settings', mainVideo);
  let videoCodec = '';
  if (generalFormat === 'DVD Video') {
    videoCodec = 'mpeg2';
  } else if (generalFormat === 'MPEG-4') {
    videoCodec = 'mpeg4';
  } else if (videoFormat === 'MPEG Video' && videoFormatVersion === 'Version 2') {
    videoCodec = 'mpeg2';
  } else if (videoCodeId.match(/xvid/i)) {
    videoCodec = 'xvid';
  } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
    videoCodec = 'hevc';
  } else if (videoFormat.match(/HEVC/i) && isEncoded) {
    videoCodec = 'x265';
  } else if (videoFormat.match(/AVC/i) && isEncoded) {
    videoCodec = 'x264';
  } else if (videoFormat.match(/AVC/i) && !isEncoded) {
    videoCodec = 'h264';
  } else if (videoFormat.match(/VC-1/i)) {
    videoCodec = 'vc1';
  } else if (videoFormat.match(/vvc/i)) {
    videoCodec = 'vvc';
  }
  return {
    videoCodec,
    hdrFormat,
    isDV: !!isDV,
  };
};
const getAudioCodecByMediaInfo = (mainAudio:string, otherAudio:string[]) => {
  const audioFormat = getMediaValueByKey('Format', mainAudio);
  const audioChannels = getMediaValueByKey('Channel(s)', mainAudio);
  const commercialName = getMediaValueByKey('Commercial name', mainAudio);
  const formateProfile = getMediaValueByKey('Format profile', mainAudio);
  const languageArray = [mainAudio, ...otherAudio].map(item => {
    return getMediaValueByKey('Language', item);
  });
  let channelName = '';
  let audioCodec = '';
  const channelNumber = parseInt(audioChannels, 10);
  if (channelNumber && channelNumber >= 6) {
    channelName = `${channelNumber - 1}.1`;
  } else {
    channelName = `${channelNumber}.0`;
  }
  if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'atmos';
  } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
    audioCodec = 'truehd';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
    audioCodec = 'dd+';
  } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital/i)) {
    audioCodec = 'dd';
  } else if (audioFormat.match(/AC-3/i)) {
    audioCodec = 'ac3';
  } else if (audioFormat.match(/DTS XLL X/i)) {
    audioCodec = 'dtsx';
  } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
    audioCodec = 'dtshdma';
  } else if (audioFormat.match(/DTS/i) && formateProfile.match(/MA \/ Core/i)) {
    audioCodec = 'dtshdma';
  } else if (audioFormat.match(/DTS/i)) {
    audioCodec = 'dts';
  } else if (audioFormat.match(/FLAC/i)) {
    audioCodec = 'flac';
  } else if (audioFormat.match(/AAC/i)) {
    audioCodec = 'aac';
  } else if (audioFormat.match(/LPCM/i)) {
    audioCodec = 'lpcm';
  }
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
const getInfoFromBDInfo = (bdInfo:string) => {
  if (!bdInfo) {
    return {};
  }
  const splitArray = bdInfo.split('Disc Title');
  // 如果有多个bdinfo只取第一个
  if (splitArray.length > 2) {
    bdInfo = splitArray[1];
  }
  const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)*)AUDIO:/i);
  const hasFileInfo = bdInfo.match(/FILES:/i);
  const subtitleReg = new RegExp(`SUBTITLE(S)*:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${hasFileInfo ? 'FILES:' : ''}`, 'i');
  const subtitleMatch = bdInfo.match(subtitleReg);
  const audioReg = new RegExp(`AUDIO:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${subtitleMatch ? '(SUBTITLE(S)?)' : hasFileInfo ? 'FILES:' : ''}`, 'i');
  const audioMatch = bdInfo.match(audioReg);
  const fileSize = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)?.[1]?.replace(/,/g, '');
  const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i); // 是否为bdinfo的另一种格式quickSummary
  const videoPart = splitBDMediaInfo(videoMatch, 2);
  const [mainVideo = '', otherVideo = ''] = videoPart;
  const videoCodec = mainVideo.match(/2160/) ? 'hevc' : 'h264';
  const hdrFormat = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)?.[0] ?? '';
  const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
  const audioPart = splitBDMediaInfo(audioMatch, 2);
  const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
  const resolution = mainVideo.match(/\d{3,4}(p|i)/)?.[0];
  const { audioCodec = '', channelName = '', languageArray = [] } = getBDAudioInfo(audioPart, quickSummaryStyle);
  const subtitleLanguageArray = subtitlePart.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1] ?? '';
    const normalMatch = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)?.[1] ?? '';
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  }).filter(sub => !!sub);
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
  return {
    fileSize,
    videoCodec,
    subtitles: subtitleLanguageArray,
    audioCodec,
    resolution,
    mediaTags,
    format: 'm2ts',
  };
};
const splitBDMediaInfo = (matchArray:string[]|null, matchIndex:number) => {
  return matchArray?.[matchIndex]?.split('\n').filter(item => !!item) ?? [];
};
const getBDAudioInfo = (audioPart:string[], quickSummaryStyle:boolean) => {
  if (audioPart.length < 1) {
    return {};
  }
  const sortArray = audioPart.sort((a, b) => {
    const firstBitrate = parseInt(a.match(/\/\s*(\d+)\s*kbps/i)?.[1] ?? '', 10);
    const lastBitrate = parseInt(b.match(/\/\s*(\d+)\s*kbps/i)?.[1] ?? '', 10);
    return lastBitrate - firstBitrate;
  });
  const [mainAudio, secondAudio] = sortArray;
  const mainAudioCodec = getAudioCodecFromTitle(mainAudio);
  const secondAudioCodec = getAudioCodecFromTitle(secondAudio);
  let audioCodec = mainAudioCodec;
  let channelName = mainAudio.match(/\d\.\d/)?.[0];
  if (mainAudioCodec === 'lpcm' && secondAudioCodec === 'dtshdma') {
    audioCodec = secondAudioCodec;
    channelName = mainAudio.match(/\d\.\d/)?.[0];
  }
  const languageArray = sortArray.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1] ?? '';
    const normalMatch = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)?.[1] ?? '';
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
interface TagParam {
  pre: (string|null)[]
  post: (string|null|undefined)[]
}
const wrappingBBCodeTag = ({ pre, post }:TagParam, preTag:string|null, poTag?:string|null) => {
  const isPre = typeof pre !== 'undefined' && pre !== null;
  const isPost = typeof post !== 'undefined' && post !== null;
  if (isPre) {
    pre.unshift(preTag);
  }
  if (isPost) {
    post.push(poTag);
  }
};
// 过滤掉一些声明或者无意义文字
const getFilterBBCode = (content:Element) => {
  if (content) {
    const bbCodes = htmlToBBCode(content);
    return bbCodes?.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, (match, p1) => {
      if ((p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/))) {
        return '';
      }
      return match;
    }) ?? '';
  }
  return '';
};
const rgb2hex = (rgb:string) => {
  const result = rgb?.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i) ?? [];
  return (result.length === 4)
    ? `#${
      (`0${parseInt(result[1], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(result[2], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(result[3], 10).toString(16)}`).slice(-2)}`
    : '';
};

const ensureProperColor = (color:string) => {
  if (/rgba?/.test(color)) return rgb2hex(color);
  return color;
};
// html转BBCode代码
const htmlToBBCode = (node:Element) => {
  const bbCodes :string[] = [];
  const pre:string[] = [];
  const post:string[] = [];
  const pp = wrappingBBCodeTag.bind(null, { pre, post });

  switch (node.nodeType) {
    case 1: { // tag
      switch (node.tagName.toUpperCase()) {
        case 'SCRIPT': { return ''; }
        case 'UL': { pp(null, null); break; }
        case 'OL': { pp('[list=1]', '[/list]'); break; }
        case 'LI': {
          const { className } = node;
          if (CURRENT_SITE_INFO.siteType === 'UNIT3D' && className) {
            return `[quote]${node?.textContent?.trim()}[/quote]`;
          }
          pp('[*]', '\n'); break;
        }
        case 'B': { pp('[b]', '[/b]'); break; }
        case 'U': { pp('[u]', '[/u]'); break; }
        case 'I': { pp('[i]', '[/i]'); break; }
        case 'DIV': {
          const { className, id } = node;
          if (className === 'codemain') {
            // 兼容朋友
            if (node.children[0] && node.children[0].tagName === 'PRE') {
              pp('');
              break;
            } else {
              return '';
            }
          } else if (className === 'hidden' && CURRENT_SITE_NAME === 'HDT') {
            pp('\n[quote]', '[/quote]'); break;
          } else if (className.match('spoiler') && CURRENT_SITE_NAME === 'KG') {
            if (className === 'spoiler-content') {
              pp('\n[quote]', '[/quote]');
            } else if (className === 'spoiler-header') {
              return '';
            }
            break;
          } else if (CURRENT_SITE_NAME === 'BeyondHD') {
            if (className === 'spoilerChild') {
              if (node.children[0].tagName.toUpperCase() === 'BLOCKQUOTE' || node.children[0].tagName.toUpperCase() === 'PRE')pp('\n', '');
              else pp('\n[quote]', '[/quote]');
            } else if (id === 'screenMain') {
              return '\n';
            } else if (className === 'spoilerHide') {
              return '';
            }
            break;
          } else if (className === 'spoiler-text' && CURRENT_SITE_INFO.siteType === 'AvistaZ') {
            pp('\n[quote]', '[/quote]'); break;
          } else if (className === 'spoiler-toggle' && CURRENT_SITE_INFO.siteType === 'AvistaZ') {
            return '';
          } else if (className.match(/codetop|highlight/) && CURRENT_SITE_INFO.siteType === 'Bdc') {
            return '';
          } else {
            pp('\n', '\n'); break;
          }
        }
        case 'P': { pp('\n'); break; }
        case 'BR': {
          if ((CURRENT_SITE_INFO.siteType === 'NexusPHP' && CURRENT_SITE_NAME !== 'OurBits') ||
            CURRENT_SITE_NAME?.match(/^(UHDBits|HDBits|BTN)/)) {
            pp('');
          } else {
            pp('\n');
          }
          break;
        }
        case 'SPAN': { pp(null, null); break; }
        case 'BLOCKQUOTE':
        case 'PRE':
        case 'FIELDSET': {
          pp('[quote]', '[/quote]'); break;
        }
        case 'CENTER': {
          pp('[center]', '[/center]'); break;
        }
        case 'TD': {
          if (CURRENT_SITE_NAME?.match(/^(TTG|HDBits|KG|HDSpace)/) || CURRENT_SITE_NAME === 'HDT' ||
            CURRENT_SITE_INFO.siteType === 'UNIT3D') {
            pp('[quote]', '[/quote]'); break;
          } else if (CURRENT_SITE_NAME.match(/EMP|Bdc/)) {
            pp(''); break;
          } else {
            return '';
          }
        }
        case 'IMG': {
          let imgUrl = '';
          const { src, title } = node as HTMLImageElement;
          const dataSrc = node.getAttribute('data-src') || node.getAttribute('data-echo');
          const layerSrc = node.getAttribute('layer-src');// HaresClub
          // blu等unit3d站点会把:m:转成icon图片
          if (title === ':m:') {
            return ':m:';
          }
          if (layerSrc) {
            imgUrl = layerSrc;
          } else if (dataSrc) {
            imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : `${location.origin}/${dataSrc}`;
          } else if (src && src.match(/broadcity\.eu\/images\/44846549843542759058\.png/)) {
            return '';
          } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
            imgUrl = src;
          } else {
            return '';
          }
          return `[img]${imgUrl}[/img]`;
        }
        case 'FONT': {
          const { color, size } = node as HTMLFontElement;
          if (color) {
            pp(`[color=${ensureProperColor(color)}]`, '[/color]');
          }
          if (size) {
            pp(`[size=${size}]`, '[/size]');
          }
          break;
        }
        case 'A': {
          const { href, textContent } = node as HTMLLinkElement;
          if (href && href.length > 0) {
            if (CURRENT_SITE_NAME === 'HDSpace') {
              const div = $(node).find('div');
              if (div[0] && div.attr('id')) {
                const imgUrl = div.find('img').attr('src');
                return `[url=${href}][img]${imgUrl}[/img][/url]`;
              }
            } else if (href.match(/javascript:void/) || (textContent === 'show' && CURRENT_SITE_NAME === 'HDT')) {
              return '';
            } else {
              pp(`[url=${href}]`, '[/url]');
            }
          }
          break;
        }
        case 'H1': { pp('[b][size="7"]', '[/size][/b]\n'); break; }
        case 'H2': { pp('[b][size="6"]', '[/size][/b]\n'); break; }
        case 'H3': { pp('[b][size="5"]', '[/size][/b]\n'); break; }
        case 'H4': { pp('[b][size="4"]', '[/size][/b]\n'); break; }
      }
      const { textAlign, fontWeight, fontStyle, textDecoration, color } = (node as HTMLElement).style;
      if (textAlign) {
        switch (textAlign.toUpperCase()) {
          case 'LEFT': { pp('[left]', '[/left]'); break; }
          case 'RIGHT': { pp('[right]', '[/right]'); break; }
          case 'CENTER': { pp('[center]', '[/center]'); break; }
        }
      }
      if (fontWeight === 'bold' || ~~fontWeight >= 600) {
        pp('[b]', '[/b]');
      }
      if (fontStyle === 'italic') pp('[i]', '[/i]');
      if (textDecoration === 'underline') pp('[u]', '[/u]');
      if (color && color.trim() !== '') pp(`[color=${ensureProperColor(color)}]`, '[/color]');
      break;
    }
    case 3: {
      if (node?.textContent?.trim()?.match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/)) {
        return '';
      }

      return node.textContent;
    } // textNode
    default: return null;
  }
  node.childNodes.forEach((node) => {
    const code = htmlToBBCode(node as Element);
    if (code) {
      bbCodes.push(code);
    }
  });
  return pre.concat(bbCodes).concat(post).join('');
};
const getTagsFromSubtitle = (title:string) => {
  const tags: TorrentInfo.MediaTags = {};
  if (title.match(/diy/i)) {
    tags.diy = true;
  }
  if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语言/)) {
    tags.chinese_audio = true;
  }
  if (title.match(/Atmos|杜比全景声/i)) {
    tags.dolby_atoms = true;
  }
  if (title.match(/HDR/i)) {
    if (title.match(/HDR10\+/i)) {
      tags.hdr10_plus = true;
    } else {
      tags.hdr = true;
    }
  }
  if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
    tags.dolby_vision = true;
  }
  if (title.match(/粤/i)) {
    tags.cantonese_audio = true;
  }
  if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i) && !title.match(/无中(字|文)/)) {
    tags.chinese_subtitle = true;
  }
  if (title.match(/Criterion|CC标准/i)) {
    tags.the_criterion_collection = true;
  }
  if (title.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|禁止转载|exclusive/)) {
    tags.exclusive = true;
  }
  return tags;
};
const getBDInfoOrMediaInfo = (bbcode:string) => {
  const quoteList = bbcode?.match(/\[quote\](.|\n)+?\[\/quote\]/g) ?? [];
  let bdinfo = ''; let mediaInfo = '';
  quoteList.forEach(quote => {
    const quoteContent = quote.replace(/\[\/?quote\]/g, '').replace(/\u200D/g, '');
    if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
      bdinfo += quoteContent;
    }
    if (quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)) {
      mediaInfo += quoteContent;
    }
  });
  if (!bdinfo) {
    bdinfo = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)?.[0] ?? '';
  }
  if (bdinfo) {
    bdinfo = bdinfo.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, '');
  }
  if (mediaInfo) {
    mediaInfo = mediaInfo.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, '');
  }
  return {
    bdinfo,
    mediaInfo,
  };
};
const replaceRegSymbols = (string:string) => {
  return string.replace(/([*.?+$^[\](){}|\\/])/g, '\\$1');
};
// https://greasyfork.org/zh-CN/scripts/389810-rottentomatoes-utility-library-custom-api
const getRtIdFromTitle = async (title:string, tv:boolean, year:string) => {
  console.log('%s', title, year);
  const MAX_YEAR_DIFF = 2;
  tv = tv || false;
  const yearVal = parseInt(year, 10) || 1800;
  const url = `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`;
  const data = await fetch(url);
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

const uploadToPtpImg = async (imgArray: Array<string | File>, isFiles: boolean = false) => {
  try {
    const apiKey = getValue('easy-seed.ptp-img-api-key', false);
    if (!apiKey) {
      Notification.open({
        message: $t('ptpimg上传失败'),
        description: $t('请到配置面板中填入ptpimg的api_key'),
      });
      return;
    }

    const options: RequestOptions = {
      method: 'POST',
      responseType: 'json',
    };
    if (isFiles) {
      const formData = new FormData();
      imgArray.forEach((img, index) => {
        formData.append(`file-upload[${index}]`, img);
      });
      formData.append('api_key', apiKey);
      options.data = formData;
    } else {
      const data = `link-upload=${imgArray.join('\n')}&api_key=${apiKey}`;
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      };
      options.data = data;
    }
    interface PTPImg{
      code:string
      ext:string
    }
    const data:PTPImg[] = await fetch('https://ptpimg.me/upload.php', options);
    if (!data) {
      throw $t('上传失败，请重试');
    }
    let imgResultList = [];
    if (data && data.length) {
      imgResultList = data.map(img => {
        return `https://ptpimg.me/${img.code}.${img.ext}`;
      });
      return imgResultList;
    }
    throw $t('上传失败，请重试');
  } catch (error) {
    handleError(error);
  }
};

const $t = (key:string) => {
  const languageKey = USE_CHINESE ? 'zh_CN' : 'en_US';
  return i18nConfig[languageKey][key as keyof typeof i18nConfig.zh_CN] || key;
};

const urlToFile = async (url: string): Promise<File> => {
  const filename = url.match(/\/([^/]+)$/)?.[1] ?? 'filename';
  const data: Blob = await fetch(url, {
    responseType: 'blob',
  });
  const file = new File([data], filename, { type: data.type });
  return file;
};
const saveScreenshotsToPtpimg = async (imgArray: Array<string>) => {
  try {
    const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
    const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
    if (isPtpHost) {
      throw $t('无需转存');
    } else if (isHdbHost) {
      const promiseArray = imgArray.map(item => {
        return urlToFile(item);
      });
      const fileArray = await Promise.all(promiseArray);
      const data = uploadToPtpImg(fileArray, true);
      return data;
    } else {
      const data = await uploadToPtpImg(imgArray);
      return data;
    }
  } catch (error) {
    handleError(error);
  }
};
const getValue = (key: string, needParse = true) => {
  const data = <string>GM_getValue(key);
  if (data && needParse) {
    return JSON.parse(data);
  }
  return data;
};
const fetch = (url: string, options?: RequestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      responseType: 'json',
      ...options,
      onload: (res) => {
        const { statusText, status, response } = res;
        if (status !== 200) {
          reject(new Error(statusText || `${status}`));
        } else {
          resolve(response);
        }
      },
      ontimeout: () => {
        reject(new Error('timeout'));
      },
      onerror: (error) => {
        reject(error);
      },

    });
  });
};

const getTvSeasonData = async (data:Douban.Season) => {
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

export {
  getUrlParam,
  formatTorrentTitle,
  getAudioCodecFromTitle,
  replaceEngName,
  getSubTitle,
  getAreaCode,
  getBDType,
  getTMDBIdByIMDBId,
  getIMDBIdByUrl,
  getSize,
  getInfoFromMediaInfo,
  getInfoFromBDInfo,
  getSourceFromTitle,
  htmlToBBCode,
  getFilterBBCode,
  getBDInfoOrMediaInfo,
  getScreenshotsFromBBCode,
  getTagsFromSubtitle,
  getVideoCodecFromTitle,
  transferImgs,
  getDoubanInfo,
  getDoubanIdByIMDB,
  getPreciseCategory,
  getMobileDoubanInfo,
  replaceRegSymbols,
  getIMDBData,
  getTMDBVideos,
  getRtIdFromTitle,
  getFilterImages,
  uploadToPtpImg,
  $t,
  urlToFile,
  getOriginalImgUrl,
  saveScreenshotsToPtpimg,
  fetch,
  uploadToPixhost,
  getValue,
  getTvSeasonData,
  getDoubanBookInfo,
  uploadToImgbox,
  uploadToHDB,
};
