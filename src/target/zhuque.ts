import { PT_SITE } from '../const';
import {
  buildPTPDescription,
} from './common';
import {
  getIMDBIdByUrl,
} from '../common';
const currentSiteInfo = PT_SITE.ZHUQUE;
export default (info: TorrentInfo.Info) => {
  const targetNode = document;
  const imdbId = getIMDBIdByUrl(info.imdbUrl || '');
  const insert = new MutationObserver(mutationRecords => {
    $('input.ant-select-selection-search-input[id]').each(function () { this.dispatchEvent(new Event('keydown')); });
    $(currentSiteInfo.name.selector).val(info.title);
    $(currentSiteInfo.name.selector)[0].dispatchEvent(new Event('input'));
    $(currentSiteInfo.imdb.selector).val(imdbId);
    $(currentSiteInfo.imdb.selector)[0].dispatchEvent(new Event('input'));
    if (info.subtitle) {
      $(currentSiteInfo.subtitle.selector).val(info.subtitle);
      $(currentSiteInfo.subtitle.selector)[0].dispatchEvent(new Event('input'));
    }
    /* if (info.doubanUrl) {
      $(currentSiteInfo.douban.selector).val(info.doubanUrl.match(/subject\/(\d+)/)?.[1] ?? '');
      $(currentSiteInfo.douban.selector)[0].dispatchEvent(new Event('input'));
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
    const selectNodeParent = document.querySelector('form');
    const select = new MutationObserver(async mutationRecords => {
      const { category: categoryConfig } = currentSiteInfo;
      $(`div.ant-select-item-option-content:contains(${categoryConfig.map[info.category as keyof typeof categoryConfig.map]})`).click();
      const keyArray = ['videoType', 'videoCodec', 'audioCodec'] as const;
      type Key = typeof keyArray[number]

      select.disconnect();
      const sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
      const { tags } = currentSiteInfo;
      for (const tag in info.tags) {
        if (tags[tag as keyof typeof tags]) { await sleep(100).then((v) => $(tags[tag as keyof typeof tags])[0].click()); }
      }
      keyArray.forEach(key => {
        const { map } = currentSiteInfo[key as Key];
        if (map) {
          const mapValue = map[info[key as Key] as keyof typeof map];
          if (mapValue) {
            if (key !== 'videoType' && $(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
              $(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
            } else if (mapValue === 'Blu-ray') {
              $(`div.ant-select-item-option-content:contains(${mapValue})`)[2].click();
            } else if ($(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
              $(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
            }
          }
        }
      });
      if (info.resolution !== '') $(`div.ant-select-item-option-content:contains(${info.resolution})`)[0]?.click();
    });
    if (selectNodeParent) { select.observe(selectNodeParent, { attributes: false, childList: true, subtree: true, characterDataOldValue: false }); }
    insert.disconnect();
  });
  insert.observe(targetNode, { attributes: false, childList: false, subtree: true, characterDataOldValue: false });
};
function fillMediaInfo (info: TorrentInfo.Info) {
  $(currentSiteInfo.mediaInfo.selector).val(info.mediaInfo);
  $(currentSiteInfo.mediaInfo.selector)[0].dispatchEvent(new Event('input'));
}
function fillDescription (info: TorrentInfo.Info) {
  let description = info.description.replace(`[quote]${info.mediaInfo}[/quote]`, '').trim();
  if (info.mediaInfos && info.mediaInfos[1]) {
    info.mediaInfos.forEach(mediaInfo => {
      description = description.replace(`[quote]${mediaInfo}[/quote]`, '');
    });
  }
  if (info.sourceSite === 'PTP') {
    description = buildPTPDescription(info);
    description = description.replace(/\[comparison[^[]*\[\/comparison\]/gi, '');
  } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
    description = info.originalDescription || '';
  }
  description = description.replace(/\[url.*\[\/url\]/g, '').replace(/\[img.*\[\/img\]/g, '').replace(/\[\/?(i|b|center|quote|size|color)\]/g, '').replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, '').replace(/\n\n*/g, '\n');
  description = description.replace(/Screen(shot)?s:(\s*)\n?/gi, '').trim();
  if (info.sourceSite === 'KEEPFRDS') {
    description = description.replace(/截图对比:[^\n]*\n?/gi, '');
  }
  if (description !== '') description = `\`\`\`\n${description}\n\`\`\``; // quote everything
  if (info.comparisons && info.comparisons[0]) {
    for (const comparison in info.comparisons) {
      description += `\n对比图 ${info.comparisons[comparison].title}\n\n`;
      for (const img in info.comparisons[comparison].imgs) {
        description += `${info.comparisons[comparison].imgs[img]}\n\n`;
      }
    }
  }
  const thanksQuoteClosed = GM_getValue('easy-seed.thanks-quote-closed') || '';
  if (!thanksQuoteClosed && info.sourceSite !== undefined) {
    description = `\`\`\`\n转自 ${info.sourceSite} ，感谢原发布者！\n\`\`\`\n${description}`;
  }
  $(currentSiteInfo.description.selector).val(description);
  $(currentSiteInfo.description.selector)[0].dispatchEvent(new Event('input'));
}
