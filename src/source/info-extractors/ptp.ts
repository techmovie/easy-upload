import { GazelleExtractor } from './base/gazelle-base';
import { registry } from './registry';
import { convertSizeStringToBytes, GMFetch, getAreaCode } from '@/common';
import { formatTorrentTitle, replaceRegSymbols } from '@/source/helper/index';
import { CURRENT_SITE_INFO, PT_SITE } from '@/const';
import $ from 'jquery';

class PTPExtractor extends GazelleExtractor {
  priority = 10;
  tags: string[] = [];

  canHandle(siteName: string): boolean {
    return siteName === 'PTP';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    if (!this.torrentId) {
      return this.info;
    }
    this.getTorrentHeaderDom();
    this.extractMediaInfos();
    this.extractMovieNames();
    this.extractYear();
    this.extractTorrentLink();
    this.extractImdbUrl();
    this.extractScreenshotsForPTP();
    this.extractCategory();
    await this.extractDescription();
    this.extractComparisonsScreenshots();
    this.extractMetaInfo();
    this.extractMediaDetails();
    this.extractSize();
    this.extractPoster();
    this.extractTitle();
    this.extractArea();
    this.extractIsHardcodedSub();
    this.enhanceInfo();
    this.extractTags();
    return this.info;
  }

  protected getTorrentHeaderDom() {
    this.torrentHeaderDom = $(`#group_torrent_header_${this.torrentId}`);
  }

  protected extractMovieNames() {
    const ptpMovieTitle =
      $('.page__title')
        .text()
        ?.replace(/\[.+?\]/g, '')
        ?.replace(/by.+/, '')
        ?.trim() ?? '';
    const [movieName, movieAkaName = ''] = ptpMovieTitle.split(' AKA ');
    this.info.movieAkaName = movieAkaName;
    this.info.movieName = movieName;
  }

