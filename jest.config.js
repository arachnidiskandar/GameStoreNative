const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.js?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', ...defaults.moduleFileExtensions],
};
