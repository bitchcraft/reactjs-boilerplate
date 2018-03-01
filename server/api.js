import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import Logger from '@bitchcraft/unicorn-logger';

/* eslint-disable no-unused-vars */
const { debug, error } = new Logger('server:api');
/* eslint-enable no-unused-vars */

const PRIVATE_KEY = '.secretzR4lulz';
const TOKEN_EXPIRY_IN_SECONDS = 60;

/**
 * @public
 * @module server/api
 */

/**
 *
 * handleAuth API Server Call
 *
 * @param  {JSONObject} request
 * @return {JSONObject} response
 */

const handleAuth = (req, res) => {
	const reqBody = req.body || {};
	const user = {
		admin: false,
		id: reqBody.id || uuid(),
	};

	if (reqBody.login) user.login = reqBody.login;

	const token = jwt.sign({
		sub: user.id,
	}, PRIVATE_KEY, {
		expiresIn: TOKEN_EXPIRY_IN_SECONDS,
	});

	const body = {
		user,
		referrer: req.get('referrer'),
		ip: req.ip,
		ips: req.ips,
		token,
	};

	setTimeout(() => {
		return res.status(200).jsonp(body);
	}, process.env.NODE_ENV === 'production' ? 0 : Math.random() * 2000);
};

/**
 *
 * handleDummyList API Server Call
 *
 * @param  {string} token
 * @return {JSONObject} response
 */

const handleDummyList = (req, res) => {
	const token = req.get('X-Token');
	let valid = false;

	debug('handleDummyList', { token });

	if (token) {
		try {
			valid = jwt.verify(token, PRIVATE_KEY);
		} catch (e) {
			error('handleDummyList', e);
		}
	}

	if (!valid) {
		return res.status(403).send('Not authorized');
	}

	/* eslint-disable prefer-spread */
	const responseBody = Array.apply(null, { length: Math.random() * 100 }).map(v => uuid());
	/* eslint-enable prefer-spread */

	return res.status(200).jsonp(responseBody);
};

export default {
	handleAuth,
	handleDummyList,
};
