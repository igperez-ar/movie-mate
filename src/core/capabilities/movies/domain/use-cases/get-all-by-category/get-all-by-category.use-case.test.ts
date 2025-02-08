import type { MoviesByCategoryRequest } from '@core/capabilities/movies/dtos';
import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import { UPCOMING_MOVIES } from '@testing/fixtures/movies';
import { GetAllByCategoryUseCase } from './get-all-by-category.use-case';

describe('GetAllByCategoryUseCase', () => {
  let getAllByCategoryUseCase: GetAllByCategoryUseCase;
  let mockRepository: jest.Mocked<IMovieRepository>;

  beforeEach(() => {
    mockRepository = {
      getAllByCategory: jest.fn(),
    } as any;

    getAllByCategoryUseCase = new GetAllByCategoryUseCase(mockRepository);
  });

  it('should retrieve Movies data successfully', async () => {
    const MOCK_REQUEST: MoviesByCategoryRequest = { category: 'upcoming' };
    mockRepository.getAllByCategory.mockResolvedValue(UPCOMING_MOVIES);

    const result = await getAllByCategoryUseCase.execute(MOCK_REQUEST);

    expect(mockRepository.getAllByCategory).toHaveBeenCalledWith(MOCK_REQUEST);
    expect(result).toEqual(UPCOMING_MOVIES);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockRepository.getAllByCategory.mockRejectedValue(new Error('Error retrieving movies'));

    await expect(
      getAllByCategoryUseCase.execute({ category: 'bad_category' as any }),
    ).rejects.toThrow('Error retrieving movies');
  });
});
