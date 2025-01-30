import {
  type Movie,
  type MoviesResponse,
  GetAllByCategoryUseCase,
  GetAllTrendingUseCase,
  MovieFactory,
} from '@core/capabilities/movies';
import type { MovieList } from './home.types';

export const useHomeInteractor = (
  getAllByCategoryUseCase = new GetAllByCategoryUseCase(MovieFactory.getInstance()),
  getAllTrendingUseCase = new GetAllTrendingUseCase(MovieFactory.getInstance()),
) => {
  const executeGetAllLists = async () => {
    const requests: Record<MovieList, () => Promise<MoviesResponse>> = {
      trending: () => getAllTrendingUseCase.execute({ time_window: 'day' }),
      popular: () => getAllByCategoryUseCase.execute({ category: 'popular' }),
      top_rated: () => getAllByCategoryUseCase.execute({ category: 'top_rated' }),
      upcoming: () => getAllByCategoryUseCase.execute({ category: 'upcoming' }),
      now_playing: () => getAllByCategoryUseCase.execute({ category: 'now_playing' }),
    };

    const promises = Object.entries(requests).map(
      async ([key, fn]): Promise<{ key: MovieList; data?: MoviesResponse; error?: string }> => {
        try {
          const data = await fn();
          return { key: key as MovieList, data };
        } catch (error) {
          return {
            key: key as MovieList,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      },
    );

    const results = await Promise.all(promises);

    return results.reduce(
      (acc, result) => {
        acc[result.key] = result.data?.results || null;
        return acc;
      },
      {} as Record<MovieList, Movie[] | null>,
    );
  };

  return { executeGetAllLists };
};
