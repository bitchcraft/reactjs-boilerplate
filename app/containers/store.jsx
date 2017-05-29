import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Router from 'containers/router';
import reducers from '../reducers';

/* eslint-disable no-unused-vars */
const { debug, error } = require('tools/log')('Store');
/* eslint-enable no-unused-vars */


const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware)
);


const Store = () => (
	<Provider store={store}>
		<Router/>
	</Provider>
);


export default Store;
