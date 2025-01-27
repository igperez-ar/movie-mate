import { RefObject, createRef } from 'react';
import type {
  NavigationContainerRef,
  PartialState,
  NavigationState,
} from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef<any> | null> =
  createRef<NavigationContainerRef<any>>();

export const routeRef: RefObject<any | null> = createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function reset(params: NavigationState | PartialState<NavigationState>) {
  navigationRef.current?.reset(params);
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.goBack();
  }
}

export const onReadyNavigationContainer = () => {
  routeRef.current = navigationRef.current?.getCurrentRoute();
};

export const onStateChangeNavigationContainer = () => {
  const previousRoute = routeRef.current;
  const currentRoute = navigationRef.current?.getCurrentRoute();

  if (previousRoute?.name !== currentRoute?.name) {
    routeRef.current = currentRoute;
  }
};
