/* eslint-disable */

var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var autoprefixer = require('autoprefixer');

var exec = require('child_process').execSync

var dependencies = require('./package.json').dependencies;

function makeFolder(path) {
	try {
		// Query the entry
		var stats = fs.statSync(path);

		// Is it a directory?
		if (!stats.isDirectory()) {
			throw new Error('output folder is not a directory');
		}
	} catch (e) {
		fs.mkdirSync(path);
	}
}

var config = {
	entry: {
		app: [
			'./app/index.js',
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		chunkFilename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/jsdom$/)
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				cacheDirectory: true,
				presets: ['react', 'es2015', 'stage-0', 'flow'],
				plugins: ['add-module-exports', 'transform-runtime']
			}
		}, {
			test: /\.scsshbs$/,
			loader: 'handlebars-loader!sass-prehandlebars!postcss!sass'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!s3asset!sass?sourceMap')
		}, {
			test: /\.(ttf|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=50000'
		}, {
			test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url?limit=8192'
		}, {
			test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
			loader: 'file'
		}, {
			test: /\.json$/,
			loader: 'json'
		}]
	},
	postcss: function () {
		return [autoprefixer];
	},
	resolve: {
		alias: {
			ByteBuffer: 'bytebuffer',
			Long: 'long',
			actions: path.resolve(__dirname, 'app', 'actions'),
			containers: path.resolve(__dirname, 'app', 'containers'),
			components: path.resolve(__dirname, 'app', 'components'),
			tools: path.resolve(__dirname, 'common', 'tools'),
			constants: path.resolve(__dirname, 'common', 'constants'),
			services: path.resolve(__dirname, 'app', 'services'),
		},
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
		modulesDirectories: ['web_modules', 'node_modules', 'build-tools']
	},
	resolveLoader: {
		modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules', 'build-tools'],
	}
}

var defines;

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'cheap-module-eval-source-map';//'inline-source-map';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.entry['app'].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');

	config.module.loaders[0].query.plugins.push(['react-transform', {
		transforms: [{
			transform: 'react-transform-hmr',
			imports: ['react'],
			locals: ['module']
		}, {
			transform: 'react-transform-catch-errors',
			imports: ['react', 'redbox-react']
		}]
	}]);

	defines = {
		"process.env": {
			NODE_ENV: JSON.stringify('development'),
			API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
		}
	}
}


if (process.env.NODE_ENV === 'production') {
	config.output.filename = 'bundle.js';

	config.module.loaders[0].query.plugins.push(['react-transform', {
		transforms: [{
			transform: 'react-transform-catch-errors',
			imports: ['react', 'redbox-react']
		}]
	}]);

	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());

	defines = {
		"process.env": {
			NODE_ENV: JSON.stringify('production'),
			API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
		}
	}
}


config.plugins.push(new webpack.DefinePlugin(defines));

module.exports = config;
