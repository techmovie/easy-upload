import { CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getInfoFromBDInfo, replaceTorrentInfo, getInfoFromMediaInfo, getSourceFromTitle } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  const title = $('#main_table h1').eq(0).text().match(/[^[]+/)?.[0];
  TORRENT_INFO.title = formatTorrentTitle(title);
  const mediaTecInfo = getTorrentValueDom('类型').text();
  const { category, area, videoType } = getCategoryAndArea(mediaTecInfo);
  TORRENT_INFO.category = category;
  TORRENT_INFO.area = area;
  TORRENT_INFO.videoType = getVideoType(title, videoType);
  TORRENT_INFO.year = TORRENT_INFO.title.match(/\s([12][890]\d{2})/)?.[0];
  TORRENT_INFO.imdbUrl = getTorrentValueDom('IMDB').find('a').attr('href');
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);

  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const descriptionDom = $('#kt_d')[0];
  console.log(parseToBB(descriptionDom));
  const { logs, bdinfo, mediaInfo } = getLogsOrMediaInfo(descriptionDom);
  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
  TORRENT_INFO.bdinfo = isBluray ? '' : bdinfo;
  const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.tags = mediaTags;
  TORRENT_INFO.logs = logs;
  const sizeStr = getTorrentValueDom('尺寸').text().match(/\(((\d|,)+)\s*字节\)/i)?.[1];
  TORRENT_INFO.size = sizeStr.replaceAll(',', '');
  TORRENT_INFO.screenshots = getImages(descriptionDom);
};

const getCategoryAndArea = (mediaInfo) => {
  let category = ''; let area = ''; let videoType = '';
  if (mediaInfo.match(/电影/)) {
    category = 'movie';
  } else if (mediaInfo.match(/剧包/)) {
    category = 'tvpack';
  } else if (mediaInfo.match(/剧/)) {
    category = 'tv';
  } else if (mediaInfo.match(/记录/)) {
    category = 'documentary';
  } else if (mediaInfo.match(/综艺/)) {
    category = 'variety';
  } else if (mediaInfo.match(/体育/)) {
    category = 'sport';
  } else if (mediaInfo.match(/演唱会/)) {
    category = 'concert';
  } else if (mediaInfo.match(/动漫/)) {
    category = 'cartoon';
  }
  if (mediaInfo.match(/韩/)) {
    area = 'KR';
  } else if (mediaInfo.match(/日/)) {
    area = 'JP';
  } else if (mediaInfo.match(/华/)) {
    area = 'CN';
  } else if (mediaInfo.match(/欧/)) {
    area = 'US';
  }

  if (mediaInfo.match(/UHD原盘/i)) {
    videoType = 'uhdbluray';
  } else if (mediaInfo.match(/bluray原盘/i)) {
    videoType = 'bluray';
  } else if (mediaInfo.match(/DVD/i)) {
    videoType = 'dvd';
  }
  return {
    category,
    area,
    videoType,
  };
};
// 获取eac3to日志
const getLogsOrMediaInfo = (descriptionDom) => {
  const quoteList = descriptionDom.find('.sub').has('b:contains(Quote)').next().find('td');
  let logs = ''; let bdinfo = ''; let mediaInfo = '';
  for (let i = 0; i < quoteList.length; i++) {
    const quoteContent = $(quoteList[i]).html();
    if (quoteContent.match(/eac3to/)) {
      logs += `[quote]${formatQuoteContent(quoteContent)}[/quote]`;
    }
    if (quoteContent.match(/DISC/)) {
      bdinfo += formatQuoteContent(quoteContent);
    }
    if (quoteContent.match(/Unique ID/i)) {
      mediaInfo += formatQuoteContent(quoteContent);
    }
  }
  return {
    logs,
    bdinfo,
    mediaInfo,
  };
};
const formatQuoteContent = (content) => {
  return content.replace(/&nbsp;/g, ' ').replace(/<br>/g, '\n');
};
// 获取截图
const getImages = (descriptionDom) => {
  const links = descriptionDom.find('img.topic');
  console.log(links);
  const screenshots = [];
  const imgTimeout = setTimeout(() => {
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      const imageUrl = element.getAttribute('src');
      screenshots.push(imageUrl);
      if (index === links.length - 1) {
        clearTimeout(imgTimeout);
        TORRENT_INFO.screenshots = screenshots;
        replaceTorrentInfo();
      }
    }
  }, 8000);
};
function rgb2hex (rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4)
    ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : '';
}

