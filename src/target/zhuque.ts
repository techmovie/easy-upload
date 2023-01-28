import { PT_SITE } from '../const';

import {
  buildPTPDescription,
} from './common';

const currentSiteInfo = PT_SITE.ZHUQUE;

export default (info:TorrentInfo.Info) => {
  const i_evt = new Event('input');
  $('#form_item_subtitle').val(info.subtitle)
  $('#form_item_subtitle')[0].dispatchEvent(i_evt);
  $(currentSiteInfo.name.selector).val(info.title);
  $(currentSiteInfo.name.selector)[0].dispatchEvent(i_evt);
  $(currentSiteInfo.douban.selector).val(info.doubanUrl.match(/subject\/(\d+)/)[1]);
  let screenshotStr = '';
  if (info.screenshots.length > 0) {
    info.screenshots.forEach(img => {
      screenshotStr += `${img}\n`;
    });
  }

  $(currentSiteInfo.screenshots.selector).val(screenshotStr);
  fillMediaInfo(info);
  fillDescription(info);
  if (info.videoType === 'tvPack') {
    $('input[name="pack"]').attr('checked', 'true');
  }
};
function fillMediaInfo (info:TorrentInfo.Info) {
  $(currentSiteInfo.mediaInfo.selector).val(info.mediaInfo);
}

function fillDescription (info:TorrentInfo.Info) {
  let description = '';
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
    description = info.originalDescription || '';
  } else {
    // description = buildDescription(info);
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
