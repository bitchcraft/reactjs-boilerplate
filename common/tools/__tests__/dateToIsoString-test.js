import expect from 'jest-matchers';
import dateToIsoString from '../dateToIsoString';

describe('dateToIsoString', () => {
	it('can convert random Date to ISO String', () => {
		expect(dateToIsoString(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))).toMatch(/T/);
	});
});
