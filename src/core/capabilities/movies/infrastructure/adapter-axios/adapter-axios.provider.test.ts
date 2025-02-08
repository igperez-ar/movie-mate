import type { TrendingMoviesRequest } from '@core/capabilities/movies/dtos';
import type { MoviesByCategoryRequest } from '../../dtos';
import {
  MOVIE_DETAIL,
  SIMILAR_MOVIES,
  TRENDING_MOVIES,
  UPCOMING_MOVIES,
} from './../../../../../testing/fixtures/movies';
import { AxiosImplementation } from './../../../../infrastructure/http/axios/axios.implementation';
import { AdapterAxiosProvider } from './adapter-axios.provider';

describe('AdapterAxiosProvider', () => {
  const mockAxiosImpl = new AxiosImplementation() as jest.Mocked<AxiosImplementation>;
  const adapterAxiosProvider = new AdapterAxiosProvider(mockAxiosImpl);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call "getAllByCategory" correctly', async () => {
    const MOCK_REQUEST: MoviesByCategoryRequest = { category: 'upcoming' };
    mockAxiosImpl.get.mockResolvedValue(UPCOMING_MOVIES);

    const result = await adapterAxiosProvider.getAllByCategory(MOCK_REQUEST);

    expect(mockAxiosImpl.get).toHaveBeenCalledWith(`/movie/${MOCK_REQUEST.category}`);
    expect(result).toEqual(UPCOMING_MOVIES);
  });

  it('should handle exceptions thrown by "getAllByCategory"', async () => {
    mockAxiosImpl.get.mockRejectedValue(new Error('Error fetching movies'));

    await expect(
      adapterAxiosProvider.getAllByCategory({ category: 'bad_category' as any }),
    ).rejects.toThrow('Error fetching movies');
  });

  it('should call "getAllTrending" correctly', async () => {
    const MOCK_REQUEST: TrendingMoviesRequest = { time_window: 'day' };
    mockAxiosImpl.get.mockResolvedValue(TRENDING_MOVIES);

    const result = await adapterAxiosProvider.getAllTrending(MOCK_REQUEST);

    expect(mockAxiosImpl.get).toHaveBeenCalledWith(`/trending/movie/${MOCK_REQUEST.time_window}`);
    expect(result).toEqual(TRENDING_MOVIES);
  });

  it('should handle exceptions thrown by "getAllTrending"', async () => {
    mockAxiosImpl.get.mockRejectedValue(new Error('Error fetching trending movies'));

    await expect(
      adapterAxiosProvider.getAllTrending({ time_window: 'month' as any }),
    ).rejects.toThrow('Error fetching trending movies');
  });

  it('should call "getAllSimilar" correctly', async () => {
    mockAxiosImpl.get.mockResolvedValue(SIMILAR_MOVIES);

    const result = await adapterAxiosProvider.getAllSimilar(MOVIE_DETAIL.id);

    expect(mockAxiosImpl.get).toHaveBeenCalledWith(`/movie/${MOVIE_DETAIL.id}/similar`);
    expect(result).toEqual(SIMILAR_MOVIES);
  });

  it('should handle exceptions thrown by "getAllSimilar"', async () => {
    mockAxiosImpl.get.mockRejectedValue(new Error('Error fetching similars'));

    await expect(adapterAxiosProvider.getAllSimilar(MOVIE_DETAIL.id)).rejects.toThrow(
      'Error fetching similars',
    );
  });

  it('should call "getOneById" correctly', async () => {
    mockAxiosImpl.get.mockResolvedValue(MOVIE_DETAIL);

    const result = await adapterAxiosProvider.getOneById(MOVIE_DETAIL.id);

    expect(mockAxiosImpl.get).toHaveBeenCalledWith(`/movie/${MOVIE_DETAIL.id}`);
    expect(result).toEqual(MOVIE_DETAIL);
  });

  it('should handle exceptions thrown by "getOneById"', async () => {
    mockAxiosImpl.get.mockRejectedValue(new Error('Error fetching movie details'));

    await expect(adapterAxiosProvider.getOneById(0)).rejects.toThrow(
      'Error fetching movie details',
    );
  });
});
