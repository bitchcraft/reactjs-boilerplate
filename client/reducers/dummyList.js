// @flow
import Actions from 'constants/actions';
import { Map, fromJS } from 'immutable';

import type { Map as ImmutableMap } from 'immutable';
import type { DummyListActions } from 'actions/getDummyList';


/**
 * dummyList reducer
 * @public
 * @memberof module:client/reducers
 * @param  {ImmutableMap} state -
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

const dummyList = (state: ImmutableMap<string, *>, action: DummyListActions) => {
	if (!Map.isMap(state)) {
		state = fromJS({
			items: fromJS([]),
			loading: false,
		});
	}

	const { type, payload } = action;

	switch (type) {
		case Actions.DUMMYLIST_SUCCESS:
			return state
				.set('items', fromJS(payload))
				.set('loading', false);

		case Actions.DUMMYLIST_LOADING:
			return state
				.set('loading', true);

		default:
	}

	return state;
};

export default dummyList;
