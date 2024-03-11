
import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, HDB_TEAM } from '../const';
import {
  getBDType, getTMDBIdByIMDBId, getIMDBIdByUrl,
} from '../common';
import {
  getTeamName, matchSelectForm, filterNexusDescription, isChineseTacker, buildPTPDescription, filterEmptyTags,
} from './common';
import { SITE_OPERATIONS } from './site-operations';

type SelectKey = 'videoCodec' | 'videoType' | 'resolution' | 'source' | 'area'

interface SiteOperation {
  titleHandler?: (info: TorrentInfo.TargetTorrentInfo) => TorrentInfo.TargetTorrentInfo
  beforeHandler?: () => void
  handleDescription?: (info: TorrentInfo.TargetTorrentInfo) => string
  afterHandler?: (info: TorrentInfo.TargetTorrentInfo) => void
}

export default class ExportHelper {
  info: TorrentInfo.TargetTorrentInfo
  currentSiteInfo: Site.SiteInfo
  operation: SiteOperation
  constructor (info:TorrentInfo.TargetTorrentInfo) {
    this.info = info;
    this.currentSiteInfo = CURRENT_SITE_INFO as Site.SiteInfo;
    this.operation = SITE_OPERATIONS[CURRENT_SITE_NAME as keyof typeof SITE_OPERATIONS];
  }

  prepareToFillInfo () {
    if (this.operation?.beforeHandler) {
      this.operation.beforeHandler();
    }
  }

