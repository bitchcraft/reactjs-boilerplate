import React from 'react';
import { render } from 'react-dom';
import MuiTheme from 'containers/MuiTheme';

import Store from 'containers/store';

const App = () => (
	<MuiTheme>
		<Store />
	</MuiTheme>
);

export default () => render(<App />, document.getElementById('app-container'));
