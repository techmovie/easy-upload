import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { DoubanFormatter } from '../movie.douban.format';
import {
  getDoubanAwards,
  getDoubanCreditsData,
  getMobileDoubanInfo,
  getIMDbIDFromDouban,
} from '../movie.douban';
import { getIMDBRating } from '../movie.imdb';
import { DoubanMobileData } from '../movie.types';

vi.mock('../movie.douban');
vi.mock('../movie.imdb');

describe('DoubanFormatter', () => {
  let converter: DoubanFormatter;
  const NBSP = '\xa0';
  const NBSPRepeatSevenTimes = NBSP.repeat(7);
  let mockDoubanData: DoubanMobileData;
  beforeEach(() => {
    vi.clearAllMocks();
    converter = new DoubanFormatter('123456', 'movie');
    mockDoubanData = {
      rating: {
        count: 100,
        value: 8.5,
      },
      id: '123456',
      year: '2022',
      pic: { large: 'large', normal: 'normal' },
      is_tv: false,
      type: 'movie',
      url: 'url',
      original_title: 'original',
      pubdate: ['2022-01-01', '2022-01-02'],
      countries: ['中国', '美国'],
      genres: ['剧情'],
      languages: ['汉语普通话'],
      title: '电影title',
      intro: '简介',
      actors: [{ name: '演员' }],
      durations: ['100分钟'],
      cover_url: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/123456.jpg',
      directors: [{ name: '导演' }],
      aka: ['别名'],
      episodes_info: 'info',
      episodes_count: 1,
      tags: ['tag1', 'tag2'],
    };
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should format the douban data correctly', async () => {
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    vi.mocked(getDoubanAwards).mockResolvedValue('第69届意大利大卫奖  (2024)\n青年大卫奖 宝拉·柯特莱西');
    vi.mocked(getDoubanCreditsData).mockResolvedValue({
      items: [
        {
          name: '导演1',
          category: '导演',
        },
        {
          category: '演员',
          name: '演员1',
          latin_name: 'actor1',
        },
        {
          name: '编剧1',
          category: '编剧',
        },
      ],
    });
    vi.mocked(getIMDbIDFromDouban).mockResolvedValue('tt123456');
    vi.mocked(getIMDBRating).mockResolvedValue({
      rating: 8.5,
      ratingCount: 100,
      id: 'tt123456',
    });
    const result = await converter.format();
    expect(getDoubanAwards).toHaveBeenCalledWith('123456');
    expect(result).toContain('[img]https://img1.doubanio.com/view/photo/l_ratio_poster/public/123456.jpg[/img]');
    expect(result).toContain(`译${NBSPRepeatSevenTimes}名${NBSPRepeatSevenTimes}电影title / 别名`);
    expect(result).toContain(`片${NBSPRepeatSevenTimes}名${NBSPRepeatSevenTimes}original`);
    expect(result).toContain(`年${NBSPRepeatSevenTimes}代${NBSPRepeatSevenTimes}2022`);
    expect(result).toContain(`产${NBSPRepeatSevenTimes}地${NBSPRepeatSevenTimes}中国 / 美国`);
    expect(result).toContain(`类${NBSPRepeatSevenTimes}别${NBSPRepeatSevenTimes}剧情`);
    expect(result).toContain(`语${NBSPRepeatSevenTimes}言${NBSPRepeatSevenTimes}汉语普通话`);
    expect(result).toContain(`上映日期${NBSPRepeatSevenTimes}2022-01-01 / 2022-01-02`);
    expect(result).toContain(`片${NBSPRepeatSevenTimes}长${NBSPRepeatSevenTimes}100分钟`);
    expect(result).toContain(`导${NBSPRepeatSevenTimes}演${NBSPRepeatSevenTimes}导演1`);
    expect(result).toContain(`演${NBSPRepeatSevenTimes}员${NBSPRepeatSevenTimes}演员1  actor1`);
    expect(result).toContain(`编${NBSPRepeatSevenTimes}剧${NBSPRepeatSevenTimes}编剧1`);
    expect(result).toContain(`简${NBSPRepeatSevenTimes}介${NBSPRepeatSevenTimes}\n\n  简介`);
    expect(result).toContain(`集${NBSPRepeatSevenTimes}数${NBSPRepeatSevenTimes}1`);
    expect(result).toContain(`标${NBSPRepeatSevenTimes}签${NBSPRepeatSevenTimes}tag1 | tag2`);
    expect(result).toContain(`IMDb评分${NBSPRepeatSevenTimes}8.5/10 from 100 users`);
    expect(result).toContain(`IMDb链接${NBSPRepeatSevenTimes}https://www.imdb.com/title/tt123456`);
    expect(result).toContain(`豆瓣评分${NBSPRepeatSevenTimes}8.5 (100人评分)`);
    expect(result).toContain(`豆瓣链接${NBSPRepeatSevenTimes}https://movie.douban.com/subject/123456`);
    expect(result).toContain(`获奖情况${NBSPRepeatSevenTimes}\n\n  第69届意大利大卫奖  (2024)\n${NBSP.repeat(6)}青年大卫奖 宝拉·柯特莱西`);
  });

  it('should throw error if failed to fetch douban data', async () => {
    vi.mocked(getMobileDoubanInfo).mockRejectedValue(new Error('Failed to fetch data'));
    await expect(converter.format()).rejects.toThrow('Failed to fetch data for Douban ID: 123456');
  });

  it('should throw error if douban data is empty', async () => {
    // @ts-expect-error - testing empty data
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(null);
    await expect(converter.format()).rejects.toThrow('failed to fetch douban info');
  });

  it('should not throw error if failed to fetch IMDb data', async () => {
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    vi.mocked(getIMDbIDFromDouban).mockResolvedValue('');
    expect(getIMDBRating).not.toHaveBeenCalled();
    const result = await converter.format();
    expect(result).toContain('IMDb评分');
    expect(result).toContain('0/10 from 0 users');
    expect(result).toContain('8.5 (100人评分)');
  });

  it('should not throw error if credits data is empty', async () => {
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    vi.mocked(getDoubanCreditsData).mockResolvedValue({ items: [] });
    const result = await converter.format();
    expect(result).not.toContain('导演');
    expect(result).not.toContain('演员');
    expect(result).toContain('简介');
  });

  it('should not throw error if awards data is empty', async () => {
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    vi.mocked(getDoubanAwards).mockResolvedValue('');
    const result = await converter.format();
    expect(result).not.toContain('获奖情况');
    expect(result).toContain('汉语普通话');
  });

  it('poster url should not be changed if it is not from img3', async () => {
    mockDoubanData.cover_url = 'https://img1.doubanio.com/view/photo/m_ratio_poster/public/123456.jpg';
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    const result = await converter.format();
    expect(result).toContain('[img]https://img1.doubanio.com/view/photo/m_ratio_poster/public/123456.jpg[/img]');
  });

  it('should handle originalTitle correctly', async () => {
    mockDoubanData.original_title = '';
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    const result = await converter.format();
    expect(result).toContain(`片${NBSPRepeatSevenTimes}名${NBSPRepeatSevenTimes}电影title`);
  });

  it('should handle aka correctly', async () => {
    mockDoubanData.aka = [];
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    const result = await converter.format();
    expect(result).toContain(`译${NBSPRepeatSevenTimes}名${NBSPRepeatSevenTimes}电影title`);
  });

  it('should return empty when no douban rating was returned', async () => {
    mockDoubanData.rating = {
      count: 0,
      value: 0,
    };
    vi.mocked(getMobileDoubanInfo).mockResolvedValue(mockDoubanData);
    const result = await converter.format();
    expect(result).not.toContain('豆瓣评分');
    expect(result).not.toContain('0 (0人评分)');
  });
});