  fillTeamName () {
    const teamConfig = this.currentSiteInfo.team;
    const teamName = getTeamName(this.info);
    interface Team {
      [key: string]: string
    }
    if (teamName && teamConfig) {
      const formateTeamName = teamConfig.map[teamName.toLowerCase() as keyof Team];
      const matchValue = formateTeamName || teamConfig.map.other;
      if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === 'BTSCHOOL') {
        $(teamConfig.selector).val(teamConfig.map.hdbint);
        return;
      }
      if (CURRENT_SITE_NAME === 'HDAI' && !formateTeamName) {
        $('input[name="team"]').val(teamName);
        return;
      }
      if (CURRENT_SITE_NAME === 'UHDBits') {
        $('#team').val(teamName === 'other' ? 'Unknown' : teamName);
        return;
      }

      if (matchValue) {
        $(teamConfig.selector).val(matchValue.toLowerCase());
      }
    }
  }

  disableTorrentChange () {
    const nameSelector = this.currentSiteInfo.name?.selector ?? '';
    if (nameSelector.match(/^#\w+/)) {
      const nameDom = $(nameSelector).clone().attr('name', '').hide();
      $(nameSelector).attr('id', '').after(nameDom);
    }
  }

  getThanksQuote () {
    const isChineseSite = isChineseTacker(this.currentSiteInfo.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
    let thanksQuote = `转自[b]${this.info.sourceSite}[/b]，感谢原发布者！`;
    if (!isChineseSite) {
      thanksQuote = `Torrent from [b]${this.info.sourceSite}[/b].\nAll thanks to the original uploader！`;
    }
    return `[quote]${thanksQuote}[/quote]\n\n`;
  }

  getChineseName () {
    const { description, subtitle } = this.info;
    const originalName = description.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
    const translateName = description.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
    }
    if (chineseName === '' && subtitle !== '' && subtitle !== undefined) {
      chineseName = this.info?.subtitle?.replaceAll(/【|】.*/g, '').split('/')?.[0] ?? '';
    }
    return chineseName.trim();
  }

  torrentTitleHandler () {
    let fixedTitle = this.info.title.replace('H 265', 'H.265').replace('H 264', 'H.264');
    this.info.title = fixedTitle;
    if (this.operation?.titleHandler) {
      this.info = this.operation.titleHandler(this.info);
    }
    // 北洋站没有配置name
    if (this.currentSiteInfo.name) {
      if (CURRENT_SITE_NAME.match(/SSD|iTS|HDChina/)) {
        fixedTitle = fixedTitle.replace(/\s/ig, '.');
      } else if (CURRENT_SITE_NAME.match(/PuTao/)) {
        fixedTitle = `[${this.getChineseName()}]${fixedTitle}`;
      }
      $(this.currentSiteInfo.name.selector).val(fixedTitle);
    }
    this.info.title = fixedTitle;
    return this.info;
  }

  imdbHandler () {
    const imdbSelector = this.currentSiteInfo?.imdb?.selector;
    if (!imdbSelector) {
      return;
    }
    const imdbId = getIMDBIdByUrl(this.info.imdbUrl || '');
    this.info.imdbId = imdbId;

    if (CURRENT_SITE_NAME.match(/HDRoute|HDSpace/)) {
      $(imdbSelector).val(imdbId?.replace('tt', '') ?? '');
    } else if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|HDPOST|ACM|Aither|Concertos|MDU|LST/)) {
      let tmdbId = '';
      const fillIMDBId = this.currentSiteInfo.siteType === 'UNIT3D' ? imdbId.replace('tt', '') : imdbId;
      $(imdbSelector).val(fillIMDBId);
      getTMDBIdByIMDBId(imdbId).then(data => {
        tmdbId = data.id;
        $(this.currentSiteInfo.tmdb.selector).val(tmdbId);
      });
      if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU|LST/)) {
        $('#torrent').on('change', () => {
          $(imdbSelector).val(fillIMDBId);
          $(this.currentSiteInfo.tmdb.selector).val(tmdbId);
          $('#automal').val(0);
        });
      }
    } else {
      $(imdbSelector).val(this.info.imdbUrl || '');
    }
  }

  fillBasicAttributes () {
    // 填写四个常见的信息
    const commonInfoKeys = ['subtitle', 'douban', 'area', 'audioCodec'] as const;
    commonInfoKeys.forEach(key => {
      const siteInfo = this.currentSiteInfo[key];
      if (siteInfo && siteInfo.selector) {
        let value = this.info[key as 'subtitle' | 'area' | 'audioCodec'];
        if (key === 'douban') {
          value = this.info.doubanUrl;
        } else if (key === 'area' || key === 'audioCodec') {
          value = (siteInfo as Site.SelectorMap).map[value as string];
        }
        $(siteInfo.selector).val(value as string);
      }
    });
  }

  descriptionHandler () {
    let { mediaInfo, isBluray, screenshots = [], description = '', doubanInfo, poster } = this.info;
    // 内站直接填写完整简介
    if (description) {
      // 去简介前的空格和换行
      description = description.replace(/^(\s+)/g, '');
      if (isChineseTacker(this.currentSiteInfo.siteType) && CURRENT_SITE_NAME !== 'SSD') {
        // 需要拼接豆瓣信息的内站
        if (doubanInfo) {
          description = `${doubanInfo}\n${description}`;
        }
      } else {
        // 需要过滤掉中文信息
        const { sourceSiteType } = this.info;
        if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== 'Bib') {
          description = filterNexusDescription(this.info);
        }
      }
    }

    if (this.currentSiteInfo.mediaInfo) {
      if (CURRENT_SITE_NAME.match(/^(Blutopia|fearnopeer|Aither|MDU)/)) {
        const selector = isBluray ? 'textarea[name="bdinfo"]' : this.currentSiteInfo.mediaInfo.selector;
        $(selector).val(mediaInfo);
        description = description.replace(mediaInfo.trim(), '');
      } else if (isBluray && CURRENT_SITE_NAME.match(/^(SpeedApp)/)) {
        $(this.currentSiteInfo.bdinfo.selector).val(mediaInfo);
        this.info.mediaInfo = '';
      } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) { // HDB只填入mediainfo bdinfo放在简介里
        $(this.currentSiteInfo.mediaInfo.selector).val(mediaInfo);
        description = description.replace(mediaInfo.trim(), '');
      }
    }
    // 删除简介中的截图
    if (this.currentSiteInfo.screenshots) {
      screenshots.forEach(img => {
        if (description.includes(img)) {
          description = description.replace(img, '');
          if (!img.match(/\[url=.+?\[url]/)) {
            description = description.replace(/\[img\]\[\/img\]\n*/g, '');
          }
        }
      });
    }

    // 海报填写
    if (this.currentSiteInfo.poster) {
      if (!poster) {
        const doubanPosterImage = (description + doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
        if (doubanPosterImage && doubanPosterImage[1]) {
          poster = doubanPosterImage[1];
        } else {
          poster = description.match(/\[img\](.+?)\[\/img\]/)?.[1] ?? '';
        }
      }
      if (poster) {
        $(this.currentSiteInfo.poster).val(poster);
        if (CURRENT_SITE_NAME === 'HDRoute') {
          $('input[name="poster"]').val(poster);
          description = description.replace(poster, '');
        }
      }
    }
    // Blutopia可以通过设置为显示缩略图
    if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU/)) {
      if (this.info.sourceSite === 'PTP') {
        description = buildPTPDescription(this.info);
      }
      if (screenshots.length > 0) {
        screenshots.forEach(img => {
          const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](\n*)?`);
          if (description.match(regStr)) {
            description = description.replace(regStr, (p1, p2) => {
              return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
            });
          }
        });
      }
      // 对于一些即便是缩略图也比较大的图床,可以通过‘||’增加匹配
      if (description.match(/mobile\.webp\[\/img/gi)) {
        description = description.replace(/\[img\]/g, '[img=350x350]');
      }
    }

    if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither/)) {
      description = description.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, '[$2]$3[/$2]');
      description = description.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
        const slash = p1 || '';
        return p2 ? `${p2}: [${slash}spoiler]` : `[${slash}spoiler]`;
      });
    }

    if (this.operation?.handleDescription) {
      description = this.operation.handleDescription({
        ...this.info,
        description,
      });
    }

    // 过滤空标签
    description = filterEmptyTags(description);

    const thanksQuoteClosed = GM_getValue('easy-seed.thanks-quote-closed') || '';
    if (!thanksQuoteClosed && this.info.sourceSite !== undefined) {
      description = this.getThanksQuote() + description.trim();
    }
    $(this.currentSiteInfo.description.selector).val(description);

    this.info = {
      ...this.info,
      description,
    };
  }

  categoryHandler () {
    const { isBluray, category, videoType } = this.info;
    if (CURRENT_SITE_NAME.match(/ACM|Concertos/i)) {
      // videoType和category交换
      this.info.category = videoType;
      this.info.videoType = category;
      // BHD需要细分蓝光类型
      if (isBluray) {
        let bdType = getBDType(this.info.size);
        if (videoType === 'uhdbluray' && bdType === 'BD50') {
          bdType = 'uhd50';
        }
        this.info.category = bdType || '';
      }
    }
    if (this.currentSiteInfo.category) {
      const category = this.currentSiteInfo.category.map[this.info.category];
      const keyArray = ['videoCodec', 'videoType', 'resolution', 'source', 'area'];
      let finalSelectArray: string[] = [];
      if (Array.isArray(category)) {
        finalSelectArray = [...category];
        keyArray.forEach(key => {
          finalSelectArray = matchSelectForm(this.currentSiteInfo, this.info, key as SelectKey, finalSelectArray);
          if (finalSelectArray.length === 1) {
            $(this.currentSiteInfo.category.selector).val(finalSelectArray[0]);
          }
        });
      } else {
        [...keyArray, 'category'].forEach(key => {
          matchSelectForm(this.currentSiteInfo, this.info, key as SelectKey, finalSelectArray);
        });
      }
    }
  }

  fillRemainingInfo () {
    if (this.currentSiteInfo.format) {
      const formatData = this.currentSiteInfo.format;
      $(formatData.selector).val(formatData.map[this.info.format as string]);
    }
    if (this.currentSiteInfo.image) {
      $(this.currentSiteInfo.image.selector).val(this.info.image || '');
    }

    // 匿名勾选
    if (this.currentSiteInfo.anonymous) {
      const { selector, value = '' } = this.currentSiteInfo.anonymous;
      if (value) {
        $(selector).val(value);
      } else {
        $(selector).attr('checked', 'true');
      }
    }
    // 标签勾选
    if (this.currentSiteInfo.tags) {
      Object.keys(this.info.tags).forEach(key => {
        if (this.info.tags[key] && this.currentSiteInfo.tags[key]) {
          $(this.currentSiteInfo.tags[key]).attr('checked', 'true');
        }
      });
    }
    // 填入制作组
    this.fillTeamName();

    if (CURRENT_SITE_NAME.match(/HDHome|HDZone|PTHome|SoulVoice|1PTBA|HDAtmos|3Wmg/i)) {
      setTimeout(() => {
        const event = new Event('change');
        document.querySelector(this.currentSiteInfo.category.selector)?.dispatchEvent(event);
      }, 1000);
    }
  }

  dealWithMoreSites () {
    if (this.operation?.afterHandler) {
      this.operation.afterHandler(this.info);
    }
    // 对配置覆盖不到的地方进行专门处理
    if (CURRENT_SITE_NAME.match(/PTHome|1PTBA|52pt|Audiences/i)) {
      if (this.info.tags.diy) {
        let categoryValue = '';
        if (CURRENT_SITE_NAME.match(/Audiences|PTHome/)) {
          categoryValue = this.info.videoType === 'bluray' ? '14' : '13';
        } else if (CURRENT_SITE_NAME === '1PTBA') {
          categoryValue = this.info.videoType === 'bluray' ? '1' : '4';
        } else if (CURRENT_SITE_NAME === '52pt') {
          categoryValue = this.info.videoType === 'bluray' ? '2' : '12';
        }
        $(this.currentSiteInfo.videoType.selector).val(categoryValue);
      }
    }
    // 单独处理UNIT3D剧集
    if (this.currentSiteInfo.siteType === 'UNIT3D' && this.info.category.match(/tv/)) {
      const season = this.info.title.match(/S0?(\d{1,2})/i)?.[1] ?? 1;
      const episode = this.info.title.match(/EP?0?(\d{1,3})/i)?.[1] ?? 0;
      $('#season_number').val(season);
      $('#episode_number').val(episode);
    }
    // 处理HDH iPad
    if (CURRENT_SITE_NAME.match(/HDHome|HDZone/)) {
      if (this.info.title.match(/iPad/i)) {
        const categoryMap = {
          movie: '412',
          tv: '426',
          tvPack: '433',
          documentary: '418',
        };
        const ipadCat = categoryMap[this.info.category as keyof typeof categoryMap];
        if (ipadCat) {
          $('#browsecat').val(ipadCat);
        }
      }
    }
  }
}
