import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';

import { blue, grey } from '@material-ui/core/colors';

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