  protected extractMediaInfos() {
    const mediaInfoArray: string[] = [];
    $(`#torrent_${this.torrentId}`)
      .find('.mediainfo.mediainfo--in-release-description')
      .next('blockquote')
      .each(function () {
        const textContent = $(this).text();
        if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
          mediaInfoArray.push(textContent);
        }
      });
    this.info.mediaInfos = mediaInfoArray;
  }

  protected extractYear() {
    this.info.year =
      $('.page__title')
        .text()
        .match(/\[(\d+)\]/)?.[1] ?? '';
  }

  protected extractTorrentLink() {
    const torrentHeaderDom = $(`#group_torrent_header_${this.torrentId}`);
    const torrentLink = torrentHeaderDom
      .find('a[title="Download"]')
      .attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  protected extractImdbUrl() {
    this.info.imdbUrl = $('#imdb-title-link')?.attr('href') ?? '';
  }

  private extractScreenshotsForPTP() {
    const imgList = [];
    const torrentInfoPanel = $('.movie-page__torrent__panel');
    const imageDom = torrentInfoPanel.find('.bbcode__image');
    for (let i = 0; i < imageDom.length; i++) {
      // <a href><img />. e.g. ptp332121
      const parent = imageDom[i].parentElement;
      if (
        parent?.tagName === 'A' &&
        parent?.getAttribute('href')?.match(/\.png$/)
      ) {
        imgList.push(parent.getAttribute('href') || '');
      } else {
        const imgDom = imageDom[i];
        const imgSrc = imgDom.getAttribute('src') || imgDom.getAttribute('alt');
        imgList.push(imgSrc || '');
      }
    }
    this.info.screenshots = imgList;
  }

  protected extractCategory() {
    const typeMap: Record<string, string> = {
      'Feature Film': 'movie',
      'Short Film': 'movie',
      'Stand-up Comedy': 'other',
      Miniseries: 'tvPack',
      'Live Performance': 'concert',
      'Movie Collection': 'movie',
    };
    const ptpType = $('#torrent-table .basic-movie-list__torrent-edition__main')
      .eq(0)
      .text();
    this.info.category = typeMap[ptpType] || 'unknown';
  }

  protected formateDescription(
    description: string,
    screenshots: string[],
    mediaInfoArray: string[],
  ) {
    let descriptionData = description.replace(/\r\n/g, '\n');
    // 将每行前后的空格删除 避免bdinfo匹配失败
    descriptionData = descriptionData
      .split('\n')
      .map((line) => {
        return line.trim();
      })
      .join('\n')
      .replace(/http:\/\/ptpimg.me/g, 'https://ptpimg.me'); // torrents.php?action=get_description&id=284503
    const originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
      if (!descriptionData.match(regStr)) {
        // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
        const regLegacyFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
        if (descriptionData.match(regLegacyFormat)) {
          descriptionData = descriptionData.replace(
            regLegacyFormat,
            `[img]${screenshot}[/img]`,
          );
        } else {
          descriptionData = descriptionData.replace(
            new RegExp(`(?<!\\[img\\])${screenshot}`, 'ig'),
            `[img]${screenshot}[/img]`,
          );
        }
      }
    });
    descriptionData = descriptionData.replace(
      /\[(\/)?mediainfo\]/g,
      '[$1quote]',
    );
    descriptionData = descriptionData.replace(
      /\[(\/)?hide(?:=(.+?))?\]/g,
      (match, p1, p2) => {
        const slash = p1 || '';
        return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
      },
    );
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, '[$1quote]');
    descriptionData = descriptionData.replace(
      /\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g,
      '[quote][$2]$3[/$2][/quote]',
    );
    mediaInfoArray.forEach((mediaInfo) => {
      const regStr = new RegExp(
        `\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo).slice(0, 10000)}`,
        'i',
      );
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(
          mediaInfo,
          `[quote]${mediaInfo}[/quote]`,
        );
      }
    });
    if (this.info.category === 'concert') {
      descriptionData = `${$('#synopsis').text()}\n${descriptionData}`;
    }
    return {
      originalDescription,
      descriptionData,
    };
  }

  protected getReleaseGroup(source: string) {
    return source.match(/-(\w+?)$/)?.[1] ?? '';
  }

  protected async getDescriptionFromAPI(id: string) {
    const url = `${PT_SITE.PTP.url}/torrents.php?action=get_description&id=${id}`;
    const data = await GMFetch<string>(url);
    if (data) {
      const element = document.createElement('span');
      element.innerHTML = data;
      return element.innerText || element.textContent || '';
    }
    return '';
  }

  protected async extractDescription() {
    const { screenshots, mediaInfos } = this.info;
    const description = await this.getDescriptionFromAPI(this.torrentId);
    const { originalDescription, descriptionData } = this.formateDescription(
      description,
      screenshots,
      mediaInfos,
    );
    this.info.description = descriptionData;
    this.info.originalDescription = originalDescription;
  }

  protected extractComparisonsScreenshots() {
    let { description } = this.info;
    const comparisonArray =
      description.match(
        /(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/gi,
      ) || [];
    const comparisons: TorrentInfo.comparison[] = [];
    comparisonArray.forEach((item) => {
      description = description.replace(item, item.replace(/\s/g, ''));
      const reason = item.match(/(\n.*\n)?\[comparison=/i)?.[1] ?? '';
      const title = item.match(/\[comparison=(.*?)\]/i)?.[1] ?? '';
      const comparisonImgArray = item
        .replace(/\[\/?comparison(=(.+?))?\]/gi, '')
        .split(/[ \r\n]/);
      const imgs: string[] = [];
      Array.from(new Set(comparisonImgArray)).forEach((item) => {
        const formatImg = item.replace(/\s*/g, '');
        if (item.match(/^https?.+/)) {
          imgs.push(formatImg);
          description = description.replace(
            new RegExp(`(?<!(\\[img\\]))${item}`, 'gi'),
            `[img]${formatImg}[/img]`,
          );
        } else if (item.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ''));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason,
      });
    });
    this.info.comparisons = comparisons;
    this.info.description = description
      .replace(/\[comparison=(.+?)\]/gi, '\n[b]$1 Comparison:[/b]\n')
      .replace(/\[\/comparison\]/gi, '');
  }

  protected extractMetaInfo() {
    const infoArray = this.torrentHeaderDom
      .find('#PermaLinkedTorrentToggler')
      .text()
      .trim()
      .split(' / ');
    const [codes, container, source, resolution, ...otherInfo] = infoArray;
    const isRemux = otherInfo.includes('Remux');
    this.info.videoType =
      source === 'WEB'
        ? 'web'
        : this.getVideoType(container, isRemux, codes, source);
    this.info.resolution = resolution;
    this.info.source = this.getSource(source, codes, resolution);
    this.tags = otherInfo;
  }

  protected getVideoType = (
    container: string,
    isRemux: boolean,
    codes: string,
    source: string,
  ) => {
    let type = '';
    if (isRemux) {
      type = 'remux';
    } else if (codes.match(/BD50|BD25/gi)) {
      type = 'bluray';
    } else if (codes?.match(/BD66|BD100/gi)) {
      type = 'uhdbluray';
    } else if (source.match(/DVD/gi) && container.match(/MKV|AVI/gi)) {
      type = 'dvdrip';
    } else if (codes.match(/DVD5|DVD9/gi) && container.match(/VOB|ISO/gi)) {
      type = 'dvd';
    } else if (container.match(/MKV|MP4/i)) {
      type = 'encode';
    }
    return type;
  };

  protected extractTags() {
    const releaseName = this.torrentHeaderDom.data('releasename');
    const releaseGroup = this.getReleaseGroup(releaseName);
    const { editionTags } = PT_SITE.PTP.sourceInfo;
    const knownTags: Record<string, boolean> = {};
    const otherTags: Record<string, boolean> = {};
    for (const rawTag of this.tags) {
      const tag = editionTags[rawTag as keyof typeof editionTags];
      if (tag) {
        knownTags[tag] = true;
      } else if (
        tag === null ||
        releaseGroup.includes(rawTag) ||
        rawTag.match(/Freeleech|Halfleech|Half-Leech/i)
      ) {
        // skip
      } else {
        otherTags[rawTag] = true;
      }
    }
    this.info.tags = { ...knownTags };
    this.info.otherTags = otherTags;
  }

  protected extractTitle() {
    const releaseName = this.torrentHeaderDom.data('releasename');
    const formattedTitle = formatTorrentTitle(releaseName);
    this.info.title = formattedTitle;
  }

  protected extractSize() {
    const size =
      this.torrentHeaderDom
        .find('.nobr span')
        .attr('title')
        ?.replace(/[^\d]/g, '') ?? '';
    this.info.size = convertSizeStringToBytes(size);
  }

  protected extractArea() {
    let country: string[] = [];
    const matchArray = $('#movieinfo div')
      .text()
      .match(/Country:\s+([^\n]+)/);
    if (matchArray && matchArray.length > 0) {
      country = matchArray?.[1].replace(/(,)\s+/g, '$1').split(',');
    }
    this.info.area = getAreaCode(country?.[0]);
  }

  extractIsHardcodedSub() {
    const trumpReason = $(`#trumpable_${this.torrentId} span`).text() || '';
    this.info.hardcodedSub = trumpReason.includes('Hardcoded Subtitles');
  }

  protected extractPoster() {
    this.info.poster = $('.sidebar-cover-image').attr('src') || '';
  }
}

registry.register(new PTPExtractor());
