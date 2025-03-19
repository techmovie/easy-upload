import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { getFilterBBCode } from '@/source/helper/index';
import $ from 'jquery';

class OurBitsExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle (siteName: string): boolean {
    return siteName === 'OurBits';
  }

  extractDoubanUrl () {
    this.info.doubanUrl = $('#doubaninfo .doubannew a').attr('href');
  }

  extractImdbUrl () {
    this.info.imdbUrl = $('.imdbnew2 a:first').attr('href');
  }

  extractDoubanInfo () {
    const doubanInfo = getFilterBBCode($('.doubannew2 .doubaninfo')?.[0]);
    if (!doubanInfo) {
      return;
    }
    const doubanPoster = `[img]${$('#doubaninfo .doubannew a img').attr('src')}[/img]\n`;
    this.info.doubanInfo = doubanPoster + doubanInfo;
  }
}

registry.register(new OurBitsExtractor());
