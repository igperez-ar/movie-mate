import { useEffect, useState } from 'react';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { useMovieDetailInteractor } from './detail.interactor';
import type { MovieDetailScreenProps, MovieDetailState } from './detail.types';

const initialState: MovieDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const useMovieDetailPresenter = (props: MovieDetailScreenProps) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { executeGetDetails, executeGetSimilar } = useMovieDetailInteractor(params.id);

  const [movieState, setMovieState] = useState<MovieDetailState>(initialState);

  const goToSimilar = (id: number) => {
    navigation.push(MovieRoutesEnum.DETAIL, { id });
  };

  const loadDetails = async () => {
    try {
      executeGetSimilar().then((res) => {
        setMovieState((prev) => ({
          ...prev,
          data: { ...(prev.data ?? ({} as any)), similar: res.results },
        }));
      });

      const response = await executeGetDetails();

      setMovieState((prev) => ({
        loading: false,
        error: null,
        data: { ...response, similar: [...(prev.data?.similar ?? [])] },
      }));
    } catch (error) {
      setMovieState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      throw error;
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return {
    movieState,
    goToSimilar,
  };
};
