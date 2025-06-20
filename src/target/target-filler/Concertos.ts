import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class Concertos extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'Concertos';
  }

  protected processTorrentTitle() {
    let { description, mediaInfos } = this.info!;
    $('#add').trigger('click');
    $('.sceditor-button.sceditor-button-source.has-icon')[0].click();
    mediaInfos.forEach((mediaInfo) => {
      description = description.replace(mediaInfo.trim(), '');
    });
    this.info!.description = description;
  }

  protected processDescription() {
    let { description, mediaInfos } = this.info!;
    $('#add').trigger('click');
    $('.sceditor-button.sceditor-button-source.has-icon')[0].click();
    mediaInfos.forEach((mediaInfo) => {
      description = description.replace(mediaInfo.trim(), '');
    });
    this.info!.description = description;
    super.processDescription();
  }
}

registry.register(new Concertos());
