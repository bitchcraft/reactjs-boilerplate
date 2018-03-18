import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

// Needed for React Developer Tools
if (process.env.NODE_ENV === 'development') global.React = React;

// needs to be a require, so injectTapEventPlugin works. wtf?!
require('./app');
