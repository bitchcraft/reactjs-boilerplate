import snakeCase from 'snake-case';

/**
 * ```js
 * import objectKeysToSnakeCase from 'tools/objectKeysToSnakeCase';
 * ```
 * Deep converts keys in haystack to snake_case
 *
 * @public
 * @function objectKeysToSnakeCase
 * @param  {Object} object - haystack
 * @requires npm:snake-case
 * @return {Object} snakeCased haystack
 *
 * @example
 * const camelCased = objectKeysToSnakeCase({
 *     camelCaseKey: 1,            // —> camel_case_key: 1
 *     'kebab-case-key': 'sucks',  // —> kebab_case_key: 'sucks',
 * });
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
