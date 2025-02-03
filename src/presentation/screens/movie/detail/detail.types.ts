import type { Movie, MovieDetails } from '@core/capabilities/movies';
import type { NestedScreenProps } from '@core/infrastructure/navigation/navigation.types';
import type { MovieListCategory } from '@screens/home/home.types';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import type { MovieNavigatorParams } from '../navigation/movie-navigator.types';

export type MovieDetailState = {
  isLoading: boolean;
  error: string | null;
  data: (MovieDetails & { similar?: Movie[] }) | null;
};

export type MovieDetailScreenProps = NestedScreenProps<
  MovieRoutesEnum.DETAIL,
  MovieRoutesEnum.STACK,
  MovieNavigatorParams
>;

export type CategoryColors = Record<
  MovieListCategory | 'default',
  {
    colors: string[];
    glowColor: string;
  }
>;
