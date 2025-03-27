import { getLocationSearchValueByKey } from '@/common';
import { InfoExtractor } from '../registry';
import { BaseExtractor } from './base-extractor';
import { CURRENT_SITE_INFO } from '@/const';
import $ from 'jquery';

export abstract class GazelleExtractor
  extends BaseExtractor
  implements InfoExtractor
{
  priority = 5;
  torrentId = '';
  torrentHeaderDom: JQuery<HTMLElement> = $();

  abstract canHandle(siteName: string, siteType: string): boolean;

  async extract(): Promise<TorrentInfo.Info> {
    return this.info;
  }

  protected extractTorrentId() {
    const torrentId = getLocationSearchValueByKey('torrentid');
    this.torrentId = torrentId;
  }

  protected getTorrentHeaderDom() {}

  protected extractMovieNames() {}

  protected extractMediaInfos() {}

  protected extractYear() {}

  protected extractTorrentLink() {
    const torrentLink = this.torrentHeaderDom
      .find('a[title="Download"]')
      .attr('href');
    CURRENT_SITE_INFO.torrentLink = torrentLink;
  }

  protected getSource = (source: string, codes: string, resolution: string) => {
    if (codes.match(/BD100|BD66/i)) {
      return 'uhdbluray';
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return 'uhdbluray';
    }
    return source.replace(/-/g, '').toLowerCase();
  };

  protected extractImdbUrl() {}

  protected extractScreenshots() {}

  protected extractCategory() {}

  protected async extractDescription() {}

  protected extractComparisonsScreenshots() {}

  protected extractMetaInfo() {}

  protected extractTags() {}

  protected extractTitle() {}

  protected extractSize() {}

  protected extractArea() {}

  protected extractIsHardcodedSub() {}

  protected extractPoster() {}

  protected enhanceInfo() {}
}
