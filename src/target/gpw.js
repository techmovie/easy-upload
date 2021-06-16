import { CURRENT_SITE_INFO } from '../const';
import {
  getUrlParam,
} from '../common';

export default async (info) => {
  const site = CURRENT_SITE_INFO;
  const isUploadSuccess = !$('#mediainfo')[0]; // 上传成功页面

  if (isUploadSuccess) {
    return;
  }

  const isAddFormat = getUrlParam('groupid');
  if (!isAddFormat) {
    $(site.imdb.selector).val(info.imdbUrl || 0);
    $('#imdb_button').click();
    // for fillEditionInfo
    $('#upload .collapse').show();
  }

  fillEditionInfo(info);

  fillMediaInfo(info);

  fillScene(info);

  let description;
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite === 'BeyondHD') {
    description = info.originalDescription;
  } else {
    description = buildDescription(info);
  }
  $(site.description.selector).val(description);

  document.querySelector('#description-container [value=Preview]').click();
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
  const editionTags = Object.keys(info.tags).map(tag => site.targetInfo.editionTags[tag]).filter(Boolean);
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
  };

  $('[name="mediainfo[]"]')[0].dispatchEvent(new Event('change'));
}

function fillScene (info) {
  if (info.tags.scene) {
    $('#scene').prop('checked', true);
  }
}
