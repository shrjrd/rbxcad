import { Array } from "@rbxts/luau-polyfill";

import clone from "./clone";

/**
 * Reverses the path so that the points are in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {path2} geometry - the path to reverse
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.reverse
 *
 * @example
 * let newpath = reverse(mypath)
 */
const reverse = (geometry: Path2) => {
	// NOTE: this only updates the order of the points
	const cloned = clone(geometry);
	cloned.points = Array.reverse(Array.slice(geometry.points)); //geometry.points.slice().reverse();
	return cloned;
};

export default reverse;
