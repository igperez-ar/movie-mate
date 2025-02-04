import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import { useEffect, useState } from 'react';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import { useHomeInteractor } from './home.interactor';
import type { MovieListCategory, MovieListState } from './home.types';

const initialState: MovieListState = {
  loading: true,
  lists: {
    trending: {
      title: 'Trending',
      iconName: 'fire',
      data: null,
    },
    popular: {
      title: 'Popular',
      iconName: 'chart-line',
      data: null,
    },
    top_rated: {
      title: 'Top rated',
      iconName: 'star',
      data: null,
    },
    upcoming: {
      title: 'Upcoming',
      iconName: 'calendar',
      data: null,
    },
    now_playing: {
      title: 'Now playing',
      iconName: 'play-circle',
      data: null,
    },
  },
};

export const useHomePresenter = ({ navigation }: ScreenProps<GlobalRoutesEnum.HOME>) => {
  const { executeGetAllLists } = useHomeInteractor();
  const [movieState, setMovieState] = useState<MovieListState>(initialState);
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);

  const goToDetail = (id: number, category?: MovieListCategory) => {
    navigation.navigate(MovieRoutesEnum.STACK, {
      screen: MovieRoutesEnum.DETAIL,
      params: { id, category },
    });
  };

  const featuredMovie = movieState.lists.trending.data?.[featuredIndex];

  const setNextFeatured = () =>
    setFeaturedIndex((featuredIndex + 1) % (movieState.lists.trending.data?.length ?? 0));

  const loadMovies = async () => {
    try {
      const results = await executeGetAllLists();

      setMovieState((prev) => {
        const lists = (Object.keys(prev.lists) as MovieListCategory[]).reduce(
          (acc, key) => {
            acc[key] = {
              ...prev.lists[key],
              data: results[key],
            };
            return acc;
          },
          {} as MovieListState['lists'],
        );

        return {
          loading: false,
          lists,
        };
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
    setNextFeatured,
  };
};
