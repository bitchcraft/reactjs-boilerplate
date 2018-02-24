// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import getDummyList from 'actions/getDummyList';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import * as Icons from 'material-ui/svg-icons';
import * as Colors from 'material-ui/styles/colors';
import { SK5 } from 'components/spinkit';

import type { List as ImmutableList } from 'immutable';

const REFRESH_INTERVAL = 15000;

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
					{items.toJS().map(v => (
						<span
							key={v}>
							<ListItem
								leftAvatar={
									<Avatar
										backgroundColor={ColorsAsArray[Math.floor(ColorsAsArray.length * Math.random())]}>
										{React.createElement(
											IconsAsArray[Math.floor(IconsAsArray.length * Math.random())],
											{ color: '#fff' }
										)}
									</Avatar>
								}
								primaryText={v} />
							<Divider />
						</span>
					))}
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
	const loading = state.dummyList.get('loading', false);

	return {
		items,
		loading,
	};
};

export default connect(dummyListState)(DummyListView);
