#!/usr/bin/env node

/**
 * This tools creates new projects based on this boilerplate.
 * Necessary files are copied to the path given as first parameter,
 * a git repository is initiated
 * and a wizard guides the user trough setting basic project variables
 */

const path = require('path');
const shell = require('shelljs');
const globby = require('globby');

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

function makeAbsolutePath(targetPath) {
	if (!path.isAbsolute(targetPath)) {
		targetPath = path.join(cwd, targetPath);
	}
	return targetPath;
}

function initializeGitRepo(target) {
	shell.pushd(target);
	const result = shell.exec('git init -q', { silent: true });
	shell.popd();

	return result.code;
}

function copyBoilerplate(target) {
	const sourcePath = path.dirname(__dirname);

	const files = globby.sync(
		[ `${sourcePath}${path.sep}**`, '!**.git' ],
		{
			expandDirectories: true,
			gitignore: true,
			dot: true,
		}
	);

	shell.mkdir('-p', target);

	let code = 0;
	files.forEach((file) => {
		file = file.replace(sourcePath, '');
		if (!file.startsWith(`${path.sep}.git${path.sep}`)) { // workaround for https://github.com/sindresorhus/globby/issues/62
			const targetFile = `${target}${file}`;
			const dir = path.dirname(targetFile);
			if (!shell.test('-e', dir)) shell.mkdir('-p', dir);
			const result = shell.cp(`${sourcePath}${file}`, targetFile);
			code += result.code;
		}
	});

	return code;
}

(function cmd() {
	shell.config.silent = true;
	const target = makeAbsolutePath(argv[0]);

	/* check if required arguments are present and valid */
	if (!checkRequiredArguments()) {
		shell.echo(errorMessages.arguments);
		shell.echo(errorMessages.usage);
		bail();
	}
	/* check if necessary binaries are present */
	if (!checkRequiredBinaries()) bail();
	/* copy boilerplate creating the target folder in the process */
	if (copyBoilerplate(target) !== 0) bail();
	/* init git repository in project folder */
	if (initializeGitRepo(target) !== 0) {
		shell.echo(errorMessages.gitInit);
		bail();
	}
}());
