/* eslint-disable no-console */

const logFactory = require('debug');

export default function log(namespace) {
	const debug = logFactory(namespace);

	const error = logFactory(namespace);
	error.log = console.error.bind(console);

	const trace = logFactory(namespace);
	trace.log = console.trace.bind(console);

	return {
		debug,
		error,
		trace,
	};
}
