import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class HDFans extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'HDFans';
  }

  protected postProcess() {
    const { videoType, resolution, tags } = this.info!;
    if (videoType === 'remux') {
      $(this.siteInfo.videoType.selector).val(
        resolution === '2160p' ? '10' : '8',
      );
    } else if (videoType === 'encode') {
      const map = {
        '2160p': '9',
        '1080p': '5',
        '1080i': '5',
        '720p': '11',
      };
      $(this.siteInfo.videoType.selector).val(
        map[resolution as keyof typeof map] || '16',
      );
    }
    if (tags.diy) {
      $(this.siteInfo.videoType.selector).val(
        resolution === '2160p' ? '2' : '4',
      );
    }
  }
}

registry.register(new HDFans());
