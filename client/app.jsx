import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import MuiTheme from 'containers/MuiTheme';

import Store from 'containers/Store';
import Router from 'containers/Router';

const App = hot(() => (
	<MuiTheme>
		<Store>
			<Router />
		</Store>
	</MuiTheme>
));

export default () => render(<App />, document.getElementById('app-container'));
