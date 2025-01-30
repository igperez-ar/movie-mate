import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import type { IUseCase } from '@core/contracts/use-case.interface';
import type { MoviesResponse, TrendingMoviesRequest } from '../../../dtos';

export class GetAllTrendingUseCase implements IUseCase<TrendingMoviesRequest, MoviesResponse> {
  private readonly repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  async execute(request: TrendingMoviesRequest): Promise<MoviesResponse> {
    const response = await this.repository.getAllTrending(request);
    return response;
  }
}
