// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress');

const webpackConfig = require('./webpack.config.js');

module.exports = defineConfig({
  viewportWidth: 900,
  viewportHeight: 1080,
  video: false,
  numTestsKeptInMemory: 24,
  fixturesFolder: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/component-[hash].xml',
    attachments: true,
  },
  component: {
    setupNodeEvents() {},
    specPattern: 'cypress/tests/**/*.test.tsx',
    indexHtmlFile: 'support/component-index.html',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});
