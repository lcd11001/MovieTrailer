const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    main: './index.web.js',
    api: './src/api/API.js',
    utils: './src/utils/utils.js'
  },

  output: {
    path: path.resolve(__dirname, '_dist'),
    filename: '[name].bundle.js'
  },

  devServer: {
    inline: true,
    contentBase: "./_dist",
    port: 8088
  },

  plugins: [
    new CleanWebpackPlugin(['_dist']),

    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Movie Trailer',
      template: './index.template.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
            },
          }
        ]
      },
    ],
  },

  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
