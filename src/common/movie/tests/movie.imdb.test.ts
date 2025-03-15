import { expect, describe, it, vi } from 'vitest';
import {
  getIdByIMDbUrl,
  getIMDBData,
  getIMDBRating,
} from '../movie.imdb';
import { CONFIG } from '../movie.config';
import { GMFetch } from '@/common/utils';

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
}));

describe('getIdByIMDbUrl', () => {
  it('should return the IMDb ID from the IMDb URL', () => {
    const imdbId = getIdByIMDbUrl('https://www.imdb.com/title/tt123456/');
    expect(imdbId).toBe('tt123456');
  });

  it('should return empty string if no IMDb URL provided', () => {
    const imdbId = getIdByIMDbUrl('');
    expect(imdbId).toBe('');
  });

  it('should return empty string if the IMDb URL is invalid', () => {
    const imdbId = getIdByIMDbUrl('https://www.imdb.com/title/t123456');
    expect(imdbId).toBe('');
  });
});

describe('getIMDBData', () => {
  it('should return the IMDB data', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      success: true,
      resource: {
        id: 'tt123456',
        title: 'Movie Title',
        year: 2021,
      },
    });
    const url = 'https://www.imdb.com/title/tt123456/';
    const data = await getIMDBData(url);
    expect(GMFetch).toHaveBeenCalledWith(CONFIG.URLS.PT_GEN_API(url), {
      responseType: 'json',
    });
    expect(data).toEqual({
      success: true,
      resource: {
        id: 'tt123456',
        title: 'Movie Title',
        year: 2021,
      },
    });
  });

  it('should throw an error if no IMDB URL provided', async () => {
    await expect(getIMDBData('')).rejects.toThrow('No IMDB URL provided');
  });

  it('should throw an error if the request fails', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      success: false,
      error: 'Failed Message',
    });
    await expect(getIMDBData('https://www.imdb.com/title/tt123456/')).rejects.toThrow('Failed Message');
  });

  it('should throw an error if the request fails', async () => {
    vi.mocked(GMFetch).mockResolvedValue(null);
    await expect(getIMDBData('https://www.imdb.com/title/tt123456/')).rejects.toThrow('Failed to get IMDB data');
  });
});

describe('getIMDBRating', () => {
  it('should return the IMDB rating', async () => {
    const mockData = 'imdb.rating.run({ "resource": {"id": "/title/tt1234567/", "rating": 6.3, "ratingCount": 24 } })';
    vi.mocked(GMFetch).mockResolvedValue(mockData);
    const rating = await getIMDBRating('tt1234567');

    expect(rating).toEqual({
      id: 'tt1234567',
      rating: 6.3,
      ratingCount: 24,
    });
  });

  it('should throw an error if no IMDB ID provided', async () => {
    await expect(getIMDBRating('')).rejects.toThrow('No IMDB ID provided');
  });

  it('should throw an error if no matches for data', async () => {
    vi.mocked(GMFetch).mockResolvedValue('');
    await expect(getIMDBRating('tt1234567')).rejects.toThrow('No rating data found');
  });

  it('should throw an error if the request fails', async () => {
    vi.mocked(GMFetch).mockResolvedValue(null);
    await expect(getIMDBRating('tt1234567')).rejects.toThrow('No rating data found');
  });

  it('should throw an error if failed to parse rating data', async () => {
    const mockData = 'imdb.rating.run({ "resource": {"id": "/title/tt1234567/", "rating": 6.3, "ratingCount": 24 } })';
    vi.mocked(GMFetch).mockResolvedValue(mockData.replace('}', ''));
    await expect(getIMDBRating('tt1234567')).rejects.toThrow('Failed to parse rating data');
  });

  it('should return empty id if no matches for id', async () => {
    const mockData = 'imdb.rating.run({ "resource": {"id": "", "rating": 6.3, "ratingCount": 24 } })';
    vi.mocked(GMFetch).mockResolvedValue(mockData);
    const rating = await getIMDBRating('tt1234567');
    expect(rating).toEqual({
      id: '',
      rating: 6.3,
      ratingCount: 24,
    });
  });
});
