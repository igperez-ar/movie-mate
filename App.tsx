import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MainNavigation } from './src/core/infrastructure/navigation/MainNavigation';
import { store, persistor } from '@core/infrastructure';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};
