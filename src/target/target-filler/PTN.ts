import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class PTN extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'PTN';
  }

  protected processDescription() {
    let { description, imdbUrl } = this.info!;
    description = `${imdbUrl}\n\n${description}`;
    this.info!.description = description;
    super.processDescription();
  }

  protected postProcess() {
    const { resolution, videoType, source } = this.info!;
    let format = '';
    const formatMap = {
      remux: 'Remux',
      web: 'WebRip',
      dvd: 'DVDR',
      dvdrip: 'DVDRip',
      '720p': '720P',
      '1080p': '1080P',
      '2160p': '2160P',
    };
    if (videoType.match(/bluray/)) {
      format = 'BluRay';
    } else if (videoType === 'encode' && source === 'bluray') {
      format = formatMap[resolution as keyof typeof formatMap];
    } else {
      format = formatMap[videoType as keyof typeof formatMap] || '';
    }
    $('#format').val(format);
  }
}

registry.register(new PTN());
