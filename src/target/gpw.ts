import { PT_SITE } from '../const';
import {
  getBDType, getInfoFromBDInfo,
  getUrlParam, getInfoFromMediaInfo,
} from '../common';
import { buildPTPDescription } from './common';

const currentSiteInfo = PT_SITE.GPW;
export default async (info:TorrentInfo.Info) => {
  const isUploadSuccess = !$('#mediainfo')[0]; // 上传成功页面

  if (isUploadSuccess) {
    return;
  }

  transformInfo(info);

  const isAddFormat = getUrlParam('groupid');
  if (!isAddFormat) {
    $(currentSiteInfo.imdb.selector).val(info.imdbUrl || 0);
    $('#imdb_button').trigger('click');
    // for fillEditionInfo
    $('#upload .collapse').show();
  }
  type Category = keyof typeof currentSiteInfo.category.map;
  $(currentSiteInfo.category.selector).val(currentSiteInfo.category.map[info.category as Category]);

  fillEditionInfo(info);

  // 1. 先使用站内自动填充功能
  fillMediaInfo(info);

  // 2. 自动填充失败后脚本填充
  setTimeout(() => {
    if (!$(currentSiteInfo.source.selector).val() || !$(currentSiteInfo.format.selector).val()) {
      handleNoAutoCheck(info);
    }
  }, 0);

  fillScene(info);

  fillProcessing(info);

  fillDescription(info);
  $('.u-bbcodePreview-button').trigger('click');
};

function buildDescription (info:TorrentInfo.Info) {
  let description = '';
  if (info.comparisons && info.comparisons.length > 0) {
    for (const comparison of info.comparisons) {
      description += `${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]\n\n`;
    }
  }
  if (info.screenshots.length > 0) {
    description += `${info.screenshots.map(v => `[img]${v}[/img]`).join('\n')}\n\n`;
  }
  return description.trim();
}

function fillEditionInfo (info:TorrentInfo.Info) {
  type Tag = keyof typeof currentSiteInfo.targetInfo.editionTags
  const editionTags = Object.keys(info.tags).map(tag =>
    info.tags[tag] && currentSiteInfo.targetInfo.editionTags[tag as Tag]).filter(Boolean);
  let otherTag;
  if (Object.keys(info.otherTags).length > 0) {
    otherTag = Object.keys(info.otherTags).join(', ');
  }
  if (editionTags.length > 0 || otherTag) {
    $('#movie_edition_information').trigger('click');
  }
  if (editionTags.length > 0) {
    for (const tag of editionTags) {
      $(`#movie_remaster_tags a[onclick*="'${tag}'"]`).trigger('click');
    }
  }
  if (otherTag) {
    $('#other-button').trigger('click');
    $('[name=remaster_custom_title]').val(otherTag);
  }
}

function fillMediaInfo (info:TorrentInfo.Info) {
  if (!info.mediaInfos) {
    return;
  }
  for (let i = 1; i < info.mediaInfos.length; i++) {
    $('#add-mediainfo')[0].click();
  }

  const textareas = Array.from($('[name="mediainfo[]"]'));
  for (const [index, textarea] of textareas.entries()) {
    (textarea as HTMLTextAreaElement).value = info.mediaInfos[index];
    textarea.dispatchEvent(new Event('input'));
  }

  // 使用站内自动填充功能
  $('[name="mediainfo[]"]')[0].dispatchEvent(new Event('change'));
}

function fillScene (info:TorrentInfo.Info) {
  if (info.tags.scene) {
    $('#scene').prop('checked', true);
  }
}

