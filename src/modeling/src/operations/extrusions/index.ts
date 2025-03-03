/**
 * All 2D shapes (primitives or the results of operations) can be extruded in various ways.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/extrusions
 * @example
 * import { extrudeFromSlices, extrudeHelical, extrudeLinear, extrudeRotate, project } from '@jscad/modeling'
 */
export { extrudeFromSlices, ExtrudeFromSlicesOptions } from "./extrudeFromSlices";
export { extrudeLinear, ExtrudeLinearOptions } from "./extrudeLinear";
export { extrudeRotate, ExtrudeRotateOptions } from "./extrudeRotate";
export { extrudeHelical, ExtrudeHelicalOptions } from "./extrudeHelical";
export { project, ProjectOptions } from "./project";
