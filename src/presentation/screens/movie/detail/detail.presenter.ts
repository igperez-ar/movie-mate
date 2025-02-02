import { useAppDispatch } from '@core/infrastructure';
import {
  addWatchlist,
  removeWatchlist,
  useMovieSelectors,
} from '@core/infrastructure/storage/modules/movie';
import { useEffect, useState } from 'react';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { useMovieDetailInteractor } from './detail.interactor';
import type { MovieDetailScreenProps, MovieDetailState } from './detail.types';

const initialState: MovieDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const useMovieDetailPresenter = (props: MovieDetailScreenProps) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { executeGetDetails, executeGetSimilar } = useMovieDetailInteractor(params.id);
  const { isWatchlisted } = useMovieSelectors();
  const dispatch = useAppDispatch();
  const [movieState, setMovieState] = useState<MovieDetailState>(initialState);
  const isSaved = isWatchlisted(params.id);

  const goToSimilar = (id: number) => {
    navigation.push(MovieRoutesEnum.DETAIL, { id });
  };

  const toggleWatchlist = () => {
    if (!movieState.data) return;
    const { id, title, poster_path } = movieState.data;
    dispatch(isSaved ? removeWatchlist(id) : addWatchlist({ id, title, poster_path }));
  };

  const loadDetails = async () => {
    try {
      executeGetSimilar().then((res) => {
        setMovieState((prev) => ({
          ...prev,
          data: { ...(prev.data ?? ({} as any)), similar: res.results },
        }));
      });

      const response = await executeGetDetails();

      setMovieState((prev) => ({
        loading: false,
        error: null,
        data: { ...response, similar: [...(prev.data?.similar ?? [])] },
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setMovieState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));
      throw error;
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return {
    isSaved,
    movieState,
    goToSimilar,
    toggleWatchlist,
  };
};
