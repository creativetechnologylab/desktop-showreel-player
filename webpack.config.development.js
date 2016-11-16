var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var autoprefixer = require('autoprefixer');

var config = {
  entry: [
    'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
    './src/index',
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, 
		// "postcss" loader applies autoprefixer to our CSS.
		// "css" loader resolves paths in CSS and adds assets as dependencies.
		// "style" loader turns CSS into JS modules that inject <style> tags.
		// In production, we use a plugin to extract that CSS to a file, but
		// in development "style" loader enables hot editing of CSS.
		{
			test: /\.css$/,
			loader: 'style!css?importLoaders=1!postcss'
      // loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
		},
		{
      test: /\.png|\.svg$/,
      loaders: ['file-loader']
    }]
  },
  output: {
    path: __dirname + '/public/js/',
    publicPath: 'http://localhost:9000/public/js/',
    filename: 'bundle.js'
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
    new webpack.HotModuleReplacementPlugin(),
  ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
