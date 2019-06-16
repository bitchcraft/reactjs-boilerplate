// @flow

import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
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
	<ThemeProvider theme={muiTheme}>
		{children}
	</ThemeProvider>
);

export default MuiTheme;
