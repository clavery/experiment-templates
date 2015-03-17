var webpack = require('webpack');
var path = require('path');

var environment = process.env.NODE_ENV;
var production = (environment === "production");

var ENTRIES = ['./src/main.js'];

BOOSTRAP_PATH="./node_modules/bootstrap-sass/assets/stylesheets/"

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
      { test: /\.js$/, exclude: /node_modules/, loaders: ['jsx-loader?harmony']},
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'jsx-loader?harmony']},
      { test: /\.json$/, loaders: ['json-loader']},
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css?sourceMap']},
      { test: /\.scss$/, exclude: /node_modules/, loaders: ['style', 'css',
        'sass?sourceMap=map&outputStyle=expanded&includePaths[]=' +
          (path.resolve(__dirname, BOOSTRAP_PATH)) ]},
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
if (production) {
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
