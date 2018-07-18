#!/usr/bin/env node

/**
 * This tools creates new projects based on this boilerplate.
 * Necessary files are copied to the path given as first parameter,
 * a git repository is initiated
 * and a wizard guides the user trough setting basic project variables
 */

const path = require('path');
const mkdirp = require('mkdirp');
const shell = require('shelljs');

const argv = process.argv.slice(2);
const cwd = process.cwd();
const requiredBinaries = [ 'git' ];
const errorMessages = {
	arguments: 'ERROR: Missing arguments',
	exit: 'Fatal error, exiting...',
	gitInit: 'ERROR: Failed to initialize git repository',
	usage: 'USAGE: reactjs-boilerplate target',
};

function bail() {
	shell.echo(errorMessages.exit);
	process.exit(1);
}

function checkRequiredArguments() {
	let argumentsPresent = true;

	if (typeof argv[0] !== 'string' || argv[0].length === 0) {
		argumentsPresent = false;
	}

	return argumentsPresent;
}

function listMissingBinaries(binaries) {
	const missingBinaries = binaries.filter(function(binary) {
		return shell.which(binary) === null;
	});

	return missingBinaries;
}

function checkRequiredBinaries() {
	const missingBinaries = listMissingBinaries(requiredBinaries);
	if (missingBinaries.length) {
		shell.echo(`ERROR: Required binaries missing. Please install ${
			missingBinaries.slice(1).reduce(
				function(acc, bin) { return `${acc}, ${bin}`; },
				`${missingBinaries[0]}`)
		}`);
		return false;
	}
	return true;
}

function createProjectDirectory(targetPath) {
	if (!path.isAbsolute(targetPath)) {
		targetPath = path.join(cwd, targetPath);
	}
	mkdirp.sync(targetPath);
}

function initializeGitRepo(target) {
	shell.pushd(target);
	const result = shell.exec('git init -q', { silent: true });
	shell.popd();

	return result.code;
}

(function cmd() {
	const target = argv[0];

	/** check if required arguments are present and valid */
	if (!checkRequiredArguments()) {
		shell.echo(errorMessages.arguments);
		shell.echo(errorMessages.usage);
		bail();
	}
	/** check if necessary binaries are present */
	if (!checkRequiredBinaries()) bail();
	/** create new project folder */
	createProjectDirectory(target);
	/** init git repository in project folder */
	if (initializeGitRepo(target) !== 0) {
		shell.echo(errorMessages.gitInit);
		bail();
	}
}());
