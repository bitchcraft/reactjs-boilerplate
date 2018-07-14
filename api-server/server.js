// @flow
import Express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import UnicornLogger from '@bitchcraft/unicorn-logger';

import api from './api';

// create console loggers
const logger = new UnicornLogger('api-server:');

// create Express app
const app = new Express();
const port = process.env.BUNDLE_API_SERVER_PORT || 3001;
app.enable('trust proxy'); // needed to determine real client IP
app.use(compress()); // use gzip

// http request logging middleware
const format = process.env.NODE_ENV === 'production'
	? 'combined' // Standard Apache combined log output.
	: 'dev'; // Concise output colored by response status for development use.

const winstonLogger = require('./winstonLogger');

app.use(morgan(format, { stream: winstonLogger.stream }));

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

// do not cache views for development builds
app.set('view cache', process.env.NODE_ENV !== 'development');

// routes w/ cors
app.options('*', cors());

app.post('/auth', api.handleAuth);
app.get('/dummy-list', api.handleDummyList);

// start listening for requests
app.listen(port, (err) => {
	if (err) {
		logger.error(err);
	} else {
		logger.info(`⚙️  API Listening on port ${port}.`);
	}
});
