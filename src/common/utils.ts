import { toast } from 'sonner';
import { BROWSER_LANGUAGE, CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '../const';
import i18nConfig from '../i18n.json';

export const getUrlParam = (key:string) => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const regArray = location.search.substring(1).match(reg);
  if (regArray) {
    return decodeURIComponent(regArray[2]);
  }
  return '';
};
export const getSize = (size: string) => {
  if (!size) {
    return 0;
  }
  if (size.match(/T/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/G/i)) {
    return (parseFloat(size) * 1024 * 1024 * 1024) || 0;
  } else if (size.match(/M/i)) {
    return (parseFloat(size) * 1024 * 1024) || 0;
  } else if (size.match(/K/i)) {
    return (parseFloat(size) * 1024) || 0;
  }
  return 0;
};
export const $t = (key: string) => {
  const languageKey = BROWSER_LANGUAGE as 'en' | 'zh' | 'ko';
  return i18nConfig[languageKey][key as keyof typeof i18nConfig[typeof languageKey]] || key;
};

export const urlToFile = async (url: string): Promise<File> => {
  const filename = url.match(/\/([^/]+)$/)?.[1] ?? 'filename';
  const data = await fetch(url, {
    responseType: 'blob',
  });
  const file = new File([data], filename, { type: data.type });
  return file;
};
export const getValue = (key: string, needParse = true) => {
  const data = <string>GM_getValue(key);
  if (data && needParse) {
    return JSON.parse(data);
  }
  return data;
};
const rgb2hex = (rgb:string) => {
  const result = rgb?.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i) ?? [];
  return (result.length === 4)
    ? `#${
      (`0${parseInt(result[1], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(result[2], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(result[3], 10).toString(16)}`).slice(-2)}`
    : '';
};

const ensureProperColor = (color:string) => {
  if (/rgba?/.test(color)) return rgb2hex(color);
  return color;
};
// html转BBCode代码
export const htmlToBBCode = (node:Element) => {
  const bbCodes :string[] = [];
  const pre:string[] = [];
  const post:string[] = [];
  const pp = wrappingBBCodeTag.bind(null, { pre, post });

  switch (node.nodeType) {
    case 1: { // tag
      switch (node.tagName.toUpperCase()) {
        case 'SCRIPT': { return ''; }
        case 'UL': { pp(null, null); break; }
        case 'OL': { pp('[list=1]', '[/list]'); break; }
        case 'LI': {
          const { className } = node;
          if (CURRENT_SITE_INFO.siteType === 'UNIT3D' && className) {
            return `[quote]${node?.textContent?.trim()}[/quote]`;
          }
          pp('[*]', '\n'); break;
        }
        case 'B': { pp('[b]', '[/b]'); break; }
        case 'U': { pp('[u]', '[/u]'); break; }
        case 'I': { pp('[i]', '[/i]'); break; }
        case 'DIV': {
          const { className, id } = node;
          if (className === 'codemain') {
            // 兼容朋友
            if (node.children[0]) {
              pp('\n[quote]', '[/quote]');
              break;
            } else {
              return '';
            }
          } else if (className === 'hidden' && CURRENT_SITE_NAME === 'HDT') {
            pp('\n[quote]', '[/quote]'); break;
          } else if (className.match('spoiler') && CURRENT_SITE_NAME === 'KG') {
            if (className === 'spoiler-content') {
              pp('\n[quote]', '[/quote]');
            } else if (className === 'spoiler-header') {
              return '';
            }
            break;
          } else if (CURRENT_SITE_NAME === 'BeyondHD') {
            if (className === 'spoilerChild') {
              if (node.children[0].tagName.toUpperCase() === 'BLOCKQUOTE' || node.children[0].tagName.toUpperCase() === 'PRE')pp('\n', '');
              else pp('\n[quote]', '[/quote]');
            } else if (id === 'screenMain') {
              return '\n';
            } else if (className === 'spoilerHide') {
              return '';
            }
            break;
          } else if (className === 'spoiler-text' && CURRENT_SITE_INFO.siteType === 'AvistaZ') {
            pp('\n[quote]', '[/quote]'); break;
          } else if (className === 'spoiler-toggle' && CURRENT_SITE_INFO.siteType === 'AvistaZ') {
            return '';
          } else if (className.match(/codetop|highlight/) && CURRENT_SITE_INFO.siteType === 'Bdc') {
            return '';
          } else {
            pp('\n', '\n'); break;
          }
        }
        case 'P': { pp('\n'); break; }
        case 'BR': {
          if ((CURRENT_SITE_INFO.siteType === 'NexusPHP' && CURRENT_SITE_NAME !== 'OurBits') ||
            CURRENT_SITE_NAME?.match(/^(UHDBits|HDBits|BTN)/)) {
            pp('');
          } else {
            pp('\n');
          }
          break;
        }
        case 'SPAN': {
          const { className } = node;
          if (className.match(/size/)) {
            const matchSize = className.match(/size(\d)/)?.[1] ?? '';
            if (matchSize) {
              pp(`[size=${matchSize}]`, '[/size]');
            }
          } else {
            pp(null, null);
          }
          break;
        }
        case 'BLOCKQUOTE':
        case 'PRE':
        case 'FIELDSET': {
          pp('[quote]', '[/quote]'); break;
        }
        case 'CENTER': {
          pp('[center]', '[/center]'); break;
        }
        case 'TD': {
          if (CURRENT_SITE_NAME?.match(/^(TTG|HDBits|KG|HDSpace)/) || CURRENT_SITE_NAME === 'HDT' ||
            CURRENT_SITE_INFO.siteType === 'UNIT3D') {
            pp('[quote]', '[/quote]'); break;
          } else if (CURRENT_SITE_NAME.match(/EMP|Bdc/)) {
            pp(''); break;
          } else if (CURRENT_SITE_NAME === 'PTer') {
            pp(null, null); break;
          } else {
            return '';
          }
        }
        case 'IMG': {
          let imgUrl = '';
          const { src, title } = node as HTMLImageElement;
          const dataSrc = node.getAttribute('data-src') || node.getAttribute('data-echo');
          const layerSrc = node.getAttribute('layer-src');// HaresClub
          // blu等unit3d站点会把:m:转成icon图片
          if (title === ':m:') {
            return ':m:';
          }
          if (layerSrc) {
            imgUrl = layerSrc;
          } else if (dataSrc) {
            imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : `${location.origin}/${dataSrc}`;
          } else if (src && src.match(/broadcity\.eu\/images\/44846549843542759058\.png/)) {
            return '';
          } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
            imgUrl = src;
          } else {
            return '';
          }
          return `[img]${imgUrl}[/img]`;
        }
        case 'FONT': {
          const { color, size } = node as HTMLFontElement;
          if (color) {
            pp(`[color=${ensureProperColor(color)}]`, '[/color]');
          }
          if (size) {
            pp(`[size=${size}]`, '[/size]');
          }
          break;
        }
        case 'A': {
          const { href, textContent } = node as HTMLLinkElement;
          if (href && href.length > 0) {
            if (CURRENT_SITE_NAME === 'HDSpace') {
              const div = $(node).find('div');
              if (div[0] && div.attr('id')) {
                const imgUrl = div.find('img').attr('src');
                return `[url=${href}][img]${imgUrl}[/img][/url]`;
              }
            } else if (href.match(/javascript:void/) || (textContent === 'show' && CURRENT_SITE_NAME === 'HDT')) {
              return '';
            } else {
              pp(`[url=${href}]`, '[/url]');
            }
          }
          break;
        }
        case 'H1': { pp('[b][size="7"]', '[/size][/b]\n'); break; }
        case 'H2': { pp('[b][size="6"]', '[/size][/b]\n'); break; }
        case 'H3': { pp('[b][size="5"]', '[/size][/b]\n'); break; }
        case 'H4': { pp('[b][size="4"]', '[/size][/b]\n'); break; }
        case 'STRONG': { pp('[b]', '[/b]'); break; }
        case 'TABLE':
        {
          if (CURRENT_SITE_NAME === 'PTer' && node.className === 'table') {
            return '';
          }
          pp(''); break;
        }
        case 'TH': { pp(''); break; }
      }
      const { textAlign, fontWeight, fontStyle, textDecoration, color } = (node as HTMLElement).style;
      if (textAlign) {
        switch (textAlign.toUpperCase()) {
          case 'LEFT': { pp('[left]', '[/left]'); break; }
          case 'RIGHT': { pp('[right]', '[/right]'); break; }
          case 'CENTER': { pp('[center]', '[/center]'); break; }
        }
      }
      if (fontWeight === 'bold' || ~~fontWeight >= 600) {
        pp('[b]', '[/b]');
      }
      if (fontStyle === 'italic') pp('[i]', '[/i]');
      if (textDecoration === 'underline') pp('[u]', '[/u]');
      if (color && color.trim() !== '') pp(`[color=${ensureProperColor(color)}]`, '[/color]');
      break;
    }
    case 3: {
      if (node?.textContent?.trim()?.match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/)) {
        return '';
      }

      return node.textContent;
    } // textNode
    default: return null;
  }
  node.childNodes.forEach((node) => {
    const code = htmlToBBCode(node as Element);
    if (code) {
      bbCodes.push(code);
    }
  });
  return pre.concat(bbCodes).concat(post).join('');
};

interface TagParam {
  pre: (string|null)[]
  post: (string|null|undefined)[]
}
const wrappingBBCodeTag = ({ pre, post }:TagParam, preTag:string|null, poTag?:string|null) => {
  const isPre = typeof pre !== 'undefined' && pre !== null;
  const isPost = typeof post !== 'undefined' && post !== null;
  if (isPre) {
    pre.unshift(preTag);
  }
  if (isPost) {
    post.push(poTag);
  }
};

export const handleError = (error: unknown) => {
  const errorMessage = (error as Error).message || error;
  toast.error(errorMessage);
};
export interface RequestOptions {
  method?: 'GET' | 'POST'
  responseType?: 'json' | 'blob' | 'arraybuffer' | undefined
  headers?: Tampermonkey.RequestHeaders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  timeout?: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetch = (url: string, options?: RequestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      responseType: 'json',
      ...options,
      onload: (res) => {
        const { statusText, status, response } = res;
        if (status !== 200) {
          reject(new Error(statusText || `${status}`));
        } else {
          resolve(response);
        }
      },
      ontimeout: () => {
        reject(new Error('timeout'));
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};
