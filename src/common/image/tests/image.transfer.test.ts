import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { uploadToPtpImg } from '../image.upload';
import {
  transferImgToCheveretoSite,
  transferImgsToPtpimg,

} from '../image.transfer';
import { GMFetch } from '@/common/utils';
import {
  getCheveretoToken,
  createCheveretoRequestConfig,
  parseCheveretoResponse,
} from '../image.upload.helper';
import { cachedUrlToFile } from '../image.utils';

vi.mock('../image.upload.helper', { spy: true });
vi.mock('../image.upload', { spy: true });
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
    getImageBBCodeMatches: vi.fn(),
    cachedUrlToFile: vi.fn(),
    createFormData: vi.fn(),
    withUploadErrorHandling: vi.fn((fn) => fn),
  };
});

describe('transferImgToCheveretoSite', () => {
  it('should transfer images to Chevereto site and return image info', async () => {
    const imgUrls = [
      'http://example.com/image1.jpg',
      'http://example.com/image2.jpg',
    ];
    const authToken = 'authToken';
    const imgHost = 'http://example.com';
    const formData = new FormData();
    vi.mocked(getCheveretoToken).mockResolvedValueOnce(authToken);
    vi.mocked(createCheveretoRequestConfig).mockResolvedValue({
      method: 'POST',
      data: formData,
    });
    const expectedResponse = [
      {
        status_txt: 'OK',
        image: {
          url: 'http://example.com/img1.png',
          thumb: {
            url: 'http://example.com/thumb1.png',
          },
        },
      },
      {
        status_txt: 'OK',
        image: {
          url: 'http://example.com/img2.png',
          thumb: {
            url: 'http://example.com/thumb2.png',
          },
        },
      },
    ];
    vi.mocked(GMFetch)
      .mockResolvedValueOnce(expectedResponse[0])
      .mockResolvedValueOnce(expectedResponse[1]);
    const expectedResult = [
      {
        original: 'http://example.com/img1.png',
        thumbnail: 'http://example.com/thumb1.png',
      },
      {
        original: 'http://example.com/img2.png',
        thumbnail: 'http://example.com/thumb2.png',
      },
    ];
    vi.mocked(parseCheveretoResponse).mockResolvedValueOnce(expectedResult);
    const uploadFn = await transferImgToCheveretoSite;
    const result = await uploadFn(imgUrls, imgHost);
    expect(result).toEqual(expectedResult);
    expect(getCheveretoToken).toHaveBeenCalledWith(imgHost);
    expect(createCheveretoRequestConfig).toHaveBeenCalledWith(
      imgUrls[0],
      imgHost,
      authToken,
    );
    expect(createCheveretoRequestConfig).toHaveBeenCalledWith(
      imgUrls[1],
      imgHost,
      authToken,
    );
    expect(GMFetch).toHaveBeenCalledTimes(2);
    expect(parseCheveretoResponse).toHaveBeenCalledWith(expectedResponse);
  });
});

describe('transferImgsToPtpimg', () => {
  it('should transfer images to Ptpimg and return image URLs', async () => {
    const urls = ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'];
    vi.mocked(await uploadToPtpImg).mockResolvedValueOnce(['http://ptpimg.me/img1.png', 'http://ptpimg.me/img2.png']);
    const result = await transferImgsToPtpimg(urls);
    expect(result).toEqual(['http://ptpimg.me/img1.png', 'http://ptpimg.me/img2.png']);
    expect(uploadToPtpImg).toHaveBeenCalledWith(urls);
    expect(uploadToPtpImg).toHaveBeenCalledTimes(1);
    expect(cachedUrlToFile).not.toHaveBeenCalled();
  });
  it('should return empty array if no images are provided', async () => {
    const result = await transferImgsToPtpimg([]);
    expect(result).toEqual([]);
  });
  it('should throw error if image is already hosted on Ptpimg', async () => {
    const urls = ['http://ptpimg.me/img1.png'];
    await expect(transferImgsToPtpimg(urls)).rejects.toThrowError();
    expect(uploadToPtpImg).not.toHaveBeenCalled();
  });
  it('should upload images to Ptpimg if images are hosted on HDBits', async () => {
    const urls = ['http://i.hdbits.org/img1.png', 'http://i.hdbits.org/img2.png'];
    const files = [new File([''], 'img1.png'), new File([''], 'img2.png')];
    vi.mocked(cachedUrlToFile).mockResolvedValueOnce(files[0]).mockResolvedValueOnce(files[1]);
    vi.mocked(await uploadToPtpImg).mockResolvedValueOnce(['http://ptpimg.me/img1.png', 'http://ptpimg.me/img2.png']);
    const result = await transferImgsToPtpimg(urls);
    expect(result).toEqual(['http://ptpimg.me/img1.png', 'http://ptpimg.me/img2.png']);
    expect(cachedUrlToFile).toHaveBeenCalledTimes(2);
    expect(uploadToPtpImg).toHaveBeenCalledWith(files);
  });
});
