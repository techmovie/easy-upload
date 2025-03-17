import { vi, expect, describe, it } from 'vitest';
import { BDInfoParser } from '../media.mediaParser';

vi.mock('../index', { spy: true });
vi.mock('@/common/utils', { spy: true });

describe('MediaParser', () => {
  it('should parse quickSummary BDInfo correctly', () => {
    const source = `Disc Label: Anora.2024.1080p.FRA.Blu-ray.AVC.DTS-HD.MA.5.1
Disc Size: 47,576,622,216 bytes
Protection: AACS
Playlist: 00000.MPLS
Size: 44,096,403,456 bytes
Length: 2:18:47.000
Total Bitrate: 42.36 Mbps
Video: MPEG-4 AVC Video / 32877 kbps / 1080p / 24 fps / 16:9 / High Profile 4.1
Audio: French / DTS-HD Master Audio / 5.1 / 48 kHz / 3148 kbps / 24-bit (DTS Core: 5.1 / 48 kHz / 1509 kbps / 24-bit)
Audio: English / DTS-HD Master Audio / 5.1 / 48 kHz / 3144 kbps / 24-bit (DTS Core: 5.1 / 48 kHz / 1509 kbps / 24-bit)
Audio: French / DTS Audio / 2.0 / 48 kHz / 768 kbps / 16-bit
Subtitle: French / 4.467 kbps
Subtitle: German / 26.285 kbps
Subtitle: English / 35.278 kbps`;
    const mediaParser = new BDInfoParser(source);
    const result = mediaParser.parse();
    expect(result.duration).toBe(2 * 3600 + 18 * 60 + 47);
    expect(result.fileSize).toBe(47576622216);
    expect(result.fileName).toBe('Anora.2024.1080p.FRA.Blu-ray.AVC.DTS-HD.MA.5.1');
    expect(result.videoTracks).toHaveLength(1);
    expect(result.audioTracks).toHaveLength(3);
    expect(result.subtitleTracks).toHaveLength(3);
    expect(result.videoTracks[0].resolution).toBe('1080p');
    expect(result.videoTracks[0].codec).toBe('h264');
    expect(result.audioTracks[0].channelName).toBe('5.1');
    expect(result.audioTracks[0].language).toBe('French');
    expect(result.audioTracks[0].codec).toBe('dtshdma');
    expect(result.audioTracks[1].channelName).toBe('5.1');
    expect(result.audioTracks[1].language).toBe('English');
    expect(result.audioTracks[1].codec).toBe('dtshdma');
    expect(result.audioTracks[2].channelName).toBe('2.0');
    expect(result.audioTracks[2].language).toBe('French');
    expect(result.audioTracks[2].codec).toBe('dts');
    expect(result.subtitleTracks[0].language).toBe('French');
    expect(result.subtitleTracks[1].language).toBe('German');
    expect(result.subtitleTracks[2].language).toBe('English');
  });

  it('should parse raw BDInfo correctly', () => {
    const source = `DISC INFO:
    
    Disc Title: Wall-E - Ultra HD™
    Disc Label: WALL.E.2008.COMPLETE.UHD.BLURAY-AViATOR
    Disc Size: 64,831,109,301 bytes
    Protection: AACS2
    Extras: Ultra HD, BD-Java
    BDInfo: 0.7.5.5
    
    PLAYLIST REPORT:
    
    Name: 00800.MPLS
    Length: 1:38:12.594 (h:m:s.ms)
    Size: 44,503,998,912 bytes
    Total Bitrate: 60.42 Mbps
    
    VIDEO:
    
    Codec Bitrate Description
    ----- ------- -----------
    MPEG-H HEVC Video 41600 kbps 2160p / 23.976 fps / 16:9 / Main 10 @ Level 5.1 @ High / 10 bits / HDR10 / BT.2020
    
    AUDIO:
    
    Codec Language Bitrate Description
    ----- -------- ------- -----------
    Dolby TrueHD/Atmos Audio English 7879 kbps 7.1 / 48 kHz / 7239 kbps / 24-bit (AC3 Embedded: 5.1-EX / 48 kHz / 640 kbps / DN -27dB)
    DTS-HD Master Audio English 4144 kbps 5.1-ES / 48 kHz / 4144 kbps / 24-bit (DTS Core: 5.1-ES / 48 kHz / 1509 kbps / 24-bit)
    Dolby Digital EX Audio English 640 kbps 5.1-EX / 48 kHz / 640 kbps / DN -27dB
    Dolby Digital Audio English 320 kbps 2.0 / 48 kHz / 320 kbps / DN -27dB
    Dolby Digital Audio English 320 kbps 2.0 / 48 kHz / 320 kbps / DN -27dB
    Dolby Digital EX Audio French 640 kbps 5.1-EX / 48 kHz / 640 kbps / DN -31dB
    Dolby Digital EX Audio Spanish 640 kbps 5.1-EX / 48 kHz / 640 kbps / DN -31dB
    
    SUBTITLES:
    
    Codec Language Bitrate Description
    ----- -------- ------- -----------
    Presentation Graphics English 28.699 kbps
    Presentation Graphics French 11.777 kbps
    Presentation Graphics Spanish 11.718 kbps`;

    const mediaParser = new BDInfoParser(source);
    const result = mediaParser.parse();
    expect(result.duration).toBe(1 * 3600 + 38 * 60 + 12.594);
    expect(result.fileSize).toBe(64831109301);
    expect(result.fileName).toBe('WALL.E.2008.COMPLETE.UHD.BLURAY-AViATOR');
    expect(result.videoTracks).toHaveLength(1);
    expect(result.audioTracks).toHaveLength(7);
    expect(result.subtitleTracks).toHaveLength(3);
    expect(result.videoTracks[0].resolution).toBe('2160p');
    expect(result.videoTracks[0].codec).toBe('hevc');
    expect(result.videoTracks[0].hdrType).toBe('HDR10');
    expect(result.audioTracks[0].channelName).toBe('7.1');
    expect(result.audioTracks[0].language).toBe('English');
    expect(result.audioTracks[0].codec).toBe('atmos');
    expect(result.audioTracks[5].channelName).toBe('5.1');
    expect(result.audioTracks[5].language).toBe('French');
    expect(result.audioTracks[5].codec).toBe('dd');
    expect(result.subtitleTracks[0].language).toBe('English');
    expect(result.subtitleTracks[1].language).toBe('French');
    expect(result.subtitleTracks[2].language).toBe('Spanish');
  });
  it('should parse another qucikSummary BDInfo correctly', () => {
    const source = `Disc Title: MOANA 2 - Ultra HD™
    Disc Label: Moana 2 2024 UHD BluRay 2160p HEVC Atmos TrueHD7.1-MTeam
    Disc Size: 59,644,244,389 bytes
    Protection: AACS2
    Playlist: 00800.MPLS
    Size: 48,927,344,640 bytes
    Length: 1:39:42.017
    Total Bitrate: 65.43 Mbps
    Video: MPEG-H HEVC Video / 46966 kbps / 2160p / 23.976 fps / 16:9 / Main 10 @ Level 5.1 @ High / 10 bits / HDR10 / BT.2020
    * Video: MPEG-H HEVC Video / 4191 kbps / 1080p / 23.976 fps / 16:9 / Main 10 @ Level 5.1 @ High / 10 bits / Dolby Vision / BT.2020
    Audio: English / Dolby TrueHD/Atmos Audio / 7.1 / 48 kHz / 5001 kbps / 24-bit (AC3 Embedded: 5.1 / 48 kHz / 640 kbps / DN -27dB)
    Audio: English / Dolby Digital Audio / 2.0 / 48 kHz / 320 kbps / DN -27dB
    Audio: French / Dolby Digital Plus Audio / 7.1 / 48 kHz / 1024 kbps / DN -27dB (AC3 Embedded: 5.1 / 48 kHz / 576 kbps / DN -27dB)
    Audio: Spanish / Dolby Digital Plus Audio / 7.1 / 48 kHz / 1024 kbps / DN -27dB (AC3 Embedded: 5.1 / 48 kHz / 576 kbps / DN -27dB)
    Audio: Japanese / Dolby Digital Plus Audio / 7.1 / 48 kHz / 1024 kbps / DN -27dB (AC3 Embedded: 5.1 / 48 kHz / 576 kbps / DN -27dB)
    Audio: Japanese / Dolby Digital Audio / 2.0 / 48 kHz / 320 kbps / DN -24dB
    Subtitle: English / 44.971 kbps
    Subtitle: French / 35.721 kbps
    Subtitle: Spanish / 33.557 kbps
    Subtitle: Japanese / 22.860 kbps
    Subtitle: French / 1.705 kbps
    * Subtitle: English / 493.602 kbps
    * Subtitle: French / 50.745 kbps
    * Subtitle: Spanish / 41.642 kbps
    * Subtitle: Japanese / 55.077 kbps`;

    const mediaParser = new BDInfoParser(source);
    const result = mediaParser.parse();
    expect(result.duration).toBe(1 * 3600 + 39 * 60 + 42.017);
    expect(result.fileSize).toBe(59644244389);
    expect(result.fileName).toBe('Moana 2 2024 UHD BluRay 2160p HEVC Atmos TrueHD7.1-MTeam');
    expect(result.videoTracks).toHaveLength(2);
    expect(result.audioTracks).toHaveLength(6);
    expect(result.subtitleTracks).toHaveLength(9);
    expect(result.videoTracks[0].resolution).toBe('2160p');
    expect(result.videoTracks[0].codec).toBe('hevc');
    expect(result.videoTracks[0].hdrType).toBe('HDR10');
    expect(result.videoTracks[1].resolution).toBe('1080p');
    expect(result.videoTracks[1].codec).toBe('hevc');
    expect(result.videoTracks[1].hdrType).toBe('DV');
    expect(result.audioTracks[0].channelName).toBe('7.1');
    expect(result.audioTracks[0].language).toBe('English');
    expect(result.audioTracks[0].codec).toBe('atmos');
    expect(result.audioTracks[4].channelName).toBe('7.1');
    expect(result.audioTracks[4].language).toBe('Japanese');
    expect(result.audioTracks[4].codec).toBe('dd+');
    expect(result.subtitleTracks[0].language).toBe('English');
    expect(result.subtitleTracks[7].language).toBe('Spanish');
  });
});
