import React from 'react';
import inject from 'tools/injectStyles';
import stylesheet from './5.scsshbs';
import { compose, onlyUpdateForKeys } from 'recompose';


const SKFive = () => <div className='spinkit5-spinner'/>;


const style = () => ({
	Color: '#333',
});

const enhance = compose(
	onlyUpdateForKeys([ '' ]),
	inject(stylesheet, style),
);

export default enhance(SKFive);
