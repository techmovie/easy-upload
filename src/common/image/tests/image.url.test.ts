import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getOriginalImgUrl } from '../image.url';
import { URLStrategies } from '../image.utils';

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
  $t: vi.fn((key) => key),
  getValue: vi.fn(),
}));

vi.mock(import('../image.utils'), async (importOriginal) => {
  const actual = await importOriginal();
  const mockStrategy1 = {
    matches: vi.fn(),
    transform: vi.fn(),
  };

  const mockStrategy2 = {
    matches: vi.fn(),
    transform: vi.fn(),
  };
  return {
    ...actual,
    URLStrategies: [mockStrategy1, mockStrategy2],
  };
});
describe('getOriginalImgUrl', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    URLStrategies.forEach(strategy => {
      vi.mocked(strategy.matches).mockReset();
      vi.mocked(strategy.transform).mockReset();
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should extract URL from [img] BBCode', async () => {
    const bbcode = '[img]https://example.com/original.png[img]';
    const result = await getOriginalImgUrl(bbcode);
    URLStrategies.forEach(strategy => {
      expect(strategy.matches).not.toHaveBeenCalled();
      expect(strategy.transform).not.toHaveBeenCalled();
    });
    expect(result).toBe('https://example.com/original.png');
  });
  it('should extract raw URL without BBCode', async () => {
    const bbcode = 'https://example.com/original.png';
    const result = await getOriginalImgUrl(bbcode);
    URLStrategies.forEach(strategy => {
      expect(strategy.matches).not.toHaveBeenCalled();
      expect(strategy.transform).not.toHaveBeenCalled();
    });
    expect(result).toBe('https://example.com/original.png');
  });
  it('should return original image url if it has no thumbnail', async () => {
    const bbcode = '[url=https://example.com/original.png][/url]';
    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe('https://example.com/original.png');
  });
  it('should throw error when [url=...] BBCode with no URL', async () => {
    const bbcode = '[url=]Test Image[/url]';
    await expect(getOriginalImgUrl(bbcode)).rejects.toThrow('Invalid BBCode - No valid image URL found');
  });
  it('should return image url even it\'s not wrapped in valid bbcode tag', async () => {
    const bbcode = '[invalid]http://example.com/original.png[/invalid]';
    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe('http://example.com/original.png');
  });
  it('should handle [img] BBCode with no URL', async () => {
    const bbcode = '[img][/img]';
    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe('');
  });
  it('spaces or new lines should be trimmed', async () => {
    const bbcode1 = '[url=https://example.com/original.png  ]\n[img]https://example.com/thumb1.png[/img]\n[/url]';
    const result1 = await getOriginalImgUrl(bbcode1);
    expect(result1).toBe('https://example.com/original.png');
    const bbcode2 = '   https://example.com/original.png   \n';
    const result2 = await getOriginalImgUrl(bbcode2);
    expect(result2).toBe('https://example.com/original.png');
  });
  it("should throw error if there's no image url in the bbcode", async () => {
    const bbcode = '[url=invalidurl][/url]';
    await expect(getOriginalImgUrl(bbcode)).rejects.toThrow('Invalid BBCode - No valid image URL found');
  });
  it('should throw error if bbcode is not provided', async () => {
    await expect(getOriginalImgUrl('')).rejects.toThrow('Invalid BBCode - No BBCode found');
  });
  it('one of the strategies should be applied', async () => {
    const bbcode = '[url=https://img.hdbits.org/image][img]https://img.hdbits.org/image.jpg[/img][/url]';
    const extractedUrl = 'https://img.hdbits.org/image';
    const originalUrl = 'https://img.hdbits.org/image.png';
    vi.mocked(URLStrategies[0].matches).mockReturnValueOnce(true);
    vi.mocked(URLStrategies[0].transform).mockResolvedValueOnce(originalUrl);
    const result = await getOriginalImgUrl(bbcode);
    expect(URLStrategies[0].matches).toBeCalledWith(extractedUrl, bbcode);
    expect(URLStrategies[0].transform).toBeCalledWith(extractedUrl, bbcode);
    expect(result).toBe(originalUrl);
  });
  it('should apply first matching strategy when multiple strategies match', async () => {
    const bbcode = '[url=https://example.com/image.jpg]Test Image[/url]';
    const extractedUrl = 'https://example.com/image.jpg';
    const transformedUrl1 = 'https://example.com/transformed1.jpg';
    const transformedUrl2 = 'https://example.com/transformed2.jpg';
    vi.mocked(URLStrategies[0].matches).mockReturnValue(true);
    vi.mocked(URLStrategies[0].transform).mockResolvedValue(transformedUrl1);
    vi.mocked(URLStrategies[1].matches).mockReturnValue(true);
    vi.mocked(URLStrategies[1].transform).mockResolvedValue(transformedUrl2);

    const result = await getOriginalImgUrl(bbcode);

    expect(URLStrategies[0].transform).toHaveBeenCalledWith(extractedUrl, bbcode);
    expect(URLStrategies[1].transform).not.toHaveBeenCalled();

    expect(result).toBe(transformedUrl1);
  });
  it('should return the extracted URL if no strategy matches for [url=...] BBCode', async () => {
    const bbcode = '[url=https://example.com/original.png][img]https://example.com/thumb1.png[/img][/url]';
    const extractedUrl = 'https://example.com/original.png';
    URLStrategies.forEach((strategy) => {
      vi.mocked(strategy.matches).mockReturnValueOnce(false);
    });
    const result = await getOriginalImgUrl(bbcode);
    URLStrategies.forEach((strategy) => {
      expect(strategy.matches).toBeCalledWith(extractedUrl, bbcode);
    });
    URLStrategies.forEach(strategy => {
      expect(strategy.transform).not.toHaveBeenCalled();
    });
    expect(result).toBe(extractedUrl);
  });
  it('should handle raw HTTP URLs without SSL', async () => {
    const url = 'http://example.com/image.jpg';
    const result = await getOriginalImgUrl(url);
    expect(result).toBe(url);
  });
  it('should extract URL from complex BBCode with multiple brackets', async () => {
    const bbcode = '[url=https://example.com/image.jpg][b]Complex [i]Test[/i] Image[/b][/url]';
    const extractedUrl = 'https://example.com/image.jpg';
    URLStrategies.forEach(strategy => {
      vi.mocked(strategy.matches).mockReturnValue(false);
    });

    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe(extractedUrl);
  });
});
