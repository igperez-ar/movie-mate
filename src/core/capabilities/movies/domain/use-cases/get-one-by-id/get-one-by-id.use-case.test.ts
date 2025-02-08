import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import { MOVIE_DETAIL } from '@testing/fixtures/movies';
import { GetOneByIdUseCase } from './get-one-by-id.use-case';

describe('GetOneByIdUseCase', () => {
  let mockRepository: jest.Mocked<IMovieRepository> = {
    getOneById: jest.fn(),
  } as any;
  let getOneByIdUseCase: GetOneByIdUseCase = new GetOneByIdUseCase(mockRepository);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should retrieve Movies data successfully', async () => {
    mockRepository.getOneById.mockResolvedValue(MOVIE_DETAIL);

    const result = await getOneByIdUseCase.execute(MOVIE_DETAIL.id);

    expect(mockRepository.getOneById).toHaveBeenCalledWith(MOVIE_DETAIL.id);
    expect(result).toEqual(MOVIE_DETAIL);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockRepository.getOneById.mockRejectedValue(new Error('Error retrieving movie details'));

    await expect(getOneByIdUseCase.execute(0)).rejects.toThrow('Error retrieving movie details');
  });
});
