import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class RootContainer extends Component {
	static displayName = 'RootContainer'

	static propTypes = {}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return (
			<MuiThemeProvider>
				<AppBar/>
			</MuiThemeProvider>
		);
	}
}

export default RootContainer;
