import {
  formatTorrentTitle,
  getFilterBBCode,
  getVideoTypeFromSource,
} from '@/source/helper/index';
import { InfoExtractor, registry } from './registry';
import { BaseExtractor } from './base/base-extractor';
import $ from 'jquery';

class TikExtractor extends BaseExtractor implements InfoExtractor {
  priority = 10;
  descContainer = $('td.heading:contains(Description)').eq(0).next();
  canHandle(siteName: string): boolean {
    return siteName === 'Cinematik';
  }

  async extract(): Promise<TorrentInfo.Info> {
    this.extractTitle();
    this.extractSize();
    this.extractResolution();
    this.extractCategory();
    this.extractMetaInfo();
    this.extractMovieDetails();
    this.extractMediaInfos();
    this.extractMediaDetails();
    this.extractDescription();
    this.extractVideoType();
    this.extractScreenshotsForTik();

    return this.info;
  }

  extractTitle() {
    const title = $('h1').eq(0).text();
    this.info.title = formatTorrentTitle(title);
  }

  extractSize() {
    const size = $('td.heading:contains(Size)')
      .eq(0)
      .next()
      .text()
      .replace(/[0-9.]+ GB\s+\(([0-9,]+) bytes\)/i, (_, size) =>
        size.replace(/,/g, ''),
      );
    this.info.size = parseInt(size, 10);
  }

  extractCategory() {
    const typeText = $('td.heading:contains(Type)').eq(0).next().text();
    const isMovie = typeText !== 'TV-Series';
    this.info.category = isMovie ? 'movie' : 'tvPack';
  }

  extractVideoType() {
    const { resolution } = this.info;
    const tags: (string | null)[] = [];
    $('td.heading:contains(Tags)')
      .eq(0)
      .next()
      .children()
      .each((_, child) => {
        tags.push(child.textContent);
      });
    this.info.videoType = tags.includes('Blu-ray')
      ? getVideoTypeFromSource('bluray', resolution)
      : 'dvd';
  }

  protected extractMovieDetails() {
    const imdbId = $('span:contains("IMDB id:") a').text();
    const year = $('span.gr_hsep:contains(Year)')
      .text()
      .replace('Year: ', '')
      .trim();
    const imdbUrl = `https://www.imdb.com/title/tt${imdbId}/`;
    const movieName = $('div.gr_tdsep h1:first-child').text();

    this.info = {
      ...this.info,
      imdbUrl,
      movieName,
      year,
    };
  }

  protected extractMediaInfos() {
    const mediaInfos = $('#mcol td[style~=dotted]').text();
    this.info.mediaInfos = [mediaInfos];
  }

  protected extractDescription() {
    const descriptionBBCode = getFilterBBCode(this.descContainer[0]);
    this.info.description = descriptionBBCode;
  }

  private extractScreenshotsForTik() {
    const desc = this.descContainer.text();
    const screenshots: string[] = [];
    if (!desc) {
      return screenshots;
    }
    const matches = desc.match(/[a-z0-9]{32}/g);
    if (!matches) {
      return screenshots;
    }
    for (const m of matches) {
      screenshots.push(
        `https://hostik.cinematik.net/gal/ori/${m[0]}/${m[1]}/${m}.jpg`,
      );
    }
    this.info.screenshots = screenshots;
  }
}

registry.register(new TikExtractor());
