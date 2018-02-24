// @flow

import React from 'react';
import type { Element as ReactElement } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RsgWrapper from 'react-styleguidist/lib/rsg-components/Wrapper';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({});

const RsgMuiWrapper = ({ children, ...rest }: { children: ReactElement<*>, }) => (
	<RsgWrapper {...rest}>
		<MuiThemeProvider muiTheme={muiTheme}>
			{children}
		</MuiThemeProvider>
	</RsgWrapper>
);

export default RsgMuiWrapper;
