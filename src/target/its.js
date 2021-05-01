import {
  getTMDBIdByIMDBId, getIMDBIdByUrl, getIMDBData,
  getTMDBVideos, getRtIdFromTitle, uploadToPtpImg,
  $t,
} from '../common';
import { getTeamName, getScreenshotsBBCode } from './common';

export default async (info) => {
  $('textarea[name="descr"]').val($t('数据加载中...'));
  let template = `[center]

  [img]$poster$[/img]
  
  [url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][size=3]$imdbScore$[/size][*][url=$rtUrl$][img]https://i.ibb.co/BwtmdcV/rottentomatoes-logo.png[/img][/url][size=3]$rtScore$[/size][*][size=3][url=$tmdbUrl$][img]https://i.ibb.co/HhgF1gC/tmdb-logo.png[/img][/url]$tmdbScore$[/size][*][url=$youtubeUrl$][img]https://i.ibb.co/TtHYsVC/youutbe-logo.png[/img][/url]


  [color=DarkOrange][size=2]◢ SYNOPSIS ◣[/size][/color]
  $synopsis$
  

  [color=DarkOrange][size=2]◢ SCREENSHOTS ◣[/size][/color]
  $SCREENSHOTS$
  
  [/center]`;
  const collectionMap = {};
  $('select[name="collection_id1"] option').each(function () {
    const option = $(this);
    collectionMap[option.text()] = option.val();
  });
  const collectionValueArr = [];
  const teamName = getTeamName(info);
  if (collectionMap[teamName]) {
    collectionValueArr.push(collectionMap[teamName]);
  }
  const { imdbUrl, category, screenshots, comparisonImgs = [], resolution, movieName } = info;
  if (!resolution.match(/2160|1080|720/) && category === 'movie') {
    $('select[name="type"]').val('67');
  }
  const screenshotsBBCode = getScreenshotsBBCode(screenshots);
  template = template.replace('$SCREENSHOTS$', screenshotsBBCode.join('\n'));
  if (comparisonImgs.length > 0) {
    const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
    template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]◢ COMPARISONS ◣[/size][/color]\n\n
    ${comparisonImgsBBCode.join(' ')}\n\n$1`);
  }
  if (category.match(/tv|movie/)) {
    try {
      const replaceParams = {
        tmdbUrl: '',
        tmdbScore: 0,
        imdbScore: 0,
        imdbUrl,
        poster: '',
        synopsis: '',
        rtUrl: '',
        rtScore: 0,
        youtubeUrl: '',
      };
      const { poster, imdb_rating_average: imdbRate, description, year, aka, directors = [], details = {} } = await getIMDBData(imdbUrl);
      let language = details.Language || '';
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
      const imdbId = getIMDBIdByUrl(imdbUrl);
      const { id: tmdbId, vote_average: tmdbRate } = await getTMDBIdByIMDBId(imdbId, {
        append_to_response: 'videos',
      });
      replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
      replaceParams.tmdbScore = tmdbRate;
      const videos = await getTMDBVideos(tmdbId);
      const youtubeId = videos.filter(video => video.site === 'YouTube')?.[0]?.key ?? '';
      if (youtubeId.length > 0) {
        replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
      }
      const searchMovieName = movieName || aka.filter(item => item.country.match(/(World-wide)|UK|USA/))?.[0].title;
      const rtInfo = await getRtIdFromTitle(searchMovieName, !!category.match(/tv/), year);
      const { score = 0, id = '' } = rtInfo;
      replaceParams.rtScore = `${score}%`;
      replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
      const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') || '';
      if (ptpImgApiKey) {
        const ptpImgPoster = await uploadToPtpImg([poster]);
        replaceParams.poster = ptpImgPoster;
      }
      Object.keys(replaceParams).forEach(key => {
        template = template.replace(`$${key}$`, replaceParams[key]);
      });
      $('textarea[name="descr"]').val(template);
    } catch (error) {
      $('textarea[name="descr"]').val(error.message);
    }
  }
};
