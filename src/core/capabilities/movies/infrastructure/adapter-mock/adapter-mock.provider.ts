import {
  MOVIE_DETAIL,
  SIMILAR_MOVIES,
  TRENDING_MOVIES,
  UPCOMING_MOVIES,
} from '@testing/fixtures/movies';
import type {
  MovieDetails,
  MoviesByCategoryRequest,
  MoviesResponse,
  TrendingMoviesRequest,
} from '../../dtos';
import type { IMovieRepository } from '../../repository/movies.repository';

export class AdapterMockProvider implements IMovieRepository {
  getAllByCategory(_: MoviesByCategoryRequest): Promise<MoviesResponse> {
    return Promise.resolve(UPCOMING_MOVIES);
  }

  getAllTrending(_: TrendingMoviesRequest): Promise<MoviesResponse> {
    return Promise.resolve(TRENDING_MOVIES);
  }

  getAllSimilar(_: number): Promise<MoviesResponse> {
    return Promise.resolve(SIMILAR_MOVIES);
  }

  getOneById(_: number): Promise<MovieDetails> {
    return Promise.resolve(MOVIE_DETAIL);
  }
}
