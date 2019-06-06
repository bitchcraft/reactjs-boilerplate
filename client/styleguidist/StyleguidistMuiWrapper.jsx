// @flow

import 'pepjs-improved';
import React from 'react';
import type { Element as ReactElement } from 'react';
import MuiTheme from 'containers/MuiTheme';
import RsgWrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';

const RsgMuiWrapper = ({ children, ...rest }: { children: ReactElement<*>, }) => (
	<RsgWrapper {...rest}>
		<MuiTheme>
			{children}
		</MuiTheme>
	</RsgWrapper>
);

export default RsgMuiWrapper;
