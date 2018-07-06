// @flow
import Express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import webpack from 'webpack';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cache from 'express-cache-headers';
import bodyParser from 'body-parser';
import cors from 'cors';
import UnicornLogger from '@bitchcraft/unicorn-logger';

import { notFoundHandler } from 'server/handlers';

// create console loggers
const logger = new UnicornLogger('server:');
const webpackLogger = new UnicornLogger('webpack:dev:');
const webpackHotLogger = new UnicornLogger('webpack:hot:', {
	cleaner: args => (args && args.length === 1 && Array.isArray(args[0]) ? args[0] : args),
});

// create Express app
const app = new Express();
const port = process.env.BUNDLE_SERVER_PORT || 3000;
app.enable('trust proxy'); // needed to determine real client IP
app.use(compress()); // use gzip

// http request logging middleware
const format = process.env.NODE_ENV === 'production'
	? 'combined' // Standard Apache combined log output.
	: 'dev'; // Concise output colored by response status for development use.
app.use(morgan(format));

// enable security middlewares
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hidePoweredBy());

// parse cookies
app.use(cookieParser());

// parse json payload
app.use(bodyParser.json());

// cors
app.use(cors());


// Use this middleware to set up hot module reloading via webpack.
if (process.env.NODE_ENV === 'development' && process.env.WEBPACK_HOT === 'true') {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('../webpack.config');
	logger.debug('Including webpack dev middleware');
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		logger: webpackLogger,
		logLevel: 'info',
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true,
		},
	}));
	app.use(webpackHotMiddleware(compiler, {
		log: webpackHotLogger,
	}));
}

app.use('/docs', Express.static('docs'), notFoundHandler);
app.use('/static', cache(60 * 60 * 24 * 7), Express.static('static'), notFoundHandler);
app.use('/node_modules', cache(60 * 60 * 24 * 7), Express.static('node_modules'), notFoundHandler);
app.use('/.well-known', cache(60 * 60 * 24 * 7), Express.static('assetlinks'), notFoundHandler);

// set template engine
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './server/views');

// do not cache views for development builds
app.set('view cache', process.env.NODE_ENV !== 'development');

// routes
app.get('/', (req, res) => {
	res.render('index', {
		bundle: '/static/bundle.js',
		environment: 'window.API_ENDPOINT="//localhost:3001"',
	});
});

app.options('*', cors());

// start listening for requests
app.listen(port, (err) => {
	if (err) {
		logger.error(err);
	} else {
		logger.info(`🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
		logger.info(`ℹ️  Docs and README: http://localhost:${port}/docs`);
	}
});
