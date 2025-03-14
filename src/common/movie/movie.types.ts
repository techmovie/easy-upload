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
