import {
  getTMDBIdByIMDBId, getIMDBIdByUrl,
  getTMDBVideos,
  $t,
} from '../common';
import { PT_SITE } from '../const';
import { getScreenshotsBBCode } from './common';
const currentSiteInfo = PT_SITE.Bdc;

export default async (info:TorrentInfo.Info) => {
  $(currentSiteInfo.name.selector).val(info.title);
  $(currentSiteInfo.imdb.selector).val(info.imdbUrl || '');
  $(currentSiteInfo.anonymous.selector).attr('checked', 'true');
  fillCategory(info);
  fillDescription(info);
};
function fillCategory (info:TorrentInfo.Info) {
  const { resolution, videoType, category } = info;
  let categoryValue = '';
  if (videoType.match(/bluray/)) {
    categoryValue = '31';
  } else if (category.match(/tv/)) {
    categoryValue = '19';
  } else {
    type Resolution = keyof typeof currentSiteInfo.resolution.map;
    type VideoType = keyof typeof currentSiteInfo.resolution.map[Resolution]
    categoryValue = `${currentSiteInfo.resolution.map[resolution as Resolution][videoType as VideoType]}`;
  }
  $('select[name="category"]').val(categoryValue);
}
async function fillDescription (info:TorrentInfo.Info) {
  $(currentSiteInfo.description.selector).val($t('数据加载中...'));
  let template = `
  [align=center][color=#FF0000][size=large][font=Trebuchet MS][b]${info.title}[/b][/font][/size][/color]
  
  [URL=$originalPoster$][IMG]$poster$[/IMG][/URL]
  
  
  [img]https://images.broadcity.eu/images/82619845736635909964.png[/img]
  [size=medium]$synopsis$[/size]
  
  [img]https://images.broadcity.eu/images/87704049718067240949.png[/img]
  
  [php]${info.mediaInfo}[/php][/align]
  
  [align=center][img]https://images.broadcity.eu/images/11622644009097018297.png[/img] 
  $screenshots$
  [/align]
  [align=center][img]https://images.broadcity.eu/images/54926797285164478472.png[/img]
  [youtube]$youtubeUrl$[/youtube]
  [/align]
  [align=center][img]https://images.broadcity.eu/images/44846549843542759058.png[/img]
  [/align]
  `;
  const { imdbUrl, screenshots } = info;
  const screenshotsBBCode = getScreenshotsBBCode(screenshots);
  template = template.replace('$screenshots$', screenshotsBBCode.join('\n'));
  try {
    const replaceParams = {
      synopsis: '',
      youtubeUrl: '',
      poster: '',
      originalPoster: '',
    };
    const imdbId = getIMDBIdByUrl(imdbUrl as string);
    const { id: tmdbId, overview, poster_path: posterPath } = await getTMDBIdByIMDBId(imdbId);
    if (tmdbId) {
      interface Video {
        site:string
        key:string
      }
      const poster = `https://image.tmdb.org/t/p/w500${posterPath}`;
      const originalPoster = `https://image.tmdb.org/t/p/original${posterPath}`;
      replaceParams.poster = poster;
      replaceParams.synopsis = overview;
      replaceParams.originalPoster = originalPoster;
      $('input[name="t_image_url"]').val(poster);
      const videos:Video[] = await getTMDBVideos(tmdbId);
      const youtubeId = videos.filter(video => video.site === 'YouTube')?.[0]?.key ?? '';
      if (youtubeId.length > 0) {
        replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
      }
      Object.keys(replaceParams).forEach(key => {
        template = template.replace(`$${key}$`, replaceParams[key as keyof typeof replaceParams] || '');
      });
      setTimeout(() => {
        tinymce.activeEditor.setContent(template);
      }, 0);
    }
  } catch (error) {
    $(currentSiteInfo.description.selector).val((error as Error).message);
  }
}
