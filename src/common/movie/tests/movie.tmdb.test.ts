import { expect, describe, it, vi } from 'vitest';
import {
  getTMDBDataByIMDBId,
  getTMDBVideosById,
} from '../movie.tmdb';
import { GMFetch } from '@/common/utils';

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
}));

describe('getTMDBDataByIMDBId', () => {
  it('should return the TMDB data by IMDB ID', async () => {
    const mockData = {
      movie_results: [
        {
          id: 123456,
          title: 'Movie Title',
          release_date: '2021-01-01',
        },
      ],
    };
    vi.mocked(GMFetch).mockResolvedValue(mockData);
    const data = await getTMDBDataByIMDBId('tt123456');
    expect(data).toEqual({
      id: 123456,
      title: 'Movie Title',
      release_date: '2021-01-01',
    });
  });

  it('should throw an error if no movie or TV found', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      movie_results: [],
      tv_results: [],
    });
    await expect(getTMDBDataByIMDBId('tt123456')).rejects.toThrow('No movie or TV found');
  });

  it('should return tv results when tv results found', async () => {
    const mockData = {
      tv_results: [
        {
          id: 123456,
          name: 'TV Title',
          first_air_date: '2021-01-01',
        },
      ],
    };
    vi.mocked(GMFetch).mockResolvedValue(mockData);
    const data = await getTMDBDataByIMDBId('tt123456');
    expect(data).toEqual({
      id: 123456,
      name: 'TV Title',
      first_air_date: '2021-01-01',
    });
  });
});

describe('getTMDBVideosByIdById', () => {
  it('should return the TMDB videos by TMDB ID', async () => {
    const mockData = {
      id: 123456,
      results: [
        {
          id: '123456',
          key: 'video_key',
          name: 'Video Name',
          site: 'YouTube',
          type: 'Trailer',
        },
      ],
    };
    vi.mocked(GMFetch).mockResolvedValue(mockData);
    const data = await getTMDBVideosById('123456');
    expect(data).toEqual(mockData.results);
  });

  it('should throw an error if no TMDB videos found', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      results: [],
    });
    await expect(getTMDBVideosById('123456')).rejects.toThrow('No TMDB videos found');
  });

  it('should throw an error if the request fails', async () => {
    vi.mocked(GMFetch).mockResolvedValue(null);
    await expect(getTMDBVideosById('123456')).rejects.toThrow('No TMDB videos found');
  });
}); ;
