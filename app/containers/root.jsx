import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import inject from 'tools/injectStyles';
import stylesheet from './root.scsshbs';

const RootContainer = ({ children }) => (
	<span>
		<AppBar/>
		{children}
	</span>
);

RootContainer.propTypes = {
	children: PropTypes.node,
};

const styles = t => ({
	background: {
		color: '#F0F0F0',
	},
});

export default inject(stylesheet, styles, { theme: {} })(RootContainer);
