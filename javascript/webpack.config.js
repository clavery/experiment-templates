var webpack = require('webpack');
var path = require('path');

var ENTRIES = ['./src/main.js'];

var config = {
  devtool: '#inline-source-map',
  entry: {
    app: ENTRIES
  },
  output: {
    pathinfo: true,
    publicPath: '/dist/',
    path: __dirname + "/dist",
    filename: 'main.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=1"},
      { test: /\.json$/, loaders: ['json-loader']},
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css?sourceMap']},
      { test: /\.scss$/, exclude: /node_modules/,
        loader: 'css?sourceMap!sass?sourceMap=true&sourceMapContents=true'},
      { test: /\.woff2?$/,   loader: "file-loader" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [path.join(__dirname, "lib")]
  },
  plugins: []
};

// production "build" options
if (process.env.NODE_ENV === "production") {
  config.debug = false;
  config.bail = true;
  config.devtool = false;
  config.profile = true;
  config.output.pathinfo = false;

  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
  ]);
}

module.exports = config
