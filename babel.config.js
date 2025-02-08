module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.tsx', '.jsx', '.js', '.json', '.ts'],
        alias: {
          '@components': './src/presentation/components',
          '@core': './src/core',
          '@screens': './src/presentation/screens',
          '@testing': './src/testing',
        },
      },
    ],
  ],
};
