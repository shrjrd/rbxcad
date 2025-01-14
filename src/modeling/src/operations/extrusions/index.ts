import extrudeFromSlices from "./extrudeFromSlices";
import extrudeHelical from "./extrudeHelical";
import extrudeLinear from "./extrudeLinear";
import extrudeRectangular from "./extrudeRectangular";
import extrudeRotate from "./extrudeRotate";
import project from "./project";
import slice from "./slice";

/**
 * All 2D shapes (primitives or the results of operations) can be extruded in various ways.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/extrusions
 * @example
 * const { extrudeLinear, extrudeRectangular, extrudeRotate } = require('@jscad/modeling').extrusions
 */
export default {
	extrudeFromSlices,
	extrudeLinear,
	extrudeRectangular,
	extrudeRotate,
	extrudeHelical,
	project,
	slice,
};

export { extrudeFromSlices, extrudeHelical, extrudeLinear, extrudeRectangular, extrudeRotate, project, slice };
