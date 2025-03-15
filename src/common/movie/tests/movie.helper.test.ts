import { expect, describe, it, vi } from 'vitest';
import { getAreaCode, getRottenTomatoesDataByQuery } from '../movie.helper';
import { GMFetch } from '@/common/utils';

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
}));

describe('getAreaCode', () => {
  it('should return the area code', () => {
    expect(getAreaCode('')).toBe('OT');
    expect(getAreaCode('美国')).toBe('US');
    expect(getAreaCode('USA')).toBe('US');
    expect(getAreaCode('Canada')).toBe('US');
    expect(getAreaCode('Azerbaijan')).toBe('EU');
    expect(getAreaCode('中国')).toBe('CN');
    expect(getAreaCode('Ukraine')).toBe('EU');
    expect(getAreaCode('Germany')).toBe('EU');
    expect(getAreaCode('苏联')).toBe('EU');
    expect(getAreaCode('日本')).toBe('JP');
    expect(getAreaCode('韩国')).toBe('KR');
    expect(getAreaCode('印度')).toBe('IN');
    expect(getAreaCode('加拿大')).toBe('US');
    expect(getAreaCode('澳大利亚')).toBe('AU');
    expect(getAreaCode('西班牙')).toBe('EU');
    expect(getAreaCode('俄罗斯')).toBe('EU');
    expect(getAreaCode('测试国家')).toBe('OT');
  });
});

describe('getRottenTomatoesDataByQuery', () => {
  it('should return the rotten tomatoes data', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      results: [
        {
          hits: [
            {
              title: 'title',
              year: 2022,
              url: 'url',
              type: 'type',
              rating: 'rating',
              image: 'image',
              description: 'description',
            },
          ],
        },
      ],
    });
    const result = await getRottenTomatoesDataByQuery('query');
    expect(result).toEqual([
      {
        title: 'title',
        year: 2022,
        url: 'url',
        type: 'type',
        rating: 'rating',
        image: 'image',
        description: 'description',
      },
    ]);
  });
  it('should return empty array if no data found', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      results: [],
    });
    const result = await getRottenTomatoesDataByQuery('query');
    expect(result).toEqual([]);
  });
  it('should return empty array if no hits found', async () => {
    vi.mocked(GMFetch).mockResolvedValue({
      results: [
        {
          hits: [],
        },
      ],
    });
    const result = await getRottenTomatoesDataByQuery('query');
    expect(result).toEqual([]);
  });
  it('should return empty array if no results found', async () => {
    vi.mocked(GMFetch).mockResolvedValue({});
    const result = await getRottenTomatoesDataByQuery('query');
    expect(result).toEqual([]);
  });
});
