const merge = require('webpack-merge');
const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    clientLogLevel: 'none',
    contentBase: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src/partials'),
    ],
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    open: true,
    overlay: true,
    port: 3000,
    stats: 'minimal',
    watchContentBase: true,
  },

  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(html)$/,
            include: path.join(__dirname, 'src/partials'),
            use: {
              loader: 'html-loader',
              options: {
                interpolate: true,
              },
            },
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js)$/,
            include: path.resolve('src'),
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.(css|scss)$/,
            loader: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                  })],
                },
              },
              'sass-loader',
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.ejs$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
