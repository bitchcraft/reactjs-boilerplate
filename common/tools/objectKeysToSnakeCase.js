import snakeCase from 'snake-case';

/* eslint-disable no-unused-vars */
const { debug, error } = require('tools/log')('ConvertKeysToSnakeCase');
/* eslint-enable no-unused-vars */


/**
 * Deep converts keys in haystack to snake_case
 * @param  {Any} o haystack
 * @return {Same} camelCased haystack
 */
function convertKeysToSnakeCase(o) {
	// return haystack if not iterable
	if (typeof o !== 'object') return o;

	// handle Arrays
	if (Array.isArray(o)) return o.map(v => convertKeysToSnakeCase(v));

	// handle iterable objects with keys
	o = Object.assign({}, o);
	Object.keys(o).forEach((k) => {
		o[k] = convertKeysToSnakeCase(o[k]);
	});

	const newObject = {};
	Object.keys(o).forEach((v) => {
		newObject[snakeCase(v)] = o[v];
	});
	return newObject;
}

export default convertKeysToSnakeCase;
