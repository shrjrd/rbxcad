import type { Vec2 } from "../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as path2 from "../geometries/path2/index";

/**
 * Construct a new line in two dimensional space from the given points.
 * The points must be provided as an array, where each element is a 2D point.
 * @param {Array} points - array of points from which to create the path
 * @returns {Path2} new 2D path
 * @alias module:modeling/primitives.line
 *
 * @example
 * let myshape = line([[10, 10], [-10, 10]])
 */
export const line = (points: Vec2[]) => {
	if (!JsArray.isArray(points)) throw "points must be an array";

	return path2.fromPoints({}, points);
};
