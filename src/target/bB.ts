import { PT_SITE } from '../const';
import {
  getIMDBData, getInfoFromMediaInfo, uploadToPtpImg,
  getInfoFromBDInfo, $t,
} from '../common';
import Notification from '../components/Notification';
export default (info:TorrentInfo.Info) => {
  const {
    title, category, imdbUrl, formDom, tags,
    source, screenshots, mediaInfo, videoType,
  } = info;
  const currentSiteInfo = PT_SITE.bB;
  const { category: categoryConfig } = currentSiteInfo;
  $(categoryConfig.selector).attr('onchange', '')
    .val(categoryConfig.map[category as keyof typeof categoryConfig.map]);
  $('#dynamic_form').html(formDom as string);
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { format = '', subtitles = [] } = getInfoFunc(mediaInfo);
  info.source = getSource(source, title);
  info.format = getFormat(format, videoType);
  const tvTitleArray:string[] = [];
  const keyArray = ['source', 'videoCodec', 'audioCodec', 'format', 'resolution'] as const;
  type Key = typeof keyArray[number]
  keyArray.forEach(key => {
    const { selector = '', map } = currentSiteInfo[key as Key];
    if (map) {
      const mapValue = map[info[key as Key] as keyof typeof map];
      $(selector).val(mapValue);
      tvTitleArray.push(mapValue);
    } else {
      $(selector).val(info[key as Key] || '');
    }
  });
  if (imdbUrl) {
    getIMDBData(imdbUrl).then(imdbData => {
      if (!imdbData) {
        Notification.open({
          message: $t('请求失败'),
        });
        return;
      }
      const { name, year, genre, directors = [], actors = [], description, poster, details, aka } = imdbData;
      let movieTitle = name;
      const akaName = details['Also known as'];
      const originalTitle = aka.filter(item => {
        return item.country === '(original title)';
      })?.[0]?.title;
      if (akaName && originalTitle !== movieTitle) {
        movieTitle += ` AKA ${akaName}`;
      }
      if (category.match(/tv/i)) {
        let seasonEpisode = title.match(/S\d+(E\d+)?/i)?.[0];
        if (seasonEpisode) {
          seasonEpisode = seasonEpisode.toUpperCase().replace(/S0?(\d+)$/, 'Season $1');
          movieTitle += ` ${seasonEpisode} `;
        }
        movieTitle += `[${tvTitleArray.join(' / ')}]`;
      }
      $(currentSiteInfo.name.selector).val(movieTitle);
      $(currentSiteInfo.year.selector).val(year);
      const castTag = [...directors, ...actors].map(item => {
        return item.name.replace(/\s/g, '.').toLowerCase();
      });
      $('#tags').val(`${genre.join(',')},${castTag.join(',')}`);
      $('#desc').val(`${imdbUrl}\n\n${description}`);
      uploadToPtpImg([poster]).then(img => {
        if (img) {
          $(currentSiteInfo.poster.selector).val(img[0]);
        }
      }).catch(error => {
        Notification.open({
          message: $t('请求失败'),
          description: error.message || $t('封面上传失败'),
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }
  if (category !== 'movie') {
    return;
  }
  const releaseInfo = [];
  if (videoType === 'remux') {
    releaseInfo.push('REMUX');
  }
  if (title.match(/Commentary/i)) {
    releaseInfo.push('w. Commentary');
  }
  if (subtitles.length > 0) {
    releaseInfo.push('w. Subtitles');
  }
  if (tags.hdr) {
    releaseInfo.push('HDR');
  }
  $('input[name="remaster_title"]').val(releaseInfo.join(' / '));
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
const getSource = (source:string, title:string) => {
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
const getFormat = (format:string, videoType:string) => {
  if (videoType.match(/bluray/)) {
    format = 'm2ts';
  } else if (videoType.match(/dvd/)) {
    format = 'vob';
  }
  return format || 'mkv';
};
