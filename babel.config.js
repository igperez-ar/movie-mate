module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.tsx', '.jsx', '.js', '.json', '.ts'],
        alias: {
          '@core': './src/core',
          '@screens': './src/presentation/screens',
          '@components': './src/presentation/components',
        },
      },
    ],
  ],
};
