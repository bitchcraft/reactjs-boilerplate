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
const readline = require('readline');
const cloneDeep = require('lodash.clonedeep');
const fs = require('fs');

const packageInfo = require('../package.json');

const argv = process.argv.slice(2);
const cwd = process.cwd();
const requiredBinaries = [ 'git' ];
const messages = {
	errArguments: 'ERROR: Missing arguments',
	errExit: 'Fatal error, exiting...',
	errCopy: 'Failed to copy files',
	errGitInit: 'ERROR: Failed to initialize git repository',
	errUsage: 'USAGE: reactjs-boilerplate target',
	errGitCommit: 'Failed to commit files',
	errConfig: 'Failed to create package.json',
	gitCommit: `chore(Project): Init project from ${packageInfo.homepage}`,
	wizardWelcome: `This utility will help you to jumpstart your project.
A boilerplate is copied to the target location and you will be guided through the basic project configuration`,
	wizardCopy: 'Copying files...',
	wizardConfig: 'Performing configuration',
};

function bail() {
	shell.echo(messages.errExit);
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

async function createProjectConfig(target) {
	return new Promise((resolve, reject) => {
		const input = readline.createInterface(process.stdin, process.stdout);
		const cfg = cloneDeep(packageInfo);

		delete cfg.contributors;
		delete cfg.repository;
		delete cfg.homepage;

		const prompts = [
			{ key: 'name', prompt: 'package name', value: '' },
			{ key: 'version', prompt: 'version', value: '1.0.0' },
			{ key: 'description', prompt: 'description', value: '' },
			{ key: 'keywords', prompt: 'keywords', value: '' },
			{ key: 'license', prompt: 'license', value: 'ISC' },
			{ key: 'author', prompt: 'author', value: '' },
		];

		const writeConfig = () => {
			input.close();
			try {
				fs.writeFileSync(`${target}${path.sep}package.json`, JSON.stringify(cfg, null, '\t'));
				resolve(0);
			} catch (err) {
				resolve(1);
			}
		};

		const showPrompt = (index) => {
			if (index >= prompts.length) {
				writeConfig();
				return;
			}
			const prompt = prompts[index];
			input.setPrompt(`${prompt.prompt}: `);
			input.once('line', (line) => {
				cfg[prompt.key] = line || prompt.value;
				// input.close();
				showPrompt(index + 1);
			});
			input.prompt();
		};
		showPrompt(0);

	});
}

function runInitialCommit(target) {
	shell.pushd(target);
	let result = shell.exec('git add -A', { silent: true }).code;
	result += shell.exec(`git commit -m '${messages.gitCommit}'`, { silent: true }).code;
	shell.popd();

	return result;
}

(async() => {
	shell.config.silent = true;
	const target = makeAbsolutePath(argv[0]);

	shell.echo(messages.wizardWelcome);

	/* check if required arguments are present and valid */
	if (!checkRequiredArguments()) {
		shell.echo(messages.errArguments);
		shell.echo(messages.errUsage);
		bail();
	}

	/* check if necessary binaries are present */
	if (!checkRequiredBinaries()) bail();

	/* copy boilerplate creating the target folder in the process */
	shell.echo(messages.wizardCopy);
	if (copyBoilerplate(target) !== 0) {
		shell.echo(messages.errCopy);
		bail();
	}

	/* init git repository in project folder */
	if (initializeGitRepo(target) !== 0) {
		shell.echo(messages.errGitInit);
		bail();
	}

	/* project config */
	shell.echo(messages.wizardConfig);
	const res = await createProjectConfig(target);
	if (res !== 0) {
		shell.echo(messages.errConfig);
		bail();
	}

	/* perform initial git commmit */
	if (runInitialCommit(target) !== 0) {
		shell.echo(messages.errGitCommit);
		bail();
	}
})();
