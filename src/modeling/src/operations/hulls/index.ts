/**
 * All shapes (primitives or the results of operations) can be passed to hull functions
 * to determine the convex hull of all points.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/hulls
 * @example
 * const { hull, hullChain, hullPoints2, hullPoints3 } = require('@jscad/modeling').hulls
 */

import hull from "./hull";
import hullChain from "./hullChain";
import hullPoints2 from "./hullPoints2";
import hullPoints3 from "./hullPoints3";

export default {
	hull,
	hullChain,
	hullPoints2,
	hullPoints3,
};

export { hull, hullChain, hullPoints2, hullPoints3 };
