var pattern = /({*)'({+[A-Za-z0-9.]*?}+)'(}*)/g;

function isEmptyMatch(m) {
	return m === '' || m === null || m === undefined;
}

module.exports = function(source) {
	return source.replace(pattern, function(match, p1, p2, p3) {
		var returnValue = p2;
		if (!isEmptyMatch(p1)) returnValue = `${p1} ${returnValue}`;
		if (!isEmptyMatch(p3)) returnValue = `${returnValue} ${p3}`;
		return returnValue;
	});
};
