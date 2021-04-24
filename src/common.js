/* eslint-disable no-irregular-whitespace */
/* eslint-disable camelcase */
import { CURRENT_SITE_NAME, EUROPE_LIST, TMDB_API_KEY, TMDB_API_URL, PT_GEN_API, DOUBAN_SEARCH_API, DOUBAN_SUGGEST_API, CURRENT_SITE_INFO } from './const';
const formatTorrentTitle = (title) => {
  // 保留5.1 H.264中间的点
  return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, ' ').replace(/\.(?!(\d+))/, ' ').trim();
};
const getDoubanInfo = (doubanUrl) => {
  return new Promise((resolve, reject) => {
    try {
      if (doubanUrl) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: `${PT_GEN_API}?url=${doubanUrl}`,
          onload (res) {
            const data = JSON.parse(res.responseText);
            if (data && data.success) {
              resolve(data);
            } else {
              if (doubanUrl.match(/\/book/)) {
                reject(new Error(data.error));
              } else {
                getAnotherDoubanInfo(doubanUrl).then(res => {
                  resolve(res);
                }).catch(error => {
                  reject(new Error(error.message));
                });
              }
            }
          },
        });
      } else {
        reject(new Error('豆瓣链接获取失败'));
      }
    } catch (error) {
      console.log(error);
      reject(new Error(error.message));
    }
  });
};
const getAnotherDoubanInfo = (doubanUrl) => {
  return new Promise((resolve, reject) => {
    try {
      if (doubanUrl) {
        const doubanId = doubanUrl.match(/subject\/(\d+)/)?.[1] ?? '';
        if (!doubanId) {
          reject(new Error('豆瓣ID获取失败'));
        }
        GM_xmlhttpRequest({
          method: 'GET',
          url: `https://movie.querydata.org/api?id=${doubanId}`,
          onload (res) {
            const data = JSON.parse(res.responseText);
            if (data && data.id) {
              resolve(formatDoubanInfo(data));
            } else {
              reject(new Error(data.message || '获取豆瓣信息失败'));
            }
          },
        });
      } else {
        reject(new Error('豆瓣链接获取失败'));
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
const formatDoubanInfo = (data) => {
  const { doubanId, imdbId, imdbRating, imdbVotes, dateReleased, alias, originalName, doubanRating, episodes, doubanVotes, year, duration, director, data: info, actor, writer } = data;
  const [chineseInfo, englishInfo] = info;
  const chineseTitle = chineseInfo.name;
  const foreignTitle = englishInfo.name;
  const directorArray = director.map(item => {
    return {
      name: `${item.data[0].name} ${item.data[1].name}`,
    };
  });
  const actorArray = actor.map(item => {
    return {
      name: `${item.data[0].name} ${item.data[1].name}`,
    };
  });
  const writerArray = writer.map(item => {
    return {
      name: `${item.data[0].name} ${item.data[1].name}`,
    };
  });
  let transTitle = alias.split('/');
  if (chineseTitle !== originalName && !alias.includes(chineseTitle)) {
    transTitle = [chineseTitle].concat(transTitle);
  }
  const formatData = {
    imdb_link: `https://www.imdb.com/title/${imdbId}`,
    imdb_id: imdbId,
    imdb_rating_average: imdbRating,
    imdb_votes: imdbVotes,
    imdb_rating: `${imdbRating}/10 from ${imdbVotes} users`,
    chinese_title: chineseTitle,
    foreign_title: foreignTitle,
    aka: alias.split('/'),
    trans_title: transTitle,
    this_title: [originalName],
    year,
    playdate: dateReleased.match(/\d+-\d+-\d+/)[0],
    region: info[0].country,
    genre: chineseInfo.genre,
    language: chineseInfo.language,
    episodes,
    duration: `${duration / 60}分钟`,
    introduction: chineseInfo.description,
    douban_link: `https://movie.douban.com/subject/${doubanId}`,
    douban_rating_average: doubanRating || 0,
    douban_votes: doubanVotes,
    douban_rating: `${doubanRating}/10 from ${doubanVotes} users`,
    poster: chineseInfo.poster,
    director: directorArray,
    cast: actorArray,
    writer: writerArray,
  };

  const { poster, this_title, trans_title, genre, year: movieYear, region, language, playdate, imdb_rating, imdb_link, douban_rating, douban_link, episodes: showEpisodes, duration: movieDuration, director: directors, writer: writers, cast: actors, introduction } = formatData;
  let descr = poster ? `[img]${poster}[/img]\n\n` : '';
  descr += trans_title ? `◎译　　名　${trans_title.join('/')}\n` : '';
  descr += this_title ? `◎片　　名　${this_title}\n` : '';
  descr += movieYear ? `◎年　　代　${movieYear.trim()}\n` : '';
  descr += region ? `◎产　　地　${region}\n` : '';
  descr += genre ? `◎类　　别　${genre}\n` : '';
  descr += language ? `◎语　　言　${language}\n` : '';
  descr += playdate ? `◎上映日期　${playdate}\n` : '';
  descr += imdb_rating ? `◎IMDb评分  ${imdb_rating}\n` : '';
  descr += imdb_link ? `◎IMDb链接  ${imdb_link}\n` : '';
  descr += douban_rating ? `◎豆瓣评分　${douban_rating}\n` : '';
  descr += douban_link ? `◎豆瓣链接　${douban_link}\n` : '';
  descr += showEpisodes ? `◎集　　数　${showEpisodes}\n` : '';
  descr += movieDuration ? `◎片　　长　${movieDuration}\n` : '';
  descr += directors && directors.length > 0 ? `◎导　　演　${directors.map(x => x.name).join(' / ')}\n` : '';
  descr += writers && writers.length > 0 ? `◎编　　剧　${writers.map(x => x.name).join(' / ')}\n` : '';
  descr += actors && actors.length > 0 ? `◎主　　演　${actors.map(x => x.name).join('\n' + '　'.repeat(4) + '  　').trim()}\n` : '';
  descr += introduction ? `\n◎简　　介\n\n　　${introduction.replace(/\n/g, '\n' + '　'.repeat(2))}\n` : '';

  formatData.format = descr.trim();
  return formatData;
};
const getDoubanLinkByIMDB = (imdbUrl, movieName) => {
  return new Promise((resolve, reject) => {
    try {
      if (!imdbUrl) {
        throw new Error('缺少IMDB信息');
      }
      const doubanUrl = ' https://movie.douban.com/subject/';
      const imdbId = getIMDBIdByUrl(imdbUrl);
      if (imdbId) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: `${DOUBAN_SEARCH_API}/${imdbId}`,
          onload (res) {
            const data = JSON.parse(res.responseText);
            if (data && data.data) {
              resolve(doubanUrl + data.data.id);
            } else {
              getDoubanLinkBySuggest(imdbId).then(res => {
                resolve(doubanUrl + res);
              }).catch(error => {
                reject(new Error(error.message || '获取失败'));
              });
            }
          },
        });
      }
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
const getDoubanLinkBySuggest = (imdbId) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${DOUBAN_SUGGEST_API}?q=${imdbId}`,
      onload (res) {
        const data = JSON.parse(res.responseText);
        if (data.length > 0) {
          const doubanId = data[0].id;
          resolve(doubanId);
        } else {
          reject(new Error('豆瓣id获取失败'));
        }
      },
    });
  });
};
const getIMDBData = (imdbUrl) => {
  return new Promise((resolve, reject) => {
    try {
      if (!imdbUrl) {
        throw new Error('缺少IMDB信息');
      }
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${PT_GEN_API}?url=${imdbUrl}`,
        onload (res) {
          const data = JSON.parse(res.responseText);
          if (data && data.success) {
            resolve(data);
          } else {
            reject(data.error || '请求失败');
          }
        },
        onerror (res) {
          console.log(res);
        },
      });
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};
const transferImgs = (screenshots) => {
  return new Promise((resolve, reject) => {
    const params = encodeURI(`imgs=${screenshots}&content_type=1&max_th_size=300`);
    try {
      GM_xmlhttpRequest({
        url: 'https://pixhost.to/remote/',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        data: params,
        onload (res) {
          const data = res.responseText.match(/(upload_results = )({.*})(;)/);
          if (!data) {
            reject(new Error('上传失败，请重试'));
          }
          let imgResultList = [];
          if (data && data.length) {
            imgResultList = JSON.parse(data[2]).images;
            if (imgResultList.length < 1) {
              throw new Error(new Error('上传失败，请重试'));
            }
            resolve(imgResultList);
          } else {
            throw new Error('上传失败，请重试');
          }
        },
      });
    } catch (error) {
      reject(error.message);
    }
  });
};
// 获取更加准确的分类
const getPreciseCategory = (torrentInfo, category) => {
  const { description, title, subtitle, doubanInfo } = torrentInfo;
  const movieGenre = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)?.[2] ?? '';
  if (category === 'movie') {
    if (movieGenre.match(/动画/)) {
      category = 'cartoon';
    } else if (movieGenre.match(/纪录/)) {
      category = 'documentary';
    }
  } else if (category?.match(/tv/)) {
    if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || subtitle.match(/第[^\s]集/)) {
      category = 'tv';
    } else {
      category = 'tvPack';
    }
  }
  return category;
};
const getUrlParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  const regArray = location.search.substr(1).match(reg);
  if (regArray) {
    return unescape(regArray[2]);
  }
  return '';
};
// 获取音频编码
const getAudioCodecFromTitle = (title) => {
  if (!title) {
    return '';
  }
  title = title.replace(/:|-|\s/g, '');
  if (title.match(/atoms/i)) {
    return 'atoms';
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
const getVideoCodecFromTitle = (title, videoType = '') => {
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
  }
  return '';
};

const getFilterImages = (bbcode) => {
  if (!bbcode) {
    return [];
  }
  let allImages = bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
  if (allImages && allImages.length > 0) {
    allImages = allImages.map(img => {
      if (img.match(/\[url=.+?\]/)) {
        return img + '[/url]';
      }
      return img;
    });
    // 过滤imdb、豆瓣、chd、柠檬无关图片
    return allImages.filter(item => {
      return !item.match(/MoreScreens|PTer\.png|CS\.png|GDJT|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
    });
  }
  return [];
};
/*
* 过滤真实原始截图地址
* 如果原图地址没有文件名后缀，截图地址则为缩略图地址
* */
const getScreenshotsFromBBCode = (bbcode) => {
  const allImages = getFilterImages(bbcode);
  if (allImages && allImages.length > 0) {
    return allImages.map(item => {
      let imgUrl = '';
      if (item.match(/\[url=http(s)*:.+/)) {
        imgUrl = item.match(/=(([^\]])+)/)?.[1];
        if (!imgUrl.match(/\.(jpg|png|gif|bmp)$/)) {
          imgUrl = item.match(/img\](([^[])+)/)?.[1];
        } else if (item.match(/https:\/\/pixhost\.to/)) {
          imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, 'img53.$1/images');
        }
      } else {
        imgUrl = item.match(/img\](([^[])+)/)?.[1];
      }
      return imgUrl;
    });
  }
  return '';
};
// 从标题获取source
const getSourceFromTitle = (title) => {
  if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
    return 'uhdbluray';
  } else if (title.match(/blu(-)?ray|remux/i)) {
    return 'bluray';
  } else if (title.match(/hdtv/i)) {
    return 'hdtv';
  } else if (title.match(/web(-(rip|dl))+/i)) {
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
const getSubTitle = (data) => {
  const { chinese_title: chineseTitle, this_title: originalTitle, trans_title: transTitle } = data;
  let title = '';
  if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
    title += chineseTitle;
  }
  const moreTitle = originalTitle.concat(transTitle).filter(item => title !== item);
  return `${title}${moreTitle.length > 0 ? '/' : ''}${moreTitle.join('/')}`;
};
/*
* 替换豆瓣演员中的英文名称
* @param {any}
* @return
* */
const replaceEngName = (string) => {
  return string.replace(/\s+[A-Za-z\s]+/, '');
};

const getAreaCode = (area) => {
  const europeList = EUROPE_LIST;
  if (area) {
    if (area.match(/USA|US|Canada|CA|美国|加拿大/i)) {
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
const getBDType = (size) => {
  const GBSize = size / 1e9;
  if (GBSize < 25) {
    return 'BD25';
  } else if (GBSize < 50) {
    return 'BD50';
  } else if (GBSize < 66) {
    return 'BD66';
  } else if (GBSize < 100) {
    return 'BD100';
  }
};

const getTMDBIdByIMDBId = (imdbid) => {
  try {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`,
        onload (res) {
          const data = JSON.parse(res.responseText);
          const isMovie = data.movie_results && data.movie_results.length > 0;
          const isTV = !data.tv_results && data.tv_results.length > 0;
          if (res.status !== 200 && (!isMovie && !isTV)) {
            reject(new Error('请求失败'));
          }
          const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
          resolve(tmdbData);
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getTMDBVideos = (tmdbId) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`,
      onload (res) {
        const data = JSON.parse(res.responseText);
        resolve(data.results || []);
      },
    });
  });
};
const getIMDBIdByUrl = (imdbLink) => {
  const imdbIdArray = /tt\d+/.exec(imdbLink);
  if (imdbIdArray && imdbIdArray[0]) {
    return imdbIdArray[0];
  }
  return '';
};

const getSize = (size) => {
  if (!size) {
    return '';
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
  return '';
};

const getInfoFromMediaInfo = (mediaInfo) => {
  if (!mediaInfo) {
    return false;
  }
  const mediaArray = mediaInfo.split(/\n\s*\n/);
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
  });
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
const getMediaValueByKey = (key, mediaInfo) => {
  if (!mediaInfo) {
    return '';
  }
  const keyRegStr = key.replace(/\s/, '\\s*').replace(/(\(|\))/g, '\\$1');
  const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\n]+)`, 'i');
  return mediaInfo.match(reg) ? mediaInfo.match(reg)[1] : '';
};
const getResolution = (mediaInfo) => {
  const height = parseInt(getMediaValueByKey('Height', mediaInfo).replace(/\s/g, ''));
  const width = parseInt(getMediaValueByKey('Width', mediaInfo).replace(/\s/g, ''));
  const ScanType = getMediaValueByKey('Scan type', mediaInfo);
  if (height > 1080) {
    return '2160p';
  } else if (height > 720 && ScanType === 'Progressive') {
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
  } else {
    return '';
  }
};
const getMediaTags = (audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV) => {
  const hasChineseAudio = languageArray.includes('Chinese');
  const hasChineseSubtitle = subtitleLanguageArray.includes('Chinese');
  const mediaTags = {};
  if (hasChineseAudio) {
    mediaTags.chineseAudio = true;
  }
  if (languageArray.includes('Cantonese')) {
    mediaTags.cantoneseAudio = true;
  }
  if (hasChineseSubtitle) {
    mediaTags.chineseSubtitle = true;
  }
  if (hdrFormat) {
    if (hdrFormat.match(/HDR10\+/i)) {
      mediaTags['HDR10+'] = true;
    } else if (hdrFormat.match(/HDR/i)) {
      mediaTags.HDR = true;
    }
  }
  if (isDV) {
    mediaTags.DolbyVision = true;
  }
  if (audioCodec.match(/dtsx|atmos/ig)) {
    mediaTags[audioCodec] = true;
  }
  return mediaTags;
};
const getVideoCodecByMediaInfo = (mainVideo, generalPart, secondVideo) => {
  const generalFormat = getMediaValueByKey('Format', generalPart);
  const videoFormat = getMediaValueByKey('Format', mainVideo);
  const videoFormatVersion = getMediaValueByKey('Format version', mainVideo);
  const videoCodeId = getMediaValueByKey('Codec ID', mainVideo);
  const hdrFormat = getMediaValueByKey('HDR format', mainVideo);
  const isDV = hdrFormat.match(/Dolby\s*Vision/i) || (secondVideo.length > 0 && getMediaValueByKey('HDR format', secondVideo[0]).match(/Dolby\s*Vision/i));
  const isEncoded = !!getMediaValueByKey('Encoding settings', mainVideo);
  let videoCodec = '';
  if (generalFormat === 'DVD Video') {
    videoCodec = 'DVD';
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
  }
  return {
    videoCodec,
    hdrFormat,
    isDV,
  };
};
const getAudioCodecByMediaInfo = (mainAudio, otherAudio = []) => {
  const audioFormat = getMediaValueByKey('Format', mainAudio);
  const audioChannels = getMediaValueByKey('Channel(s)', mainAudio);
  const commercialName = getMediaValueByKey('Commercial name', mainAudio);
  const languageArray = [mainAudio, ...otherAudio].map(item => {
    return getMediaValueByKey('Language', item);
  });
  let channelName = '';
  let audioCodec = '';
  const channelNumber = parseInt(audioChannels);
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
const getInfoFromBDInfo = (bdInfo) => {
  if (!bdInfo) {
    return '';
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
  const hdrFormat = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)?.[0];
  const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
  const audioPart = splitBDMediaInfo(audioMatch, 2);
  const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
  const resolution = mainVideo.match(/\d{3,4}(p|i)/)?.[0];
  const { audioCodec = '', channelName = '', languageArray = [] } = getBDAudioInfo(audioPart, quickSummaryStyle);
  const subtitleLanguageArray = subtitlePart.map(item => {
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1];
    const normalMatch = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)?.[1];
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
  return {
    fileSize,
    videoCodec,
    subtitles: subtitleLanguageArray,
    audioCodec,
    resolution,
    mediaTags,
  };
};
const splitBDMediaInfo = (matchArray, matchIndex) => {
  return matchArray?.[matchIndex]?.split('\n').filter(item => !!item) ?? [];
};
const getBDAudioInfo = (audioPart, quickSummaryStyle) => {
  if (audioPart.length < 1) {
    return {};
  }
  const sortArray = audioPart.sort((a, b) => {
    const firstBitrate = parseInt(a.match(/\/\s*(\d+)\s*kbps/i)?.[1]);
    const lastBitrate = parseInt(b.match(/\/\s*(\d+)\s*kbps/i)?.[1]);
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
    const quickStyleMatch = item.match(/(\w+)\s*\//)?.[1];
    const normalMatch = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)?.[1];
    const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
    return language;
  });
  return {
    audioCodec,
    channelName,
    languageArray,
  };
};
const wrappingBBCodeTag = ({ pre, post, tracker }, preTag, poTag) => {
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
const getFilterBBCode = (content) => {
  if (content) {
    const bbCodes = htmlToBBCode(content);
    return bbCodes.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, function (match, p1) {
      if ((p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/))) {
        return '';
      }
      return match;
    });
  }
};
const rgb2hex = (rgb) => {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4)
    ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : '';
};

const ensureProperColor = (color) => {
  if (/rgba?/.test(color)) return rgb2hex(color);
  return color;
};
// html转BBCode代码
const htmlToBBCode = (node) => {
  const bbCodes = [];
  const pre = [];
  const post = [];
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
            return `[quote]${node.textContent.trim()}[/quote]`;
          } else {
            pp('[*]', '\n'); break;
          }
        }
        case 'B': { pp('[b]', '[/b]'); break; }
        case 'U': { pp('[u]', '[/u]'); break; }
        case 'I': { pp('[i]', '[/i]'); break; }
        case 'DIV': {
          const { className } = node;
          if (className === 'codemain') {
            // 兼容朋友
            if (node.firstChild && node.firstChild.tagName === 'PRE') {
              pp('');
              break;
            } else {
              pp('\n[quote]', '[/quote]'); break;
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
          } else {
            pp('\n', '\n'); break;
          }
        }
        case 'P': { pp('\n'); break; }
        case 'BR': {
          if ((CURRENT_SITE_INFO.siteType === 'NexusPHP' && CURRENT_SITE_NAME !== 'OurBits') ||
           CURRENT_SITE_NAME.match(/^(UHDBits|HDBits)/)) {
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
          if (CURRENT_SITE_NAME.match(/^(TTG|HDBits|KG)/) || CURRENT_SITE_NAME === 'HDT' ||
           CURRENT_SITE_INFO.siteType === 'UNIT3D') {
            pp('[quote]', '[/quote]'); break;
          } else {
            return '';
          }
        }
        case 'IMG': {
          let imgUrl = '';
          const { src, title } = node;
          const dataSrc = node.getAttribute('data-src') || node.getAttribute('data-echo');
          // blu等unit3d站点会把:m:转成icon图片
          if (title === ':m:') {
            return ':m:';
          }
          if (dataSrc) {
            imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : location.origin + '/' + dataSrc;
          } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
            imgUrl = src;
          } else {
            return '';
          }
          return `[img]${imgUrl}[/img]`;
        }
        case 'FONT': {
          const { color, size } = node;
          if (color) {
            pp(`[color=${ensureProperColor(color)}]`, '[/color]');
          }
          if (size) {
            pp(`[size=${size}]`, '[/size]');
          }
          break;
        }
        case 'A': {
          const { href, textContent } = node;
          if (href && href.length > 0) {
            if (href.match(/javascript:void/) || (textContent === 'show' && CURRENT_SITE_NAME === 'HDT')) {
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
      const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
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
      if (node.textContent.trim().match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\])/)) {
        return '';
      }
      return node.textContent;
    } // textNode
    default: return null;
  }
  node.childNodes.forEach((node, i) => {
    const code = htmlToBBCode(node);
    if (code) {
      bbCodes.push(code);
    }
  });
  return pre.concat(bbCodes).concat(post).join('');
};
const getTagsFromSubtitle = (title) => {
  const tags = {};
  if (title.match(/diy/i)) {
    tags.DIY = true;
  }
  if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语言/)) {
    tags.chineseAudio = true;
  }
  if (title.match(/Atoms|杜比全景声/i)) {
    tags.atoms = true;
  }
  if (title.match(/HDR/i)) {
    if (title.match(/HDR10\+/i)) {
      tags['HDR10+'] = true;
    } else {
      tags.HDR = true;
    }
  }
  if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
    tags.DolbyVision = true;
  }
  if (title.match(/粤/i)) {
    tags.cantoneseAudio = true;
  }
  if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i)) {
    tags.chineseSubtitle = true;
  }
  if (title.match(/Criterion|CC标准/i)) {
    tags.CC = true;
  }
  return tags;
};
const getBDInfoOrMediaInfo = (bbcode) => {
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
  return {
    bdinfo,
    mediaInfo,
  };
};
const showNotice = (message) => {
  if (!('Notification' in window) || Notification.permission === 'denied') {
    alert(message.text);
  } else if (Notification.permission === 'granted') {
    const myNotification = new Notification(message.title, {
      body: message.text,
    });
    myNotification.onerror = () => {
      alert(message.text);
    };
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        const myNotification = new Notification(message.title, {
          body: message.text,
        });
        myNotification.onerror = () => {
          alert(message.text);
        };
      } else {
        alert(message.text);
      }
    });
  }
};
const replaceRegSymbols = (string) => {
  return string.replace(/([*.?+$^[\](){}|\\/])/g, '\\$1');
};
// https://greasyfork.org/zh-CN/scripts/389810-rottentomatoes-utility-library-custom-api
const getRtIdFromTitle = (title, tv, year) => {
  console.log(title, year);
  const MAX_YEAR_DIFF = 2;
  tv = tv || false;
  year = parseInt(year) || 1800;
  return new Promise(function (resolve, reject) {
    GM_xmlhttpRequest({
      method: 'GET',
      responseType: 'json',
      url: `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`,
      onload: (resp) => {
        const movies = tv ? resp.response.tvSeries : resp.response.movies;
        if (!Array.isArray(movies) || movies.length < 1) {
          console.log('no search results');
          return;
        }
        const sorted = movies.concat();
        if (year && sorted) {
          sorted.sort((a, b) => {
            if (Math.abs(a.year - year) !== Math.abs(b.year - year)) {
              // Prefer closest year to the given one
              return Math.abs(a.year - year) - Math.abs(b.year - year);
            } else {
              return b.year - a.year; // In a tie, later year should come first
            }
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
        function yearComp (imdb, rt) {
          return rt - imdb <= MAX_YEAR_DIFF && imdb - rt < MAX_YEAR_DIFF;
        }
        if (year && (!bestMatch || !yearComp(year, bestMatch.year))) {
          if (closeMatch && yearComp(year, closeMatch.year)) {
            bestMatch = closeMatch;
          } else if (yearComp(year, sorted[0].year)) {
            bestMatch = sorted[0];
          }
        }
        bestMatch = bestMatch || closeMatch || movies[0];

        if (bestMatch) {
          const id = bestMatch && bestMatch.url.replace(/\/s\d{2}\/?$/, ''); // remove season suffix from tv matches
          const score = bestMatch?.meterScore ?? '0';
          resolve({
            id,
            score,
          });
        } else {
          console.log('no match found on rt');
          reject(new Error('no suitable match'));
        }
      },
    });
  });
};
const uploadToPtpImg = (imgArray) => {
  return new Promise((resolve, reject) => {
    const apiKey = GM_getValue('easy-seed.ptp-img-api-key');
    if (!apiKey) {
      showNotice({
        title: 'ptpimg上传失败',
        text: '请到配置面板中填入ptpimg的api_key',
      });
      return;
    }
    const data = `link-upload=${imgArray.join('\n')}&api_key=${apiKey}`;
    GM_xmlhttpRequest({
      url: 'https://ptpimg.me/upload.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data,
      onload (res) {
        if (!res || !res.responseText) {
          reject(new Error('上传失败，请重试'));
        }
        const data = JSON.parse(res.responseText);
        if (!data) {
          reject(new Error('上传失败，请重试'));
        }
        let imgResultList = [];
        if (data && data.length) {
          imgResultList = data.map(img => {
            return `https://ptpimg.me/${img.code}.${img.ext}`;
          });
          resolve(imgResultList);
        } else {
          throw new Error('上传失败，请重试');
        }
      },
    });
  });
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
  getDoubanLinkByIMDB,
  getPreciseCategory,
  showNotice,
  getAnotherDoubanInfo,
  replaceRegSymbols,
  getIMDBData,
  getTMDBVideos,
  getRtIdFromTitle,
  getFilterImages,
  uploadToPtpImg,
}
;
