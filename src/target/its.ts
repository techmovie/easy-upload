import {
  getTMDBDataByIMDBId, getIdByIMDbUrl, getIMDBData,
  getTMDBVideosById, getMatchRottenTomatoes, uploadToPtpImg,
  $t,
} from '../common';
import { getTeamName, getScreenshotsBBCode } from './common';
import $ from 'jquery';

export default async (info:TorrentInfo.Info) => {
  let template = `[center]

  [img]$poster$[/img]
  
  [url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][size=3]$imdbScore$[/size][*][url=$rtUrl$][img]https://i.ibb.co/BwtmdcV/rottentomatoes-logo.png[/img][/url][size=3]$rtScore$[/size][*][size=3][url=$tmdbUrl$][img]https://i.ibb.co/HhgF1gC/tmdb-logo.png[/img][/url]$tmdbScore$[/size]


  [color=DarkOrange][size=2]◢ SYNOPSIS ◣[/size][/color]
  $synopsis$
  
  [color=DarkOrange][size=2]◢ TRAILER ◣[/size][/color]
  [youtube]$youtubeUrl$[/youtube]

  [color=DarkOrange][size=2]◢ SCREENSHOTS ◣[/size][/color]
  [box][hide]$SCREENSHOTS$[/hide][/box]
  
  [/center]`;
  const collectionMap: {
    [key:string]:string
  } = {};
  $('select[name="collection_id1"] option').each(function () {
    const option = $(this);
    collectionMap[option.text()] = option.val() as string;
  });
  const collectionValueArr = [];
  const teamName = getTeamName(info);
  if (collectionMap[teamName]) {
    collectionValueArr.push(collectionMap[teamName]);
  }
  const { imdbUrl, category, screenshots, comparisons = [], resolution, movieName } = info;
  if (!resolution.match(/2160|1080|720/) && category === 'movie') {
    $('select[name="type"]').val('67');
  }
  const screenshotsBBCode = getScreenshotsBBCode(screenshots);
  template = template.replace('$SCREENSHOTS$', screenshotsBBCode.join('\n'));
  const comparisonImgs = comparisons.flatMap(v => v.imgs);
  if (comparisonImgs.length > 0) {
    const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
    template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]◢ COMPARISONS ◣[/size][/color]\n\n
    [box][hide]${comparisonImgsBBCode.join(' ')}[/hide][/box]\n\n$1`);
  }
  if (category.match(/tv|movie|cartoon|documentary/)) {
    $('textarea[name="descr"]').val($t('数据加载中...'));
    try {
      const replaceParams = {
        tmdbUrl: '',
        tmdbScore: '0',
        imdbScore: '0',
        imdbUrl,
        poster: '',
        synopsis: '',
        rtUrl: '',
        rtScore: '0',
        youtubeUrl: '',
      };
      const imdbData = await getIMDBData(imdbUrl as string);
      if (imdbData) {
        const {
          poster = '', imdb_rating_average: imdbRate,
          description = '', directors = [], details, aka, year,
        } = imdbData;
        let language = details.Languages || '';
        language = language?.split('|')?.[0]?.trim() ?? '';
        const director = directors.map(item => item.name)[0];
        if (collectionMap[director]) {
          collectionValueArr.push(collectionMap[director]);
        }
        if (collectionMap[language]) {
          collectionValueArr.push(collectionMap[language]);
        }
        collectionValueArr.forEach((value, index) => {
          $(`select[name="collection_id${index + 1}"]`).val(value);
        });
        replaceParams.poster = poster;
        replaceParams.synopsis = description;
        replaceParams.imdbScore = imdbRate;

        const searchMovieName = movieName || aka.filter(item => item.country.match(/(World-wide)|UK|USA/))?.[0].title;
        const rtInfo = await getMatchRottenTomatoes(searchMovieName, !!category.match(/tv/), year);
        const { score = 0, id = '' } = rtInfo;
        replaceParams.rtScore = `${score}%`;
        replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
        const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') || '';
        if (ptpImgApiKey) {
          const ptpImgPoster = await (await uploadToPtpImg)([poster]);
          replaceParams.poster = ptpImgPoster ? ptpImgPoster[0] : '';
        }
      }

      const imdbId = getIdByIMDbUrl(imdbUrl as string);
      const { id: tmdbId, vote_average: tmdbRate } = await getTMDBDataByIMDBId(imdbId);
      if (tmdbId) {
        replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
        replaceParams.tmdbScore = tmdbRate;
        interface Video {
          site:string
          key:string
        }
        const videos:Video[] = await getTMDBVideosById(tmdbId);

        const youtubeId = videos.filter(video => video.site === 'YouTube')?.[0]?.key ?? '';
        if (youtubeId.length > 0) {
          replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
        }
      }

      Object.keys(replaceParams).forEach(key => {
        template = template.replace(`$${key}$`, replaceParams[key as keyof typeof replaceParams] || '');
      });
      $('textarea[name="descr"]').val(template);
    } catch (error) {
      $('textarea[name="descr"]').val((error as Error).message);
    }
  }
};
