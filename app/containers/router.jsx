import React from 'react';
import {
	BrowserRouter as Router,
	// Route,
	// Switch,
} from 'react-router-dom';


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
