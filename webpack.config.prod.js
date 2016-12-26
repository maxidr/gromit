var path = require('path');
var webpack = require('webpack')
var fs = require('fs')
var S3Plugin = require('webpack-s3-plugin')

var ReplacePlugin = require('replace-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var precss = require('precss')

function makeDirectory(directory){
  if( !fs.existsSync(directory) ){
    fs.mkdirSync(directory, '0766', function(err){
       if(err){
         console.log(err);
         response.send("ERROR! Can't make the directory! \n");    // echo the result back
       }
     })
  }
}

makeDirectory('deployment')
makeDirectory('deployment/app')


module.exports = {
  entry: "./app.js",

  devtool: 'hidden-source-map',
  debug: false,

  output: {
    path: path.resolve(__dirname, "deployment", "assets", "[hash]"),
    publicPath: "/deployment/assets/[hash]",
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
			autoprefixer({ browsers: ['last 3 version'] }),
			postcssImport({ addDependencyTo: webpack }),
			precss()
    ];
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    }),
    new ReplacePlugin({
      entry: 'index.html',
      hash: '[hash]',
      output: '/deployment/app/index.html',
      data: {
        css: '<link type="text/css" rel="stylesheet" href="https://static.gromit.io/assets/[hash]/styles.css">',
        js: '<script src="https://static.gromit.io/assets/[hash]/bundle.js"></script>'
      }
    }),
    /*
    new S3Plugin({
      s3Options: {
        accessKeyId: '...',
        secretAccessKey: '...',
      },
      s3UploadOptions: {
        Bucket: 'static-files-gromit'
      },
      directory: 'deployment'
    })
    */
  ],

  node : { fs: 'empty' }
};
