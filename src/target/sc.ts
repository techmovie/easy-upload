import { getIMDBData, getIMDBIdByUrl, transferImgs, fetch } from '../common';
import $ from 'jquery';

export default async (info:TorrentInfo.Info) => {
  const { imdbUrl = '' } = info;
  const imdbId = getIMDBIdByUrl(imdbUrl);
  $('#catalogue_number').val(imdbId);
  $('#imdb_autofill').trigger('click');
  fillMedia(info);
  $('.modesw').trigger('click');
  $('#release_desc').val(buildDescription(info));
  await fillIMDb(imdbUrl);
};

function buildDescription (info:TorrentInfo.Info) {
  const { screenshots, mediaInfos } = info;
  let description = '';
  if (screenshots.length > 0) {
    description = screenshots.slice(0, 3)
      .map(img => { return `[img]${img}[/img]`; })
      .join('');
  }
  if (mediaInfos.length > 0) {
    mediaInfos.forEach(mediaInfo => {
      description += `\n\n[hide=MediaInfo]${mediaInfo}[/hide]`;
    });
  }
  return description;
}

function fillMedia (info:TorrentInfo.Info) {
  const { videoType, resolution } = info;
  let value;
  if (videoType.match(/bluray/i)) {
    value = 'BDMV';
  } else if (videoType === 'DVD') {
    value = 'DVD-R';
  } else if (parseInt(resolution, 10) < 720) {
    value = 'SD';
  } else {
    value = resolution;
  }
  $('#media').val(value);
}

async function fillIMDb (imdbUrl:string) {
  if (imdbUrl) {
    const imdbData = await getIMDBData(imdbUrl);
    if (imdbData && imdbData?.details?.country) {
      $('#country').val(imdbData.details.country);
    }
    const akaName = imdbData && imdbData?.details?.['Also known as'];
    const originalName = imdbData?.name ?? '';
    if (akaName && akaName !== originalName) {
      $('#alternate_title').val(imdbData.details['Also known as']);
      $('#title').val(originalName);
    }
    if (imdbData && imdbData.poster) {
      const gifyuHtml = await fetch('https://gifyu.com', {
        responseType: undefined,
      });
      const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
      const data = await transferImgs(imdbData.poster, authToken, 'https://gifyu.com/json');
      $('#image').val(data.url ?? '');
    }
  }
}
