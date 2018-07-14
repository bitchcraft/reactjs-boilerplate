#!/usr/bin/env node

/**
 * This tools creates new projects based on this boilerplate.
 * Necessary files are copied to the path given as first parameter,
 * a git repository is initiated
 * and a wizard guides the user trough setting basic project variables
 */

const path = require('path');
const argv = process.argv.slice(2);
const cwd = process.cwd();

(function cmd() {
	console.log(cwd);
})();
