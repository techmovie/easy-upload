import * as MovieModule from '../index';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MovieModule', () => {
  it('should export all functions from movie.douban', () => {
    expect(MovieModule.getDoubanAwards).toBeDefined();
    expect(MovieModule.getIMDbIDFromDouban).toBeDefined();
    expect(MovieModule.getMobileDoubanInfo).toBeDefined();
    expect(MovieModule.getDoubanBasicDataByQuery).toBeDefined();
    expect(MovieModule.getDoubanCreditsData).toBeDefined();
    expect(MovieModule.getDoubanBookInfo).toBeDefined();
  });

  it('should export all functions from movie.imdb', () => {
    expect(MovieModule.getIMDBData).toBeDefined();
    expect(MovieModule.getIMDBRating).toBeDefined();
    expect(MovieModule.getIdByIMDbUrl).toBeDefined();
  });

  it('should export all functions from movie.helper', () => {
    expect(MovieModule.getAreaCode).toBeDefined();
    expect(MovieModule.getRottenTomatoesDataByQuery).toBeDefined();
  });

  it('should export all functions from movie.rottentomatoes', () => {
    expect(MovieModule.getMatchRottenTomatoes).toBeDefined();
  });

  it('should export all functions from movie.tmdb', () => {
    expect(MovieModule.getTMDBDataByIMDBId).toBeDefined();
    expect(MovieModule.getTMDBVideosById).toBeDefined();
  });
});
