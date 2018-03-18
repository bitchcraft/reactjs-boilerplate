// @flow
/**
 * ```js
 * import ApiService from 'services/api';
 * ```
 * @public
 * @module app/services/api
 * @requires npm:@bitchcraft/ocake
 * @requires npm:@bitchcraft/unicorn-logger
 */
import { convertKeys, StringConverters } from '@bitchcraft/ocake';
import UnicornLogger from '@bitchcraft/unicorn-logger';

import type jwt from 'jsonwebtoken';
import type { AuthRequest, AuthResponse, DummyListResponse } from 'server/api';

const { debug, error } = new UnicornLogger('ApiService');

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
	const body = JSON.stringify(convertKeys(payload, StringConverters.toSnakeCase));

	debug('sendAuth', { REQUEST_PATH, body: JSON.parse(body) });

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
		.then(json => convertKeys(json, StringConverters.toCamelCase));
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
			return convertKeys(payload, StringConverters.toCamelCase);
		});
}

export default {
	getDummyList,
	sendAuth,
};
