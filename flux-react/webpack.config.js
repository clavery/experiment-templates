var webpack = require('webpack');
var path = require('path');

var environment = process.env.NODE_ENV;
var isProduction = (environment === "production");

var ENTRIES = ['./src/main.js'];

if (!environment === "production") {
  ENTRIES.unshift('webpack/hot/dev-server');
}

BOOSTRAP_PATH="./node_modules/bootstrap-sass/assets/stylesheets/"

module.exports = {
  devtool: isProduction ? false : 'eval',
  entry: {
    app: ENTRIES
  },
  output: {
    pathinfo: !isProduction,
    publicPath: '/dist/',
    path: __dirname + "/dist",
    filename: 'main.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['jsx-loader?harmony']},
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'jsx-loader?harmony']},
      { test: /\.json$/, exclude: /node_modules/, loaders: ['json-loader']},
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
  },
  externals: {
    "aws-sdk": "AWS"
  }
};
