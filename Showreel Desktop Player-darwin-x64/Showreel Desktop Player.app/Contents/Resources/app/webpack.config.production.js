var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: [
    './src/index',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, 
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-autoprefixer!postcss')
		},
		{
      test: /\.png|\.svg$/,
      loaders: ['file-loader']
    }]
  },
  output: {
    path: __dirname + '/public/',
    // publicPath: 'http://localhost:9000/public/js/',
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
	postcss: function() {
		return [
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9', // React doesn't support IE8 anyway
				]
			}),
		];
	},
  plugins: [
		new ExtractTextPlugin('css/[name].css'),
  ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
