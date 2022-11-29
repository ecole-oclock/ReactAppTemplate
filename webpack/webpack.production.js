/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const paths = require('./paths');
const packageJSON = require('../package.json');

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
];

if (process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_PROJECT) {
  plugins.push(
    new SentryWebpackPlugin({
    // sentry-cli configuration - can also be done directly through sentry-cli
    // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'oclock',
      project: process.env.SENTRY_PROJECT,
      release: packageJSON.version,

      // other SentryWebpackPlugin configuration
      include: paths.build,
      ignore: ['node_modules', 'config'],
    }),
  );
}

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins,
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
              url: {
                filter: (url) => {
                  if (url.includes('charset=utf-8;;')) {
                    return false;
                  }
                  return true;
                },
              },
            },
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
};
