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
 * ```js
 * import Logger from 'tools/log';
 * ```
 *
 * Creates a chainable logger with namespaces. Wraps console API with fallbacks.
 *
 * Enabling/disabling log output can be controlled with DEBUG={glob patterns} for NodeJS
 * and a localStorage key value pair debug: glob patterns
 *
 * @public
 * @class
 * @module tools/log
 * @requires debug
 * @example
 *
 * const logger = new Logger('my-namespace');
 *
 * logger.time('my-group-1')
 *     .group('New logging group')
 *     .log('Some log output in your logging group', { logger })
 *     .warn('There is nothing broken here')
 *     .timeNed('my-group-1')
 *     .groupEnd();
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

	/**
	 * @public
	 * @method constructor
	 * @param {string} namespace - Unique namespace for your function to filter for in glob patterns. Usually file path or module:submodule
	 * @param {Object} Options
	 * @param {number} [Options.maxTimers=1000] - maximum number of timers that can be created
	 * @param {function} [Options.cleaner] - clean up function for args
	 * @returns {this}
	 */
	constructor(namespace: string, {
		cleaner = defaultCleaner,
		maxTimers = MAX_TIMERS,
	}: Options = {}) {

		this.cleaner = cleaner;
		this.maxTimers = maxTimers;
		this.timers = new Map();

		/**
		 * Wraps console.log
		 *
		 * @public
		 * @method log
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.log('important object', { important: false });
		 */
		const log = logFactory(namespace);
		log.log = consoleLog;
		this.log = (...args) => (log(...this.cleaner(args)), this);

		/**
		 * Wraps console.assert
		 *
		 * @public
		 * @method assert
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.assert(typeof someCandidate !== 'function', 'someCandidate is now a %s', typeof someCandidate);
		 */
		const assert = logFactory(namespace);
		assert.log = consoleAssert;
		this.assert = (...args) => (assert(...this.cleaner(args)), this);

		/**
		 * Wraps console.info
		 *
		 * @public
		 * @method info
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.info('important object', { important: false });
		 */
		const info = logFactory(namespace);
		info.log = consoleInfo;
		this.info = (...args) => (info(...this.cleaner(args)), this);

		/**
		 * Wraps console.warn
		 *
		 * @public
		 * @method warn
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.warn('important object', { important: false });
		 */
		const warn = logFactory(namespace);
		warn.log = consoleWarn;
		this.warn = (...args) => (warn(...this.cleaner(args)), this);

		/**
		 * Wraps console.error
		 *
		 * @public
		 * @method error
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.error(new Error('this is not an error'));
		 */
		const error = logFactory(namespace);
		error.log = consoleError;
		this.error = (...args) => (error(...this.cleaner(args)), this);

		/**
		 * Wraps console.trace
		 *
		 * @public
		 * @method trace
		 * @param  {...args} args
		 * @return {this}
		 * @example logger.trace(someCall());
		 */
		const trace = logFactory(namespace);
		trace.log = consoleTrace;
		this.trace = (...args) => (trace(...this.cleaner(args)), this);

		/**
		 * Wraps console.table
		 *
		 * @public
		 * @method table
		 * @param  {data} data         - The data to display. This must be either an array or an object.
		 * @param  {columns} [columns] - An array containing the names of columns to include in the output.
		 * @return {this}
		 * @example logger.table('important object', { important: false });
		 */
		const table = logFactory(namespace);
		table.log = consoleTable;
		this.table = (...args) => (table(...this.cleaner(args)), this);

		/**
		 * Wraps console.group
		 *
		 * @public
		 * @method group
		 * @param  {...args} [label] - label for the group
		 * @return {this}
		 * @example logger.group('%cAwesome group', 'color: #ff0000; font-weight: bold;');
		 */
		const group = logFactory(namespace);
		group.log = consoleGroup;
		this.group = (...args) => (group(...this.cleaner(args)), this);

		/**
		 * Wraps console.groupCollapsed
		 *
		 * @public
		 * @method groupCollapsed
		 * @param  {...args} [label] - label for the group
		 * @return {this}
		 * @example logger.groupCollapsed('%cAwesome group', 'color: #ff0000; font-weight: bold;');
		 */
		const groupCollapsed = logFactory(namespace);
		groupCollapsed.log = consoleGroupCollapsed;
		this.groupCollapsed = (...args) => (groupCollapsed(...this.cleaner(args)), this);

		/**
		 * Wraps console.clear
		 *
		 * @public
		 * @method clear
		 * @return {this}
		 * @example logger.clear();
		 */
		const clear = logFactory(namespace);
		clear.log = () => consoleClear();
		this.clear = () => (clear(), this);

		/**
		 * Wraps groupEnd
		 *
		 * @public
		 * @method groupEnd
		 * @return {this}
		 * @example logger.groupEnd();
		 */
		const groupEnd = logFactory(namespace);
		groupEnd.log = () => consoleGroupEnd();
		this.groupEnd = () => (groupEnd(), this);

		/**
		 * Implements console.time functionality
		 *
		 * @public
		 * @method time
		 * @param  {label} [label] - The name to give the new timer. This will identify the timer; use the same name when calling logger.timeEnd() to stop the timer and get the time output to the console.
		 * @return {this}
		 * @example logger.time('timer-one');
		 */
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

		/**
		 * Implements console.timeEnd functionality
		 *
		 * @public
		 * @method timeEnd
		 * @param  {label} [label] - The name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the console.
		 * @return {this}
		 * @example logger.timeEnd('timer-one');
		 */
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
