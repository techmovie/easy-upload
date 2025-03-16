import { MediaInfo, VideoTrack, AudioTrack, SubtitleTrack } from './media.type';
import { convertSizeStringToBytes } from '@/common/utils';

abstract class MediaParser {
  protected source: string;
  protected result: MediaInfo;
  constructor (source: string) {
    this.source = source;
    this.result = {
      fileName: '',
      fileSize: 0,
      duration: 0,
      format: '',
      resolution: '',
      audioTracks: [],
      subtitleTracks: [],
      videoTracks: [],
    };
  }

  abstract parse(): MediaInfo;

  abstract parseVideoSection (videos: Record<string, string>[]) : VideoTrack[];

  abstract parseAudioSection (audios: Record<string, string>[]) : AudioTrack[];

  abstract parseSubtitleSection (subtitles: Record<string, string>[]) : SubtitleTrack[];

  abstract splitIntoSections (): Record<string, Record<string, string>[]>;

  protected getHdrType (hdrFormat: string): string {
    if (!hdrFormat) return '';

    if (/Dolby\s*Vision/i.test(hdrFormat)) return 'DV';
    if (/HDR10\+/i.test(hdrFormat)) return 'HDR10+';
    if (/HDR10/i.test(hdrFormat)) return 'HDR10';
    if (/HLG/i.test(hdrFormat)) return 'HLG';

    return '';
  }

  protected parseDuration (duration: string) {
    const hour = duration.match(/(\d+)\s*h/)?.[1] ?? '';
    const minute = duration.match(/(\d+)\s*min/)?.[1] ?? '';
    const second = duration.match(/(\d+)\s*s/)?.[1] ?? '';
    return parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10);
  }

  protected parseResolution (
    width: number,
    height: number,
    scanType: string): string {
    if (!width || !height || isNaN(width) || isNaN(height)) {
      return '';
    }
    if (width === 7680 && height === 4320) return '4320p';
    if (width === 3840 && height === 2160) return '2160p';
    if (width === 2560 && height === 1440) return '2K';

    if (height >= 2160) {
      return '2160p';
    } else if (height >= 1440) {
      return '1440p';
    } else if (height >= 1080) {
      const isProgressive = scanType === 'Progressive' || !scanType;
      return `1080${isProgressive ? 'p' : 'i'}`;
    } else if (height >= 720) {
      return '720p';
    } else if (height >= 576) {
      return '576p';
    } else if (height >= 480) {
      return '480p';
    } else if (height >= 360) {
      return '360p';
    } else if (height >= 240) {
      return '240p';
    }
    return `${width}x${height}`;
  };

  protected determineAudioCodec (
    format: string,
    commercialName: string,
    formatProfile: string,
  ): string {
    const codecRules = [
      { match: () => /MLP FBA/i.test(format) && /Dolby Atmos/i.test(commercialName), codec: 'atmos' },
      { match: () => /MLP FBA/i.test(format), codec: 'truehd' },
      { match: () => /AC-3/i.test(format) && /Dolby Digital Plus/i.test(commercialName), codec: 'dd+' },
      { match: () => /E-AC-3/i.test(format), codec: 'dd+' },
      { match: () => /AC-3/i.test(format) && /Dolby Digital/i.test(commercialName), codec: 'dd' },
      { match: () => /AC-3/i.test(format), codec: 'ac3' },
      { match: () => /DTS XLL X/i.test(format), codec: 'dtsx' },
      { match: () => /DTS/i.test(format) && /DTS-HD Master Audio/i.test(commercialName), codec: 'dtshdma' },
      { match: () => /DTS/i.test(format) && /MA \/ Core/i.test(formatProfile), codec: 'dtshdma' },
      { match: () => /DTS/i.test(format) && /High Resolution/i.test(commercialName), codec: 'dtshd' },
      { match: () => /DTS/i.test(format), codec: 'dts' },
      { match: () => /FLAC/i.test(format), codec: 'flac' },
      { match: () => /AAC/i.test(format), codec: 'aac' },
      { match: () => /LPCM/i.test(format), codec: 'lpcm' },
      { match: () => /MP3/i.test(format), codec: 'mp3' },
      { match: () => /Opus/i.test(format), codec: 'opus' },
      { match: () => /Vorbis/i.test(format), codec: 'vorbis' },
    ];

    const matchedRule = codecRules.find(rule => rule.match());
    return matchedRule ? matchedRule.codec : '';
  }
}

