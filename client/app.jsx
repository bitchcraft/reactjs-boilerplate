import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import MuiTheme from 'containers/MuiTheme';

import Store from 'containers/store';
import Router from 'containers/router';

import { setConfig } from 'react-hot-loader';

setConfig({
	reloadHooks: false,
});

const App = hot(() => (
	<MuiTheme>
		<Store>
			<Router />
		</Store>
	</MuiTheme>
));

export default () => render(<App />, document.getElementById('app-container'));
