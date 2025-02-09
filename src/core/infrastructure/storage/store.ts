import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore(preloadedState?: PartialAppState) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState: preloadedState as PreloadedStateShapeFromReducersMapObject<AppState>,
  });
}

const store = setupStore();
const persistor = persistStore(store);

type RootState = ReturnType<typeof persistedReducer>;

export type AppStore = typeof store;
export type AppState = RootState & PersistPartial;
export type PartialAppState = DeepPartial<AppState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
