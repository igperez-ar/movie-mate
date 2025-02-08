import { AppStore, store as defaultStore, persistor } from '@core/infrastructure';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export type StoreProviderProps = PropsWithChildren<{
  store?: AppStore;
}>;

export const StoreProvider: React.FC<StoreProviderProps> = ({ store = defaultStore, children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
