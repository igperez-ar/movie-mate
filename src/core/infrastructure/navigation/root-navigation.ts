import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/native';
import { createRef } from 'react';

export type NavigationStateType = NavigationState | PartialState<NavigationState>;
export type RootParamList = ReactNavigation.RootParamList;

export const navigationRef = createNavigationContainerRef<ReactNavigation.RootParamList>();

export const routeRef = createRef<Route<string> | null>();

export function navigate<RouteName extends keyof RootParamList>(
  name: RouteName,
  params?: RootParamList[RouteName],
): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as string, params);
  }
}

export function reset(state: NavigationStateType): void {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}

export function goBack(): void {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export const onReadyNavigationContainer = (): void => {
  const currentRoute = navigationRef.getCurrentRoute();
  routeRef.current = currentRoute ?? null;
};

export const onStateChangeNavigationContainer = (): void => {
  const previousRoute = routeRef.current;
  const currentRoute = navigationRef.getCurrentRoute();

  if (previousRoute?.name !== currentRoute?.name) {
    routeRef.current = currentRoute ?? null;
  }
};

export const getCurrentRoute = (): Route<string> | undefined => {
  return navigationRef.getCurrentRoute();
};

export const getRootState = (): NavigationState | undefined => {
  return navigationRef.getRootState();
};
