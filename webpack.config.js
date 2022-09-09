const path = require('path');

const { useTs } = require('@webpackon/use-ts');
const { useReactRefresh } = require('@webpackon/use-react-refresh');
const { useHtml } = require('@webpackon/use-html');
const { useBabel } = require('@webpackon/use-babel');
const { useFonts } = require('@webpackon/use-fonts');
const { useDevServer } = require('@webpackon/use-dev-server');
const { useTranspileModules } = require('@webpackon/use-transpile-modules');
const { useOptimization } = require('@webpackon/use-optimization');
const { compose } = require('@webpackon/core');

const {
  useUrlImages,
  useCompression,
  useEnv,
  useFavicons,
  useBundleAnalyzer,
  useSvgr,
} = require('./webpack');

const { ENV_NAME = 'local' } = process.env;

const publicDirPath = path.resolve(__dirname, 'public');

module.exports = (_, { mode }) =>
  compose(
    useTranspileModules({
      transpileModules: ['@astral/illustrations', '@astral/fonts'],
    }),
    useEnv({ envFilePath: path.resolve(__dirname, 'env', `.env.${ENV_NAME}`) }),
    useReactRefresh({ mode }),
    useHtml({
      mode,
      templatePath: path.join(publicDirPath, 'index.html'),
    }),
    useBabel({ useTs: true }),
    useTs(),
    useFonts(),
    useSvgr(),
    useUrlImages({ mode }),
    useDevServer({ mode, port: 3000 }),
    useOptimization({
      mode,
      splitChunkCacheGroups: [
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    }),
    useCompression({ mode }),
    useFavicons({ faviconsPath: path.join(publicDirPath, 'favicons') }),
    useBundleAnalyzer({ enabled: false }),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
