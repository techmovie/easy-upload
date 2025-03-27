import { GazelleExtractor } from './base/gazelle-base';
import { registry } from './registry';
import { extractImgsFromBBCode, convertSizeStringToBytes } from '@/common';
import $ from 'jquery';
import {
  getFilterBBCode,
  getVideoSourceFromTitle,
  formatTorrentTitle,
} from '@/source/helper/index';

class MTVExtractor extends GazelleExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'MTV';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTorrentId();
    if (!this.torrentId) {
      return this.info;
    }
    this.getTorrentHeaderDom();
    this.extractTitle();
    this.extractImdbUrl();
    this.extractMovieNames();
    this.extractSize();
    this.extractSource();
    this.extractMediaInfos();
    this.extractMediaInfos();
    await this.extractDescription();
    await this.extractScreenshots();
    this.extractMetaInfo();
    this.extractMediaDetails();

    return this.info;
  }

  getTorrentHeaderDom() {
    this.torrentHeaderDom = $(`#torrent${this.torrentId}`);
  }

  extractTitle() {
    const torrentName = this.torrentHeaderDom.find('.permalink').text().trim();
    this.info.title = formatTorrentTitle(torrentName);
  }

  extractSize() {
    const size = this.torrentHeaderDom.find('>td').eq(1).text().trim();
    this.info.size = convertSizeStringToBytes(size);
  }

  async extractMediaInfos() {
    const mediaInfo = $('div.mediainfo').text();
    this.info.mediaInfos = [mediaInfo];
  }

  extractMovieNames() {
    const [showName] = $('.details>h2').text()?.split('-') ?? [];
    this.info.movieName = showName.replace(/\n/g, '').trim();
  }

  extractSource() {
    this.info.source = getVideoSourceFromTitle(this.info.title);
  }

  extractImdbUrl() {
    this.info.imdbUrl = $('.metalinks a[href*="imdb.com/title"]').attr('href');
  }

  async extractDescription() {
    return new Promise<void>((resolve) => {
      const descriptionContainer = $(`#content${this.torrentId}`).clone();
      descriptionContainer.find('>div').remove();
      const description = getFilterBBCode(descriptionContainer[0]);
      this.info.description = description;
      resolve();
    });
  }

  async extractScreenshots() {
    this.info.screenshots = await extractImgsFromBBCode(this.info.description);
  }

  protected isVideoTypeBluray() {
    return !!$(`#files_${this.torrentId}`)
      .text()
      .match(/\.(iso|m2ts|mpls)/i);
  }

  private getVideoType = ({
    torrentName = '',
    source = '',
    isBluray = false,
  }) => {
    if (torrentName.match(/remux/i)) {
      return 'remux';
    } else if (source.match(/bluray/) && !isBluray) {
      return 'encode';
    }
    return source;
  };

  protected extractMetaInfo() {
    const { title, source } = this.info;
    const isBluray = this.isVideoTypeBluray();
    const videoType = this.getVideoType({
      torrentName: title,
      source,
      isBluray,
    });
    this.info.videoType = videoType;
    const category = title.match(/S\d+E(P)\d+/i) ? 'tv' : 'tvPack';
    this.info.category = category;
  }
}

registry.register(new MTVExtractor());
