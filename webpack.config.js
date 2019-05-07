const path = require('path');
const webpack = require('webpack');
const JSDocWebpackPlugin = require('@toanzzz/jsdoc-webpack-plugin');
const { InjectorWebpackConfig } = require('@bitchcraft/injector');
const TerserPlugin = require('terser-webpack-plugin');

const jsdocConfig = require('./jsdoc.json');

const config = {
	context: path.resolve(__dirname),
	entry: {
		app: [
			'./client/index.js',
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		chunkFilename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/jsdom$/),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				handlebarsLoader: {}
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, {
					loader: 'babel-loader',
					query: {
						cacheDirectory: true,
						babelrc: true,
						plugins: [],
					},
				}, 'react-hot-loader/webpack'],
			}, {
				test: /\.(ttf|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, 'cache-loader', 'url-loader?limit=50000']
			}, {
				test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, 'cache-loader', 'url-loader?limit=8192']
			}
		].concat(InjectorWebpackConfig.rules),
	},
	resolve: {
		alias: { 'react-dom': '@hot-loader/react-dom' },
		extensions: [ '.js', '.jsx', '.json' ],
	},
	resolveLoader: {
		modules: [ 'node_modules', InjectorWebpackConfig.resolveLoader.modules[0] ],
	},
}

config.mode = process.env.NODE_ENV;

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'cheap-module-eval-source-map';//'inline-source-map';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.entry['app'].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');

	// on-the-fly jsdoc builds
	config.plugins.push(
		new JSDocWebpackPlugin(jsdocConfig)
	);

} else if (process.env.NODE_ENV === 'production') {
	// uglify
	config.optimization = {
		minimizer: [ new TerserPlugin({ cache: true }) ]
	};
}

module.exports = config;
