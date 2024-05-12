import { getUrlParam, fetch, htmlToBBCode } from '../common';
import { CURRENT_SITE_INFO, TORRENT_INFO, CURRENT_SITE_NAME } from '../const';
import type { Info as RedInfo } from '../types/sites/red';

export default async () => {
  const torrentId = getUrlParam('torrentid');
  if (!torrentId) {
    return false;
  }
  try {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const torrentInfo = await getTorrentInfo(torrentId);
    Object.assign(TORRENT_INFO, torrentInfo);
  } catch (error) {
    console.log(error);
  }
};

async function getTorrentInfo (torrentId:string) {
  const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
  const { torrent, group } = response as RedInfo;
  const { name, year, wikiImage, musicInfo, categoryName, bbBody, tags, wikiBody } = group;
  const { format, media, encoding } = torrent;
  const catMap = {
    Applications: 'app',
    'E-Books': 'ebook',
    Audiobooks: 'audioBook',
    Comics: 'comics',
    Music: 'music',
    'E-Learning Videos': 'other',
    Comedy: 'other',
  };
  const div = document.createElement('div');
  div.innerHTML = wikiBody;
  let description = bbBody || htmlToBBCode(div);
  description = `[img]${wikiImage}[/img]\n${description}`;
  const descSource = new DOMParser().parseFromString(description, 'text/html');
  if (descSource.documentElement.textContent) {
    description = descSource.documentElement.textContent.replace(/\[\/?artist\]/g, '').replace(/\[url=https:\/\/redacted\.ch\/torrents\.php\?(taglist|recordlabel)=[a-zA-Z%0-9]*\]/g, '').replace(/(?<=(\[\/b\]|,)[\s\\.a-zA-Z]*)\[\/url\]/g, '');
  }
  const log = await fetch(`/torrents.php?action=loglist&torrentid=${torrentId}`, {
    responseType: undefined,
  });
  const logDiv = document.createElement('div');
  logDiv.innerHTML = log;
  const logBBcode = htmlToBBCode(logDiv);
  return {
    title: $('.header h2').text(),
    subtitle: `${$(`#torrent${torrentId}`).prev().find('strong').contents().last().text().trim()} / ${$(`#torrent${torrentId} td:first-child a[onclick*="$("]`).text()}`,
    year: `${year}`,
    poster: wikiImage,
    description,
    category: catMap[categoryName] || 'other',
    audioCodec: format.toLowerCase(),
    videoType: media.toLowerCase().replace('-', ''),
    musicInfo: {
      name,
      tags,
      artists: musicInfo.artists.map(item => item.name),
      media,
      encoding,
      log: logBBcode,
    },
  };
}
