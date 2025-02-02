import { useMovieSelectors } from '@core/infrastructure/storage/modules/movie';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import type { WatchlistScreenProps } from './watchlist.types';

export const useWatchlistPresenter = ({ navigation }: WatchlistScreenProps) => {
  const { watchlist } = useMovieSelectors();

  const goToDetail = (id: number) => {
    navigation.navigate(MovieRoutesEnum.DETAIL, { id });
  };

  return { watchlist, goToDetail };
};
