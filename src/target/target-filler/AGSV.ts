import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class AGSV extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'agsv';
  }

  fill(info: TorrentInfo.Info) {
    this.info = info;
    this.prepareToFillInfo();
    this.fillTorrentTitle();
    this.disableTorrentChange();
    this.fillIMDb();
    this.fillDescription();
    this.fillCategoryAndVideoInfo();
    this.fillRemainingInfo();
    this.fillTorrentFile();
  }

  private fillCategoryAndVideoInfo() {
    if (!this.info) return;

    const {
      category: categorySelector,
      videoCodec: videoCodecSelector,
      audioCodec: audioCodecSelector,
      source: sourceSelector,
      videoType: videoTypeSelector,
      resolution: resolutionSelector,
    } = this.siteInfo;

    const {
      category,
      videoCodec = '',
      audioCodec = '',
      source,
      videoType,
      resolution,
    } = this.info;
    $(categorySelector.selector).val(category);
    $(categorySelector.selector)[0].dispatchEvent(new Event('change'));
    setTimeout(() => {
      $(videoCodecSelector.selector).val(videoCodec);
      $(audioCodecSelector.selector).val(audioCodec);
      $(sourceSelector.selector).val(source);
      $(videoTypeSelector.selector).val(videoType);
      $(resolutionSelector.selector).val(resolution);
    }, 500);
  }
}

registry.register(new AGSV());
