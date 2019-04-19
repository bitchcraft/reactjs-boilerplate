import '@babel/polyfill';
import 'isomorphic-fetch';
import 'pepjs-improved';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import app from './app';

// Needed for React Developer Tools
if (process.env.NODE_ENV === 'development') global.React = React;

hot(app());
