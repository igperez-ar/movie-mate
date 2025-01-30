import { AxiosImplementation } from '@core/infrastructure/http/axios/axios.implementation';
import type {
  MovieDetails,
  MoviesByCategoryRequest,
  MoviesResponse,
  TrendingMoviesRequest,
} from '../../dtos';
import type { IMovieRepository } from '../../repository/movies.repository';

export class AdapterAxiosProvider implements IMovieRepository {
  private readonly axiosImpl: AxiosImplementation;

  constructor(axiosImpl: AxiosImplementation = new AxiosImplementation()) {
    this.axiosImpl = axiosImpl;
  }

  getAllByCategory(request: MoviesByCategoryRequest): Promise<MoviesResponse> {
    return this.axiosImpl.get(`/movie/${request.category}`);
  }

  getAllTrending(request: TrendingMoviesRequest): Promise<MoviesResponse> {
    return this.axiosImpl.get(`/trending/movie/${request.time_window}`);
  }

  getAllSimilar(id: number): Promise<MoviesResponse> {
    return this.axiosImpl.get(`/movie/${id}/similar`);
  }

  getOneById(id: number): Promise<MovieDetails> {
    return this.axiosImpl.get(`/movie/${id}`);
  }
}
