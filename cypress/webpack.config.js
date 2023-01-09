const path = require('path');

const { useTs } = require('@webpackon/use-ts');
const { useBabel } = require('@webpackon/use-babel');
const { useFonts } = require('@webpackon/use-fonts');
const { useTranspileModules } = require('@webpackon/use-transpile-modules');
const { compose } = require('@webpackon/core');

const { useUrlImages, useSvgr } = require('../webpack');

const MODE = 'development';

module.exports =
  compose(
    useTranspileModules({
      transpileModules: ['@astral/ui/fonts', '@astral/ui/illustrations'],
    }),
    useBabel({ useTs: true }),
    useTs(),
    useFonts(),
    useSvgr(),
    useUrlImages({ mode: MODE })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  })
