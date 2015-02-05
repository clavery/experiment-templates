var webpack = require('webpack');
var path = require('path');

var _production = !!process.env.PROD;

var ENTRIES = ['./src/app.jsx'];

if (!_production) {
  ENTRIES.unshift('webpack/hot/dev-server');
}

BOOSTRAP_PATH="./node_modules/bootstrap-sass/assets/stylesheets/"

module.exports = {
  devtool: 'eval',
  pathinfo: true,
  entry: {
    app: ENTRIES
  },
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['jsx-loader?harmony']},
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'jsx-loader?harmony']},
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css?sourceMap']},
      { 
        test: /\.scss$/, exclude: /node_modules/, loaders: ['style', 'css',
        'sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, BOOSTRAP_PATH))
      ]},
      { test: /\.woff2?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
