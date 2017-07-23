const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/container/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  node: {
    fs: "empty"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      //change the value in stringify from development to productin when ready to launch
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    //uncomment once ready to go into production mode
    //new webpack.optimize.UglifyJsPlugin()
  ]
}