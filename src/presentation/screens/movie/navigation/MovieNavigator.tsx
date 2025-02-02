import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MovieDetailScreen, WatchlistScreen } from 'src/presentation/screens';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import type { MovieNavigatorParams } from './movie-navigator.types';

const Stack = createNativeStackNavigator<MovieNavigatorParams>();

const defaultConfig = {
  headerShown: false,
};

export const MovieNavigator = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName={MovieRoutesEnum.DETAIL}>
    <Stack.Screen name={MovieRoutesEnum.DETAIL} component={MovieDetailScreen} />
    <Stack.Screen name={MovieRoutesEnum.WATCHLIST} component={WatchlistScreen} />
  </Stack.Navigator>
);
