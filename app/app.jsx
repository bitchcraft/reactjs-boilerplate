import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue300, grey600 } from 'material-ui/styles/colors';

import Store from 'containers/store';

const options = {
	muiTheme: getMuiTheme({
		palette: {
			primary1Color: blue300,
			textColor: grey600,
		},
	}),
};

const App = () => (
	<MuiThemeProvider {...options}>
		<Store/>
	</MuiThemeProvider>
);

render(<App/>, document.getElementById('app-container'));
