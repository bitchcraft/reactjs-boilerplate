import Actions from 'constants/actions';
import Immutable from 'immutable';

/**
 * dummyList reducer
 * @public
 * @memberof module:app/reducers
 * @param  {ImmutableMap} state -
 * ```js
 * {
 *     items: ImmutableList<ImmutableMap<string, *>>,
 *     loading: boolean,
 * }
 * ```
 * @param  {FluxStandardAction} action
 * @return {ImmutableMap} state
 * @requires constants/actions
 * @requires npm:immutable
 */

const dummyList = (state, action) => {
	if (!Immutable.Map.isMap(state)) {
		state = Immutable.fromJS({
			items: Immutable.fromJS([]),
			loading: false,
		});
	}

	const { type, payload } = action;

	switch (type) {
		case Actions.DUMMYLIST_SUCCESS:
			return state
				.set('items', Immutable.fromJS(payload))
				.set('loading', false);

		case Actions.DUMMYLIST_LOADING:
			return state
				.set('loading', true);

		default:
	}

	return state;
};

export default dummyList;
