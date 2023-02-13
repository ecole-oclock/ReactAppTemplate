/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const paths = require('./paths');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});

module.exports = {
  entry: [
    // SCSS
    `${paths.src}/styles/index.scss`,
    // JS
    `${paths.src}/index.js`,
  ],
  resolve: {
    plugins: [],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      app: paths.src,
      src: paths.src,
      styles: path.resolve(paths.src, 'styles'),
      '@recoil': path.resolve(paths.src, 'recoil'),
      '@assets': path.resolve(paths.assets),
      __tests__: path.resolve(paths.root, '__tests__'),
      __mocks__: path.resolve(paths.root, '__mocks__'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        generator: {
          filename: 'public/[hash][ext][query]',
        },
      },
    ],
  },
  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: `${paths.assets}/favicons/favicon-32x32-default.png`,
      template: `${paths.assets}/index.html`,
      filename: './index.html',
      keycloakBaseURL: dotenv.parsed.KEYCLOAK_URL,
      publicPath: 'auto',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};