function fillProcessing (info:TorrentInfo.Info) {
  let { videoType, size, source, tags } = info;
  if (source.match(/bluray|hddvd|dvd/)) {
    if (tags.diy) {
      videoType = 'DIY';
    }
    const videoTypeConfig = currentSiteInfo.videoType;
    const { selector, map } = videoTypeConfig;
    $(selector).val(map[videoType as keyof typeof map]);
    // change event to trigger processing_other fields
    $(selector)[0].dispatchEvent(new Event('change'));
    if (map[videoType as keyof typeof map] === 'Untouched') {
      const bdType = getBDType(size);
      $('select[name="processing_other"]').val(bdType || '');
    }
    // input event to trigger validation
    $(selector)[0].dispatchEvent(new Event('input'));
  }
}
// 兼容自动检测失败的情况
function handleNoAutoCheck (info:TorrentInfo.Info) {
  const {
    mediaInfo, videoType,
  } = info;
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { format = '', subtitles = [] } = getInfoFunc(mediaInfo);
  info.format = getFormat(format, videoType);
  const keyArray = ['source', 'videoCodec', 'format', 'resolution'] as const;
  type Key = typeof keyArray[number]
  keyArray.forEach(key => {
    const { selector = '', map } = currentSiteInfo[key as Key];
    type MapKey = keyof typeof map
    if (map) {
      const mapValue = map[info[key as Key] as MapKey];
      $(selector).val(mapValue);

      if (key === 'videoCodec' && mapValue === 'Other') {
        (document.querySelector(selector) as HTMLSelectElement).dispatchEvent(new Event('change'));
        $('input[name="codec_other"]').val(info[key as Key]?.toUpperCase() ?? '');
      }
    } else {
      $(selector).val(info[key as Key] || '');
    }
  });
  if (subtitles.length > 0) {
    $('#mixed_subtitles').attr('checked', 'true');
    $('input[name="subtitles[]"][type="checkbox"]').each(function () {
      const language = $(this).attr('id')?.replace(/^\S|(_\S)/g, letter => letter.replace('_', ' ').toUpperCase()) ?? '';
      if (subtitles.includes(language)) {
        $(this).attr('checked', 'true');
      }
    });
    const event = new Event('change');
    document.querySelector('#mixed_subtitles')?.dispatchEvent(event);
    const chineseLanguages = subtitles.filter(item => item.match(/Chinese|Traditional|Simplified/i));
    // 第一个判断条件不严谨 只有一个Chinese的情况也有可能为繁体
    if ((chineseLanguages.length === 1 && chineseLanguages[0] === 'Chinese')) {
      const selector = chineseLanguages[0].match(/Traditional/i) ? '#chinese_traditional' : '#chinese_simplified';
      $(selector).attr('checked', 'true');
    } else if (chineseLanguages.length >= 2) {
      $('#chinese_traditional,#chinese_simplified').attr('checked', 'true');
    }
  }
}
const getFormat = (format:string, videoType:string) => {
  if (videoType.match(/bluray/) && format !== 'iso') {
    format = 'm2ts';
  } else if (videoType.match(/dvd/)) {
    format = 'vob';
  }
  return format || 'mkv';
};

function transformInfo (info:TorrentInfo.Info) {
  // mediainfo -> mediainfos
  if (info.mediaInfos && info.mediaInfos.length === 0 && info.mediaInfo) {
    info.mediaInfos = [info.mediaInfo];
  }

  // mediainfos contains both mediainfo and bdinfo
  if (['encode', 'remux'].includes(info.videoType) && info.mediaInfos) {
    const newMediaInfos = [];
    for (const mediaInfo of info.mediaInfos) {
      if (mediaInfo.match(/Disc Title|Disc Label/i)) {
        continue;
      }
      newMediaInfos.push(mediaInfo);
    }
    info.mediaInfos = newMediaInfos;
  }
}

function fillDescription (info:TorrentInfo.Info) {
  let description = '';
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite === 'BeyondHD') {
    description = info.originalDescription || '';
  } else {
    description = buildDescription(info);
  }
  $(currentSiteInfo.description.selector).val(description);
  $(currentSiteInfo.description.selector)[0].dispatchEvent(new Event('input'));
}
