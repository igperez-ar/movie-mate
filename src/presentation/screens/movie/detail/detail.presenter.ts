import { useAppDispatch } from '@core/infrastructure';
import {
  addWatchlist,
  removeWatchlist,
  useMovieSelectors,
} from '@core/infrastructure/storage/modules/movie';
import { useEffect, useState } from 'react';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { useMovieDetailInteractor } from './detail.interactor';
import type { CategoryColors, MovieDetailScreenProps, MovieDetailState } from './detail.types';

const categoriesColors: CategoryColors = {
  trending: {
    colors: ['#ffae00', '#ff7700', '#ff4d00', '#ff1a00', '#e00000'],
    glowColor: '#ff7700',
  },
  popular: {
    colors: ['#e7e2f3', '#a7b2e6', '#688cca', '#496d9c', '#2d3c67'],
    glowColor: '#a7b2e6',
  },
  top_rated: {
    colors: ['#ffd900', '#ffea00', '#ffc300', '#ffa600', '#ff8c00'],
    glowColor: '#ffea00',
  },
  upcoming: {
    colors: ['#b29dd8', '#8959c5', '#4f3d8a', '#2c2a6f', '#1e1a5b'],
    glowColor: '#8959c5',
  },
  now_playing: {
    colors: ['#b9dae9', '#a5c6d5', '#7ca2b1', '#4f7f8c', '#2d5b67'],
    glowColor: '#a5c6d5',
  },
  default: {
    glowColor: '#ff6f91',
    colors: ['#845ec2', '#d65db1', '#ff6f91', '#ff9671', '#ffc75f', '#f9f871'],
  },
};

const initialState: MovieDetailState = {
  isLoading: true,
  error: null,
  data: null,
};

export const useMovieDetailPresenter = (props: MovieDetailScreenProps) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { executeGetDetails, executeGetSimilar } = useMovieDetailInteractor(params.id);
  const { checkWatchlisted } = useMovieSelectors();
  const dispatch = useAppDispatch();
  const [movieState, setMovieState] = useState<MovieDetailState>(initialState);
  const isWatchlisted = checkWatchlisted(params.id);
  const categoryColors = categoriesColors[(params.category ?? 'default') as keyof CategoryColors];

  const goToSimilar = (id: number) => {
    navigation.push(MovieRoutesEnum.DETAIL, { id });
  };

  const toggleWatchlist = () => {
    if (!movieState.data) return;
    const { id, title, poster_path } = movieState.data;
    dispatch(isWatchlisted ? removeWatchlist(id) : addWatchlist({ id, title, poster_path }));
  };

  const loadDetails = async () => {
    try {
      executeGetSimilar()
        .then((res) => {
          setMovieState((prev) => ({
            ...prev,
            data: { ...(prev.data ?? ({} as any)), similar: res.results },
          }));
        })
        .catch(() => {});

      const response = await executeGetDetails();

      setMovieState((prev) => ({
        isLoading: false,
        error: null,
        data: { ...response, similar: [...(prev.data?.similar ?? [])] },
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setMovieState({
        data: null,
        isLoading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return {
    isWatchlisted,
    movieState,
    categoryColors,
    goToSimilar,
    toggleWatchlist,
  };
};
