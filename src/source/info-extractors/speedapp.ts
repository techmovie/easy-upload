import { formatTorrentTitle, getFilterBBCode } from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class SpeedAppExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'SpeedApp';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractImdbUrl();
    this.extractMovieName();
    this.extractResolution();
    this.extractMetaInfo();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    await this.extractScreenshots();
    this.extractPoster();

    return this.info;
  }

  extractImdbUrl() {
    this.info.imdbUrl = $('a[href*="imdb.com/title"]').attr('href');
  }

  extractMovieName() {
    this.info.movieName = $(
      'div.container > div.row div.cover-body h1.text-emphasis',
    )
      .text()
      .trim();
  }

  extractTitle() {
    const torrentName = $('h5.text-emphasis').text().trim();
    this.info.title = formatTorrentTitle(torrentName);
  }

  extractMediaInfos() {
    const mediaInfo = $('div.mediainfo').text();
    if (!mediaInfo) {
      super.extractMediaInfos();
    } else {
      this.info.mediaInfos = [mediaInfo];
    }
  }

  protected extractDescription() {
    const descriptionContainer = $('div.description.description-modern');
    const descriptionBBCode = getFilterBBCode(descriptionContainer[0]);
    this.info.description = descriptionBBCode
      .replace(/\n\n*/g, '\n')
      .replace(/\s+/g, '')
      .trim()
      .replace(
        /\[img\]https:\/\/speedapp\.io\/img\/descr\/(screens|release_info)\.svg\[\/img\]/g,
        '',
      )
      .replace('[img]https://speedapp.io/img/descr/release_info.svg[/img]', '')
      .replace(/original\.(png|webp)\]\n?\[img\]/g, 'original.webp][img]')
      .replace(
        /original\.(png|webp)\[\/img\]\n?\[\/url\]/g,
        'mobile.webp[/img][/url]',
      )
      .replace(/\[\/url\]\n*/g, '[/url]');
  }

  extractPoster() {
    this.info.poster = $('.movie-poster').attr('src');
  }
}

registry.register(new SpeedAppExtractor());
