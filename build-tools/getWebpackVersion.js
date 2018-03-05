const semverUtils = require('semver-utils');

module.exports = function getWebpackVersion() {
	try {
		return Number(semverUtils.parseRange(require('webpack/package.json').version)[0].major);
	} catch (err) {
		return undefined;
	}
};
