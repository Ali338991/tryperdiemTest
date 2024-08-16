module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './assets',
          '@store': './src/redux',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@components': './src/components',
          '@app': './src',
        },
      },
    ]
  ],
};
