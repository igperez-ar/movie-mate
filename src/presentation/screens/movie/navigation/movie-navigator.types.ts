import type { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import type { MovieList } from '@screens/home/home.types';
import { MovieRoutesEnum } from 'src/shared/enums/routes';

export type MovieNavigatorParams = {
  [MovieRoutesEnum.DETAIL]: { id: number; category?: MovieList };
  [MovieRoutesEnum.WATCHLIST]: undefined;
};

export type MovieCompositeRoutes = ParamListBase & {
  [MovieRoutesEnum.STACK]: NavigatorScreenParams<MovieNavigatorParams>;
};
