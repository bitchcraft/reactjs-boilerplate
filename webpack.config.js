const path = require('path');
const webpack = require('webpack');

const config = {
	context: path.resolve(__dirname),
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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/jsdom$/),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					query: {
						cacheDirectory: true,
						babelrc: true,
						plugins: [],
					},
				}],
			}, {
				test: /\.scsshbs$/,
				use: [
					'handlebars-loader',
					'css-prehandlebars-loader',
					'postcss-loader',
					'sass-loader',
				],
			}, {
				test: /\.(ttf|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=50000'
			}, {
				test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=8192'
			}, {
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
				use: 'file-loader'
			},
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json' ],
	},
	resolveLoader: {
		modules: [ 'node_modules', 'webpack-loaders' ],
	},
}

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'cheap-module-eval-source-map';//'inline-source-map';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.entry['app'].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');

	config.module.rules[0].use[0].query.plugins.push([
		'react-transform', {
			transforms: [{
				transform: 'react-transform-hmr',
				imports: ['react'],
				locals: ['module']
			}],
		},
	]);

} else if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// make process.env available in client code
config.plugins.push(new webpack.DefinePlugin({
	"process.env": {
		NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
	}
}));

module.exports = config;
