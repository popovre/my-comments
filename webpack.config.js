const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  target: ['web', 'es5'],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
    ]
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'build'),
    hot: true,
    port: 9000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: /View$/
        }
      })
    ]
  }
};
