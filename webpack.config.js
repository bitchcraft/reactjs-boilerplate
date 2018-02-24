const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
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
				babelrc: true,
				plugins: [],
			},
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
	resolve: {
		extensions: [ '', '.js', '.jsx', '.json' ],
	},
	resolveLoader: {
		modulesDirectories: [ 'node_modules', 'build-tools' ],
	},
	postcss: function () {
		return [ autoprefixer ];
	},
}

const defines = {
	"process.env": {
		NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
	}
};

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'cheap-module-eval-source-map';//'inline-source-map';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.entry['app'].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');

	config.module.loaders[0].query.plugins.push([
		'react-transform', {
			transforms: [
				{
					transform: 'react-transform-hmr',
					imports: ['react'],
					locals: ['module']
				},
			]
		}
	]);
} else if (process.env.NODE_ENV === 'production') {
	config.output.filename = 'bundle.js';
	config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}


config.plugins.push(new webpack.DefinePlugin(defines));

module.exports = config;
