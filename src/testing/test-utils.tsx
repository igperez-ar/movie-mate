import { setupStore } from '@core/infrastructure';
import type { RootParamList } from '@core/infrastructure/navigation/root-navigation';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from '@testing-library/react-native';
import React from 'react';
import { StoreProvider, ThemeProvider, type StoreProviderProps } from 'src/presentation/providers';
import type {
  NavigationRenderOptions,
  ProvidersRenderOptions,
  ScreenComponent,
} from './test-utils.types';

const AppProviders: React.FC<StoreProviderProps> = ({ children, store }) => (
  <ThemeProvider>
    <StoreProvider store={store}>
      <NavigationContainer onUnhandledAction={() => null}>{children}</NavigationContainer>
    </StoreProvider>
  </ThemeProvider>
);

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...options
  }: ProvidersRenderOptions = {},
) {
  return {
    store,
    ...render(ui, {
      wrapper: (props) => <AppProviders {...props} store={store} />,
      ...options,
    }),
  };
}

export const renderWithNavigation = <RouteName extends keyof RootParamList>(
  Screen: ScreenComponent<RouteName>,
  options: NavigationRenderOptions<RouteName>,
) => {
  const mockNavigation = {
    navigate: jest.fn(),
    push: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  } as any;

  const route = {
    name: options.routeName as Extract<RouteName, string>,
    params: options.routeParams,
    key: 'test-key',
  } as RouteProp<RootParamList, RouteName>;

  const Component = () => <Screen navigation={mockNavigation} route={route} />;

  const Stack = createNativeStackNavigator();
  return {
    navigation: mockNavigation,
    ...renderWithProviders(
      <Stack.Navigator>
        <Stack.Screen
          name={(options.routeName || 'Test_Screen') as string}
          component={Component}
          initialParams={options.routeParams}
        />
      </Stack.Navigator>,
      options,
    ),
  };
};

export * from '@testing-library/react-native';
