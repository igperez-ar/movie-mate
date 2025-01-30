import type {
  MovieDetails,
  MoviesByCategoryRequest,
  MoviesResponse,
  TrendingMoviesRequest,
} from '../../dtos';
import type { IMovieRepository } from '../../repository/movies.repository';

export class AdapterMockProvider implements IMovieRepository {
  getAllByCategory(_: MoviesByCategoryRequest): Promise<MoviesResponse> {
    return Promise.resolve({} as MoviesResponse);
  }

  getAllTrending(_: TrendingMoviesRequest): Promise<MoviesResponse> {
    return Promise.resolve({} as MoviesResponse);
  }

  getAllSimilar(_: number): Promise<MoviesResponse> {
    return Promise.resolve({} as MoviesResponse);
  }

  getOneById(_: number): Promise<MovieDetails> {
    return Promise.resolve({} as MovieDetails);
  }
}
