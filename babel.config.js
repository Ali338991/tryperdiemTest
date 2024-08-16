module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './assets',
          '@store': './src/redux',
          '@screens': './src/screens',
          '@components': './src/components',
          '@redux': './src/redux',
          '@app': './src',
        },
      },
    ]
  ],
};
