export default (info:TorrentInfo.Info) => {
  const { musicJson } = info;
  if (!musicJson) {
    return;
  }
  document.forms.upload_table.reset = () => {};
  const { name, year, musicInfo, bbBody, tags, releaseType, categoryId, wikiImage } = musicJson.group;
  const { remasterYear, remasterRecordLabel, remasterCatalogueNumber, format, encoding, media, description, scene } = musicJson.torrent;

  $('#categories').val(categoryId - 1);
  $('#title').val(name);
  $('#year').val(year);
  $('#releasetype').val(releaseType);
  $('#remaster_year').val(remasterYear);
  $('#remaster_record_label').val(remasterRecordLabel);
  $('#remaster_catalogue_number').val(remasterCatalogueNumber);
  $('#format').val(format);
  $('#bitrate').val(encoding);
  $('#media').val(media);
  $('#tags').val(tags.join(', '));
  $('#album_desc').val(bbBody);
  $('#release_desc').val(description);
  $('#image').val(wikiImage);
  if (scene) {
    $('#scene').attr('checked', 'true');
  }
  fillArtistsForm(musicInfo);
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
