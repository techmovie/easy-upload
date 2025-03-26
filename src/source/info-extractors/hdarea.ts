import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { formatTorrentTitle } from '@/source/helper/index';
import $ from 'jquery';

class HDAExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDArea';
  }

  extractTitle(): void {
    this.info.title = formatTorrentTitle(
      $('h1#top')
        .text()
        .split(/\s{3,}/)?.[0]
        ?.trim(),
    );
  }
}

registry.register(new HDAExtractor());
