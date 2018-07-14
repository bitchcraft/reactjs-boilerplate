// @flow
export type SCSSModule = { [string]: *, } => string;
const emptyCSSModule: SCSSModule = () => '';
export default emptyCSSModule;
