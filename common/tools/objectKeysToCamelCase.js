import camelCase from 'lodash/camelCase';

/**
 * ```js
 * import objectKeysToCamelCase from 'tools/objectKeysToCamelCase';
 * ```
 * Deep converts keys in haystack to camelCase
 *
 * @public
 * @module tools/objectKeysToCamelCase
 * @param  {Object} object - haystack
 * @requires lodash
 * @return {Object} camelCased haystack
 *
 * @example
 * const camelCased = objectKeysToCamelCase({
 *     'kebab-case-key': 1,        // —> kebabCaseKey: 1
 *     snake_case_key: 'sucks',    // —> snakeCaseKey: 'sucks',
 * });
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
