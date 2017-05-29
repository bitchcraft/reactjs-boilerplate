import React from 'react';
import { Route, Switch } from 'react-router-dom';

let Router;
if (location.protocol === 'file:') {
	Router = require('react-router-dom').HashRouter;
} else {
	Router = require('react-router-dom').BrowserRouter;
}

import Root from 'containers/root';


const Routes = () => (
	<Router>
		<Root>
			<Switch key={location.key}>
				<Route exact path='/'>
					<span/>
				</Route>
			</Switch>
		</Root>
	</Router>
);

export default Routes;
