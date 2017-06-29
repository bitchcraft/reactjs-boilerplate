import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { greenA700, grey600 } from 'material-ui/styles/colors';

import Store from 'containers/store';

const options = {
	muiTheme: getMuiTheme({
		palette: {
			primary1Color: greenA700,
			textColor: grey600,
		},
	}),
};

const App = () => (
	<MuiThemeProvider {...options}>
		<Store/>
	</MuiThemeProvider>
);

function makeDiv() { // used for Jest, going to see if possible to import Handlebars in it, would make this useless.
	document.body.innerHTML += '<div id="app-container"></div>';

	return document.getElementById('app-container');
}

render(<App/>, document.getElementById('app-container') || makeDiv());

export default App;
