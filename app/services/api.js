// @flow
/**
 * ```js
 * import ApiService from 'services/api';
 * ```
 * @public
 * @module app/services/api
 * @requires tools/objectKeysToCamelCase
 * @requires tools/objectKeysToSnakeCase
 * @requires npm:@bitchcraft/unicorn-logger
 */

import camelCaseKeys from 'tools/objectKeysToCamelCase';
import snakeCaseKeys from 'tools/objectKeysToSnakeCase';
import UnicornLogger from '@bitchcraft/unicorn-logger';

import type jwt from 'jsonwebtoken';
import type { AuthRequest, AuthResponse, DummyListResponse } from 'server/api';

/* eslint-disable no-unused-vars */
const { debug, error } = new UnicornLogger('ApiService');
/* eslint-enable no-unused-vars */

const API_ENDPOINT = ((): string => {
	if (process.env.NODE_ENV === 'development') return process.env.API_ENDPOINT || '';
	return window.API_ENDPOINT || '';
})();


/**
 * ```js
 * import { sendAuth } from 'services/api';
 * ```
 *
 * GET /auth
 *
 * @memberof module:app/services/api
 * @param  {Object} payload - description
 * @return {Promise}
 */
export function sendAuth(payload: AuthRequest): Promise<AuthResponse> {
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
				const err = new Error(`Response status ${response.status}`);
				error('sendAuth', err);
				return Promise.reject(err);
			}

			return response.json();
		},
		(err) => {
			error('sendAuth', err);
			return Promise.reject(err);
		})
		.then(json => camelCaseKeys(json));
}

/**
 * ```js
 * import { getDummyList } from 'services/api';
 * ```
 *
 * GET /dummy-list
 *
* @memberof module:app/services/api
 * @param  {jwt} token - JWT token
 * @return {Promise}
 */
export function getDummyList(token: jwt): Promise<DummyListResponse> {
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
				const err = new Error(`Response status ${response.status}`);
				error('getDummyList', err);
				return Promise.reject(err);
			}

			const contentType = response.headers.get('content-type');

			if (!contentType || contentType.indexOf('application/json') === -1) {
				const err = new Error('Response is not json');
				error('getDummyList', err);
				return Promise.reject(err);
			}

			return response.json();
		},
		(err) => {
			error('getDummyList', { err });
			return Promise.reject(err);
		})
		.then((payload) => {
			debug('getDummyList', { json: payload });
			return camelCaseKeys(payload);
		});
}

export default {
	getDummyList,
	sendAuth,
};
