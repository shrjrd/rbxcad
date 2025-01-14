import { Array, Error } from "@rbxts/luau-polyfill";

import path2 from "../geometries/path2";

/**
 * Construct a new line in two dimensional space from the given points.
 * The points must be provided as an array, where each element is a 2D point.
 * @param {Array} points - array of points from which to create the path
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.line
 *
 * @example
 * let myshape = line([[10, 10], [-10, 10]])
 */
const line = (points: Vec2[]) => {
	if (!Array.isArray(points)) throw new Error("points must be an array");

	return path2.fromPoints({}, points);
};

export default line;
