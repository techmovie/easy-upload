export interface TMDBVideoResponse {
  id: string;
  results: TMDBVideo[];
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
}

export interface TMDBFindResponse {
  movie_results: TMDBMovie[];
  tv_results: TMDBTV[];
}

export interface TMDBMedia {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMovie extends TMDBMedia {
  title: string;
  release_date: string;
}

export interface TMDBTV extends TMDBMedia {
  name: string;
  first_air_date: string;
}

export interface IMDBPeople {
  url: string;
  name: string;
}

export interface IMDBAka {
  country: string;
  title: string;
}

export interface IMDBDetail {
  'Release date': string;
  Languages: string;
  'Also known as': string;
  country: string;
}

export interface IMDBDataResponse {
  success: boolean;
  error: string;
  name: string;
  year: string;
  genre: string[];
  directors: IMDBPeople[];
  actors: IMDBPeople[];
  description: string;
  poster: string;
  details: IMDBDetail;
  aka: IMDBAka[];
  imdb_rating_average: string;
}

export interface IMDBRating {
  rating: number;
  ratingCount: number;
  id: string;
}

export interface IMDBRatingResponse {
  resource: IMDBRating;
}

interface DoubanPerson {
  name: string;
}

export interface DoubanMobileCreditsResponse {
  items: DoubanMobileCredit[];
}
export interface DoubanMobileCredit {
  name: string;
  category: string;
  latin_name?: string;
}

export interface DoubanData {
  imdbLink: string;
  imdbId: string;
  imdbAverageRating: string;
  imdbVotes: string;
  imdbRating: string;
  chineseTitle: string;
  foreignTitle: string;
  aka: string[];
  transTitle: string[];
  thisTitle: string[];
  year: string;
  playDate: string[];
  region: string;
  genre: string[];
  language: string[];
  episodes: string;
  duration: string;
  introduction: string;
  doubanLink: string;
  doubanRatingAverage: string | number;
  doubanVotes: string;
  doubanRating: string;
  poster: string;
  director: DoubanPerson[];
  cast: DoubanPerson[];
  writer: DoubanPerson[];
  awards?: string;
  tags?: string[];
  format?: string;
  credits?: DoubanMobileCredit[];
}
interface DoubanMobilePerson {
  name: string;
}

interface DoubanMobilePic {
  large: string;
  normal: string;
}

interface DoubanMobileRating {
  count: number;
  max?: number;
  start_count?: number;
  value: number;
}
export interface DoubanMobileData {
  rating: DoubanMobileRating;
  pubdate: string[];
  pic?: DoubanMobilePic;
  is_tv: boolean;
  year: string;
  id: string;
  languages: string[];
  genres: string[];
  title: string;
  intro: string;
  actors?: DoubanMobilePerson[];
  durations: string[];
  cover_url: string;
  countries: string[];
  type: 'movie' | 'tv';
  url: string;
  original_title: string;
  directors: DoubanMobilePerson[];
  aka: string[];
  episodes_info?: string;
  episodes_count?: number;
  tags?: string[];
}

export interface DoubanBasicData {
  season: string;
  title: string;
  id: string;
  isTV: boolean;
}

export interface DoubanBookData {
  year: string;
  pager: string;
  translator: string[];
  author: string[];
  publisher: string;
  ISBN: string;
  book_intro: string;
  poster: string;
  chinese_title: string;
  foreign_title: string;
  origin_title: string;
}

export interface FormattedMovieData extends DoubanMobileData {
  imdbRating: string;
  imdbLink: string;
  doubanRating: string;
  doubanLink: string;
  poster: string;
  awards: string;
  creditsData: string;
  translatedTitle: string[];
  originalTitle: string;
  format: string;
}

export type FormatRule = {
  key: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;
};

export interface RottenTomatoesResponse {
  results: RottenTomatoesResult[];
}

export interface RottenTomatoesResult {
  hits: RottenTomatoesHit[];
}

export interface RottenTomatoesHit {
  title: string;
  type: 'movie' | 'tv';
  releaseYear: number;
  rtId: number;
  rottenTomatoes: {
    audienceScore: number;
    criticsScore: number;
  };
}
