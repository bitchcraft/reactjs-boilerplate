// @flow

/**
 * FluxStandardAction as specified by [redux-utilities/flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
 * @public
 * @const FluxStandardAction
 */
export type FluxStandardAction<TSuccess = void, TMeta = void> = {|
	type: string,
	payload?: TSuccess | Error,
	error?: boolean,
	meta?: TMeta,
|};
