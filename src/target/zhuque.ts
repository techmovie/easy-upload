import { PT_SITE } from '../const';

import {
  buildPTPDescription,
} from './common';

const currentSiteInfo = PT_SITE.ZHUQUE;

export default (info: TorrentInfo.Info) => {
  const targetNode = document;

  // Options for the observer (which mutations to observe)
  const observer = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); // console.log(the changes)
    debugger;
    const i_evt = new Event('input');
    $(currentSiteInfo.name.selector).val(info.title);
    $(currentSiteInfo.name.selector)[0].dispatchEvent(i_evt);
    $(currentSiteInfo.subtitle.selector).val(info.subtitle)
    $(currentSiteInfo.subtitle.selector)[0].dispatchEvent(i_evt);
    $(currentSiteInfo.douban.selector).val(info.doubanUrl.match(/subject\/(\d+)/)[1]);
    $(currentSiteInfo.douban.selector)[0].dispatchEvent(i_evt);
    /* $("div.ant-select-item-option-content:contains('Movie')").click();// 默认先填Movie
    if (info.videoType === 'encode') {
      $("div.ant-select-item-option-content:contains('Encode')").click();
    } */
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
    observer.disconnect();
  });

  // 观察除了特性之外的所有变动
  observer.observe(targetNode, {
    childList: false, // 观察直接子节点
    subtree: true, // 及其更低的后代节点
    characterDataOldValue: false, // 将旧的数据传递给回调
  });
};
function fillMediaInfo (info: TorrentInfo.Info) {
  $(currentSiteInfo.mediaInfo.selector).val(info.mediaInfo);
  $(currentSiteInfo.mediaInfo.selector)[0].dispatchEvent(new Event('input'));
}

function fillDescription (info: TorrentInfo.Info) {
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
