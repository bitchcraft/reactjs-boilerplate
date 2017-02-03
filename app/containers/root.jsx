import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import inject from 'tools/injectStyles';
import stylesheet from './root.scsshbs';

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

const styles = t => ({
	background: {
		color: '#F0F0F0',
	},
});

export default inject(stylesheet, styles, { theme: {} })(RootContainer);
