// @flow

import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';

import type { Element } from 'react';

import { blue, grey } from '@material-ui/core/colors';


const muiTheme = createMuiTheme({
	palette: createPalette({
		primary: {
			main: blue[300],
			text: grey[600],
		},
	}),
});

type Props = {
	children: Element<*>,
};

const MuiTheme = ({ children }: Props) => (
	<MuiThemeProvider theme={muiTheme}>
		{children}
	</MuiThemeProvider>
);

export default MuiTheme;
