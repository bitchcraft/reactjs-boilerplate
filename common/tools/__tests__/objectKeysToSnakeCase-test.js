import expect from 'jest-matchers';
import snakeCase from 'snake-case';
import convertKeysToSnakeCase from '../objectKeysToSnakeCase';

const TestCases = {
	string: { input: '---foo---bar---', output: 'foo_bar' },
	obj: {
		input: { 'foo-bar': true, nested: { twilight_sparkles: true, deep_nested: { ami: true } } },
		output: { foo_bar: true, nested: { twilight_sparkles: true, deep_nested: { ami: true } } },
	},
};

describe('snakeCase', () => {
	it('can run all TestCases', () => {
    /* eslint-disable no-console */
		console.log('We have a total of ' + (Object.keys(TestCases).length) + ' TestCases');

		Object.keys(TestCases).forEach(function(key) {
			console.log('Running test: ' + key);
      /* eslint-enable no-console */

			if (key === 'string') {
				// special case
				expect(snakeCase(TestCases[key].input)).toEqual(TestCases[key].output);
			} else {
				expect(convertKeysToSnakeCase(TestCases[key].input)).toEqual(TestCases[key].output);
			}
		});
	});
});
