/**
 * Pads numbers < 10 with a leading 0
 *
 * @private
 * @param  {Number} number - number to pad
 * @return {String}        - padded number
 */
function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

/**
 * ```js
 * import dateToIsoString from 'tools/dateToIsoString';
 * ```
 *
 * Outputs ISOString from Date
 *
 * @todo add time zones
 *
 * @public
 * @function dateToIsoString
 * @param  {Date} date
 * @return {String} ISODateString
 */
function dateToIsoString(d) {
	return d.getUTCFullYear() +
		'-' + pad(d.getUTCMonth() + 1) +
		'-' + pad(d.getUTCDate()) +
		'T' + pad(d.getUTCHours()) +
		':' + pad(d.getUTCMinutes()) +
		':' + pad(d.getUTCSeconds()) +
		'.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
		'Z';
}

export default dateToIsoString;
