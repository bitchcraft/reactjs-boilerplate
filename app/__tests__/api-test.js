/* eslint-env jest */

require('isomorphic-fetch');
const assert = require('assert');

const serviceApi = require('../services/api');
const serverApi = require('../../server/api');

const serverResponse = new Response(new Blob(), { });

serverResponse.status = function(responseStatus) {
	assert.equal(responseStatus, 200);
	return this;
};

serverResponse.json = serverResponse.jsonp = serverResponse.send = function(data) {
	serverResponse.body = data;
	return this;
};

describe('API using Promises', () => {
	const headers = new Map();
	headers.set('content-type', 'application/json');

	beforeEach(function() {
		global.fetch = jest.fn().mockImplementation(() => {
			const p = new Promise((resolve, reject) => {
				resolve({
					ok: true,
					id: '123',
					headers: headers,
					json: function() {
						return { id: '123' };
					},
				});
			});
			return p;
		});
	});

	it('sendAuth/handleAuth', async function() {
		const promiseResponse = await serviceApi.sendAuth({ login: '', secret: '' });

		const request = buildMap(promiseResponse);

		jest.useFakeTimers();

		await serverApi.handleAuth(request, serverResponse);

		jest.runAllTimers();
		jest.clearAllTimers();

		expect(promiseResponse).toBeDefined();
		expect(promiseResponse.id).toBe('123');
		expect(serverResponse).toBeDefined();
		expect(serverResponse.body.token).toBeDefined();

		/* eslint-disable no-console */
		console.log('sendAuth/handleAuth token - ' + serverResponse.body.token);
		/* eslint-enable no-console */
	});

	it('getDummyList/handleDummyList', async function() {
		const promiseResponse = await serviceApi.getDummyList(serverResponse.body.token);

		let request = {};
		request['X-Token'] = serverResponse.body.token;
		request = buildMap(request);

		await serverApi.handleDummyList(request, serverResponse);

		expect(promiseResponse).toBeDefined();
		expect(promiseResponse.id).toBe('123');
		expect(serverResponse).toBeDefined();
		expect(serverResponse.body).toBeDefined();

		/* eslint-disable no-console */
		console.log('getDummyList/handleDummyList dummyList - ' + serverResponse.body);
		/* eslint-enable no-console */
	});
});

function buildMap(obj) {
	const map = new Map();

	Object.keys(obj).forEach((key) => {
		map.set(key, obj[key]);
	});

	return map;
}
