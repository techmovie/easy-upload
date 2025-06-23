import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class AGSV extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'AGSV';
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
      category: categoryConfig,
      videoCodec: videoCodecConfig,
      audioCodec: audioCodecConfig,
      source: sourceConfig,
      videoType: videoTypeConfig,
      resolution: resolutionConfig,
    } = this.siteInfo;

    const {
      category,
      videoCodec = '',
      audioCodec = '',
      source,
      videoType,
      resolution,
    } = this.info;
    $(categoryConfig.selector).val(categoryConfig.map[category]);
    $(categoryConfig.selector)[0].dispatchEvent(
      new Event('change', { bubbles: true }),
    );
    setTimeout(() => {
      $(videoCodecConfig.selector).val(videoCodecConfig.map[videoCodec]);
      $(audioCodecConfig.selector).val(audioCodecConfig.map[audioCodec]);
      $(sourceConfig.selector).val(sourceConfig.map[source]);
      $(videoTypeConfig.selector).val(videoTypeConfig.map[videoType]);
      $(resolutionConfig.selector).val(resolutionConfig.map[resolution]);
    }, 500);
  }
}

registry.register(new AGSV());
