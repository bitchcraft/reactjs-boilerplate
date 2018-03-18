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
import api from './api';

const DashboardPlugin = require('webpack-dashboard/plugin');

const { debug, error } = new UnicornLogger('server:');

const app = new Express();
const port = 3000;

// needed to determine real client IP
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
	debug('Including webpack dev middleware');
	const compiler = webpack(webpackConfig);
	compiler.apply(new DashboardPlugin());
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

// do not cache views for development builds
app.set('view cache', process.env.NODE_ENV !== 'development');

// routes
app.get('/', (req, res) => {
	res.render('index', { bundle: '/static/bundle.js' });
});

app.options('*', cors());

app.post('/auth', api.handleAuth);
app.get('/dummy-list', api.handleDummyList);

// start listening for requests
app.listen(port, (err) => {
	if (err) {
		error(err);
	} else {
		/* eslint-disable no-console */
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
		/* eslint-enable no-console */
	}
});
