import {
  convertSizeStringToBytes,
  extractImgsFromBBCode,
  GMFetch,
  getLocationSearchValueByKey,
  getAreaCode,
} from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  refineCategory,
  getCategoryFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class HDBExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;
  torrentId = getLocationSearchValueByKey('id');

  canHandle(siteName: string): boolean {
    return siteName === 'HDBits';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.getBasicInfo();
    this.extractMovieDetails();
    await this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    await this.extractScreenshots();
    this.extractArea();

    return this.info;
  }

  extractTitle() {
    const title = $('h1').eq(0).text();
    this.info.title = formatTorrentTitle(title);
  }

  getBasicInfo() {
    const videoTypeMap = {
      'Blu-ray/HD DVD': 'bluray',
      Capture: 'hdtv',
      Encode: 'encode',
      Remux: 'remux',
      'WEB-DL': 'web',
    };
    const info = $('th:contains(Category)').next().text();
    const size = $('th:contains(Size)').eq(0).next().text();
    const splitArray = info.split('(');
    const category = splitArray[0].trim().toLowerCase();
    const videoType = splitArray[1].split(',')[1].replace(/\)/g, '').trim();
    this.info.size = convertSizeStringToBytes(size);
    this.info.category = refineCategory(this.info, category);
    this.info.videoType =
      videoTypeMap[videoType as keyof typeof videoTypeMap] ?? videoType;
    this.info.source = getCategoryFromSource(this.info.title);
  }

  protected extractMovieDetails() {
    const isMovieType = $('.contentlayout h1').length > 0;
    const IMDBLinkDom = isMovieType
      ? $('.contentlayout h1')
      : $('#details .showlinks li').eq(1);
    if (isMovieType) {
      const IMDBYear = IMDBLinkDom.prop('lastChild').nodeValue.replace(
        /\s|\(|\)/g,
        '',
      );
      const movieName = IMDBLinkDom.find('a').text();
      this.info.movieName = movieName;
      if (!IMDBYear) {
        super.extractYear();
      } else {
        this.info.year = IMDBYear;
      }
    }
    this.info.imdbUrl = IMDBLinkDom.find('a').attr('href') ?? '';
  }

  async extractMediaInfos() {
    const res = await GMFetch<string>(
      `/details/mediainfo?id=${this.torrentId}`,
    );
    const data = res.replace(/\r\n/g, '\n');
    if (data) {
      this.info.mediaInfos = [data];
    }
  }

  protected extractDescription() {
    const editDom = $('#details tr').has('a:contains(Edit torrent)');
    const descriptionDom =
      editDom.length > 0
        ? editDom.prev()
        : $('#details >tbody >tr:contains(tags) + tr');
    let descriptionBBCode = getFilterBBCode(descriptionDom.find('>td')[0]);
    descriptionBBCode =
      descriptionBBCode.match(/\[quote\]((.|\n)+)\[\/quote\]/)?.[1] ?? '';
    this.info.description = descriptionBBCode;
  }

  protected async extractScreenshots() {
    const screenshots = await extractImgsFromBBCode(this.info.description);
    this.info.screenshots = screenshots;
  }

  protected extractMovieName() {
    const movieName = $('.bhd-title-h1 a.beta-link-blend').text();
    this.info.movieName = movieName;
  }

  protected extractArea() {
    const country = $('#imdbinfo th:contains(Country)').next().text();
    this.info.area = getAreaCode(country);
  }
}

registry.register(new HDBExtractor());
