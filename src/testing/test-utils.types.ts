import { AppStore, PartialAppState } from '@core/infrastructure';
import { RootParamList } from '@core/infrastructure/navigation/root-navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RenderOptions } from '@testing-library/react-native';

export type ProvidersRenderOptions = Omit<RenderOptions, 'queries'> & {
  preloadedState?: PartialAppState;
  store?: AppStore;
};

export type NavigationOptions<T extends keyof RootParamList> = {
  routeName: T;
  routeParams?: RootParamList[T];
};

export type NavigationRenderOptions<T extends keyof RootParamList> = NavigationOptions<T> &
  ProvidersRenderOptions;

export type ScreenComponent<ParamList extends keyof RootParamList> = React.ComponentType<
  NativeStackScreenProps<RootParamList, ParamList>
>;
