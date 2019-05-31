// @flow

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import type { Element } from 'react';

const DummyListItem = ({
	avatarStyle,
	children,
	icon,
}: {
	/** styles for mui <Avatar /> */
	avatarStyle: { backgroundColor: string, },
	/** text label or Element */
	children: Element<*> | string,
	/** icon for list item */
	icon: Element<*>,
}) => (

	<ListItem divider>

		<Avatar style={avatarStyle}>

			{icon}

		</Avatar>

		<ListItemText>

			<span
				style={{
					paddingLeft: 16,
				}}>

				{children}

			</span>

		</ListItemText>

	</ListItem>

);

export default DummyListItem;
