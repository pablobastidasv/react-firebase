var webpack = require('webpack');
var path = require('path');

var PUBLIC_DIR = path.resolve(__dirname, 'public');
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  resolve: {
    moduleExtensions: [
      'src'
    ],
    extensions: ['.js', '.jsx']
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?$/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: PUBLIC_DIR,
    compress: true,
    port: 9000
  },
  devtool: 'eval-source-map'
};
