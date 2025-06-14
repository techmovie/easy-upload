import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { getMatchRottenTomatoes } from '../movie.rottentomatoes';
import { getRottenTomatoesDataByQuery } from '../movie.helper';
import { RottenTomatoesHit } from '../movie.types';

vi.mock('@/common/utils', () => ({
  GMFetch: vi.fn(),
}));

vi.mock('../movie.helper');

describe('getMatchRottenTomatoes', () => {
  let mockData: RottenTomatoesHit[];
  beforeEach(() => {
    vi.resetAllMocks();
    mockData = [
      {
        title: 'The Matrix Reloaded',
        releaseYear: 2003,
        rtId: 123457,
        type: 'movie',
        rottenTomatoes: {
          audienceScore: 88,
          criticsScore: 89,
        },
      },
      {
        title: 'The Matrix',
        releaseYear: 1999,
        rtId: 123456,
        type: 'movie',
        rottenTomatoes: {
          audienceScore: 85,
          criticsScore: 87,
        },
      },
      {
        title: 'The Matrix Resurrections',
        releaseYear: 2021,
        rtId: 123458,
        type: 'movie',
        rottenTomatoes: {
          audienceScore: 70,
          criticsScore: 71,
        },
      },
    ];
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should return the Rotten Tomatoes match', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix', '1999', false);
    expect(result).toEqual(mockData[1]);
  });

  it('should return null if type not match', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix', '1999', true);
    expect(result).toEqual(null);
  });

  it('if the year is compatible,return the best match one', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix', '2001', false);
    expect(result).toEqual(mockData[1]);
  });

  it('if the year is not compatible, then return the the one whose year is compatible', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix', '2004', false);
    expect(result).toEqual(mockData[0]);
  });

  it('if the year is not compatible and no year compatible, then return the first one', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix', '2017', false);
    expect(result).toEqual(mockData[1]);
  });

  it("if there's no best match and the year of closeMatch is compatible", async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix Re', '2023', false);
    expect(result).toEqual(mockData[2]);
  });

  it("if there's no best match and the year of closeMatch is not compatible", async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes(
      'The Matrix Rel',
      '1989',
      false,
    );
    expect(result).toEqual(mockData[0]);
  });

  it("if there's no best match and the year of first hit is compatible", async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes(
      'The Matrix Reltest',
      '1997',
      false,
    );
    expect(result).toEqual(mockData[1]);
  });

  it('handle the case which year is not provided', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix Res');
    expect(result).toEqual(mockData[2]);
  });

  it('handle the case when no hits found', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue([]);
    const result = await getMatchRottenTomatoes(
      'test movie title',
      '1989',
      false,
    );
    expect(result).toEqual(null);
  });

  it('the closeMatch is selected at the end', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix Res');
    expect(result).toEqual(mockData[2]);
  });

  it('the first hit is selected at the end', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix Random Movie');
    expect(result).toEqual(mockData[0]);
  });

  it('handle the case when hit title is empty', async () => {
    mockData[0].title = '';
    vi.mocked(getRottenTomatoesDataByQuery).mockResolvedValue(mockData);
    const result = await getMatchRottenTomatoes('The Matrix Res');
    expect(result).toEqual(mockData[2]);
  });

  it('handle the case when request failed', async () => {
    vi.mocked(getRottenTomatoesDataByQuery).mockRejectedValue(
      new Error('Request failed'),
    );
    const result = await getMatchRottenTomatoes(
      'The Matrix Res',
      '1989',
      false,
    );
    expect(result).toEqual(null);
  });
});
