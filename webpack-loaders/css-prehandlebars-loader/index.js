const pattern = /({*)'({+[a-z0-9.]*?}+)'(}*)/gi;

function isEmptyMatch(m) {
	return m === '' || m === null || m === undefined;
}

module.exports = function(source) {
	return source.replace(pattern, function(match, p1, p2, p3) {
		let returnValue = p2;
		if (!isEmptyMatch(p1)) returnValue = `${p1} ${returnValue}`;
		if (!isEmptyMatch(p3)) returnValue = `${returnValue} ${p3}`;
		return returnValue;
	});
};
