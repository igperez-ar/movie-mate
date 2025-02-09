jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('@react-native-vector-icons/material-design-icons', () => 'MaterialIcon');
jest.mock('react-native-linear-gradient', () => ({ children }) => children);
jest.mock('react-native-config', () => ({}));
jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist');
  return {
    ...actualReduxPersist,
    persistReducer: (config, reducer) => reducer,
    persistStore: () => ({ purge: jest.fn() }),
  };
});
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => children,
}));
jest.mock('src/core/infrastructure/http/axios/axios.implementation.ts');
