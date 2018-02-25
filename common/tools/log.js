// @flow
/* eslint-disable no-console, no-sequences */
import logFactory from 'debug';

const consoleLog = typeof console.log === 'function' ? console.log.bind(console) : () => {};
const consoleInfo = typeof console.info === 'function' ? console.info.bind(console) : consoleLog;
const consoleWarn = typeof console.warn === 'function' ? console.warn.bind(console) : consoleLog;
const consoleError = typeof console.error === 'function' ? console.error.bind(console) : consoleLog;
const consoleTrace = typeof console.trace === 'function' ? console.trace.bind(console) : consoleLog;
const consoleAssert = typeof console.assert === 'function' ? console.assert.bind(console) : consoleLog;
const consoleGroup = typeof console.group === 'function' ? console.group.bind(console) : consoleLog;
const consoleGroupCollapsed = typeof console.groupCollapsed === 'function' ? console.groupCollapsed.bind(console) : consoleLog;
const consoleGroupEnd = typeof console.groupEnd === 'function' ? console.groupEnd.bind(console) : () => {};
const consoleClear = typeof console.clear === 'function' ? console.clear.bind(console) : () => {};

const MAX_TIMERS = 1000;

const logToTable = function(namespace, color1, color2, color3, ...args) {
	console.group(namespace, color1, color2, color3);
	args.forEach((arg) => {
		if (arg && (!Array.isArray(arg) || typeof arg === 'object')) {
			console.table(arg);
		} else if (arg) console.log(arg);
	});
	console.groupEnd();
};

const consoleTable = (
	typeof console.table === 'function'
	&& typeof console.group === 'function'
	&& typeof console.groupEnd === 'function'
) ? logToTable : consoleLog;

const defaultCleaner = (args: Array<*>) => args;

type Options = {
	cleaner?: Array<*> => Array<*>,
	maxTimers?: number,
};

/**
 * Creates a logger for your file/module
 *
 * Enabling/disabling log output can be controlled with DEBUG={glob patterns} for NodeJS
 * and a localStorage key value pair debug: glob patterns
 *
 * @type {Class}
 * @type
 * @param {string} namespace - Unique namespace for your function to filter for in glob patterns. Usually file path or module:submodule
 * @param {Object} Options
 * @param {number} [Options.maxTimers=1000] - maximum number of timers that can be created
 * @param {function} [Options.cleaner] - clean up function for args
 * @example
 */
class Logger {
	assert: (...args: Array<*>) => Logger
	clear: () => Logger
	group: (...args: Array<*>) => Logger
	groupCollapsed: (...args: Array<*>) => Logger
	groupEnd: () => Logger
	time: (label: string) => Logger
	timeEnd: (label: string) => Logger
	debug: (...args: Array<*>) => Logger
	error: (...args: Array<*>) => Logger
	info: (...args: Array<*>) => Logger
	log: (...args: Array<*>) => Logger
	table: (...args: Array<*>) => Logger
	trace: (...args: Array<*>) => Logger
	warn: (...args: Array<*>) => Logger

	cleaner: Array<*> => Array<*>
	maxTimers: number
	timers: Map<*, number>

	constructor(namespace: string, {
		cleaner = defaultCleaner,
		maxTimers = MAX_TIMERS,
	}: Options = {}) {

		this.cleaner = cleaner;
		this.maxTimers = maxTimers;
		this.timers = new Map();

		const log = logFactory(namespace);
		log.log = consoleLog;
		this.log = (...args) => (log(...this.cleaner(args)), this);

		const assert = logFactory(namespace);
		assert.log = consoleAssert;
		this.assert = (...args) => (assert(...this.cleaner(args)), this);

		const info = logFactory(namespace);
		info.log = consoleInfo;
		this.info = (...args) => (info(...this.cleaner(args)), this);

		const warn = logFactory(namespace);
		warn.log = consoleWarn;
		this.warn = (...args) => (warn(...this.cleaner(args)), this);

		const error = logFactory(namespace);
		error.log = consoleError;
		this.error = (...args) => (error(...this.cleaner(args)), this);

		const trace = logFactory(namespace);
		trace.log = consoleTrace;
		this.trace = (...args) => (trace(...this.cleaner(args)), this);

		const table = logFactory(namespace);
		table.log = consoleTable;
		this.table = (...args) => (table(...this.cleaner(args)), this);

		const group = logFactory(namespace);
		group.log = consoleGroup;
		this.group = (...args) => (group(...this.cleaner(args)), this);

		const groupCollapsed = logFactory(namespace);
		groupCollapsed.log = consoleGroupCollapsed;
		this.groupCollapsed = (...args) => (groupCollapsed(...this.cleaner(args)), this);

		const clear = logFactory(namespace);
		clear.log = () => consoleClear();
		this.clear = () => (clear(), this);

		const groupEnd = logFactory(namespace);
		groupEnd.log = () => consoleGroupEnd();
		this.groupEnd = () => (groupEnd(), this);

		const time = logFactory(namespace);
		time.log = (ns, c1, c2, c3, label: *) => {
			const { maxTimers: MaxTimers, timers } = this;
			if (Array.from(timers.keys()).length >= MaxTimers) {
				this.warn(`Failed call to .time(${label}). You have exceeded the maximum number of timers (${MaxTimers}) for this Logger instance.`);
				return;
			}
			timers.set(label, Date.now());
		};
		this.time = label => (time(label), this);

		const timeEnd = logFactory(namespace);
		timeEnd.log = (ns, c1, c2, c3, label: *) => {
			const { timers } = this;
			if (!timers.has(label)) {
				this.error(`No timer with the label ${label} exists for this Logger instance.`);
				return;
			}
			const timePassed = Date.now() - Number(timers.get(label));
			timers.delete(label);
			this.log(`label: ${timePassed}ms`);
		};
		this.timeEnd = label => (timeEnd(label), this);

		return Object.assign(
			(...args: Array<*>) => this.log(args),
			{ debug: log },
			this
		);
	}
}

export default Logger;
