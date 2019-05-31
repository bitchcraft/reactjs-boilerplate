// @flow

import React from 'react';
import * as Icons from '@material-ui/icons';
import * as Colors from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import DummyListItem from 'components/dummyList/DummyListItem';

import type { List as ImmutableList } from 'immutable';

const IconsAsArray = Object.keys(Icons).map(v => Icons[v]);
const ColorsAsArray = Object.keys(Colors).map(v => Colors[v]);


const renderDummyListItem = (v: string) => {
	const pickColor = ColorsAsArray[Math.floor(ColorsAsArray.length * Math.random())];
	const getColor = pickColor[Object.keys(pickColor)[Math.floor(Math.random() * Object.keys(pickColor).length)]];

	const avatarStyle = {
		backgroundColor: getColor,
	};

	const icon = React.createElement(
		IconsAsArray[Math.floor(IconsAsArray.length * Math.random())],
		{ htmlColor: '#fff' }
	);

	return (
		<DummyListItem
			key={v}
			avatarStyle={avatarStyle}
			icon={icon}>

			{v}

		</DummyListItem>
	);
};


const DummyList = ({ items }: {
	/** Immutable List of string values */
	items: ImmutableList<string>,
}) => (

	<List
		style={{
			width: '100%',
		}}>

		{(items.toJS(): Array<*>).map(renderDummyListItem)}

	</List>
);

export default DummyList;
