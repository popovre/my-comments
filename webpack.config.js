// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FileManagerPlugin = require('filemanager-webpack-plugin');

// module.exports = {
//   entry: './src/main.js',
//   output: {
//     path: path.join(__dirname, 'build'),
//     filename: 'bundle.js',
//     assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
//   },
//   devtool: 'source-map',
//   target: ['web', 'es5'],
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, 'src', 'index.html'),
//       filename: 'index.html',
//     }),
//     new FileManagerPlugin({
//       events: {
//         onStart: {
//           delete: ['build'],
//         },
//         // onEnd: {
//         //   copy: [
//         //     {
//         //       source: path.join('src', 'images'),
//         //       destination: 'build/images',
//         //     },
//         //   ],
//         // },
//       },
//     }),
//     new MiniCssExtractPlugin({
//       filename: 'style.css',
//     }),
//   ],
//   devServer: {
//     watchFiles: path.join(__dirname, 'src'),
//     hot: true,
//     port: 9001,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: ['babel-loader']
//       },
//       {
//         test: /\.(scss|css)$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//           'sass-loader',
//         ],
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//         // generator: {
//         //   filename: path.join('images', '[name].[contenthash][ext]'),
//         // },
//       },
//       {
//         test: /\.svg$/,
//         type: 'asset/resource',
//         generator: {
//           filename: path.join('icons', '[name].[contenthash][ext]'),
//         },
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: path.join('fonts', '[name].[contenthash][ext]'),
//         },
//       },
//     ]
//   },
//   optimization: {
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           keep_classnames: /View$/
//         }
//       })
//     ]
//   }
// };


const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['build'],
        },
        // onEnd: {
        //   copy: [
        //     {
        //       source: path.join('src', 'static'),
        //       destination: 'dist',
        //     },
        //   ],
        // },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
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
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[name].[contenthash][ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('fonts', '[name].[contenthash][ext]'),
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ],
  },
};
