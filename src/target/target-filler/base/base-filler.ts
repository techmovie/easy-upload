import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import {
  base64ToBlob,
  filterEmptyTags,
  getTeamName,
  filterNexusDescription,
} from '@/target/helper/index';
import { SelectFillKey, siteIMDbTypeMap } from '@/target/types';
import { getIdByIMDbUrl, getTMDBDataByIMDBId } from '@/common';
import $ from 'jquery';

export abstract class BaseFiller {
  priority: number = 5;
  info: TorrentInfo.Info | null = null;
  siteInfo: Site.SiteInfo = CURRENT_SITE_INFO;
  imdbId: string = '';
  fill(info: TorrentInfo.Info): void {
    this.info = info;
    this.prepareToFillInfo();
    this.fillTorrentTitle();
    this.disableTorrentChange();
    this.fillTorrentFile();
    this.fillIMDb();
    this.fillDescription();
    this.fillBasicAttributes();
    this.fillCategory();
    this.fillRemainingInfo();
    this.postProcess();
  }

  disableTorrentChange() {
    const nameSelector = this.siteInfo.name?.selector ?? '';
    if (nameSelector.match(/^#\w+/)) {
      const nameDom = $(nameSelector).clone().attr('name', '').hide();
      $(nameSelector).attr('id', '').after(nameDom);
    }
  }

  protected fillTorrentFile() {
    const { torrentData, title } = this.info!;
    const { torrent } = this.siteInfo;
    if (!torrent) {
      return;
    }

    const fileInput = $(torrent.selector);
    if (torrentData && fileInput.length > 0) {
      const blob = base64ToBlob(torrentData);
      const torrentFileName = title?.replace(/\s/g, '.');
      const file = new File([blob], `${torrentFileName}.torrent`, {
        type: 'application/x-bittorrent',
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const uploadInput = fileInput[0] as HTMLInputElement;
      uploadInput.files = dataTransfer.files;
    }
  }

  protected prepareToFillInfo() {}

  protected processTorrentTitle() {
    const { title } = this.info!;
    const fixedTitle = title
      .replace('H 265', 'H.265')
      .replace('H 264', 'H.264');
    this.info!.title = fixedTitle;
  }

  protected fillTorrentTitle() {
    this.processTorrentTitle();
    const { name } = this.siteInfo;
    if (name) {
      $(name.selector).val(this.info!.title);
    }
  }

  protected async fillIMDb() {
    const { imdbUrl = '' } = this.info!;
    const { imdb: imdbConfig, tmdb: tmdbConfig } = this.siteInfo;
    this.imdbId = getIdByIMDbUrl(imdbUrl);
    if (!imdbConfig?.selector) {
      return;
    }
    const stripTTIMBb = this.imdbId?.replace('tt', '') ?? '';
    if (siteIMDbTypeMap[CURRENT_SITE_NAME] === siteIMDbTypeMap.StripTT) {
      $(imdbConfig.selector).val(stripTTIMBb);
    } else if (siteIMDbTypeMap[CURRENT_SITE_NAME] === siteIMDbTypeMap.UNIT3D) {
      $(imdbConfig.selector).val(stripTTIMBb);
      const { id: imdbId } = await getTMDBDataByIMDBId(this.imdbId);
      $(tmdbConfig.selector).val(imdbId);
      $('#torrent').on('change', () => {
        $(imdbConfig).val(stripTTIMBb);
        $(tmdbConfig.selector).val(imdbId);
        $('#automal').val(0);
      });
    } else {
      $(imdbConfig.selector).val(imdbUrl);
    }
  }

  protected processDescription() {
    const { description, sourceSite } = this.info!;
    let fixedDescription = description.replace(/^(\s+)/g, '');
    fixedDescription = filterEmptyTags(fixedDescription);
    fixedDescription = this.addOrFilterDescription(fixedDescription);
    fixedDescription = this.fillMediaInfo(fixedDescription);
    fixedDescription = this.fillScreenshots(fixedDescription);
    fixedDescription = this.fillPoster(fixedDescription);
    const thanksQuoteClosed =
      GM_getValue('easy-seed.thanks-quote-closed') || '';
    if (!thanksQuoteClosed && sourceSite) {
      fixedDescription = this.getThanksQuote() + description.trim();
    }
    this.info!.description = fixedDescription;
  }

  private addOrFilterDescription(description: string) {
    const { doubanInfo, sourceSiteType, screenshots } = this.info!;

    const IfAddDoubanInfo =
      this.isChineseTacker(this.siteInfo.siteType) &&
      CURRENT_SITE_NAME !== 'SSD';
    const ifFilterNexusDescription =
      this.isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== 'Bib';

    if (IfAddDoubanInfo) {
      if (doubanInfo) {
        description = `${doubanInfo}\n${description}`;
      }
    } else if (ifFilterNexusDescription) {
      description = filterNexusDescription(description, screenshots);
    }
    return description;
  }

  protected fillMediaInfo(description: string) {
    const { mediaInfo } = this.siteInfo;
    if (!mediaInfo) {
      return description;
    }
    const { mediaInfos, videoType } = this.info!;
    if (!mediaInfos || mediaInfos.length === 0) {
      return description;
    }
    const isBluray = /bluray/i.test(videoType);
    if (this.siteInfo.siteType === 'UNIT3D') {
      const selector = isBluray
        ? 'textarea[name="bdinfo"]'
        : this.siteInfo.mediaInfo.selector;
      $(selector).val(mediaInfos[0]);
      description = description.replace(mediaInfos[0].trim(), '');
    } else if (isBluray && CURRENT_SITE_NAME.match(/^(SpeedApp)/)) {
      $(this.siteInfo.bdinfo.selector).val(mediaInfos[0]);
      this.info!.mediaInfos = [];
    } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) {
      // HDB只填入mediainfo bdinfo放在简介里
      $(this.siteInfo.mediaInfo.selector).val(mediaInfos[0]);
      description = description.replace(mediaInfos[0].trim(), '');
    }
    return description;
  }

  private fillScreenshots(description: string) {
    const { screenshots } = this.info!;
    if (this.siteInfo.screenshots) {
      screenshots.forEach((img) => {
        if (description.includes(img)) {
          description = description.replace(img, '');
          if (!img.match(/\[url=.+?\[url]/)) {
            description = description.replace(/\[img\]\[\/img\]\n*/g, '');
          }
        }
      });
    }
    return description;
  }

  private fillPoster(description: string) {
    let { doubanInfo, poster } = this.info!;
    if (this.siteInfo.poster) {
      if (!poster) {
        const doubanPosterImage = (description + doubanInfo).match(
          /\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/,
        );
        if (doubanPosterImage && doubanPosterImage[1]) {
          poster = doubanPosterImage[1];
        } else {
          poster = description.match(/\[img\](.+?)\[\/img\]/)?.[1] ?? '';
        }
      }
      if (poster) {
        $(this.siteInfo.poster).val(poster);
        if (CURRENT_SITE_NAME === 'HDRoute') {
          $('input[name="poster"]').val(poster);
          description = description.replace(poster, '');
        }
      }
    }
    return description;
  }

  protected fillDescription() {
    this.processDescription();
    $(this.siteInfo.description?.selector).val(this.info!.description);
  }

  private getThanksQuote() {
    const { sourceSite } = this.info!;
    const isChineseSite =
      this.isChineseTacker(this.siteInfo.siteType) ||
      CURRENT_SITE_NAME.match(/HDPOST|GPW/);
    let thanksQuote = `转自[b]${sourceSite}[/b]，感谢原发布者！`;
    if (!isChineseSite) {
      thanksQuote = `Torrent from [b]${sourceSite}[/b].\nAll thanks to the original uploader!`;
    }
    return `[quote]${thanksQuote}[/quote]\n\n`;
  }

  private isChineseTacker = (siteType: string) => {
    return siteType.match(/NexusPHP|TTG|TNode|MTeam/);
  };

  protected fillBasicAttributes() {
    const commonInfoKeys = [
      'subtitle',
      'douban',
      'area',
      'audioCodec',
    ] as const;
    const { doubanUrl } = this.info!;
    commonInfoKeys.forEach((key) => {
      const siteInfo = this.siteInfo[key];
      if (siteInfo && siteInfo.selector) {
        let value = this.info![key as 'subtitle' | 'area' | 'audioCodec'];
        if (key === 'douban') {
          value = doubanUrl;
        } else if (key === 'area' || key === 'audioCodec') {
          value = (siteInfo as Site.SelectorMap).map[value as string] as string;
        }
        $(siteInfo.selector).val(value || '');
      }
    });
  }

  private mapAndFilterSelectValues = (
    key: SelectFillKey,
    selectArray: string[],
  ) => {
    const { siteInfo } = this;

    if (!siteInfo[key] || !this.info![key]) {
      return selectArray || [];
    }

    const mappedValue = siteInfo[key].map?.[this.info![key] as string];

    if (!mappedValue) {
      return selectArray || [];
    }

    if (Array.isArray(mappedValue)) {
      // if there is a selector, set the first value
      if (siteInfo[key].selector) {
        // create a new array to avoid modifying the original array
        const valuesCopy = [...mappedValue];
        const firstValue = valuesCopy.shift();
        this.setSelectValue(siteInfo[key].selector, firstValue || '');
      }

      // only if selectArray has multiple values, filter it
      if (Array.isArray(selectArray) && selectArray.length > 1) {
        return selectArray.filter((item) => mappedValue.includes(item));
      }

      return selectArray || [];
    } else if (siteInfo[key].selector) {
      this.setSelectValue(siteInfo[key].selector, mappedValue);
      return selectArray || [];
    }

    return selectArray || [];
  };

  protected setSelectValue(selector: string, value: string) {
    const selectElement = $(selector);
    if (selectElement.length > 0) {
      selectElement.val(value).trigger('change');
    }
  }

  protected fillCategory() {
    const categoryConfig = this.siteInfo!.category;
    const { category: categoryKey } = this.info!;

    if (!categoryConfig || !categoryKey) {
      return;
    }
    const categoryMapValue = categoryConfig.map[categoryKey];
    const keyArray = [
      'videoCodec',
      'videoType',
      'resolution',
      'source',
      'area',
    ];
    let finalSelectArray: string[] = [];
    if (Array.isArray(categoryMapValue)) {
      finalSelectArray = [...categoryMapValue];
      keyArray.forEach((key) => {
        finalSelectArray = this.mapAndFilterSelectValues(
          key as SelectFillKey,
          finalSelectArray,
        );
        if (finalSelectArray.length === 1) {
          this.setSelectValue(categoryConfig.selector, finalSelectArray[0]);
        }
      });
    } else {
      [...keyArray, 'category'].forEach((key) => {
        this.mapAndFilterSelectValues(key as SelectFillKey, finalSelectArray);
      });
    }
  }

  protected fillRemainingInfo() {
    const {
      format: formatConfig,
      image: imageConfig,
      anonymous: anonymousConfig,
      tags: tagsConfig,
    } = this.siteInfo;
    const { format, image, tags } = this.info!;
    if (formatConfig) {
      $(formatConfig.selector).val(formatConfig.map[format as string]);
    }

    if (imageConfig) {
      $(imageConfig.selector).val(image || '');
    }

    if (anonymousConfig) {
      const { selector, value = '' } = anonymousConfig;
      if (value) {
        $(selector).val(value);
      } else {
        $(selector).attr('checked', 'true');
      }
    }

    if (tagsConfig) {
      Object.keys(tags).forEach((key) => {
        if (tags[key as keyof TorrentInfo.MediaTags] && tagsConfig[key]) {
          $(tagsConfig[key]).attr('checked', 'true');
        }
      });
    }

    this.fillTeamName();
  }

  protected fillTeamName() {
    const teamConfig = this.siteInfo.team;
    const { title } = this.info!;
    if (!teamConfig || !title) {
      return;
    }
    const teamName = getTeamName(title);
    if (!teamName) {
      return;
    }
    if (teamName && teamConfig) {
      const formateTeamName = teamConfig.map[teamName.toLowerCase()];
      const matchValue = (formateTeamName || teamConfig.map.other) as string;
      if (matchValue) {
        $(teamConfig.selector).val(matchValue.toLowerCase());
      }
    }
  }

  protected postProcess() {}
}
