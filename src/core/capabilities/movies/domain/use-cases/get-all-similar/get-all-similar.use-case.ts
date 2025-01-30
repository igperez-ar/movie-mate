import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import type { IUseCase } from '@core/contracts/use-case.interface';
import type { MoviesResponse } from '../../../dtos';

export class GetAllSimilarUseCase implements IUseCase<number, MoviesResponse> {
  private readonly repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<MoviesResponse> {
    const response = await this.repository.getAllSimilar(id);
    return response;
  }
}
