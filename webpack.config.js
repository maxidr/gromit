var path = require('path');
var webpack = require('webpack')

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')

module.exports = {
  entry: "./app.js",

  devtool: 'source-map',
  //devtool: 'eval',
  debug: true,

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=dist/fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=dist/fonts/[name].[ext]'},
      { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=dist/fonts/[name].[ext]'},
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=dist/fonts/[name].[ext]'},
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=dist/fonts/[name].[ext]'},
      {
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
