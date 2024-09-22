import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle,
  getInfoFromBDInfo,
  getSourceFromTitle,
} from '../common';

export default async () => {
  // const torrentId = getUrlParam('id');
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const typeText = $('td.heading:contains(Type)').eq(0).next().text();
  const isMovie = typeText !== 'TV-Series';
  // const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const tags: (string | null)[] = [];
  $('td.heading:contains(Tags)').eq(0).next().children().each((_, child) => {
    tags.push(child.textContent);
  });
  const size = $('td.heading:contains(Size)').eq(0).next().text()
    .replace(/[0-9.]+ GB\s+\(([0-9,]+) bytes\)/i, (_, size) => size.replace(/,/g, ''));
  const title = $('h1').eq(0).text();
  const imdbNumber = $('span:contains("IMDB id:") a').text();
  const descContainer = $('td.heading:contains(Description)').eq(0).next();
  const desc = descContainer.text();
  const rawDesc = descContainer.html();
  TORRENT_INFO.mediaInfos = [$('td[style~=dotted]').text()];
  const { videoCodec, audioCodec, resolution = '', mediaTags = {} } = getInfoFromBDInfo(TORRENT_INFO.mediaInfos[0]);
  TORRENT_INFO.size = parseInt(size, 10);
  TORRENT_INFO.title = formatTorrentTitle(title);
  TORRENT_INFO.description = desc;
  TORRENT_INFO.screenshots = getImagesFromDesc(rawDesc);
  TORRENT_INFO.year = $('span.gr_hsep:contains(Year)').text().replace('Year: ', '').trim();
  TORRENT_INFO.movieName = $('div.gr_tdsep h1:first-child').text();
  TORRENT_INFO.imdbUrl = `https://www.imdb.com/title/tt${imdbNumber}/`;
  TORRENT_INFO.category = isMovie ? 'movie' : 'tvPack';
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.videoType = tags.includes('Blu-ray') ? 'bluray' : 'dvd';
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = mediaTags;
};

function getImagesFromDesc (desc: string) {
  const screenshots: string[] = [];
  if (!desc) {
    return screenshots;
  }
  const matches = desc.match(/[a-z0-9]{32}/g);
  if (!matches) {
    return screenshots;
  }
  for (const m of matches) {
    screenshots.push(`https://hostik.cinematik.net/gal/ori/${m[0]}/${m[1]}/${m}.jpg`);
  }
  return screenshots;
}
