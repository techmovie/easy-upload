import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class Filler52pt extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === '52pt';
  }

  protected postProcess() {
    const { tags, videoType, resolution } = this.info!;
    let videoTypeValue = videoType;
    if (videoType.match(/bluray/)) {
      if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
        videoTypeValue = videoType === 'bluray' ? '14' : '15';
      }
    } else if (videoType === 'remux' && resolution === '2160p') {
      videoTypeValue = '5';
    }
    $(this.siteInfo.videoType.selector).val(videoTypeValue);
  }
}

registry.register(new Filler52pt());
