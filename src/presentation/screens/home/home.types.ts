import type { Movie, MoviesByCategoryRequest } from '@core/capabilities/movies';

export type MovieList = 'trending' | MoviesByCategoryRequest['category'];

export type MovieListState = {
  lists: Record<MovieList, Movie[] | null>;
  loading: boolean;
};
