import { expect, describe, it, vi } from 'vitest';
import { getAudioCodecFromSource, getBDTypeBasedOnSize, parseMedia } from '../index';
import { BDInfoParser, MediaInfoParser } from '../media.mediaParser';

describe('getAudioCodecFromSource', () => {
  it('should return codec correctly', () => {
    const source = 'Anora.2024.1080p.FRA.Blu-ray.AVC.DTS-HD.MA.5.1';
    const result = getAudioCodecFromSource(source);
    expect(result).toBe('dtshdma');

    const source2 = 'Anora.2024.1080p.DTSX.Atmos.5.1';
    const result2 = getAudioCodecFromSource(source2);
    expect(result2).toBe('atmos');

    const source3 = 'Anora.2024.1080p.AAC.2.0';
    const result3 = getAudioCodecFromSource(source3);
    expect(result3).toBe('aac');

    const source4 = 'Anora.2024.1080p.DD.2.0';
    const result4 = getAudioCodecFromSource(source4);
    expect(result4).toBe('dd');

    const source5 = 'Anora.2024.1080p.DD+.2.0';
    const result5 = getAudioCodecFromSource(source5);
    expect(result5).toBe('dd+');

    const source6 = 'Anora.2024.1080p.DDP.2.0';
    const result6 = getAudioCodecFromSource(source6);
    expect(result6).toBe('dd+');

    const source7 = 'Anora.2024.1080p.DolbyDigitalPlus.2.0';
    const result7 = getAudioCodecFromSource(source7);
    expect(result7).toBe('dd+');

    const source8 = 'Anora.2024.1080p.DolbyDigital.2.0';
    const result8 = getAudioCodecFromSource(source8);
    expect(result8).toBe('dd');

    const source9 = 'Anora.2024.1080p.DTS.2.0';
    const result9 = getAudioCodecFromSource(source9);
    expect(result9).toBe('dts');

    const source10 = 'Anora.2024.1080p.FLAC.2.0';
    const result10 = getAudioCodecFromSource(source10);
    expect(result10).toBe('flac');

    const source11 = 'Anora.2024.1080p.LPCM.2.0';
    const result11 = getAudioCodecFromSource(source11);
    expect(result11).toBe('lpcm');

    const source12 = 'Anora.2024.1080p.TrueHD.2.0';
    const result12 = getAudioCodecFromSource(source12);
    expect(result12).toBe('truehd');

    const source13 = 'Anora.2024.1080p.AC3.2.0';
    const result13 = getAudioCodecFromSource(source13);
    expect(result13).toBe('ac3');

    expect(getAudioCodecFromSource('')).toBe('');
    expect(getAudioCodecFromSource('Anora.2024.1080p')).toBe('');
  });
});

describe('getBDTypeBasedOnSize', () => {
  const GBSize = 1024 ** 3;
  it('should return bd type correctly', () => {
    expect(getBDTypeBasedOnSize(4 * GBSize)).toBe('DVD5');
    expect(getBDTypeBasedOnSize(5 * GBSize)).toBe('DVD9');
    expect(getBDTypeBasedOnSize(9 * GBSize)).toBe('BD25');
    expect(getBDTypeBasedOnSize(22 * GBSize)).toBe('BD25');
    expect(getBDTypeBasedOnSize(45 * GBSize)).toBe('BD50');
    expect(getBDTypeBasedOnSize(50 * GBSize)).toBe('BD66');
    expect(getBDTypeBasedOnSize(78 * GBSize)).toBe('BD100');
    expect(getBDTypeBasedOnSize(100 * GBSize)).toBe('Unknown');
  });
});

describe('parseMedia', () => {
  it('BDInfoParser should be parsed if it\'s bluray', () => {
    const parserSpy = vi
      .spyOn(BDInfoParser.prototype, 'parse').mockReturnValue({
        fileName: '',
        fileSize: 0,
        duration: 0,
        format: '',
        audioTracks: [],
        subtitleTracks: [],
        videoTracks: [],
      });
    parseMedia('source', true);
    expect(parserSpy).toHaveBeenCalledTimes(1);
    parserSpy.mockRestore();
  });
  it('MediaInfoParser should be parsed if it\'s not bluray', () => {
    const parserSpy = vi
      .spyOn(MediaInfoParser.prototype, 'parse').mockReturnValue({
        fileName: '',
        fileSize: 0,
        duration: 0,
        format: '',
        audioTracks: [],
        subtitleTracks: [],
        videoTracks: [],
      });
    parseMedia('source');
    expect(parserSpy).toHaveBeenCalledTimes(1);
    parserSpy.mockRestore();
  });
});
