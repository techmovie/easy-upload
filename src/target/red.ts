import { fetch, getUrlParam } from '../common';
import { CURRENT_SITE_INFO } from '../const';
export default async (info:TorrentInfo.Info) => {
  const { musicJson } = info;
  if (!musicJson) {
    return;
  }
  document.forms.upload_table.reset = () => {};
  const { name, year, musicInfo, bbBody, tags, releaseType, categoryId, wikiImage } = musicJson.group;
  const groupId = getUrlParam('groupid');
  if (!groupId) {
    const url = `/ajax.php?action=browse&searchstr=${name} ${year}`;
    const searchResult = await fetch(url);
    if (searchResult.status === 'success' && searchResult.response.results.length > 0) {
      const groupId = searchResult.response.results[0].groupId;
      const timestampMatchArray = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
      const timestamp = timestampMatchArray?.[2] ?? '';
      location.href = `${CURRENT_SITE_INFO.url}${CURRENT_SITE_INFO.uploadPath}?groupid=${groupId}#timestamp=${timestamp}`;
      return;
    }
    $('#categories').val(categoryId - 1);
    $('#title').val(name);
    $('#year').val(year);
    $('#releasetype').val(releaseType);
    $('#tags').val(tags.join(', '));
    $('#album_desc').val(bbBody);
    $('#image').val(wikiImage);
    fillArtistsForm(musicInfo);
  }
  fillReleaseInfo(musicJson.torrent);
};

function fillArtistsForm (musicInfo:MusicJson.GroupInfo['musicInfo']) {
  const artistTypeMap = {
    artists: '1',
    with: '2',
    composers: '4',
    conductor: '5',
    dj: '6',
    producer: '7',
    remixedBy: '3',
  };
  const artists = [] as MusicJson.People[];
  Object.keys(musicInfo).forEach(key => {
    const typeKey = key as keyof typeof artistTypeMap;
    const values = musicInfo[typeKey].map(value => {
      return {
        ...value,
        type: artistTypeMap[typeKey],
      };
    });
    artists.push(...values);
  });
  for (let i = 1; i < artists.length; i++) {
    AddArtistField();
  }
  artists.forEach((artist, index) => {
    const selector = index > 0 ? `#artist_${index}` : '#artist';
    $(selector).val(artist.name).next().val(artist.type || '');
  });
}

function fillReleaseInfo (info: MusicJson.Info['torrent']) {
  const { remasterYear, remasterRecordLabel, remasterCatalogueNumber, format, encoding, media, description, scene, remasterTitle } = info;
  $('#remaster_record_label').val(remasterRecordLabel);
  $('#remaster_catalogue_number').val(remasterCatalogueNumber);
  $('#format').val(format);
  $('#bitrate').val(encoding);
  $('#media').val(media);
  if (media === 'CD' && format === 'FLAC') {
    document.querySelector('#format')?.dispatchEvent(new Event('change'));
  }
  $('#remaster_year').val(remasterYear);
  $('#release_desc').val(description);
  if (scene) {
    $('#scene').attr('checked', 'true');
  }
  if (remasterTitle) {
    $('#remaster_title').val(remasterTitle);
  }
}
