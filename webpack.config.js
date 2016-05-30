var path = require('path');
var webpack = require('webpack')

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')

module.exports = {
  entry: "./app.js",

  devtool: 'source-map',
  debug: true,

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        //loader: ExtractTextPlugin"style-loader!css-loader!postcss-loader"
      },{
        test: /sinon\/pkg\/sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
  },
  postcss: function () {
    return [
      autoprefixer,
      postcssImport({ addDependencyTo: webpack })
    ];
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true })
  ],

  node : { fs: 'empty' }
};
