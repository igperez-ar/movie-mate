import type { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { MovieRoutesEnum } from 'src/shared/enums/routes';

export type MovieNavigatorParams = {
  [MovieRoutesEnum.DETAIL]: { id: number };
  [MovieRoutesEnum.WATCHLIST]: undefined;
};

export type MovieCompositeRoutes = ParamListBase & {
  [MovieRoutesEnum.STACK]: NavigatorScreenParams<MovieNavigatorParams>;
};
