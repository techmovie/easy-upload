import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import {
  getBDTypeBasedOnSize,
  getLocationSearchValueByKey,
  parseMedia,
} from '@/common';
import { buildPTPDescription } from '@/target/helper/index';
import $ from 'jquery';
import { PT_SITE } from '@/const';

class GPW extends BaseFiller implements TargetFiller {
  priority = 10;
  currentSiteInfo = PT_SITE.GPW;

  canHandle(siteName: string): boolean {
    return siteName === 'GPW';
  }

  fill(info: TorrentInfo.Info): void {
    this.info = info;

    const isUploadSuccess = !$('#mediainfo')[0];
    if (isUploadSuccess) {
      return;
    }

    this.transformInfo();

    const isAddFormat = getLocationSearchValueByKey('groupid');
    if (!isAddFormat) {
      this.fillIMDbAndTriggerAutoFill();
    }

    this.fillCategory();
    this.fillEditionInfo();

    // 1. 先使用站内自动填充功能
    this.fillMediaInfos();

    // 2. 自动填充失败后脚本填充
    setTimeout(() => {
      this.handleNoAutoCheck();
    }, 0);

    this.fillScene();
    this.fillProcessing();
    this.fillDescription();
    this.fillTorrentFile();

    // 触发预览
    $('.u-bbcodePreview-button').trigger('click');
  }

  private fillIMDbAndTriggerAutoFill(): void {
    if (!this.info) return;

    $(this.currentSiteInfo.imdb.selector).val(this.info.imdbUrl || 0);
    $('#imdb_button').trigger('click');
    // for fillEditionInfo
    $('#upload .collapse').show();
  }

  protected fillCategory(): void {
    if (!this.info) return;

    type Category = keyof typeof this.currentSiteInfo.category.map;
    $(this.currentSiteInfo.category.selector).val(
      this.currentSiteInfo.category.map[this.info.category as Category],
    );
  }

