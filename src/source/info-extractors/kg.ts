import {
  convertSizeStringToBytes,
  getAreaCode,
  getAudioCodecFromSource,
} from '@/common';
import {
  formatTorrentTitle,
  getFilterBBCode,
  getVideoCodecFromSourceAndVideoType,
  getVideoTypeFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class KGExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'KG';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractImdbUrl();
    this.extractMovieName();
    this.extractSize();
    this.extractYear();
    this.extractCategory();
    this.extractResolution();
    this.extractSource();
    this.extractMediaInfos();
    this.extractMetaInfo();
    this.extractMediaDetails();
    this.extractDescription();
    this.extractScreenshots();
    this.extractArea();

    return this.info;
  }

  private getBasicInfoDom(key: string) {
    return $(`.outer h1~table:first>tbody>tr td:contains(${key})`).next('td');
  }

  extractTitle() {
    const torrentFileDom = this.getBasicInfoDom('Download').find('a.index');
    const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, '');
    const fileName = this.getBasicInfoDom('Filename')
      .text()
      ?.replace(/\.\w+$/, ''); // remove file extension
    this.info.title = formatTorrentTitle(fileName || torrentFileName);
  }

  extractImdbUrl() {
    const link = this.getBasicInfoDom('Internet Link').find('a').attr('href');
    const imdbUrl = link?.match(/imdb/) ? link.replace(/\?.+/, '') : '';
    this.info.imdbUrl = imdbUrl;
  }

  extractSize() {
    const sizeContent = this.getBasicInfoDom('Size').text();
    const size = sizeContent.match(/\((.+?)\)/)?.[1].replace(/\s|,/g, '') ?? '';
    this.info.size = convertSizeStringToBytes(size);
  }

  protected extractYear() {
    const yearText = this.getBasicInfoDom('Year').text();
    const year = yearText.match(/\d{4}/)?.[0] ?? '';
    this.info.year = year;
  }

  extractCategory() {
    const typeText = this.getBasicInfoDom('Type').text();
    const genresText = this.getBasicInfoDom('Genres').text();
    const category = typeText.toLowerCase();
    this.info.category = genresText.match(/Animation/i) ? 'cartoon' : category;
  }

  extractSource() {
    const sourceText = this.getBasicInfoDom('Source').text();
    let formattedSource = sourceText?.replace(/-/g, '')?.toLowerCase();
    if (formattedSource === 'tv') {
      formattedSource = 'hdtv';
    }
    this.info.source = formattedSource;
  }

  extractMetaInfo() {
    const { title, source, mediaInfos } = this.info;
    const ripSpecs = this.getBasicInfoDom('RipSpecs').text();
    let genreVideoType =
      this.getBasicInfoDom('Genres')
        .find('tr td>img')
        .attr('src')
        ?.match(/genreimages\/(\w+)\.\w+/)?.[1] ?? '';
    genreVideoType = ripSpecs.match(/DVD\sFormat/) ? 'dvdr' : genreVideoType;

    const videoType = this.getVideoType(
      title,
      source,
      genreVideoType,
      mediaInfos.length > 0,
    );

    if (genreVideoType === 'dvdr' && ripSpecs) {
      this.info.videoCodec = 'mpeg2';
      const audioCodec = ripSpecs.match(/DVD\sAudio:(.+)/)?.[1] ?? '';
      this.info.audioCodec = getAudioCodecFromSource(audioCodec);
    } else {
      this.info.videoCodec = getVideoCodecFromSourceAndVideoType(
        title,
        videoType,
      );
      this.info.audioCodec = getAudioCodecFromSource(title);
    }
    this.info.videoType = videoType;
  }

  async extractMediaInfos() {
    const mediaInfo = $('div.mediainfo').text();
    if (mediaInfo) {
      this.info.mediaInfos = [mediaInfo];
    }
  }

  protected extractDescription() {
    const descriptionDom = this.getBasicInfoDom('Description');
    let descriptionBBCode = getFilterBBCode(descriptionDom.find('article')[0]);
    descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, '');
    this.info.description = descriptionBBCode;
  }

  protected extractMovieName() {
    const movieTitles = $('.outer h1').text().split('- ');
    let movieName = '';
    let movieAkaName = '';
    if (movieTitles.length >= 2) {
      [movieName, movieAkaName] = movieTitles[1]
        .replace(/\(\d+\)/, '')
        .trim()
        .split(/AKA/i);
    }
    this.info.movieName = movieName?.trim();
    this.info.movieAkaName = movieAkaName?.trim() ?? '';
  }

  protected extractArea() {
    const country = $('.outer h1 img').attr('alt') || '';
    this.info.area = getAreaCode(country);
  }

  private getVideoType(
    title: string,
    source: string,
    genreVideoType: string,
    hasMediainfo: boolean,
  ) {
    if (source) {
      if (source === 'bluray') {
        const blurayFlag = genreVideoType === 'bluray' || !hasMediainfo;
        return blurayFlag ? 'bluray' : 'encode';
      } else if (source === 'dvd') {
        const dvdFlag = genreVideoType === 'dvdr' || !hasMediainfo;
        return dvdFlag ? 'dvd' : 'dvdrip';
      }
      return source;
    }
    return getVideoTypeFromSource(title);
  }
}

registry.register(new KGExtractor());
