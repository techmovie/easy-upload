import { CURRENT_SITE_NAME } from '../const';
import { formatTorrentTitle } from '../common';
export class NexusPHPCommon {
  constructor () {
    this.titleDom = $('#top');
    this.torrentInfoDom = $('#outer');
    this.metaInfoDom = $("td.rowhead:contains('基本資訊'):last").next();
    this.subtitleDom = $("td.rowhead:contains('副標題'):last");
    this.descriptionDom = $('#kdescr').clone();
    this.imdbDom = $('#kimdb a:first');
    this.metaTextMap = {
      category: '分类',
      videoCodes: '編碼',
      resolution: '解析度',
      area: '地区',
      source: '来源',
      audioCodes: '音频编码',
    };
  }

  getPureText (dom) {
    return dom.prop('firstChild').trim();
  }

  getDescription () {
    const description = this.descriptionDom.find('fieldset').remove().text();
    if (description.includes('DISC INFO:')) {
      return description.split('DISC INFO')[0];
    }
    return description;
  }

  /**
 * 格式化视频分类
 * @param {videoType} videoType
 */
  getCategory (videoType) {
    if (videoType === '') {
      return '';
    }
    videoType = videoType.replace(/[.-]/g, '');
    if (videoType.match(/movie|电影/ig)) {
      return 'movie';
    } else if (videoType.match(/tv|剧集/ig)) {
      return 'tv';
    } else if (videoType.match(/综艺/ig)) {
      return 'variety';
    } else if (videoType.match(/document|'紀錄'/ig)) {
      return 'documentary';
    } else if (videoType.match(/sport|体育/ig)) {
      return 'sport';
    } else if (videoType.match(/MV|演唱/ig)) {
      return 'concert';
    } else if (videoType.match(/Anime|动画/ig)) {
      return 'cartoon';
    }
    return '';
  };

  /**
 * 格式化视频类型
 * @param {videoType} videoType
 * @return
 */
  getVideoType (videoType) {
    if (videoType === '') {
      return '';
    }
    videoType = videoType.replace(/[.-]/g, '');
    if (videoType.match(/uhd/ig)) {
      return 'uhdbluray';
    } else if (videoType.match(/remux/ig)) {
      return 'remux';
    } else if (videoType.match(/blu/ig)) {
      return 'bluray';
    } else if (videoType.match(/encode/ig)) {
      return 'encode';
    } else if (videoType.match(/web/ig)) {
      return 'web';
    } else if (videoType.match(/hdtv/ig)) {
      return 'hdtv';
    } else if (videoType.match(/dvdr/ig)) {
      return 'dvdrip';
    } else if (videoType.match(/dvd/ig)) {
      return 'dvd';
    }
    return '';
  };

  getBDOrMediaInfo () {
    const quoteList = this.descriptionDom.find('fieldset');
    let bdinfo = '';
    let mediaInfo = '';
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = quoteList[i].innerText;
      if (quoteContent.includes('DISC INFO') || quoteContent.includes('BiTRATE') || quoteContent.includes('BitRate')) {
        bdinfo += ` [quote] ${quoteContent.trim()}[/quote]`;
      }
      if (quoteContent.includes('General\nComplete name')) {
        mediaInfo += `[quote] ${quoteContent.trim()}[/quote]`;
      }
    }
    return {
      bdinfo,
      mediaInfo,
    };
  };

  getVideoCodes (codes) {
    if (codes.match(/H.264/)) {
      return 'h264';
    }
    return codes.replace(/[.-]/g, '').toLowerCase();
  };

  getResolution (resolution) {
    resolution = resolution.toLowerCase();
    if (resolution.match(/4k|2160/ig)) {
      return '2160p';
    } else if (resolution.match(/sd/ig)) {
      return '480p';
    }
    return resolution;
  };

  getAreaCode (area) {
    if (area.match(/CN|大陆|Mainland/i)) {
      return 'CN';
    } else if (area.match(/HK|香港|HongKong/i)) {
      return 'HK';
    } else if (area.match(/TW|台湾|Taiwan/i)) {
      return 'TW';
    } else if (area.match(/JP|日本|Japan/i)) {
      return 'JP';
    } else if (area.match(/KR|韩国|Korean/i)) {
      return 'KR';
    } else if (area.match(/US|EU/i)) {
      return 'US';
    }
    return 'OT';
  };

  /**
 *
 * @param {metaStr} metaStr 基本信息 栏中的各项数值
 * @param {type}} type 需要获取的 类型 文字 如 分辨率
 */
  getMeta (metaStr, type) {
    if (metaStr === '') {
      return '';
    }
    const metaArray = metaStr.split('   ');
    const metaInfo = {};
    for (let i = 0; i < metaArray.length; i++) {
      const [key, value] = metaArray[i].split(':');
      metaInfo[key.trim()] = value.trim();
    }
    return metaInfo[type];
  };

  getImages () {
    const imgList = [];
    const images = this.descriptionDom.find('img');
    for (let i = 0; i < images.length; i++) {
      const src = images[i].getAttribute('src');
      if (!src.match(/doubanio/)) {
        imgList.push(src);
      }
    }
    return imgList;
  };

  getTorrentInfo () {
    const torrentInfo = {
    };
    console.log(this);
    torrentInfo.title = formatTorrentTitle(this.getPureText(this.titleDom).replace());
    torrentInfo.subtitle = this.getPureText(this.subtitleDom);
    torrentInfo.description = this.getDescription();
    const matchYear = torrentInfo.title.match(/\s([12][90]\d{2})/);
    torrentInfo.year = matchYear ? matchYear[0] : '';
    torrentInfo.sourceSite = CURRENT_SITE_NAME;
    const metaInfo = this.metaInfoDom.text();
    const category = this.getMeta(metaInfo, this.metaTextMap.category);
    const videoCodes = this.getMeta(metaInfo, this.metaTextMap.videoCodes);
    const resolution = this.getMeta(metaInfo, this.metaTextMap.resolution);
    const area = this.getMeta(metaInfo, this.metaTextMap.area);
    torrentInfo.category = this.getCategory(category);
    torrentInfo.videoCodes = this.getVideoCodes(videoCodes);
    torrentInfo.resolution = this.getResolution(resolution);
    torrentInfo.area = this.getAreaCode(area);
    const descriptionText = this.descriptionDom.text();
    torrentInfo.fullDescription = descriptionText;
    const doubanMatch = descriptionText.match(/http(s){0,1}:\/\/movie.douban.com\/subject\/\d+/);
    if (this.imdbDom) {
      torrentInfo.imdbUrl = this.imdbDom.attr('href');
    } else {
      const imdbMatch = descriptionText.match(/http(s){0,1}:\/\/www.imdb.com\/title\/tt\d+/);
      torrentInfo.imdbUrl = imdbMatch ? imdbMatch[0] : '';
    }
    torrentInfo.doubanUrl = doubanMatch ? doubanMatch[0] : '';
    const { mediaInfo, bdinfo } = this.getBDOrMediaInfo();
    torrentInfo.bdinfo = bdinfo;
    torrentInfo.mediaInfo = mediaInfo;
    torrentInfo.screenshots = this.getImages();
    return torrentInfo;
  }
}
