import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import type { IUseCase } from '@core/contracts/use-case.interface';
import type { MovieDetails } from '../../../dtos';

export class GetOneByIdUseCase implements IUseCase<number, MovieDetails> {
  private readonly repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<MovieDetails> {
    const response = await this.repository.getOneById(id);
    return response;
  }
}
