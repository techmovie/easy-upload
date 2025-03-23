import { GazelleExtractor } from './base/gazelle-base';
import { registry } from './registry';
import {
  GMFetch,
  getAreaCode,
} from '@/common';
import {
  formatTorrentTitle,
} from '@/source/helper/index';
import { CURRENT_SITE_INFO, PT_SITE } from '@/const';
import $ from 'jquery';
import {
  GPWSiteTorrentInfo,
  GPWSiteGroup,
  GPWSiteTorrent,
} from '@/source/types/gpw';

class GPWExtractor extends GazelleExtractor {
  priority = 10;
  private _siteTorrentInfo: GPWSiteTorrent | null = null;
  private _siteGroupInfo: GPWSiteGroup | null = null;
  tags: string[] = [];

  private get siteGroupInfo (): GPWSiteGroup {
    if (!this._siteGroupInfo) {
      throw new Error('siteGroupInfo is not initialized');
    }
    return this._siteGroupInfo;
  }

  private get siteTorrentInfo (): GPWSiteTorrent {
    if (!this._siteTorrentInfo) {
      throw new Error('siteTorrentInfo is not initialized');
    }
    return this._siteTorrentInfo;
  }

  async extract (): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    this.getTorrentHeaderDom();
    const data = await this.getSiteTorrentInfoByAPI();
    if (!data) {
      return this.info;
    }

    this._siteTorrentInfo = data.torrent;
    this._siteGroupInfo = data.group;

    this.extractTitle();
    this.extractMovieNames();
    this.extractMediaInfos();
    this.extractArea();
    this.extractDoubanUrl();
    this.extractImdbUrl();
    this.extractScreenshots();
    this.extractCategory();
    this.extractMetaInfo();
    this.extractDescription();
    this.extractComparisonsScreenshots();

    this.extractTags();
    this.extractIsHardcodedSub();

    this.extractMediaDetails();

    const { size } = this.siteTorrentInfo;
    const { name, year, conver: poster } = this.siteGroupInfo;
    this.info.size = size;
    this.info.movieName = name;
    this.info.year = year;
    this.info.poster = poster;

