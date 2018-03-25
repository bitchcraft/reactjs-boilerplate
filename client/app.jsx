import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';

import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import Store from 'containers/store';


const muiTheme = createMuiTheme({
	palette: createPalette({
		primary: {
			main: blue[300],
			text: grey[600],
		},
	}),
});

const App = () => (
	<MuiThemeProvider theme={muiTheme}>
		<Store />
	</MuiThemeProvider>
);

render(<App />, document.getElementById('app-container'));
