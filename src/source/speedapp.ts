import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle,
  getInfoFromMediaInfo, getInfoFromBDInfo,
  getSize, getFilterBBCode, getSourceFromTitle, getScreenshotsFromBBCode,
  getVideoCodecFromTitle, getAudioCodecFromTitle, getTagsFromSubtitle,
} from '../common';

export default async () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const imdbUrl = $('a[href*="imdb.com/title"]').attr('href');
  const torrentContainer = $('div.container > div.row div.cover-overlay div.cover-overlay-bottom.d-none div.row');
  const MovieName = $('div.container > div.row div.cover-body h1.text-emphasis').text().trim();
  const torrentName = $('h5.text-emphasis').text().trim();
  const size = torrentContainer.find('div.text-right.d-flex.justify-content-end div:contains("B")').text().trim();

  const source = getSourceFromTitle(torrentName);
  const descriptionContainer = $('div.description.description-modern');
  const descriptionBBCode = getFilterBBCode(descriptionContainer[0]);
  const extraScreenshotDom = $(descriptionContainer[0]).find('img');
  const imgs:string[] = [];
  if (extraScreenshotDom) {
      extraScreenshotDom.each((index, item) => {
          if (!/\.svg/.test($(item).attr('src'))) imgs.push(`[img]${$(item).attr('src')?.trim() ?? ''}[/img]`);
    });
  }
  const extraScreenshot = imgs.join('');
  const screenshots = await getScreenshotsFromBBCode(extraScreenshot);
  const isBluray = !!$('span.nav-text:contains("BD Info")');
  const videoType = getVideoType({ torrentName, source, isBluray });

  const mediaInfo = $('div.mediainfo').text();
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { resolution, videoCodec, audioCodec, mediaTags: tags } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle(torrentName);

  const category = getCategory(torrentName);
  TORRENT_INFO.mediaInfo = "";
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.description = descriptionBBCode.replaceAll(/\n\n*/g, '\n').replaceAll(' ', '').trim().replace('[img]https://speedapp.io/img/descr/screens.svg[/img]', '').replace('[img]https://speedapp.io/img/descr/release_info.svg[/img]', '').replaceAll('original.png]\n[img]', 'original.webp][img]').replaceAll('original.webp]\n[img]', 'original.webp][img]').replaceAll('original.webp[/img]\n[/url]', 'mobile.webp[/img][/url]').replaceAll('original.png[/img]\n[/url]', 'mobile.webp[/img][/url]').replaceAll(/\[\/url\]\n*/g,'[/url]');
  TORRENT_INFO.screenshots = screenshots
  TORRENT_INFO.title = torrentName;
  //TORRENT_INFO.year = MovieName[1];
  TORRENT_INFO.movieName = MovieName;
  //TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.poster = $('.movie-poster').attr('src');
  //TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  //TORRENT_INFO.source = getSourceFromTitle(title);
  TORRENT_INFO.videoType = videoType.toLowerCase();
  
};

const getVideoType = ({ torrentName = '', source = '', isBluray = false }) => {
  if (torrentName.match(/remux/i)) {
    return 'remux';
  } else if (source.match(/bluray/) && !isBluray) {
    return 'encode';
  }
  return source;
};

function getCategory (season:string) {
  return season.match(/S\d+E(P)\d+/i) ? 'tv' : 'tvPack';
}

function getSpecsFromTitle (torrentName:string) {
  return {
    videoCodec: getVideoCodecFromTitle(torrentName),
    audioCodec: getAudioCodecFromTitle(torrentName),
    mediaTags: getTagsFromSubtitle(torrentName),
    resolution: torrentName.match(/\d{3,4}(p|i)/)?.[0],
  };
}
