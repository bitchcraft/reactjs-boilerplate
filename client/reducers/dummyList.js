// @flow
import Actions from 'constants/actions';
import { List, Map, fromJS } from 'immutable';

import type { Map as ImmutableMap } from 'immutable';
import type { DummyListActions } from 'actions/getDummyList';

type DummyListState = ImmutableMap<string, *>;


/**
 * dummyList reducer
 * @public
 * @memberof module:client/reducers
 * @param  {DummyListState} state -
 * ```js
 * {
 *     items: ImmutableList<ImmutableMap<string, *>>,
 *     loading: boolean,
 * }
 * ```
 * @param  {DummyListActions} action
 * @return {ImmutableMap} state
 * @requires constants/actions
 * @requires npm:immutable
 */

const dummyList = (state: DummyListState, action: DummyListActions) => {
	if (!Map.isMap(state)) {
		state = Map({
			items: List(),
			loading: false,
		});
	}

	const { type, payload } = action;

	switch (type) {
		case Actions.DUMMYLIST_SUCCESS:
			return (state
				.set('items', fromJS(payload))
				.set('loading', false): DummyListState);

		case Actions.DUMMYLIST_LOADING:
			return (state
				.set('loading', true): DummyListState);

		default:
	}

	return state;
};

export default dummyList;
