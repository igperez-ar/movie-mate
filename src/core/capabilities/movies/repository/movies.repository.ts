import type {
  MovieDetails,
  MoviesByCategoryRequest,
  MoviesResponse,
  TrendingMoviesRequest,
} from '../dtos';

export interface IMovieRepository {
  getAllByCategory(request: MoviesByCategoryRequest): Promise<MoviesResponse>;
  getAllTrending(request: TrendingMoviesRequest): Promise<MoviesResponse>;
  getAllSimilar(id: number): Promise<MoviesResponse>;
  getOneById(id: number): Promise<MovieDetails>;
}
