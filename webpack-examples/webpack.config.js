var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var environment = process.env.NODE_ENV;
var production = (environment === "production");

var ENTRIES = ['./src/main.js'];

var config = {
  devtool: 'inline-source-map',
  entry: {
    app: ENTRIES
  },
  output: {
    pathinfo: true,
    publicPath: '/dist/',
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['jsx-loader?harmony']},
      { test: /\.json$/, loaders: ['json-loader']},
      { test: /\.scss$/, loader:
        ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap&sourceMapContents=true&outputStyle=expanded' )},
      { test: /\.woff2?$/,   loader: "file-loader" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.png$/,    loader: "file-loader" },
      { test: /\.jpg$/,    loader: "file-loader" },
      { test: /\.gif$/,    loader: "file-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = config
