import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class HDU extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDU';
  }

  protected postProcess() {
    let videoTypeValue = '';
    const { resolution, videoType, category } = this.info!;
    const isTV = category.match(/tv/);
    if (videoType === 'remux') {
      if (resolution === '2160p') {
        videoTypeValue = isTV ? '16' : '15';
      } else {
        videoTypeValue = isTV ? '12' : '3';
      }
    }
    if (isTV) {
      if (videoType === 'encode') {
        videoTypeValue = '14';
      } else if (videoType === 'web') {
        videoTypeValue = '13';
      }
    }
    if (videoTypeValue) {
      $(this.siteInfo.videoType.selector).val(videoTypeValue);
    }
  }
}

registry.register(new HDU());
