// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import getDummyList from 'actions/getDummyList';
import { DummyList } from 'components/dummyList';
import { SK5 } from 'components/spinkit';

import type { List as ImmutableList } from 'immutable';

const REFRESH_INTERVAL = 5000;

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

				<DummyList items={items} />

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
