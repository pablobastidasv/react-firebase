var webpack = require('webpack');
var path = require('path');

var PUBLIC_DIR = path.resolve(__dirname, 'public');
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  resolve: {
    moduleExtensions: [
      'src',
      "node_modules"
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
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: PUBLIC_DIR,
    compress: true,
    port: 9000
  }
};

module.exports = config;
