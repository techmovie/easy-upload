import { CURRENT_SITE_INFO } from '../const';
import {
  getBDType, getInfoFromBDInfo,
  getUrlParam, getInfoFromMediaInfo,
} from '../common';

export default async (info) => {
  const site = CURRENT_SITE_INFO;
  const isUploadSuccess = !$('#mediainfo')[0]; // 上传成功页面

  if (isUploadSuccess) {
    return;
  }

  transformInfo(info);

  const isAddFormat = getUrlParam('groupid');
  if (!isAddFormat) {
    $(site.imdb.selector).val(info.imdbUrl || 0);
    $('#imdb_button').click();
    // for fillEditionInfo
    $('#upload .collapse').show();
  }

  $(site.category.selector).val(site.category.map[info.category]);

  fillEditionInfo(info);

  // 1. 先使用站内自动填充功能
  fillMediaInfo(info);

  // 2. 自动填充失败后脚本填充
  if (!$(site.source.selector).val()) {
    handleNoAutoCheck(info);
  }

  fillScene(info);

  fillProcessing(info);

  fillDescription(info);

  document.querySelector('#description-container .bbcode-preview-button').click();
};

function buildDescription (info) {
  let description = '';
  if (info.comparisons.length > 0) {
    for (const comparison of info.comparisons) {
      description += `${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]` + '\n\n';
    }
  }
  if (info.screenshots.length > 0) {
    description += info.screenshots.map(v => `[img]${v}[/img]`).join('\n') + '\n\n';
  }
  return description.trim();
};

function fillEditionInfo (info) {
  const site = CURRENT_SITE_INFO;
  const editionTags = Object.keys(info.tags).map(tag => info.tags[tag] && site.targetInfo.editionTags[tag]).filter(Boolean);
  let otherTag;
  if (Object.keys(info.otherTags).length > 0) {
    otherTag = Object.keys(info.otherTags).join(', ');
  }
  if (editionTags.length > 0 || otherTag) {
    $('#movie_edition_information').click();
  }
  if (editionTags.length > 0) {
    for (const tag of editionTags) {
      $(`#movie_remaster_tags a[onclick*="'${tag}'"]`).click();
    }
  }
  if (otherTag) {
    $('#other-button').click();
    $('[name=remaster_custom_title]').val(otherTag);
  }
}

function buildPTPDescription (info) {
  let text = info.originalDescription;

  // http://ptpimg
  text = text.replaceAll('http://ptpimg.me', 'https://ptpimg.me');

  // mediainfo
  for (const mediainfo of info.mediaInfos) {
    text = text.replace(mediainfo, '');
  }
  text = text.replaceAll(/\[(mediainfo|bdinfo)\][\s\S]*?\[\/(mediainfo|bdinfo)\]/gi, '');

  // imgUrl without [img]
  text = text.replaceAll(/^(?!\[img\])https:\/\/ptpimg.me.*?png(?!\[\/img\])$/gim, (imgUrl) => {
    return `[img]${imgUrl}[/img]`;
  });
  // fix [comparison] [img], url同行
  text = text.replaceAll(/\[comparison.*\][\s\S]*\[\/comparison\]/gi, (comparisonText) => {
    return comparisonText.replaceAll('[img]', '').replaceAll('[/img]', '')
      .split('https://ptpimg.me').join('\nhttps://ptpimg.me').replaceAll(/\s*\n\s*/g, '\n');
  });

  // old school comparison or more screenshots
  // [hide], [hide=]
  text = text.replaceAll(/\[hide(.*)?\]\s*\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\[\/hide\]/gi, (imgText) => {
    const imgs = [];
    for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
      imgs.push(urlMatch[1]);
    }
    const rawTitle = imgText.match(/^\[hide=(.*?)\]/)?.[1] || '';
    const comparisonTitles = rawTitle.trim().split(/\||\/|,|vs\.?| - /i).map(v => v.trim());
    if (comparisonTitles.length >= 2) {
      return `[comparison=${comparisonTitles.join(', ')}]\n${imgs.join('\n')}\n[/comparison]\n`;
    } else {
      const hideTitle = rawTitle ? `=${rawTitle}` : '';
      return `[hide${hideTitle}]\n[img]${imgs.join('[/img]\n[img]')}[/img]\n[/hide]\n`;
    }
  });

  // [url][img] \n\n
  text = text + '\n\n';
  text = text.replaceAll(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
    const imgs = [];
    for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
      imgs.push(urlMatch[1]);
    }
    return `[hide]\n[img]${imgs.join('[/img]\n[img]')}[/img]\n[/hide]\n`;
  });

  // 多换行
  text = text.replaceAll(/\n\s*\n/g, '\n\n');

  return text.trim();
}

