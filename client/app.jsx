import React from 'react';
import { hot } from 'react-hot-loader/root';
import { render } from 'react-dom';
import MuiTheme from 'containers/MuiTheme';

import Store from 'containers/store';

const App = hot(() => (
	<MuiTheme>
		<Store />
	</MuiTheme>
));

export default () => render(<App />, document.getElementById('app-container'));
