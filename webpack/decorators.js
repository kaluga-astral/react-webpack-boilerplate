const path = require('path');

const {
  createConfigDecorator,
  isProduction,
  addLoaders,
  addPlugins,
} = require('@webpackon/core');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const {
  useUrlImages: useWebpackoneUrlImages,
} = require('@webpackon/use-url-images');
const Dotenv = require('dotenv-webpack');

const useCompression = createConfigDecorator((config, { mode }) => {
  if (!isProduction(mode)) {
    return config;
  }

  return addPlugins([
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.ttf$/,
      compressionOptions: { level: 9 },
    }),
    new BrotliPlugin({
      test: /\.(js|css|html|svg|ttf)$/,
      quality: 11,
    }),
  ])(config);
});

const useFavicons = ({ faviconsPath }) =>
  addPlugins([
    new CopyPlugin({
      patterns: [{ from: faviconsPath, to: 'favicons' }],
    }),
  ]);

const SVGO_CONFIG = {
  plugins: [
    'prefixIds',
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertPathData: false,
          cleanupIDs: false,
        },
      },
    },
  ],
};

const useUrlImages = ({ mode }) =>
  useWebpackoneUrlImages({
    mode,
    imageminPlugins: [
      ['jpegtran', { progressive: true }],
      ['svgo', SVGO_CONFIG],
    ],
    // loaderParams: {
    //   exclude: [
    //     // исключаем icons для того, чтобы не было пересечений с svgr
    //     new RegExp(`icons\\${path.sep}.*\\.svg$`, 'i'),
    //   ],
    // },
  });

const useSvgr = () =>
  addLoaders([
    {
      test: new RegExp(`icons\\${path.sep}.*\\.svg$`, 'i'),
      exclude: /node_modules/,
      resourceQuery: /component/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgProps: {
              fill: 'currentColor',
            },
            svgoConfig: SVGO_CONFIG,
          },
        },
      ],
    },
  ]);

const useEnv = createConfigDecorator((config, { envFilePath }) =>
  addPlugins([
    new Dotenv({
      path: envFilePath,
    }),
  ])(config),
);

const useBundleAnalyzer = createConfigDecorator(
  (config, { enabled = false }) => {
    if (!enabled) {
      return config;
    }

    // eslint-disable-next-line
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

    return addPlugins([new BundleAnalyzerPlugin()])(config);
  },
);

module.exports = {
  useCompression,
  useFavicons,
  useUrlImages,
  useSvgr,
  useEnv,
  useBundleAnalyzer,
};
