import {
  extractImgsFromBBCode,
} from '../common';
import { CURRENT_SITE_NAME } from '../const';
import $ from 'jquery';

const getScreenshotsBBCode = (imgArray:string[]) => {
  return imgArray.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
};
// 获取制作组名称
const getTeamName = (info:TorrentInfo.Info) => {
  const teamMatch = info.title.match(/-([^-]+)$/);
  let teamName = teamMatch?.[1]?.replace(/-/g, '')?.split('@') ?? '';
  if (teamName) {
    teamName = teamName.length > 1 ? teamName[1] : teamName[0];
  } else {
    teamName = 'other';
  }
  return teamName;
};
/*
* 各个字段之间取交集填入表单
* @param {siteInfo} 当前站点的配置
* @param {key} 要填入的字段key
* @param {movieInfo} 要填入的种子信息
* @param {selectArray} 此时分类对应的值
* @return 取当前key对应的value取交集之后的数组
* */
type SelectKey = 'videoCodec'|'videoType'|'resolution'|'source'|'area'
const matchSelectForm = (siteInfo:Site.SiteInfo, movieInfo:TorrentInfo.Info, key:SelectKey, selectArray:string[]) => {
  // 拿到字段所对应的值 可能为字符串或者数组
  const valueArray = siteInfo[key]
    ? siteInfo[key].map[movieInfo[key] as string]
    : '';
  if (Array.isArray(valueArray) && selectArray) {
    // 如果当前key下有selector属性 赋值为value第一项
    if (siteInfo[key].selector) {
      setSelectValue(siteInfo[key].selector, valueArray.shift());
    }
    // 如果此时分类对应的值仍未数组 则继续过滤
    if (selectArray.length > 1) {
      selectArray = selectArray.filter(item => valueArray.includes(item));
    }
  } else if (siteInfo[key] && siteInfo[key].selector) {
    setSelectValue(siteInfo[key].selector, valueArray);
  }
  return selectArray;
};
function setSelectValue (selector:string, value:string) {
  if (CURRENT_SITE_NAME === 'MTeam') {
    const select = document.querySelector(selector) as HTMLSelectElement;
    if (select) {
      const lastValue = select.value;
      select.value = value;
      const tracker = select._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);
      setTimeout(() => {
        Array.from(document.querySelectorAll('.ant-select-item-option-active .ant-select-item-option-content')).forEach(el => {
          el.dispatchEvent(new Event('click', { bubbles: true }));
        });
      }, 1000);
    }
  } else {
    $(selector).val(value);
  }
}
function buildPTPDescription (info:TorrentInfo.Info) {
  let text = info.originalDescription || '';

  // http://ptpimg
  text = text.replace(/http:\/\/ptpimg\.me/g, 'https://ptpimg.me');

  // mediainfo
  for (const mediainfo of info.mediaInfos as string[]) {
    text = text.replace(mediainfo, '');
  }
  text = text.replace(/\[(mediainfo|bdinfo)\][\s\S]*?\[\/(mediainfo|bdinfo)\]/gi, '');

  // imgUrl without [img]
  text = text.replace(/^(?!\[img\])https:\/\/ptpimg.me.*?png(?!\[\/img\])$/gim, (imgUrl) => {
    return `[img]${imgUrl}[/img]`;
  });
  // fix [comparison] [img], url同行
  text = text.replace(/\[comparison.*\][\s\S]*\[\/comparison\]/gi, (comparisonText) => {
    return comparisonText.replace(/\[img\]/g, '').replace(/\[\/img\]/g, '')
      .split('https://ptpimg.me').join('\nhttps://ptpimg.me').replace(/\s*\n\s*/g, '\n');
  });

  // old school comparison or more screenshots
  // [hide], [hide=]
  text = text.replace(/\[hide(.*)?\]\s*\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\[\/hide\]/gi, (imgText) => {
    const imgs = [];
    for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
      imgs.push(urlMatch[1]);
    }
    const rawTitle = imgText.match(/^\[hide=(.*?)\]/)?.[1] || '';
    const comparisonTitles = rawTitle.trim().split(/\||\/|,|vs\.?| - /i).map(v => v.trim());
    if (comparisonTitles.length >= 2) {
      return `[comparison=${comparisonTitles.join(', ')}]\n${imgs.join('\n')}\n[/comparison]\n`;
    }
    const hideTitle = rawTitle ? `=${rawTitle}` : '';
    return `[hide${hideTitle}]\n[img]${imgs.join('[/img]\n[img]')}[/img]\n[/hide]\n`;
  });

  // [url][img] \n\n
  text = `${text}\n\n`;
  text = text.replace(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
    const imgs = [];
    for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
      imgs.push(urlMatch[1]);
    }
    return `[hide]\n[img]${imgs.join('[/img]\n[img]')}[/img]\n[/hide]\n`;
  });

  // torrentid=88942
  text = text.replace(/\[img=(.+)?\](\n\n)?/gi, '[img]$1[/img]');

  // torrentid=851261
  text = text.replace(/\[(\/)?IMG\]/g, '[$1img]');
  // 多换行
  text = text.replace(/\n\s*\n/g, '\n\n');

  return text.trim();
}
// 是否为国内站点
const isChineseTacker = (siteType:string) => {
  return siteType.match(/NexusPHP|TTG|TNode|MTeam/);
};
const filterNexusDescription = async (info:TorrentInfo.Info) => {
  const { description } = info;
  let filterDescription = '';
  const quoteList = description.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
  if (quoteList && quoteList.length > 0) {
    quoteList.forEach(quote => {
      const isMediaInfoOrBDInfo = quote.match(/Disc\s?Size|\.mpls|Unique\s?ID|唯一ID|Resolution/i);
      if (!quote.match(/[\u4e00-\u9fa5]+/i) || isMediaInfoOrBDInfo) {
        filterDescription += `${quote}\n`;
      }
    });
  }
  const allImages = await extractImgsFromBBCode(description);
  return `${filterDescription}\n${allImages.join('')}`;
};
// 过滤空标签
const filterEmptyTags = (description: string): string => {
  // eslint-disable-next-line prefer-regex-literals
  const reg = new RegExp('\\[(?!info)([a-zA-Z]+\\d?)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]', 'g');
  if (description.match(reg)) {
    description = description.replace(reg, (_match, p1, p2) => {
      if (p1 === p2) {
        return '';
      }
      return _match;
    });
    return filterEmptyTags(description);
  }
  return description;
};
const fixTorrentTitle = (title:string, isWebSource: boolean) => {
  let fixedTitle = title.replace(' DoVi ', ' DV ').replace(' DDP ', ' DD+ ');
  if (isWebSource) fixedTitle = fixedTitle.replace(' HEVC', ' H.265');
  return fixedTitle;
};
const base64ToBlob = (base64:string, contentType = 'application/x-bittorrent', sliceSize = 512) => {
  const regStr = new RegExp(`data:${contentType};base64,`, 'i');
  const byteCharacters = window.atob(base64.replace(regStr, ''));
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
export {
  getScreenshotsBBCode,
  getTeamName,
  matchSelectForm,
  buildPTPDescription,
  isChineseTacker,
  filterNexusDescription,
  filterEmptyTags,
  fixTorrentTitle,
  setSelectValue,
  base64ToBlob,
};
