import type { PaginatedRequest, PaginatedResponse } from '@core/shared/types';

export type MoviesByCategoryRequest = PaginatedRequest & {
  category: 'popular' | 'top_rated' | 'upcoming' | 'now_playing';
};

export type TrendingMoviesRequest = PaginatedRequest & {
  time_window: 'day' | 'week';
};

export type MoviesResponse = PaginatedResponse<Movie>;

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
