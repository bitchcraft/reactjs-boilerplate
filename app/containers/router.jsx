import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
// import { Route, Switch } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

/* eslint-disable no-unused-vars */
const { debug, error } = require('tools/log')('Router');
/* eslint-enable no-unused-vars */

let Router;
if (location.protocol === 'file:') {
	Router = require('react-router-dom').HashRouter;
} else {
	Router = require('react-router-dom').BrowserRouter;
}
let history = null;
function getHistory(store) {
	if (!history) {
		history = syncHistoryWithStore(browserHistory, store);
		history.listen(location => debug('location change', { location }));
	}
	return history;
}

import Root from 'containers/root';
import AuthWrapper from 'containers/authWrapper';
import DummyList from 'containers/dummyList';


const Routes = ({ store }) => (
	<Router history={getHistory(store)}>
		<Root>
			<AuthWrapper>
				<DummyList/>
			</AuthWrapper>
		</Root>
	</Router>
);

Routes.propTypes = {
	store: PropTypes.objectOf(PropTypes.any),
};

export default Routes;