export class MediaInfoParser extends MediaParser {
  splitIntoSections () {
    const lines = this.source.split('\n');
    const sections: Record<string, Record<string, string>[]> = {};

    let currentSectionLines: Record<string, string> = {};
    let currentSectionType = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      const sectionHeaderMatch = trimmedLine.match(/^([a-zA-Z]+)(\s*#\d+)?$/);
      if (sectionHeaderMatch) {
        if (currentSectionType && Object.keys(currentSectionLines).length > 0) {
          if (sections[currentSectionType]) {
            sections[currentSectionType].push(currentSectionLines);
          } else {
            sections[currentSectionType] = [currentSectionLines];
          }
        }
        currentSectionType = sectionHeaderMatch[1];
        currentSectionLines = {};
        continue;
      }
      if (currentSectionType) {
        const [key, value] = trimmedLine.split(':').map((s) => s.trim());
        if (key && value) {
          currentSectionLines[key] = value;
        }
      }
    }
    if (currentSectionType && Object.keys(currentSectionLines).length > 0) {
      if (sections[currentSectionType]) {
        sections[currentSectionType].push(currentSectionLines);
      } else {
        sections[currentSectionType] = [currentSectionLines];
      }
    }
    return sections;
  }

  parseGeneralSection (general: Record<string, string>) {
    this.result.fileSize = convertSizeStringToBytes(general['File size']);
    this.result.duration = this.parseDuration(general.Duration);
    this.result.format = general.Format;
  }

  parseVideoSection (videos: Record<string, string>[]) {
    const videoTracks: VideoTrack[] = [];
    for (const video of videos) {
      videoTracks.push(this.parseVideo(video, this.result.format));
    }
    return videoTracks;
  }

  parseAudioSection (audios: Record<string, string>[]) {
    const audioTracks: AudioTrack[] = [];
    for (const audio of audios) {
      audioTracks.push(this.parseAudio(audio));
    }
    return audioTracks;
  }

  parseSubtitleSection (subtitles: Record<string, string>[]) {
    const subtitleTracks: SubtitleTrack[] = [];
    for (const subtitle of subtitles) {
      const {
        ID: id = '',
        Title: title = '',
        Language: language = '',
        Default: isDefault = '',
        Forced: isForced = '',
      } = subtitle;
      subtitleTracks.push({
        id,
        title,
        language,
        default: isDefault === 'Yes',
        forced: isForced === 'Yes',
      });
    }
    return subtitleTracks;
  }

  parseAudio (audio: Record<string, string>): AudioTrack {
    const {
      Format: audioFormat = '',
      'Format profile': formatProfile = '',
      'Commercial name': commercialName = '',
      'Channel(s)': audioChannels = '',
      ID: id = '',
      Default: isDefault = '',
      Forced: isForced = '',
      Language: language = '',
    } = audio;
    let channelName = '';
    const channelNumber = parseInt(audioChannels, 10);
    if (channelNumber && channelNumber >= 6) {
      channelName = `${channelNumber - 1}.1`;
    } else {
      channelName = `${channelNumber}.0`;
    }

    const codec = this.determineAudioCodec(audioFormat, commercialName, formatProfile);
    return {
      channelName,
      language,
      default: isDefault === 'Yes',
      forced: isForced === 'Yes',
      id,
      codec,
    };
  }

  parseVideo (video: Record<string, string>, generalFormat: string): VideoTrack {
    const {
      Format: videoFormat = '',
      'Format version': videoFormatVersion = '',
      'Codec ID': videoCodeId = '',
      'HDR format': hdrFormat = '',
      'Encoding settings': encodingSettings,
      Default: isDefault = '',
      Forced: isForced = '',
      ID: id = '',
      Width = '',
      Height = '',
      'Scan type': scanType = '',
    } = video;
    const isEncoded = !!encodingSettings;

    const formatCodecMap: Record<string, string> = {
      'DVD Video': 'mpeg2',
      'MPEG-4': 'mpeg4',
    };
    let videoCodec = formatCodecMap[generalFormat] || '';

    if (!videoCodec) {
      if (videoFormat === 'MPEG Video' && videoFormatVersion === 'Version 2') {
        videoCodec = 'mpeg2';
      } else if (/xvid/i.test(videoCodeId)) {
        videoCodec = 'xvid';
      } else if (/HEVC/i.test(videoFormat)) {
        videoCodec = isEncoded ? 'x265' : 'hevc';
      } else if (/AVC/i.test(videoFormat)) {
        videoCodec = isEncoded ? 'x264' : 'h264';
      } else if (/VC-1/i.test(videoFormat)) {
        videoCodec = 'vc1';
      } else if (/vvc/i.test(videoFormat)) {
        videoCodec = 'vvc';
      }
    }
    const hdrType = this.getHdrType(hdrFormat);
    const videoWidth = parseInt(Width.replace(/\s/g, ''), 10);
    const videoHeight = parseInt(Height.replace(/\s/g, ''), 10);
    const resolution = this.parseResolution(videoWidth, videoHeight, scanType);

    return {
      hdrType,
      codec: videoCodec,
      isEncoded,
      default: isDefault === 'Yes',
      forced: isForced === 'Yes',
      id,
      resolution,
    };
  }

  parse (): MediaInfo {
    const sections = this.splitIntoSections();
    this.parseGeneralSection(sections.General[0]);
    this.parseVideoSection(sections.Video);
    this.parseAudioSection(sections.Audio);
    this.parseSubtitleSection(sections.Text);
    return this.result;
  }
}

// export class BDInfoParser extends MediaParser {

// }
