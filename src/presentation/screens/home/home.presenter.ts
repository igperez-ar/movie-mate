import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import { useEffect, useState } from 'react';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import { getRandomElement } from 'src/shared/utils/helpers';
import { useHomeInteractor } from './home.interactor';
import type { MovieList, MovieListState } from './home.types';

const initialState: MovieListState = {
  loading: true,
  lists: {
    trending: null,
    popular: null,
    top_rated: null,
    upcoming: null,
    now_playing: null,
  },
};

export const useHomePresenter = ({ navigation }: ScreenProps<GlobalRoutesEnum.HOME>) => {
  const { executeGetAllLists } = useHomeInteractor();
  const [movieState, setMovieState] = useState<MovieListState>(initialState);

  const goToDetail = (id: number, category?: MovieList) => {
    navigation.navigate(MovieRoutesEnum.STACK, {
      screen: MovieRoutesEnum.DETAIL,
      params: { id, category },
    });
  };

  const featuredMovie = movieState.lists.trending
    ? getRandomElement(movieState.lists.trending)
    : null;

  const loadMovies = async () => {
    try {
      const results = await executeGetAllLists();

      setMovieState({
        loading: false,
        lists: results,
      });
    } catch (error) {
      setMovieState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load movies',
      }));
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return {
    movieState,
    featuredMovie,
    goToDetail,
  };
};
