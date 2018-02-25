import camelCase from 'lodash.camelcase';
import Logger from 'tools/log';

/* eslint-disable no-unused-vars */
const { debug, error } = new Logger('ConvertKeysToCamelCase');
/* eslint-enable no-unused-vars */


/**
 * Deep converts keys in haystack to camelCase
 * @param  {Any} o haystack
 * @return {Same} camelCased haystack
 */
function convertKeysToCamelCase(o) {
	// return haystack if not iterable
	if (typeof o !== 'object') return o;

	// handle Arrays
	if (Array.isArray(o)) return o.map(v => convertKeysToCamelCase(v));

	// handle iterable objects with keys
	o = Object.assign({}, o);
	Object.keys(o).forEach((k) => {
		o[k] = convertKeysToCamelCase(o[k]);
	});

	const newObject = {};
	Object.keys(o).forEach((v) => {
		newObject[camelCase(v)] = o[v];
	});

	return newObject;
}

export default convertKeysToCamelCase;
