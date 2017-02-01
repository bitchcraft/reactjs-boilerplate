import Express from 'express';
import exphbs from 'express-handlebars';

import fs from 'fs';

import morgan from 'morgan';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import helmet from 'helmet';

import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cache from 'express-cache-headers';

const { debug } = require('tools/log')('server');
const trace = require('debug')('server:');
const error = require('debug')('server:');
/* eslint-disable no-console */
trace.log = console.trace.bind(console);
error.log = console.error.bind(console);
/* eslint-enable no-console */

const version = fs.readFileSync('./static/version').toString().trim();

const app = new Express();
const port = 3000;

// needed to determine real client ips
app.enable('trust proxy');

// use gzip
app.use(compress());

// logging middleware
const format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';

const logger = morgan(format, {
	skip: function(req, res) { return res.statusCode < 400; },
});

app.use(logger);

// enable security middlewares
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts());
app.use(helmet.hidePoweredBy());

// parse useragent
app.use(useragent.express());

// parse cookies
app.use(cookieParser());


// always use version name as ETAG header

if (process.env.NODE_ENV !== 'development') {
	app.set('etag', function(body, encoding) {
		return version;
	});
}

// Use this middleware to set up hot module reloading via webpack.
if (process.env.NODE_ENV === 'development' && process.env.WEBPACK_HOT === 'true') {
	/* eslint-disable global-require */
	const webpackConfig = require('../webpack.config');
	/* eslint-enable global-require */
	debug('Including webpack dev middleware');
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
	}));
	app.use(webpackHotMiddleware(compiler));
}

const notFoundHandler = (req, res) => {
	res.status(404).send('404 - File not found');
};

app.use('/static', cache(60 * 60 * 24 * 7), Express.static('static'), notFoundHandler);
app.use('/node_modules', cache(60 * 60 * 24 * 7), Express.static('node_modules'), notFoundHandler);
app.use('/.well-known', cache(60 * 60 * 24 * 7), Express.static('assetlinks'), notFoundHandler);

// set template engine
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './server/views');

if (process.env.NODE_ENV === 'development') {
	app.set('view cache', false);
} else {
	app.set('view cache', true);
}

// redirect all requests to https in production setup
if (process.env.NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.path.startsWith('/embed')) {
			next();
			return;
		}

		debug('Checking if request is secure');
		if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
			debug('Request is insecure, redirect to https');
			res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
		} else {
			debug('Request is secure, continue handling');
			next();
		}
	});
}

app.use((req, res, next) => {
	global.navigator = {
		userAgent: req.headers['user-agent'],
	};
	next();
});

app.get('*', (req, res) => {
	res.render('index', { bundle: '/static/bundle.js' });
});

app.listen(port, (err) => {
	if (err) {
		error(err);
	} else {
		/* eslint-disable no-console */
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
		/* eslint-enable no-console */
	}
});
