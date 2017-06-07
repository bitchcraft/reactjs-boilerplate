require('babel-polyfill');
require('isomorphic-fetch');

const React = require('react');

// Needed for React Developer Tools
window.React = React;

if (process.env.NODE_ENV === 'development') {
	const perf = require('react-addons-perf');
	window.Perf = perf;
}

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

module.exports = require('./app');
