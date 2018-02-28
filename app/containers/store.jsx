import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Router from 'containers/router';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import UnicornLogger from '@bitchcraft/unicorn-logger';

const logger = new UnicornLogger('Store', {
	// work around bug in redux-logger, where styles for styled strings are missing
	cleaner: (args) => {
		if (!args.length || args.length !== 1 || !args[0].includes('%c')) return args;
		return [
			args[0],
			...args[0].match(/%c/g).map((x, i) => (i % 2 ? 'color: black; font-weight: normal;' : 'color: black; font-weight: bold;')),
		];
	},
});

const reduxLogger = createLogger({
	logger,
	stateTransformer: (state) => {
		const newState = {};

		Object.keys(state).forEach((i) => {
			if (Immutable.Iterable.isIterable(state[i])) {
				newState[i] = state[i].toJS();
			} else {
				newState[i] = state[i];
			}
		});

		return newState;
	},
});

const store = createStore(
	combineReducers({
		...reducers,
	}),
	applyMiddleware(thunkMiddleware, reduxLogger)
);


const Store = () => (
	<Provider store={store}>
		<Router />
	</Provider>
);


export default Store;
