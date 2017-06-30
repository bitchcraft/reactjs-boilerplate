import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Router from 'containers/router';
import reducers from '../reducers';
import { routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

/* eslint-disable no-unused-vars */
const { debug, error } = require('tools/log')('Store');
/* eslint-enable no-unused-vars */

const logger = createLogger({
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
		routing: routerReducer,
	}),
	applyMiddleware(thunkMiddleware, logger)
);


const Store = () => (
	<Provider store={store}>
		<Router store={store}/>
	</Provider>
);


export default Store;
