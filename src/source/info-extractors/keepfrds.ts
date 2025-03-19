import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { getFilterBBCode } from '@/source/helper/index';
import $ from 'jquery';

class FRDSExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle (siteName: string): boolean {
    return siteName === 'OurBits';
  }

  extractDoubanUrl () {
    this.info.doubanUrl = $('#kdouban .imdbwp__link').attr('href');
  }

  extractImdbUrl () {
    this.info.imdbUrl = $('#kimdb .imdbwp__link').attr('href');
  }

  protected extractDescription (): void {
    const element = document.createElement('div');
    $(element).html($('#outer td').has('#kdescr').html());
    let descriptionBBCode = getFilterBBCode(element);
    descriptionBBCode = descriptionBBCode.replace('  [url=', '\n  [url=').replace(/\[\/img\]\[\/url\]\n/g, '[/img][/url]');
    descriptionBBCode = descriptionBBCode.replace(/ 截图对比\(点击空白处展开\)/g, '截图对比');
    descriptionBBCode = descriptionBBCode.replace(/\[quote\]GeneralVideo[^[]*\[\/quote\]/, '');
    this.info.description = descriptionBBCode;
  }
}

registry.register(new FRDSExtractor());
