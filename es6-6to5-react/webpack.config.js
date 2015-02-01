var webpack = require('webpack');

var _production = !!process.env.PROD;

var ENTRIES = ['./src/app.jsx'];
if (!_production) {
  ENTRIES.unshift('webpack/hot/dev-server');
}

module.exports = {
  devtool: 'inline-source-map',
  pathinfo: true,
  entry: {
    app: ENTRIES
  },
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['6to5-loader?sourceMap=true']},
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', '6to5-loader?sourceMap=true']},
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css?sourceMap']},
      { test: /\.scss$/, exclude: /node_modules/, loaders: ['style', 'css?sourceMap', 'sass']}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
};
