const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['node_modules', 'dist'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^icons/(.*)$':
      '<rootDir>/config/jest/assetsTransformer.js',
    '^images/(.*)$':
      '<rootDir>/config/jest/assetsTransformer.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      '<rootDir>/config/jest/assetsTransformer.js',
    'lodash-es': 'lodash'
  },
};
