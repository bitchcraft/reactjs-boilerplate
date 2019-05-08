// @flow

import 'pepjs-improved';
import React from 'react';
import type { Element as ReactElement } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import RsgWrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';

const muiTheme = createMuiTheme({});

const RsgMuiWrapper = ({ children, ...rest }: { children: ReactElement<*>, }) => (
	<RsgWrapper {...rest}>
		<MuiThemeProvider muiTheme={muiTheme}>
			{children}
		</MuiThemeProvider>
	</RsgWrapper>
);

export default RsgMuiWrapper;
