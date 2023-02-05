import { PT_SITE } from '../const';
import {
  getBDType,
  getIMDBIdByUrl, getTMDBIdByIMDBId,
} from '../common';

import {
  matchSelectForm, buildPTPDescription,
} from './common';

const currentSiteInfo = PT_SITE.BeyondHD;

export default (info:TorrentInfo.Info) => {
  let title = info.title;
  if (info.videoType === 'dvd') {
    title = buildDVDTitle(info);
  }
  $(currentSiteInfo.name.selector).val(title);
  fillSpecs(info);
  fillTMDBId(info);
  fillMediaInfo(info);
  selectTag(info);
  fillDescription(info);
  $(currentSiteInfo.anonymous.selector).attr('checked', 'true');
  if (info.videoType === 'tvPack') {
    $('input[name="pack"]').attr('checked', 'true');
  }
  $('#torrent').on('change', () => {
    let title = info.title;
    if (info.videoType === 'dvd') {
      title = buildDVDTitle(info);
    }
    $(currentSiteInfo.name.selector).val(title);

    const categoryMap = currentSiteInfo.category.map;
    const categoryValueArr = categoryMap[info.category as keyof typeof categoryMap];
    const keyArray = ['resolution'];
    let finalSelectArray: string[] = [];
      type SelectKey = 'resolution'
      if (Array.isArray(categoryValueArr)) {
        finalSelectArray = [...categoryValueArr];
        keyArray.forEach(key => {
          finalSelectArray = matchSelectForm(currentSiteInfo as unknown as Site.SiteInfo, info, key as SelectKey, finalSelectArray);
          console.log(finalSelectArray);
          if (finalSelectArray.length === 1) {
            $(currentSiteInfo.category.selector).val(finalSelectArray[0]);
          }
        });
      } else {
        [...keyArray, 'category'].forEach(key => {
          matchSelectForm(currentSiteInfo as unknown as Site.SiteInfo, info, key as SelectKey, finalSelectArray);
        });
      }
  });
};
function fillTMDBId (info:TorrentInfo.Info) {
  const imdbId = getIMDBIdByUrl(info.imdbUrl || '');
  $(currentSiteInfo.imdb.selector).val(imdbId);
  getTMDBIdByIMDBId(imdbId).then(data => {
    $(currentSiteInfo.tmdb.selector).val(data.id);
  });
}
function fillMediaInfo (info:TorrentInfo.Info) {
  $(currentSiteInfo.mediaInfo.selector).val(info.mediaInfo);
}
function fillSpecs (info:TorrentInfo.Info) {
  const { category, videoType } = info;
  const isBluray = videoType.match(/bluray/i);
  // videoType和category交换
  info.category = videoType;
  info.videoType = category;
  // BHD需要细分蓝光类型
  if (isBluray || videoType === 'dvd') {
    let bdType = getBDType(info.size);
    if (videoType === 'uhdbluray' && bdType === 'BD50') {
      bdType = 'UHD50';
    }
    info.category = bdType || '';
  }
  const categoryMap = currentSiteInfo.category.map;
  const categoryValueArr = categoryMap[info.category as keyof typeof categoryMap];
  const keyArray = ['videoType', 'resolution', 'source', 'category'];
  let finalSelectArray:string[] = [];
  type SelectKey = 'videoType'|'resolution'|'source'
  if (Array.isArray(categoryValueArr)) {
    finalSelectArray = [...categoryValueArr];
    keyArray.forEach(key => {
      finalSelectArray = matchSelectForm(currentSiteInfo as unknown as Site.SiteInfo, info, key as SelectKey, finalSelectArray);
      if (finalSelectArray.length === 1) {
        $(currentSiteInfo.category.selector).val(finalSelectArray[0]);
      }
    });
  } else {
    [...keyArray, 'category'].forEach(key => {
      matchSelectForm(currentSiteInfo as unknown as Site.SiteInfo, info, key as SelectKey, finalSelectArray);
    });
  }
}
function selectTag (info:TorrentInfo.Info) {
  type Tag = keyof typeof currentSiteInfo.targetInfo.editionTags
  const editionTags = Object.keys(info.tags).map(tag =>
    info.tags[tag] && currentSiteInfo.targetInfo.editionTags[tag as Tag]).filter(Boolean);
    // Edition Select
  const editionOption = Array.from($('select[name="edition"] option')).map(opt => $(opt).attr('value'));
  if (editionTags.length > 0) {
    for (const tag of editionTags) {
      setTimeout(() => {
        document.querySelector(`.bhd-tag #${tag}`)?.dispatchEvent(new Event('click'));
      }, 0);
      if (editionOption.includes(tag)) {
        $('select[name="edition"]').val(tag);
      }
    }
  }
}

function fillDescription (info:TorrentInfo.Info) {
  let description = info.description;
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
    description = info.originalDescription || '';
  } else {
    description = buildDescription(info);
  }
  if (info.screenshots.length > 0) {
    info.screenshots.forEach(img => {
      const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](\n*)?`);
      if (description.match(regStr)) {
        description = description.replace(regStr, (p1, p2) => {
          return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
        });
      }
    });
  }
  $(currentSiteInfo.description.selector).val(description);
  $(currentSiteInfo.description.selector)[0].dispatchEvent(new Event('input'));
}
function buildDescription (info:TorrentInfo.Info) {
  let description = '';
  const { comparisons, screenshots } = info;
  if (comparisons && comparisons.length > 0) {
    for (const comparison of comparisons) {
      description += `\n${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]\n\n`;
    }
  }
  if (screenshots.length > 0) {
    description += `${screenshots.map(v => `[img]${v}[/img]`).join('\n')}\n\n`;
  }
  return description.trim();
}
function buildDVDTitle (info:TorrentInfo.Info) {
  const { movieName, movieAkaName, year, mediaInfo, size, audioCodec } = info;
  const scanType = mediaInfo.includes('NTSC') ? 'NTSC' : 'PAL';
  const dvdType = getBDType(size);
  const audioChannelNumber = mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)?.[1] || '2';
  const audio = audioCodec === 'ac3' ? 'dd' : audioCodec;
  const audioName = `${audio?.toUpperCase()}${audioChannelNumber === '6' ? '5.1' : `${audioChannelNumber}.0`}`;
  const akaName = movieAkaName ? ` AKA ${movieAkaName} ` : ' ';
  return `${movieName}${akaName}${year} ${scanType} ${dvdType} ${audioName}`;
}
