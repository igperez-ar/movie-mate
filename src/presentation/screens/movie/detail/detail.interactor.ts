import { GetAllSimilarUseCase, GetOneByIdUseCase, MovieFactory } from '@core/capabilities/movies';

export const useMovieDetailInteractor = (
  id: number,
  getAllSimilarUseCase = new GetAllSimilarUseCase(MovieFactory.getInstance()),
  getOneByIdUseCase = new GetOneByIdUseCase(MovieFactory.getInstance()),
) => {
  const executeGetDetails = () => {
    try {
      return getOneByIdUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  };

  const executeGetSimilar = () => {
    try {
      return getAllSimilarUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  };

  return {
    executeGetDetails,
    executeGetSimilar,
  };
};
