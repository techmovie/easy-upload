export interface TMDBVideoResponse {
  id: string
  results: TMDBVideo[]
}

export interface TMDBVideo {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
}

export interface TMDBFindResponse {
  movie_results: TMDBMovie[]
  tv_results: TMDBTV[]
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
  url: string
  name: string
}

export interface IMDBAka {
  country: string
  title: string
}

export interface IMDBDetail {
  'Release date': string
  'Languages': string
  'Also known as': string
  'country': string
}

export interface IMDBDataResponse {
  success: boolean
  error: string
  name: string
  year: string
  genre: string[]
  directors: IMDBPeople[]
  actors: IMDBPeople[]
  description: string
  poster: string
  details: IMDBDetail
  aka: IMDBAka[]
  imdb_rating_average: string
}

export interface IMDBRating {
  rating: number
  ratingCount: number
  id: string
}

export interface IMDBRatingResponse {
  resource: IMDBRating
}
