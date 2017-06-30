function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

export default function(d) {
	return d.getUTCFullYear() +
		'-' + pad(d.getUTCMonth() + 1) +
		'-' + pad(d.getUTCDate()) +
		'T' + pad(d.getUTCHours()) +
		':' + pad(d.getUTCMinutes()) +
		':' + pad(d.getUTCSeconds()) +
		'.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
		'Z';
}