function fillMediaInfo (info) {
  for (let i = 1; i < info.mediaInfos.length; i++) {
    $('#add-mediainfo')[0].click();
  }

  const textareas = Array.from($('[name="mediainfo[]"]'));
  for (const [index, textarea] of textareas.entries()) {
    textarea.value = info.mediaInfos[index];
    textarea.dispatchEvent(new Event('input'));
  };

  // 使用站内自动填充功能
  $('[name="mediainfo[]"]')[0].dispatchEvent(new Event('change'));
}

function fillScene (info) {
  if (info.tags.scene) {
    $('#scene').prop('checked', true);
  }
}

function fillProcessing (info) {
  let { videoType, size, source, tags } = info;
  if (source.match(/bluray|hddvd|dvd/)) {
    if (tags.diy) {
      videoType = 'DIY';
    }
    const videoTypeConfig = CURRENT_SITE_INFO.videoType;
    const { selector, map } = videoTypeConfig;
    $(selector).val(map[videoType]);
    // change event to trigger processing_other fields
    $(selector)[0].dispatchEvent(new Event('change'));
    if (map[videoType] === 'Untouched') {
      const bdType = getBDType(size);
      $('select[name="processing_other"]').val(bdType);
    }
    // input event to trigger validation
    $(selector)[0].dispatchEvent(new Event('input'));
  }
}
// 兼容自动检测失败的情况
function handleNoAutoCheck (info) {
  const {
    mediaInfo, videoType,
  } = info;
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const { format = '', subtitles = [] } = getInfoFunc(mediaInfo);
  info.format = getFormat(format, videoType);
  ['source', 'videoCodec', 'format', 'resolution'].forEach(key => {
    const { selector = '', map } = CURRENT_SITE_INFO[key];
    if (map) {
      const mapValue = map[info[key]];
      $(selector).val(mapValue);

      if (key === 'videoCodec' && mapValue === 'Other') {
        document.querySelector(selector).dispatchEvent(new Event('change'));
        $('input[name="codec_other"]').val(info[key].toUpperCase());
      }
    } else {
      $(selector).val(info[key]);
    }
  });
  if (subtitles.length > 0) {
    $('#mixed_subtitles').attr('checked', true);
    $('input[name="subtitles[]"][type="checkbox"]').each(function () {
      const language = $(this).attr('id').replace(/^\S|(_\S)/g, letter => letter.replace('_', ' ').toUpperCase());
      if (subtitles.includes(language)) {
        $(this).attr('checked', true);
      }
    });
    const event = new Event('change');
    document.querySelector('#mixed_subtitles').dispatchEvent(event);
    const chineseLanguages = subtitles.filter(item => item.match(/Chinese|Traditional|Simplified/i));
    // 第一个判断条件不严谨 只有一个Chinese的情况也有可能为繁体
    if ((chineseLanguages.length === 1 && chineseLanguages[0] === 'Chinese')) {
      const selector = chineseLanguages[0].match(/Traditional/i) ? '#chinese_traditional' : '#chinese_simplified';
      $(selector).attr('checked', true);
    } else if (chineseLanguages.length >= 2) {
      $('#chinese_traditional,#chinese_simplified').attr('checked', true);
    }
  }
}
const getFormat = (format, videoType) => {
  if (videoType.match(/bluray/) && format !== 'iso') {
    format = 'm2ts';
  } else if (videoType.match(/dvd/)) {
    format = 'vob';
  }
  return format || 'mkv';
};

function transformInfo (info) {
  // mediainfo -> mediainfos
  if (info.mediaInfos.length === 0 && info.mediaInfo) {
    info.mediaInfos = [info.mediaInfo];
  }

  // mediainfos contains both mediainfo and bdinfo
  if (['encode', 'remux'].includes(info.videoType)) {
    const newMediaInfos = [];
    for (const mediaInfo of info.mediaInfos) {
      if (mediaInfo.match(/Disc Title|Disc Label/i)) {
        continue;
      }
      newMediaInfos.push(mediaInfo);
    }
    info.mediaInfos = newMediaInfos;
  }
};

function fillDescription (info) {
  const site = CURRENT_SITE_INFO;
  let description;
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite === 'BeyondHD') {
    description = info.originalDescription;
  } else {
    description = buildDescription(info);
  }
  $(site.description.selector).val(description);
  $(site.description.selector)[0].dispatchEvent(new Event('input'));
}
