import React from 'react';
import {
	BrowserRouter as Router,
	// Route,
	// Switch,
} from 'react-router-dom';
import Logger from 'tools/log';

/* eslint-disable no-unused-vars */
const { debug, error } = new Logger('Router');
/* eslint-enable no-unused-vars */


import Root from 'containers/root';
import AuthWrapper from 'containers/authWrapper';
import DummyList from 'containers/dummyList';


const Routes = () => (
	<Router>
		<Root>
			<AuthWrapper>
				<DummyList />
			</AuthWrapper>
		</Root>
	</Router>
);

export default Routes;