function ensureProperColor (color) {
  if (/rgba?/.test(color)) return rgb2hex(color);
  return color;
}
function wrappingAround ({ pre, post, tracker }, pr, po) {
  const isPre = typeof pre !== 'undefined' && pre !== null;
  const isPost = typeof post !== 'undefined' && post !== null;
  if (isPre) {
    pre.unshift(pr);
  }
  if (isPost) {
    post.push(po);
  }
  if (isPre || isPost) {
    tracker.count++;
  }
}

const parseToBB = (node) => {
  const bbcodes = [];
  const pre = [];
  const post = [];
  const tracker = {
    count: 0,
  };
  const pp = wrappingAround.bind(null, { pre, post, tracker });
  let processBasedOnStyle = true;
  switch (node.nodeType) {
    case 1: { // tag
      switch (node.tagName.toUpperCase()) {
        case 'UL': { pp('[LIST]', '[/LIST]'); processBasedOnStyle = true; break; }
        case 'OL': { pp('[LIST=1]', '[/LIST]'); break; }
        case 'LI': { pp('[*]'); break; }
        case 'B': { pp('[B]', '[/B]'); break; }
        case 'U': { pp('[U]', '[/U]'); break; }
        case 'I': { pp('[I]', '[/I]'); break; }
        case 'STRIKE': { pp('[STRIKE]', '[/STRIKE]'); break; }
        case 'DIV': { pp(null, '\n'); break; }
        case 'P': { pp('\n', '\n'); break; }
        case 'BR': { pp('\n'); break; }
        case 'BLOCKQUOTE': { pp('[INDENT]', '[/INDENT]'); break; }
        case 'IMG': {
          const { src } = node;
          return `[IMG]${src}[/IMG]`;
        }
        case 'FONT': {
          const { color } = node;
          if (color) {
            pp(`[COLOR="${ensureProperColor(color)}"]`, '[/COLOR]');
          }
          break;
        }
        case 'A': {
          const { href } = node;
          if (href && href.length > 0) {
            pp(`[URL=${href}]`, '[/URL]');
          }
          break;
        }

        case 'H1': { pp('[B][SIZE="7"]', '[/SIZE][/B]\n'); break; }
        case 'H2': { pp('[B][SIZE="6"]', '[/SIZE][/B]\n'); break; }
        case 'H3': { pp('[B][SIZE="5"]', '[/SIZE][/B]\n'); break; }
        case 'H4': { pp('[B][SIZE="4"]', '[/SIZE][/B]\n'); break; }
        case 'TABLE':
        case 'TR': {
          pp(null, '\n');
          break;
        }
        case 'TH':
        case 'TD': {
          pp('| ', ' |'); break;
        }
        case 'IFRAME': {
          const { src } = node;
          if (/video/.test(src)) return `\n${src}\n`;
          return '';
        }
      }
      if (processBasedOnStyle === true) {
        const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
        if (textAlign) {
          switch (textAlign.toUpperCase()) {
            case 'LEFT': { pp('[LEFT]', '[/LEFT]'); break; }
            case 'RIGHT': { pp('[RIGHT]', '[/RIGHT]'); break; }
            case 'CENTER': { pp('[CENTER]', '[/CENTER]'); break; }
          }
        }
        if (fontWeight === 'bold' || ~~fontWeight >= 600) {
          pp('[B]', '[/B]');
        }
        if (fontStyle === 'italic') pp('[I]', '[/I]');
        if (textDecoration === 'underline') pp('[U]', '[/U]');
        if (color && color.trim() !== '') pp(`[COLOR="${ensureProperColor(color)}"]`, '[/COLOR]');
      }
      break;
    }
    case 3: {
      return node.textContent;
    } // textNode
    case 8: return null; // comment
    default: return null;
  }
  node.childNodes.forEach((cnode, i) => {
    const out = parseToBB(cnode);
    if (out !== null) {
      bbcodes.push(out);
    }
  });
  return pre.concat(bbcodes).concat(post).join('');
};
const getVideoType = (title, videoType) => {
  if (title.match(/HDTV/i)) {
    return 'hdtv';
  } else if (title.match(/web(-)*(dl|rip)/i)) {
    return 'web';
  } else if (title.match(/remux/i)) {
    return 'remux';
  } else if (title.match(/dvdrip/i)) {
    return 'dvdrip';
  } else if (title.match(/x264|x265/i)) {
    return 'encode';
  }
  return videoType;
};
const getTorrentValueDom = (key) => {
  return $(`#main_table td.heading:contains(${key})`).next();
}
;
