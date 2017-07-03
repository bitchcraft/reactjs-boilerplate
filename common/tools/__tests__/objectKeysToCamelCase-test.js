import expect from 'jest-matchers';
import camelCase from 'lodash.camelcase';
import convertKeysToCamelCase from '../objectKeysToCamelCase';

const TestCases = {
	string: { input: '---foo---bar---', output: 'fooBar' },
	obj: {
		input: { 'foo-bar': true, nested: { twilight_sparkles: true, deep_nested: { ami: true } } },
		output: { fooBar: true, nested: { twilightSparkles: true, deepNested: { ami: true } } } },
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
				expect(camelCase(TestCases[key].input)).toEqual(TestCases[key].output);
			} else {
				expect(convertKeysToCamelCase(TestCases[key].input)).toEqual(TestCases[key].output);
			}
		});
	});
});
