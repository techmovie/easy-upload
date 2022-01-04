export default (info:TorrentInfo.Info) => {
  const { resolution, videoType, source } = info;
  let format = '';
  const formatMap = {
    remux: 'Remux',
    web: 'WebRip',
    dvd: 'DVDR',
    dvdrip: 'DVDRip',
    '720p': '720P',
    '1080p': '1080P',
    '2160p': '2160P',
  };
  if (videoType.match(/bluray/)) {
    format = 'BluRay';
  } else if (videoType === 'encode' && source === 'bluray') {
    format = formatMap[resolution as keyof typeof formatMap];
  } else {
    format = formatMap[videoType as keyof typeof formatMap] || '';
  }
  $('#format').val(format);
};
