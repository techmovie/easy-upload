
import { getIMDBData, getIMDBIdByUrl, transferImgs, uploadToPtpImg, fetch } from '../common';

export default async (info) => {
  const imdbId = getIMDBIdByUrl(info.imdbUrl);
  $('#catalogue_number').val(imdbId);
  $('#imdb_autofill').click();
  fillMedia(info);
  $('.wysibb-text-editor.wysibb-body').html(buildDescription(info));
  await fillIMDb(info);
};

function buildDescription (info) {
  const { screenshots, mediaInfo } = info;
  let description = '';
  if (screenshots.length > 0) {
    description = screenshots.slice(0, 3).map(img => { return `<img src="${img}">`; }).join('');
  }
  if (mediaInfo) {
    description += `<br><br>[hide=MediaInfo]${mediaInfo.replace(/\n/g, '<br>')}[/hide]`;
  }
  return description;
};
function fillMedia (info) {
  const { videoType, resolution } = info;
  let value;
  if (videoType.match(/bluray/i)) {
    value = 'BDMV';
  } else if (videoType === 'DVD') {
    value = 'DVD-R';
  } else if (parseInt(resolution) < 720) {
    value = 'SD';
  } else {
    value = resolution;
  }
  $('#media').val(value);
}
async function fillIMDb (info) {
  const { imdbUrl } = info;
  if (imdbUrl) {
    const imdbData = await getIMDBData(info.imdbUrl);
    if (imdbData && imdbData?.details?.['Country of origin']) {
      $('#country').val(imdbData.details['Country of origin']);
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
          responseType: 'text',
        });
        const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
        const data = await transferImgs(imdbData.poster, authToken, 'https://gifyu.com/json');
        poster = data.url;
      }
      $('#image').val(poster);
    }
  }
}
