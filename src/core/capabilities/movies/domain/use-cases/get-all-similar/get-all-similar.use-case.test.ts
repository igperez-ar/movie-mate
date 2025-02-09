import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import { MOVIE_DETAIL, SIMILAR_MOVIES } from '@testing/fixtures/movies';
import { GetAllSimilarUseCase } from './get-all-similar.use-case';

describe('GetAllSimilarUseCase', () => {
  let getAllSimilarUseCase: GetAllSimilarUseCase;
  let mockRepository: jest.Mocked<IMovieRepository>;

  beforeEach(() => {
    mockRepository = {
      getAllSimilar: jest.fn(),
    } as any;

    getAllSimilarUseCase = new GetAllSimilarUseCase(mockRepository);
  });

  it('should retrieve Movies data successfully', async () => {
    mockRepository.getAllSimilar.mockResolvedValue(SIMILAR_MOVIES);

    const result = await getAllSimilarUseCase.execute(MOVIE_DETAIL.id);

    expect(mockRepository.getAllSimilar).toHaveBeenCalledWith(MOVIE_DETAIL.id);
    expect(result).toEqual(SIMILAR_MOVIES);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockRepository.getAllSimilar.mockRejectedValue(new Error('Error retrieving movies'));

    await expect(getAllSimilarUseCase.execute(0)).rejects.toThrow('Error retrieving movies');
  });
});
