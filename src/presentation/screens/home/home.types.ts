import { IconProps } from '@components/index';
import type { Movie, MoviesByCategoryRequest } from '@core/capabilities/movies';

export type MovieListCategory = 'trending' | MoviesByCategoryRequest['category'];

export type MovieList = {
  title: string;
  iconName: IconProps['name'];
  data: Movie[] | null;
};

export type MovieListState = {
  lists: Record<MovieListCategory, MovieList>;
  loading: boolean;
};
