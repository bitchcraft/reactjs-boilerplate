// @flow
import Actions from '../../common/constants/actions';
import Immutable from 'immutable';

function setAppState(state: object, payload: array): object {
	state = state.asMutable();

	payload.forEach(({ key, value }) => {
		state = state.set(key, value);
	});

	return state;
}

const loading = (state, action) => {
	if (!Immutable.Map.isMap(state)) state = Immutable.Map();

	const { type, payload } = action;

	switch (type) {
		case Actions.SET_APP_STATE:
			return setAppState(state, payload);

		default:
	}

	return state;
};

export default loading;