  private fillEditionInfo(): void {
    if (!this.info) return;

    type Tag = keyof typeof this.currentSiteInfo.targetInfo.editionTags;
    const editionTags = Object.keys(this.info.tags)
      .map(
        (tag) =>
          this.info!.tags[tag as keyof TorrentInfo.MediaTags] &&
          this.currentSiteInfo.targetInfo.editionTags[tag as Tag],
      )
      .filter(Boolean);

    let otherTag;
    if (this.info.otherTags && Object.keys(this.info.otherTags).length > 0) {
      otherTag = Object.keys(this.info.otherTags).join(', ');
    }

    if (editionTags.length > 0 || otherTag) {
      $('#movie_edition_information').trigger('click');
    }

    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        $(`#movie_remaster_tags a[onclick*="'${tag}'"]`).trigger('click');
      }
    }

    if (otherTag) {
      $('#other-button').trigger('click');
      $('[name=remaster_custom_title]').val(otherTag);
    }
  }

  private fillMediaInfos(): void {
    if (!this.info || !this.info.mediaInfos) {
      return;
    }

    // 添加足够多的mediainfo输入框
    for (let i = 1; i < this.info.mediaInfos.length; i++) {
      $('#add-mediainfo')[0].click();
    }

    // 填充mediainfo内容
    const textareas = Array.from($('[name="mediainfo[]"]'));
    for (const [index, textarea] of textareas.entries()) {
      (textarea as HTMLTextAreaElement).value = this.info.mediaInfos[index];
      textarea.dispatchEvent(new Event('input'));
    }

    // 使用站内自动填充功能
    $('[name="mediainfo[]"]')[0].dispatchEvent(new Event('change'));
  }

  private handleNoAutoCheck(): void {
    if (!this.info) return;

    if (
      !$(this.currentSiteInfo.source.selector).val() ||
      !$(this.currentSiteInfo.format.selector).val()
    ) {
      const { mediaInfos, videoType } = this.info;
      const mediaInfo = mediaInfos?.[0] || '';
      const isBluray = !!videoType.match(/bluray/i);
      const parsedMedia = parseMedia(mediaInfo, isBluray);
      if (!parsedMedia) {
        console.warn('Failed to parse media info:', mediaInfo);
        return;
      }
      const { format = '', subtitleTracks = [] } = parsedMedia;

      this.info.format = this.getFormat(format, videoType);

      // 填充基本信息
      const keyArray = [
        'source',
        'videoCodec',
        'format',
        'resolution',
      ] as const;
      type Key = (typeof keyArray)[number];

      keyArray.forEach((key) => {
        const { selector = '', map } = this.currentSiteInfo[key as Key];
        type MapKey = keyof typeof map;

        if (map) {
          const mapValue = map[this.info![key as Key] as MapKey];
          $(selector).val(mapValue);

          // 处理其他编码类型
          if (key === 'videoCodec' && mapValue === 'Other') {
            (
              document.querySelector(selector) as HTMLSelectElement
            ).dispatchEvent(new Event('change'));
            $('input[name="codec_other"]').val(
              this.info![key as Key]?.toUpperCase() ?? '',
            );
          }
        } else {
          $(selector).val(this.info![key as Key] || '');
        }
      });

      // 填充字幕信息
      this.fillSubtitles(subtitleTracks.map((track) => track.language));
    }
  }

  private fillSubtitles(subtitles: string[]): void {
    if (subtitles.length > 0) {
      $('#mixed_subtitles').attr('checked', 'true');

      $('input[name="subtitles[]"][type="checkbox"]').each(function () {
        const language =
          $(this)
            .attr('id')
            ?.replace(/^\S|(_\S)/g, (letter) =>
              letter.replace('_', ' ').toUpperCase(),
            ) ?? '';

        if (subtitles.includes(language)) {
          $(this).attr('checked', 'true');
        }
      });

      const event = new Event('change');
      document.querySelector('#mixed_subtitles')?.dispatchEvent(event);

      // 处理中文字幕
      const chineseLanguages = subtitles.filter((item) =>
        item.match(/Chinese|Traditional|Simplified/i),
      );

      if (chineseLanguages.length === 1 && chineseLanguages[0] === 'Chinese') {
        const selector = chineseLanguages[0].match(/Traditional/i)
          ? '#chinese_traditional'
          : '#chinese_simplified';
        $(selector).attr('checked', 'true');
      } else if (chineseLanguages.length >= 2) {
        $('#chinese_traditional,#chinese_simplified').attr('checked', 'true');
      }
    }
  }

  private fillScene(): void {
    if (!this.info) return;

    if (this.info.tags.scene) {
      $('#scene').prop('checked', true);
    }
  }

  private fillProcessing(): void {
    if (!this.info) return;

    let { videoType, size, source, tags } = this.info;

    if (source.match(/bluray|hddvd|dvd/)) {
      if (tags.diy) {
        videoType = 'DIY';
      }

      const videoTypeConfig = this.currentSiteInfo.videoType;
      const { selector, map } = videoTypeConfig;
      $(selector).val(map[videoType as keyof typeof map]);

      // 触发change事件来显示processing_other字段
      $(selector)[0].dispatchEvent(new Event('change'));

      if (map[videoType as keyof typeof map] === 'Untouched') {
        const bdType = getBDTypeBasedOnSize(size);
        $('select[name="processing_other"]').val(bdType || '');
      }

      // 触发input事件进行验证
      $(selector)[0].dispatchEvent(new Event('input'));
    }
  }

  protected fillDescription(): void {
    if (!this.info) return;

    let description = '';

    if (this.info.sourceSite === 'PTP') {
      description = buildPTPDescription(this.info);
    } else if (this.info.sourceSite === 'BeyondHD') {
      description = this.info.originalDescription || '';
    } else {
      description = this.buildDescription();
    }

    $(this.currentSiteInfo.description.selector).val(description);
    $(this.currentSiteInfo.description.selector)[0].dispatchEvent(
      new Event('input'),
    );
  }

  private buildDescription(): string {
    if (!this.info) return '';

    let description = '';

    // 添加对比图
    if (this.info.comparisons && this.info.comparisons.length > 0) {
      for (const comparison of this.info.comparisons) {
        description += `${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]\n\n`;
      }
    }

    // 添加截图
    if (this.info.screenshots.length > 0) {
      description += `${this.info.screenshots.map((v) => `[img]${v}[/img]`).join('\n')}\n\n`;
    }

    return description.trim();
  }

  private transformInfo(): void {
    if (!this.info) return;

    // mediainfos contains both mediainfo and bdinfo
    if (
      ['encode', 'remux'].includes(this.info.videoType) &&
      this.info.mediaInfos
    ) {
      const newMediaInfos = [];
      for (const mediaInfo of this.info.mediaInfos) {
        if (mediaInfo.match(/Disc Title|Disc Label/i)) {
          continue;
        }
        newMediaInfos.push(mediaInfo);
      }
      this.info.mediaInfos = newMediaInfos;
    }
  }

  private getFormat(format: string, videoType: string): string {
    if (videoType.match(/bluray/) && format !== 'iso') {
      format = 'm2ts';
    } else if (videoType.match(/dvd/)) {
      format = 'vob';
    }
    return format || 'mkv';
  }
}

registry.register(new GPW());