    return this.info;
  }

  canHandle (siteName: string): boolean {
    return siteName === 'GPW';
  }

  async getSiteTorrentInfoByAPI () {
    const { status, response } = await GMFetch<GPWSiteTorrentInfo>(`/ajax.php?action=torrent&id=${this.torrentId}`, {
      responseType: 'json',
    });
    if (status !== 'success' || !response || !response.group || !response.torrent) {
      return null;
    }
    return response;
  }

  protected getTorrentHeaderDom () {
    this.torrentHeaderDom = $(`#torrent${this.torrentId}`);
  }

  extractTitle () {
    let { fileList, filePath } = this.siteTorrentInfo;
    fileList = fileList!.replace(/\.\w+?{{{\d+}}}/g, '');
    const title = formatTorrentTitle(filePath!.replace(/\[.+\]/g, '') || fileList);
    this.info.title = title;
  }

  protected extractMediaInfos () {
    this.info.mediaInfos = this.siteTorrentInfo.mediainfos.map(info => info.replace(/\r\n/g, '\n'));
  }

  protected extractTorrentLink () {
    const torrentLink = this.torrentHeaderDom.find('a[href*="action=download"]').attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  protected extractImdbUrl () {
    const { imdbId } = this.siteGroupInfo;
    this.info.imdbUrl = imdbId ? `https://www.imdb.com/title/${imdbId}` : '';
  }

  protected extractDoubanUrl () {
    const { doubanId } = this.siteGroupInfo;
    this.info.doubanUrl = doubanId ? `https://movie.douban.com/subject/${doubanId}` : '';
  }

  protected extractScreenshots () {
    const imgList:string[] = [];
    const imageDom = this.torrentHeaderDom.next('.TableTorrent-rowDetail').find('.scale_image');
    for (let i = 0; i < imageDom.length; i++) {
    // <a href><img />. e.g. ptp332121
      const parent = imageDom[i].parentElement;
      if (parent?.tagName === 'A' && parent?.getAttribute('href')?.match(/\.png$/)) {
        imgList.push((parent as HTMLLinkElement).getAttribute('href') || '');
      } else {
        imgList.push((imageDom[i] as HTMLImageElement).getAttribute('src') || '');
      }
    }
    this.info.screenshots = imgList;
  }

  protected extractCategory () {
    const { releaseType } = this.siteGroupInfo;
    const typeMap: Record<string, string> = {
      长片: 'movie',
      短片: 'movie',
      单口喜剧: 'other',
      迷你剧: 'tvPack',
      现场演出: 'concert',
      电影集: 'movie',
    };
    this.info.category = typeMap[releaseType] || 'unknown';
  }

  protected formateDescription (description: string, screenshots: string[], mediaInfoArray: string[]) {
    const element = document.createElement('span');
    element.innerHTML = description;
    let descriptionData = element.textContent || '';
    descriptionData = descriptionData?.replace(/\r\n/g, '\n');
    // 将每行前后的空格删除 避免bdinfo匹配失败
    descriptionData = descriptionData.split('\n').map(line => {
      return line.trim();
    }).join('\n');
    const originalDescription = descriptionData;
    screenshots.forEach(screenshot => {
      const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, 'i');
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(new RegExp(screenshot, 'g'), `[img]${screenshot}[/img]`);
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
      const slash = p1 || '';
      return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, '[$1quote]');
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, '[$2]$3[/$2]');

    mediaInfoArray.forEach(mediaInfo => {
      descriptionData += `[quote]${mediaInfo}[/quote]`;
    });
    if (this.info.category === 'concert') {
      descriptionData = `${$('#synopsis').text()}\n${descriptionData}`;
    }
    return {
      originalDescription,
      descriptionData,
    };
  }

  protected getReleaseGroup (source: string) {
    return source.match(/-(\w+?)$/)?.[1] ?? '';
  }

  protected async extractDescription () {
    const { screenshots, mediaInfos } = this.info;
    const { description } = this.siteTorrentInfo;
    const {
      originalDescription,
      descriptionData,
    } = this.formateDescription(description, screenshots, mediaInfos);
    this.info.description = descriptionData;
    this.info.originalDescription = originalDescription;
  }

  protected extractComparisonsScreenshots () {
    let { description } = this.info;
    const comparisonArray = description.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
    const comparisons: TorrentInfo.comparison[] = [];
    comparisonArray.forEach(item => {
      description = description.replace(item, item.replace(/\s/g, ''));
      const reason = item.match(/(\n.*\n)?\[comparison=/i)?.[1] ?? '';
      const title = item.match(/\[comparison=(.*?)\]/i)?.[1] ?? '';
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, '').split(/[ \r\n]/);
      const imgs:string[] = [];
      Array.from(new Set(comparisonImgArray)).forEach(item => {
        const formatImg = item.replace(/\s*/g, '');
        if (item.match(/^https?.+/)) {
          imgs.push(formatImg);
          description = description.replace(new RegExp(`(?<!(\\[img\\]))${item}`, 'gi'), `[img]${formatImg}[/img]`);
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
    this.info.description = description.replace(/\[comparison=(.+?)\]/ig, '\n[b]$1 Comparison:[/b]\n').replace(/\[\/comparison\]/ig, '');
  }

  protected extractMetaInfo () {
    const { source, resolution, processing, container, remasterTitle } = this.siteTorrentInfo;
    const infoArray = remasterTitle.split(' / ');
    const isRemux = processing.includes('Remux');
    this.info.videoType = source === 'WEB' ? 'web' : this.getVideoType(container, isRemux, source, resolution, processing);
    this.info.source = this.getSource(source, processing, resolution);
    this.tags = infoArray.filter(Boolean);
  }

  getVideoType (container:string, isRemux:boolean, source:string, resolution:string, processing:string) {
    if (isRemux) {
      return 'remux';
    } else if (processing.match(/DIY/ig)) {
      return resolution === '2160p' ? 'uhdbluray' : 'bluray';
    } else if (processing.match(/BD50|BD25/ig)) {
      return 'bluray';
    } else if (processing.match(/BD66|BD100/ig) || (source.match(/Blu-ray/i) && processing.match(/DIY/i))) {
      return 'uhdbluray';
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      return 'dvdrip';
    } else if (processing.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      return 'dvd';
    } else if (container.match(/MKV|MP4/i)) {
      return 'encode';
    }
    return '';
  };

  protected extractTags () {
    const { editionTags } = PT_SITE.GPW.sourceInfo;
    const knownTags: Record<string, boolean> = {};
    const otherTags:Record<string, boolean> = {};
    for (const rawTag of this.tags) {
      const tag = editionTags[rawTag as keyof typeof editionTags];
      if (tag) {
        knownTags[tag] = true;
      } else if (rawTag) {
        otherTags[rawTag] = true;
      }
    }
    this.info.tags = { ...knownTags };
    this.info.otherTags = otherTags;
  }

  protected extractArea () {
    const regionList = this.siteGroupInfo.region.split(',');
    this.info.area = getAreaCode(regionList?.[0]);
  }

  extractIsHardcodedSub () {
    const trumpReason = $(`#trumpable_${this.torrentId} span`).text() || '';
    this.info.hardcodedSub = trumpReason.includes('Hardcoded Subtitles');
  }
}

registry.register(new GPWExtractor());
