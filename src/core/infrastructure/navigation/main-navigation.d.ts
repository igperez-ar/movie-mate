import type { ParamListBase } from '@react-navigation/native';
import { MovieCompositeRoutes } from '@screens/movie/navigation/movie-navigator.types';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';

export type MainNavigatorParams = ParamListBase & {
  [GlobalRoutesEnum.HOME]: undefined;
  [GlobalRoutesEnum.SPLASH]: undefined;
  [GlobalRoutesEnum.WELCOME]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainNavigatorParams, MovieCompositeRoutes {}
  }
}
