import {
  getIMDBData, fetch,
  getInfoFromBDInfo, getInfoFromMediaInfo,
} from '../common';
import { PT_SITE } from '../const';

export default async (info:TorrentInfo.Info) => {
  const { imdbUrl, screenshots, mediaInfo, resolution, source, videoType } = info;
  const siteInfo = PT_SITE.KG;
  if (imdbUrl) {
    $('input[type="submit"][value="next >>"]').hide().after('<p>loading...</p>');
    $('input[name="title"]').val(imdbUrl);
    const formData = new FormData();
    formData.append('upstep', '2');
    formData.append('type', '1');
    formData.append('title', imdbUrl);
    const doc = await fetch(`${PT_SITE.KG.url}/upload.php`, {
      method: 'POST',
      responseType: undefined,
      data: formData,
    });

    const uploadPage = new DOMParser().parseFromString(doc, 'text/html');
    $('#upside+div').html($('#upside+div', uploadPage).html());
    const imdbData = await getIMDBData(imdbUrl);
    if (imdbData) {
      const { country, Languages: languages } = imdbData.details;
      $('input[name="lang"]').val(languages);
      const { description, genre } = imdbData;
      const genreMap = siteInfo.genres.map;
      const countryMap = siteInfo.country.map;
      let countryValue = '';
      if (country) {
        countryValue = country.split(',')[0];
        if (countryValue === 'United States') {
          countryValue = 'USA';
        } else if (countryValue === 'United Kingdom') {
          countryValue = 'UK';
        }
      }
      $('select[name="country_id"]').val(countryMap[countryValue as keyof typeof countryMap]);
      $('#bbcodetextarea').html(`\nSynopsis:\n[quote]${description}[/quote]\n\n${screenshots.map(img => `[img]${encodeURI(img)}[/img]`).join('')}`);
      const [mainGenre, otherGenre = ''] = genre;
      $('select[name="genre_main_id"]').val(genreMap[mainGenre as keyof typeof genreMap]);
      $('select[name="subgenre"]').val(genreMap[otherGenre as keyof typeof genreMap]);
    }
    $(siteInfo.source.selector).val(siteInfo.source.map[source as keyof typeof siteInfo.source.map]);
    if (!videoType.match('bluray')) {
      $(siteInfo.resolution.selector).val(siteInfo.resolution.map[resolution as keyof typeof siteInfo.resolution.map]);
    } else {
      $(siteInfo.resolution.selector).val('3');
    }
    // subtitle
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { subtitles = [] } = getInfoFunc(mediaInfo);
    if (subtitles.length) {
      $('input[name="subs"]').val(subtitles.join(','));
    }
    if (videoType === 'dvd') {
      $('input[name="dvdr"]').attr('checked', 'true');
    }
    $('#ripspecs').val(mediaInfo);
  }
};
