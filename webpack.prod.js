const merge = require('webpack-merge');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

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
          },
          {
            test: /\.(css|scss)$/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
                'sass-loader',
              ],
            }),
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

  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve('dist'),
    publicPath: '',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('style.[hash:8].css', {
      allChunks: true,
    }),
  ],
});
