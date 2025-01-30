import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import type { IUseCase } from '@core/contracts/use-case.interface';
import type { MoviesByCategoryRequest, MoviesResponse } from '../../../dtos';

export class GetAllByCategoryUseCase implements IUseCase<MoviesByCategoryRequest, MoviesResponse> {
  private readonly repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  async execute(request: MoviesByCategoryRequest): Promise<MoviesResponse> {
    const response = await this.repository.getAllByCategory(request);
    return response;
  }
}
