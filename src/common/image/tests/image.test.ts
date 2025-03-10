import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { uploadToHDB, getImgInfoFromBBCode, getOriginalImgUrl } from '../image';
import { GMFetch } from '@/common/utils';
import { CONFIG } from '../image.config';
import {
  cachedUrlToFile,
  createFormData,
  HdBitsStrategy,
} from '../image.utils';

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
  $t: vi.fn((key) => key),
  getValue: vi.fn(),
}));

vi.mock(import('../image.utils'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    cachedUrlToFile: vi.fn(),
    createFormData: vi.fn(),
    withUploadErrorHandling: vi.fn((fn) => fn),
  };
});

vi.mock('./image', { spy: true });

describe.skip('getImgInfoFromBBCode', () => {
  it('should return image info from BBCode', async () => {
    const bbCode = '[url=https://example.com/original.png][img]https://example.com/thumb1.png[/img][/url]';
    const result = await getImgInfoFromBBCode(bbCode);
    expect(result).toEqual({
      original: 'https://hdbits.org/thumb1.png',
      thumbnail: 'https://hdbits.org/thumb1.png',
    });
  });
});

describe.skip('uploadToHDB', () => {
  it('should upload images to HDB and return image info', async () => {
    const imgUrls = [
      'http://example.com/image1.jpg',
      'http://example.com/image2.jpg',
    ];
    const galleryName = 'test gallery';
    const mockFiles = [
      new File([''], 'image1.jpg'),
      new File([''], 'image2.jpg'),
    ];
    const mockFormData = new FormData();
    vi.mocked(cachedUrlToFile).mockImplementation((url) => {
      const index = imgUrls.indexOf(url);
      return Promise.resolve(mockFiles[index]);
    });
    vi.mocked(createFormData).mockReturnValueOnce(mockFormData);
    const mockedHDBResponse = '[url=https://hdbits.org/img1.png][img]https://hdbits.org/thumb1.png[/img][/url]\n[url=https://hdbits.org/img2.png][img]https://hdbits.org/thumb2.png[/img][/url]';
    vi.mocked(GMFetch).mockResolvedValueOnce(mockedHDBResponse);
    vi.mocked(getImgInfoFromBBCode).mockImplementation((bbCode) => {
      if (bbCode.includes('img1')) {
        return Promise.resolve({
          original: 'https://hdbits.org/img1.png',
          thumbnail: 'https://hdbits.org/thumb1.png',
        });
      }
      return Promise.resolve({
        original: 'https://hdbits.org/img2.png',
        thumbnail: 'https://hdbits.org/thumb2.png',
      });
    });
    const result = await (await uploadToHDB)(imgUrls, galleryName);

    expect(cachedUrlToFile).toBeCalledTimes(2);
    expect(cachedUrlToFile).toBeCalledWith(imgUrls[0]);
    expect(cachedUrlToFile).toBeCalledWith(imgUrls[1]);

    expect(createFormData).toBeCalledTimes(1);
    expect(createFormData).toHaveBeenCalledWith(
      {
        galleryoption: '1',
        galleryname: galleryName,
      },
      [
        {
          fieldName: 'images_files',
          file: mockFiles,
        },
      ],
    );

    expect(GMFetch).toBeCalledTimes(1);
    expect(GMFetch).toBeCalledWith(CONFIG.URLS.HDB_UPLOAD, {
      data: mockFormData,
      method: 'POST',
      responseType: 'undefined',
    });

    expect(getImgInfoFromBBCode).toBeCalledTimes(2);
    expect(getImgInfoFromBBCode).toBeCalledWith(
      '[img]https://hdbits.org/thumb1.png[/img]',
    );
    expect(getImgInfoFromBBCode).toBeCalledWith(
      '[img]https://hdbits.org/thumb2.png[/img]',
    );
    expect(result).toEqual([
      {
        original: 'https://hdbits.org/img1.png',
        thumbnail: 'https://hdbits.org/thumb1.png',
      },
      {
        original: 'https://hdhdbitsb.org/img2.png',
        thumbnail: 'https://hdbits.org/thumb2.png',
      },
    ]);
  });
});

describe.skip('getOriginalImgUrl', () => {
  it('No defined strategy should be applied', async () => {
    const bbcode = '[url=https://example.com/original.png][img]https://example.com/thumb1.png[/img][/url]';
    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe('https://example.com/original.png');
  });
  it('HdBitsStrategy should be applied', async () => {
    const bbcode = '[url=https://img.hdbits.org/image.jpg][img]https://img.hdbits.org/thumb1.jpg[/img][/url]';
    vi.mocked(HdBitsStrategy).mockImplementation(() => new HdBitsStrategy());
    const result = await getOriginalImgUrl(bbcode);
    expect(result).toBe('https://img.hdbits.org/image.jpg');
  });
});
