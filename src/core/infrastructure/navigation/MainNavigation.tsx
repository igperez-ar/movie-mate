import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  navigationRef,
  onReadyNavigationContainer,
  onStateChangeNavigationContainer,
} from './root-navigation';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import { SplashScreen, WelcomeScreen } from 'src/presentation/screens';

const Stack = createNativeStackNavigator<ReactNavigation.MainNavigator>();

const defaultConfig = {
  headerShown: false,
};
const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={defaultTheme}
      onStateChange={onStateChangeNavigationContainer}
      onReady={onReadyNavigationContainer}
    >
      <Stack.Navigator screenOptions={defaultConfig} initialRouteName={GlobalRoutesEnum.SPLASH}>
        <Stack.Screen name={GlobalRoutesEnum.SPLASH} component={SplashScreen} />
        <Stack.Screen name={GlobalRoutesEnum.WELCOME} component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
