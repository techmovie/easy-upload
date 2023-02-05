import {
  getFilterImages,
} from '../common';

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
      $(siteInfo[key].selector).val(valueArray.shift());
    }
    // 如果此时分类对应的值仍未数组 则继续过滤
    if (selectArray.length > 1) {
      selectArray = selectArray.filter(item => valueArray.includes(item));
    }
  } else if (siteInfo[key] && siteInfo[key].selector) {
    $(siteInfo[key].selector).val(valueArray);
  }
  return selectArray;
};
function buildPTPDescription (info:TorrentInfo.Info) {
  let text = info.originalDescription || '';

  // http://ptpimg
  text = text.replaceAll('http://ptpimg.me', 'https://ptpimg.me');

  // mediainfo
  for (const mediainfo of info.mediaInfos as string[]) {
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
    }
    const hideTitle = rawTitle ? `=${rawTitle}` : '';
    return `[hide${hideTitle}]\n[img]${imgs.join('[/img]\n[img]')}[/img]\n[/hide]\n`;
  });

  // [url][img] \n\n
  text = `${text}\n\n`;
  text = text.replaceAll(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
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
  text = text.replaceAll(/\n\s*\n/g, '\n\n');

  return text.trim();
}
// 是否为国内站点
const isChineseTacker = (siteType:string) => {
  return siteType.match(/NexusPHP|TTG|TNode/);
};
const filterNexusDescription = (info:TorrentInfo.Info) => {
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
  const allImages = getFilterImages(description);
  return `${filterDescription}\n${allImages.join('')}`;
};
export {
  getScreenshotsBBCode,
  getTeamName,
  matchSelectForm,
  buildPTPDescription,
  isChineseTacker,
  filterNexusDescription,
};
