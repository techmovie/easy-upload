import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';

class MTV extends BaseFiller implements TargetFiller {
  canHandle(siteName: string): boolean {
    return siteName === 'MTV';
  }

  priority = 10;

  protected postProcess() {
    if (!this.info) return;

    const { resolution, videoCodec, audioCodec, title, videoType, tags } =
      this.info!;
    const tagSet = new Set<string>();

    this.processResolution(resolution, tagSet);

    if (videoCodec) {
      tagSet.add(videoCodec);
    }

    this.processAudioCodec(audioCodec, tagSet);

    if (title.match(/(\s|.)hybrid(\s|.)/i)) {
      tagSet.add('hybrid');
    }

    this.processSourceAndType(title, videoType, tagSet);

    this.processAudioAndSubtitleTags(tags, tagSet);

    this.processHDRTags(tags, tagSet);
    this.updateTagInput(tagSet);
  }

  protected processDescription() {
    let { description, mediaInfos } = this.info!;
    mediaInfos?.forEach((mediaInfo) => {
      description = description.replace(
        `[quote]${mediaInfo}[/quote]`,
        `[mediainfo]${mediaInfo}[/mediainfo]`,
      );
    });
    this.info!.description = description;
    super.processDescription();
  }

  private processResolution(resolution: string, tagSet: Set<string>) {
    if (!resolution) return;

    const cleanResolution = resolution.replace('p', '');

    $(`input[name="Resolution"][value="${cleanResolution}"]`)[0]?.click();

    tagSet.add(cleanResolution);
  }

  private processAudioCodec(
    audioCodec: string | undefined,
    tagSet: Set<string>,
  ) {
    if (!audioCodec) return;

    if (audioCodec === 'dd+') {
      tagSet.add('ddp.audio');
    } else if (audioCodec.match(/dd|ac3/i)) {
      tagSet.add('dd.audio');
    } else if (audioCodec.match(/dtshd/i)) {
      tagSet.add('dts.hd.audio');
    } else if (audioCodec.match(/dtsx/i)) {
      tagSet.add('dts.x.audio');
    } else {
      tagSet.add(`${audioCodec}.audio`);
    }
  }

  private processSourceAndType(
    title: string,
    videoType: string,
    tagSet: Set<string>,
  ) {
    if (/web-dl/i.test(title)) {
      $('input[name="source"][value="9"]')[0]?.click();
      tagSet.add('web.dl');

      if (/NF|Netflix/i.test(title)) {
        tagSet.add('netflix.source');
      }
    } else if (/webrip/i.test(title)) {
      tagSet.add('webrip');
      $('input[name="source"][value="10"]')[0]?.click();
    } else if (videoType.match(/bluray/i)) {
      tagSet.add('bluray');
      $('input[name="source"][value="7"]')[0]?.click();
    } else if (videoType.match(/remux/i)) {
      tagSet.add(videoType);
      $('input[name="source"][value="7"]')[0]?.click();
    } else if (videoType) {
      tagSet.add(videoType);
    }
  }

  private processAudioAndSubtitleTags(
    tags: TorrentInfo.MediaTags,
    tagSet: Set<string>,
  ) {
    if (tags.cantonese_audio) {
      tagSet.add('cantonese.audio.track');
    }

    if (tags.chinese_audio) {
      tagSet.add('chinese.audio.track');
    }

    if (tags.chinese_subtitle) {
      tagSet.add('chinese.subs');
    }
  }

  private processHDRTags(tags: TorrentInfo.MediaTags, tagSet: Set<string>) {
    if (tags.hdr10) {
      tagSet.add('hdr');
    }

    if (tags.dolby_vision) {
      tagSet.add('dovi');
    }

    if (tags.hdr10_plus) {
      tagSet.add('hdr10plus');
    }
  }

  private updateTagInput(tagSet: Set<string>) {
    const tagString = Array.from(tagSet).join(' ');
    $('#taginput').val(tagString);
  }
}

registry.register(new MTV());
