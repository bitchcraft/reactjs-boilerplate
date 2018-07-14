// @flow

/**
 * FluxStandardAction as specified by [redux-utilities/flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
 * @public
 * @const FluxStandardAction
 */
export type FluxStandardAction<TPayload = void, TMeta = void> = {|
	type: string,
	payload?: TPayload | Error,
	error?: boolean,
	meta?: TMeta,
|};
