var path = require('path');

module.exports = {
  entry: "./app.js",

  devtool: 'source-map',
  debug: true,

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/assets/",
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
        loader: "style-loader!css-loader!postcss-loader"
      },{
        test: /sinon\/pkg\/sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')];
  },

  node : { fs: 'empty' }
};
