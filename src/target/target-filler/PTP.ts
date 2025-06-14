import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';
import {
  getLocationSearchValueByKey,
  getBDTypeBasedOnSize,
  parseMedia,
} from '@/common';
import { PT_SITE } from '@/const';

class PTP extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'PTP';
  }

  fill(info: TorrentInfo.Info): void {
    this.info = info;

    if (!this.info) return;

    const groupId = getLocationSearchValueByKey('groupid');

    if (!groupId) {
      this.fillIMDbAndTriggerAutoFill();
    }

    this.updateResolutionAndCodec();
    this.fillBasicInfo();

    this.fillDescription();

    this.handleEditionInfo();

    this.fillSubtitleInfo();

    this.fillTorrentFile();
  }

  private fillIMDbAndTriggerAutoFill(): void {
    if (!this.info) return;

    const { imdbUrl } = this.info;
    const currentSiteInfo = PT_SITE.PTP;

    $(currentSiteInfo.imdb.selector).val(imdbUrl || 0);
    AutoFill();
  }

  private updateResolutionAndCodec(): void {
    if (!this.info) return;

    const { title, videoType, resolution, videoCodec, size } = this.info;

    this.info.resolution = this.getResolution(resolution, videoType, title);

    this.info.videoCodec = this.getVideoCodec(
      videoCodec || '',
      videoType,
      size,
    );
  }

  private fillBasicInfo(): void {
    if (!this.info) return;

    const currentSiteInfo = PT_SITE.PTP;
    const keyArray = [
      'category',
      'source',
      'videoCodec',
      'resolution',
    ] as const;

    type Key = (typeof keyArray)[number];

    keyArray.forEach((key) => {
      const { selector = '', map } = currentSiteInfo[key as Key];

      type MapKey = keyof typeof map;

      if (map) {
        const mapValue = map[this.info![key as Key] as MapKey];
        $(selector).val(mapValue);
      } else {
        $(selector).val(this.info![key as Key] as MapKey);
      }
    });
  }

  protected fillDescription(): void {
    if (!this.info) return;

    const currentSiteInfo = PT_SITE.PTP;
    const { sourceSite, originalDescription } = this.info;

    if (sourceSite.match(/PTP/i)) {
      $(currentSiteInfo.description.selector).val(originalDescription || '');
    } else {
      const description = this.getDescription();
      $(currentSiteInfo.description.selector).val(description);
    }
  }

  private handleEditionInfo(): void {
    if (!this.info) return;

    const { videoType, tags } = this.info;
    const editionInfo = this.getEditionInfo(videoType, tags);

    if (editionInfo.length > 0) {
      $('#remaster').attr('checked', 'true');
      window.Remaster();

      editionInfo.forEach((edition) => {
        const selector = $('#remaster_tags a').filter(function () {
          return new RegExp(edition).test($(this).text());
        });

        if (selector.length > 0) {
          const event = new Event('click');
          selector[0].dispatchEvent(event);
        }
      });
    }
  }

  private fillSubtitleInfo(): void {
    if (
      !this.info ||
      !this.info.mediaInfos ||
      this.info.mediaInfos.length === 0
    )
      return;
    const parsedMedia = parseMedia(this.info.mediaInfos[0]);
    if (!parsedMedia) return;
    const { subtitleTracks = [] } = parsedMedia;

    if (subtitleTracks && subtitleTracks.length > 0) {
      subtitleTracks.forEach((subtitle) => {
        const subtitleSelector = $('.languageselector li').filter(function () {
          return new RegExp(subtitle.language).test($(this).text());
        });
        if (subtitle.language !== 'English' && subtitleSelector.length > 0) {
          subtitleSelector.find('input').attr('checked', 'true');
        }
      });
    }
  }

  private getEditionInfo(
    videoType: string,
    tags: TorrentInfo.MediaTags,
  ): string[] {
    const editionInfo: string[] = [];

    if (videoType === 'remux') {
      editionInfo.push('Remux');
    }

    Object.keys(tags).forEach((tag) => {
      if (tags[tag as keyof TorrentInfo.MediaTags]) {
        const tagName =
          PT_SITE.PTP.targetInfo.editionTags[
            tag as keyof typeof PT_SITE.PTP.targetInfo.editionTags
          ];
        if (tagName) {
          editionInfo.push(tagName);
        }
      }
    });
    return editionInfo;
  }

  private getVideoCodec(
    videoCodec: string,
    videoType?: string,
    size?: number,
  ): string {
    if (!videoType || !size) return videoCodec;

    if (videoType === 'bluray') {
      return getBDTypeBasedOnSize(size);
    } else if (videoType === 'dvd') {
      const GBSize = size / 1e9;
      return GBSize < 5 ? 'DVD5' : 'DVD9';
    }

    return videoCodec;
  }

  private getResolution(
    resolution: string,
    videoType?: string,
    title?: string,
  ): string {
    if (!videoType || !title) return resolution;

    if (videoType === 'DVD' && title.match(/NTSC/i)) {
      return 'NTSC';
    } else if (videoType === 'DVD' && title.match(/PAL/i)) {
      return 'PAL';
    }

    return resolution;
  }

  private getDescription(): string {
    if (!this.info) return '';

    const { mediaInfos, comparisons, screenshots } = this.info;
    let filterDescription = '';

    if (mediaInfos.length > 0) {
      mediaInfos.forEach((mediaInfo) => {
        /* eslint-disable no-irregular-whitespace */
        mediaInfo = mediaInfo.replace(
          /[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,
          '',
        );
        filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]\n`;
      });
    }

    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        filterDescription += `\n${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]\n\n`;
      }
    }

    const screenshotsSection = screenshots
      .map((item) => `[img]${item}[/img]`)
      .join('\n');

    return `${filterDescription}\n${screenshotsSection}`;
  }
}

registry.register(new PTP());
