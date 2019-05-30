// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import getDummyList from 'actions/getDummyList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import * as Icons from '@material-ui/icons';
import * as Colors from '@material-ui/core/colors';
import { SK5 } from 'components/spinkit';

import type { List as ImmutableList } from 'immutable';

const REFRESH_INTERVAL = 1500000000000000000000000;

const IconsAsArray = Object.keys(Icons).map(v => Icons[v]);
const ColorsAsArray = Object.keys(Colors).map(v => Colors[v]);

type Props = {
	dispatch: * => void,
	items: ImmutableList<*>,
	loading?: boolean,
};


class DummyListView extends PureComponent<Props> {
	componentDidMount() {
		this.fetchDummyList();
		this.apiRequestInterval = setInterval(this.fetchDummyList, REFRESH_INTERVAL);
	}

	componentWillUnmount() {
		clearInterval(this.apiRequestInterval);
	}

	render() {
		const { items, loading } = this.props;

		if (loading && items.size === 0) return <SK5 />;

		return (
			<div
				style={{
					height: '100%',
					flexGrow: 1,
					overflow: 'auto',
				}}>
				<List
					style={{
						width: '100%',
					}}>
					{items.toJS().map((v) => {
						const pickColor = ColorsAsArray[Math.floor(ColorsAsArray.length * Math.random())];
						const getColor = pickColor[Object.keys(pickColor)[Math.floor(Math.random() * Object.keys(pickColor).length)]];

						const avatarStyle = {
							backgroundColor: getColor,
						};

						return (
							<span
								key={v}>
								<ListItem divider>
									<Avatar style={avatarStyle}>
										{React.createElement(
											IconsAsArray[Math.floor(IconsAsArray.length * Math.random())],
											{ htmlColor: '#fff' }
										)}
									</Avatar>
									<ListItemText inset primary={v} />
								</ListItem>
							</span>
						);
					})}
				</List>
			</div>
		);
	}

	apiRequestInterval = undefined

	fetchDummyList = () => {
		const { dispatch } = this.props;
		dispatch(getDummyList());
	}
}

const dummyListState = (state, props) => {
	const items = state.dummyList.get('items');
	const loading = state.dummyList.get('loading');

	return {
		items,
		loading,
	};
};

export default connect(dummyListState)(DummyListView);
