import { CURRENT_SITE_INFO } from '../const';
import {
  getIMDBData, getInfoFromMediaInfo, showNotice, uploadToPtpImg,
  getInfoFromBDInfo,
} from '../common';
export default async (info) => {
  const { title, category, imdbUrl, formDom, source, screenshots, mediaInfo, videoType } = info;
  const { category: categoryConfig } = CURRENT_SITE_INFO;
  $(categoryConfig.selector).attr('onchange', '').val(categoryConfig.map[category]);
  $('#dynamic_form').html(formDom);
  if (imdbUrl) {
    getIMDBData(imdbUrl).then(imdbData => {
      let { name, year, genre, directors = [], actors = [], description, poster, details, aka } = imdbData;
      let movieTitle = name;
      const akaName = details['Also Known As'];
      const originalTitle = aka.filter(item => {
        return item.country === '(original title)';
      })?.[0]?.title;
      if (akaName && originalTitle !== movieTitle) {
        movieTitle += ` AKA ${akaName}`;
      }
      $(CURRENT_SITE_INFO.name.selector).val(movieTitle);
      $(CURRENT_SITE_INFO.year.selector).val(year);
      if (Array.isArray(genre)) {
        genre = genre.join(',');
      }
      const castTag = [...directors, ...actors].map(item => {
        return item.name.replace(/\s/g, '.').toLowerCase();
      });
      $('#tags').val(`${genre},${castTag.join(',')}`);
      $('#desc').val(`${imdbUrl}\n\n${description}`);
      uploadToPtpImg([poster]).then(img => {
        $(CURRENT_SITE_INFO.poster.selector).val(img[0]);
      }).catch(error => {
        showNotice({ text: error.message || '封面上传失败' });
      });
    }).catch(error => {
      console.log(error);
    });
  }
  if (category !== 'movie') {
    return;
  }
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { format = '', subtitles = [], mediaTags } = getInfoFunc(mediaInfo);
  let releaseInfo = '';
  if (videoType === 'remux') {
    releaseInfo += 'REMUX';
  }
  if (title.match(/Commentary/i)) {
    releaseInfo += ' / w. Commentary';
  }
  if (subtitles.length > 0) {
    releaseInfo += 'w. Subtitles';
  }
  if (mediaTags.HDR) {
    releaseInfo += ' / HDR';
  }
  $('input[name="remaster_title"]').val(releaseInfo.replace(/^\/|\/$/g, '').trim());
  info.source = getSource(source, title);
  info.format = getFormat(format, videoType);
  ['source', 'videoCodec', 'audioCodec', 'resolution', 'mediaInfo', 'format'].forEach(key => {
    const { selector = '', map } = CURRENT_SITE_INFO[key];
    if (map) {
      $(selector).val(map[info[key]]);
    } else {
      $(selector).val(info[key]);
    }
  });

  screenshots.forEach((img, index) => {
    index++;
    let inputDom = $(`input[name='screenshot${index}']`);
    if (inputDom[0]) {
      inputDom.val(img);
    } else if (index <= 4 && !inputDom[0]) {
      // eslint-disable-next-line no-undef
      add_screenshot();
      inputDom = $(`input[name='screenshot${index}']`);
      inputDom.val(img);
    }
  });
};
const getSource = (source, title) => {
  if (title.match(/webrip/i)) {
    return 'webrip';
  } else if (title.match(/dvd5/i)) {
    return 'dvd5';
  } else if (title.match(/dvd9/i)) {
    return 'dvd9';
  } else if (title.match(/3D/) && source.match(/bluray/i)) {
    return 'bluray3d';
  }
  return source;
};
const getFormat = (format, videoType) => {
  if (videoType.match(/bluray/)) {
    format = 'm2ts';
  } else if (videoType.match(/dvd/)) {
    format = 'vob';
  }
  return format;
};
