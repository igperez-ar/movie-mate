module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)': '<rootDir>/src/testing/mocks/image.js',
    '^styled-components$': 'styled-components/native',
    '^@components/(.*)$': '<rootDir>/src/presentation/components/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@screens/(.*)$': '<rootDir>/src/presentation/screens/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.enum.ts',
    '!src/**/*.types.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.types.tsx',
    '!src/**/*.repository.ts',
    '!src/**/*.index.ts',
    '!src/**/*.index.router.tsx',
    '!src/**/navigation/**',
    '!src/**/*mock*.{ts,tsx}',
    '!src/app/App.tsx',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|react-redux|react-native-linear-gradient|@react-navigation/native-stack|@react-native-async-storage/async-storage)/)',
  ],
};
