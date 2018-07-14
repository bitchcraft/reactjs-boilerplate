const winston = require('winston');

const winstonLogger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: './api-server/api-server.log',
			handleExceptions: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false,
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true,
		}),
	],
	exitOnError: false,
});

module.exports = winstonLogger;
module.exports.stream = {
	write: function(message, encoding) {
		/* eslint-disable no-control-regex */
		message = message.replace(/\u001b\[.*?m/g, ''); // strips unicode colours before pushing to file.
		/* eslint-enable no-control-regex */

		winstonLogger.info(message);
	},
};
