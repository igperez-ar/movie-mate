import type { TrendingMoviesRequest } from '@core/capabilities/movies/dtos';
import type { IMovieRepository } from '@core/capabilities/movies/repository/movies.repository';
import { SIMILAR_MOVIES } from '@testing/fixtures/movies';
import { GetAllTrendingUseCase } from './get-all-trending.use-case';

describe('GetAllTrendingUseCase', () => {
  let getAllTrendingUseCase: GetAllTrendingUseCase;
  let mockRepository: jest.Mocked<IMovieRepository>;

  beforeEach(() => {
    mockRepository = {
      getAllTrending: jest.fn(),
    } as any;

    getAllTrendingUseCase = new GetAllTrendingUseCase(mockRepository);
  });

  it('should retrieve Movies data successfully', async () => {
    const MOCK_REQUEST: TrendingMoviesRequest = { time_window: 'day' };
    mockRepository.getAllTrending.mockResolvedValue(SIMILAR_MOVIES);

    const result = await getAllTrendingUseCase.execute(MOCK_REQUEST);

    expect(mockRepository.getAllTrending).toHaveBeenCalledWith(MOCK_REQUEST);
    expect(result).toEqual(SIMILAR_MOVIES);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockRepository.getAllTrending.mockRejectedValue(new Error('Error retrieving movies'));

    await expect(
      getAllTrendingUseCase.execute({ time_window: 'bad_value' as any }),
    ).rejects.toThrow('Error retrieving movies');
  });
});
