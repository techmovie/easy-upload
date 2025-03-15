import {
  getDoubanAwards,
  getDoubanCreditsData,
  getMobileDoubanInfo,
  getIMDbIDFromDouban,
} from './movie.douban';
import { getIMDBRating } from './movie.imdb';
import { CONFIG } from './movie.config';
import {
  DoubanMobileData,
  IMDBRating,
  DoubanMobileCredits,
  FormattedMovieData,
  FormatRule,
} from './movie.types';

const NBSP = '\xa0';
const CREDIT_INDENTATION = 24;
const FORMAT_RULES: FormatRule[] = [
  {
    key: 'poster',
    title: '',
    formatter: (url: string) => `[img]${url}[/img]\n`,
  },
  {
    key: 'translatedTitle',
    title: '译名',
    formatter: (title: string[]) => title.join(' / '),
  },
  {
    key: 'originalTitle',
    title: '片名',
  },
  {
    key: 'year',
    title: '年代',
  },
  {
    key: 'countries',
    title: '产地',
    formatter: (countries: string[]) => countries.join(' / '),
  },
  {
    key: 'genres',
    title: '类别',
    formatter: (genres: string[]) => genres.join(' / '),
  },
  {
    key: 'languages',
    title: '语言',
    formatter: (languages: string[]) => languages.join(' / '),
  },
  {
    key: 'pubdate',
    title: '上映日期',
    formatter: (dates: string[]) => dates.join(' / '),
  },
  {
    key: 'imdbRating',
    title: 'IMDb评分',
  },
  {
    key: 'imdbLink',
    title: 'IMDb链接',
  },
  {
    key: 'doubanRating',
    title: '豆瓣评分',
  },
  {
    key: 'doubanLink',
    title: '豆瓣链接',
  },
  {
    key: 'epCount',
    title: '集数',
  },
  {
    key: 'durations',
    title: '片长',
    formatter: (durations: string[]) => durations.join(' / '),
  },
  {
    key: 'tags',
    title: '标签',
    formatter: (tags: string[]) => tags.join(' | '),
  },
  {
    key: 'intro',
    title: '简介',
    formatter: (intro: string) => `\n◎简${NBSP.repeat(7)}介\n\n  ${intro.replace(/\n/g, `\n${NBSP.repeat(2)}`)}`,
  },
  {
    key: 'awards',
    title: '获奖情况',
    formatter: (awards: string) => `${awards.replace(/\n/g, `\n${NBSP.repeat(6)}`)}`,
  },
  {
    key: 'creditsData',
    title: '演职员',
  },
];
export class DoubanFormatter {
  private readonly doubanId: string;
  private readonly type: 'movie' | 'tv';
  private imdbId: string;
  constructor (id: string, type: 'movie' | 'tv', imdbId: string = '') {
    this.doubanId = id;
    this.type = type;
    this.imdbId = imdbId;
  }

  private async fetchAllData () {
    try {
      const [awards, credits, info, imdbData] = await Promise.all([
        getDoubanAwards(this.doubanId),
        getDoubanCreditsData(this.doubanId, this.type),
        getMobileDoubanInfo(this.doubanId, this.type),
        this.fetchIMDbData(),
      ]);
      return { awards, credits, info, imdbData };
    } catch {
      throw new Error(`Failed to fetch data for Douban ID: ${this.doubanId}`);
    }
  }

  private async fetchIMDbData () {
    try {
      if (!this.imdbId) {
        this.imdbId = await getIMDbIDFromDouban(
          CONFIG.URLS.DOUBAN_SUBJECT(this.doubanId),
        );
      }
      if (this.imdbId) {
        return await getIMDBRating(this.imdbId);
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching IMDb data:', error);
      return undefined;
    }
  }

  private formatPosterUrl (poster: string) {
    if (poster.includes('img3')) {
      return poster.replace('img3', 'img1').replace(/m(_ratio_poster)/, 'l$1');
    }
    return poster;
  }

  private formatTitles (data: DoubanMobileData) {
    const { title, original_title: originalTitle, aka } = data;
    const translatedTitle = [...aka];
    if (originalTitle && originalTitle !== title) {
      translatedTitle.push(title);
    }
    return {
      translatedTitle: Array.from(new Set(translatedTitle)).filter(Boolean),
      originalTitle: originalTitle || title,
    };
  }

  private updateCredits (credits: DoubanMobileCredits[]) {
    const indentationMap: Record<number, number> = {
      2: 7,
      3: 2,
      4: 0,
      5: 0,
    };
    const creditsData = credits.map((credit) => {
      const celebrity = credit.celebrities.map((item) => {
        return `${item.name} ${item.latin_name}`;
      });
      const titleLength = credit.title.length;
      const indentation = indentationMap[titleLength as keyof typeof indentationMap] || 0;
      const celebrityKey = credit.title.split('').join(NBSP.repeat(indentation));
      const celebrityValue = celebrity.join(`\n${NBSP.repeat(CREDIT_INDENTATION)}`).trim();

      return `◎${celebrityKey}${celebrityValue}`;
    });
    return creditsData.join('\n');
  }

  private updateRating (
    data: DoubanMobileData,
    imdbRating: IMDBRating | undefined,
  ) {
    const { value, count } = data.rating;
    return {
      doubanRating: value ? `${value} (${count}人评分)` : '',
      imdbRating: `${imdbRating?.rating ?? 0}/10 from ${
        imdbRating?.ratingCount ?? 0
      } users`,
      doubanLink: CONFIG.URLS.DOUBAN_SUBJECT(this.doubanId),
      imdbLink: this.imdbId ? CONFIG.URLS.IMDB_URL(this.imdbId) : '',
    };
  }

  private generateOutput (formatData: FormattedMovieData): string {
    const result: string[] = [];

    for (const rule of FORMAT_RULES) {
      const value = formatData[rule.key as keyof FormattedMovieData];
      if (value) {
        const formattedValue = rule.formatter ? rule.formatter(value) : value;
        const { title } = rule;
        if (!title) {
          result.push(formattedValue as string);
          continue;
        }
        let prefix = title + NBSP.repeat(7);
        if (title.length === 2) {
          prefix = title.split('').join(NBSP.repeat(7));
        }
        result.push(`◎${prefix}${formattedValue}`);
      }
    }

    return result.join('\n').trim();
  }

  public async format () {
    const data = await this.fetchAllData();
    const poster = this.formatPosterUrl(data.info.cover_url);
    const { translatedTitle, originalTitle } = this.formatTitles(data.info);
    const creditsData = this.updateCredits(data.credits);
    const { doubanRating, imdbRating, doubanLink, imdbLink } = this.updateRating(
      data.info,
      data.imdbData,
    );
    const formatData = {
      ...data.info,
      awards: data.awards,
      poster,
      translatedTitle,
      originalTitle,
      creditsData,
      doubanRating,
      imdbRating,
      doubanLink,
      imdbLink,
    };
    return this.generateOutput(formatData);
  }
}
