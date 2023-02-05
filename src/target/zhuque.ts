import { PT_SITE } from '../const';

import {
  buildPTPDescription,
} from './common';

const currentSiteInfo = PT_SITE.ZHUQUE;

export default (info: TorrentInfo.Info) => {
  const targetNode = document;
  const insert = new MutationObserver(mutationRecords => {
    $('input.ant-select-selection-search-input[id]').each(function () { this.dispatchEvent(new Event('keydown')); });
    $(currentSiteInfo.name.selector).val(info.title);
    $(currentSiteInfo.name.selector)[0].dispatchEvent(new Event('input'));
    if (info.subtitle) {
      $(currentSiteInfo.subtitle.selector).val(info.subtitle);
      $(currentSiteInfo.subtitle.selector)[0].dispatchEvent(new Event('input'));
    }
    if (info.doubanUrl) {
      $(currentSiteInfo.douban.selector).val(info.doubanUrl.match(/subject\/(\d+)/)[1]);
      $(currentSiteInfo.douban.selector)[0].dispatchEvent(new Event('input'));
    }
    let screenshotStr = '';
    if (info.screenshots.length > 0) {
      info.screenshots.forEach(img => {
        screenshotStr += `${img}\n`;
      });
    }
    $(currentSiteInfo.screenshots.selector).val(screenshotStr);
    $(currentSiteInfo.screenshots.selector)[0].dispatchEvent(new Event('input'));
    fillMediaInfo(info);
    fillDescription(info);
    if (currentSiteInfo.tags) { // 加载顺序导致问题
      Object.keys(info.tags).forEach(key => {
        if (info.tags[key] && currentSiteInfo.tags[key]) {
          $(currentSiteInfo.tags[key]).parent().parent().click();
        }
      });
    }
    const selectNodeParent = document.querySelector('form');
    const select = new MutationObserver(mutationRecords => {
      console.log(mutationRecords);
      const { category: categoryConfig } = currentSiteInfo;
      $(`div.ant-select-item-option-content:contains(${categoryConfig.map[info.category as keyof typeof categoryConfig.map]})`).click();// 默认先填Movie
      const keyArray = ['videoType', 'videoCodec', 'audioCodec'] as const;
      keyArray.forEach(key => {
        const { map } = currentSiteInfo[key as Key];
        if (map) {
          const mapValue = map[info[key as Key] as keyof typeof map];
          $(`div.ant-select-item-option-content:contains(${mapValue})`).click();
        }
      });
      // const videoType = info.videoType.charAt(0).toUpperCase() + info.videoType.slice(1);
      // $(`div.ant-select-item-option-content:contains(${videoType})`).click();
      // $(`div.ant-select-item-option-content:contains(${info.videoCodec})`).click();
      // if (info.audioCodec) {
        //const audioCodec = info.audioCodec.toUpperCase();
        //$(`div.ant-select-item-option-content:contains(${audioCodec})`).click();
      //}
      $(`div.ant-select-item-option-content:contains(${info.resolution})`).click();
      select.disconnect();
    });
    select.observe(selectNodeParent, { attributes: false, childList: true, subtree: true, characterDataOldValue: false });
    insert.disconnect();
  });
  insert.observe(targetNode, { attributes: false, childList: false, subtree: true, characterDataOldValue: false });
};
function fillMediaInfo(info: TorrentInfo.Info) {
  $(currentSiteInfo.mediaInfo.selector).val(info.mediaInfo);
  $(currentSiteInfo.mediaInfo.selector)[0].dispatchEvent(new Event('input'));
}
function fillDescription(info: TorrentInfo.Info) {
  let description = info.description.replace(`[quote]${info.mediaInfo}[/quote]`, '');
  description = description.replaceAll(/\[url.*\[\/url\]/g, '').replaceAll(/\[img.*\[\/img\]/g, '').replaceAll(/\[\/?(i|b|center|quote|size|color)\]/g, '').replaceAll(/\[(size|color)\=#?[a-zA-Z0-9]*\]/g, '').replaceAll(/\n\n*/g, '\n');
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
  } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
    description = info.originalDescription || '';
  }
  $(currentSiteInfo.description.selector).val(description);
  $(currentSiteInfo.description.selector)[0].dispatchEvent(new Event('input'));
}
