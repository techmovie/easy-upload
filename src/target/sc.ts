import { getIMDBData, getIMDBIdByUrl, transferImgs, uploadToPtpImg, fetch } from '../common';

export default async (info:TorrentInfo.Info) => {
  const { imdbUrl = '' } = info;
  const imdbId = getIMDBIdByUrl(imdbUrl);
  $('#catalogue_number').val(imdbId);
  $('#imdb_autofill').trigger('click');
  fillMedia(info);
  $('.wysibb-text-editor.wysibb-body').html(buildDescription(info));
  await fillIMDb(imdbUrl);
};

function buildDescription (info:TorrentInfo.Info) {
  const { screenshots, mediaInfo } = info;
  let description = '';
  if (screenshots.length > 0) {
    description = screenshots.slice(0, 3)
      .map(img => { return `<img src="${img}">`; })
      .join('');
  }
  if (mediaInfo) {
    description += `<br><br>[hide=MediaInfo]${mediaInfo.replace(/\n/g, '<br>')}[/hide]`;
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
    if (imdbData && imdbData?.details?.['Also known as']) {
      $('#alternate_title').val(imdbData.details['Also known as']);
    }
    if (imdbData && imdbData.poster) {
      let poster;
      const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key');
      if (ptpImgApiKey) {
        poster = await uploadToPtpImg([imdbData.poster]);
      } else {
        const gifyuHtml = await fetch('https://gifyu.com', {
          responseType: undefined,
        });
        const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
        const data = await transferImgs(imdbData.poster, authToken, 'https://gifyu.com/json');
        poster = data.url;
      }
      $('#image').val(poster);
    }
  }
}
