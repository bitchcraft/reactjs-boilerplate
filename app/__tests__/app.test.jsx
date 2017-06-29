import React from 'react';

import App from 'app';

import renderer from 'react-test-renderer';

import expect from 'jest-matchers';

describe('App', () => {
	it('should be able to run tests', () => {
		expect(1 + 2).toEqual(3);
	});

	it('renders <App/> correctly', () => {
		const tree = renderer.create(
			<App/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
