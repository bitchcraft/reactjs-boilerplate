import camelCaseKeys from 'tools/objectKeysToCamelCase';
import snakeCaseKeys from 'tools/objectKeysToSnakeCase';

/* eslint-disable no-unused-vars */
const { debug, error } = require('tools/log')('ApiService');
/* eslint-enable no-unused-vars */

const API_ENDPOINT = (() => {
	if (process.env.NODE_ENV === 'development') return process.env.API_ENDPOINT;
	return window.API_ENDPOINT;
})();


function sendAuth(payload) {
	const REQUEST_PATH = `${API_ENDPOINT}/auth`;
	const body = JSON.stringify(snakeCaseKeys(payload));

	debug('sendAuth', { REQUEST_PATH, body: snakeCaseKeys(payload) });

	return fetch(REQUEST_PATH, {
		method: 'POST',
		mode: 'cors',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		body,
	})
		.then((response) => {
			if (!response.ok) {
				return error('sendAuth', new Error(`Response status ${response.status}`));
			}

			return response.json();
		},
		(err) => {
			error('sendAuth', err);
			Promise.reject(err);
		})
		.then(json => camelCaseKeys(json));
}


function getDummyList(token) {
	const REQUEST_PATH = `${API_ENDPOINT}/dummy-list`;

	debug('getDummyList', { REQUEST_PATH });

	return fetch(REQUEST_PATH, {
		method: 'GET',
		mode: 'cors',
		headers: {
			Accept: 'application/json',
			'X-Token': token,
			'Access-Control-Request-Headers': 'Accept, X-Token',
		},
	})
		.then((response) => {
			if (!response.ok) {
				return error('getDummyList', new Error(`Response status ${response.status}`));
			}

			const contentType = response.headers.get('content-type');

			if (!contentType || contentType.indexOf('application/json') === -1) {
				return error('getDummyList', new Error('Response is not json'));
			}

			return response.json();
		},
		err => Promise.reject(error('getDummyList', { err })))
		.then((payload) => {
			debug('getDummyList', { json: payload });

			return camelCaseKeys(payload);
		});
}

export default {
	getDummyList,
	sendAuth,
};
