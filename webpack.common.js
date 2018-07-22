const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
  ],

  resolve: {
    alias: {
      ScrollMagicGSAP: 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
    },
    extensions: ['.js'],
    modules: ['src', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve('src'),
      },
    ],
  },

  performance: {
    hints: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      template: './src/index.html',
    }),
  ],
};
