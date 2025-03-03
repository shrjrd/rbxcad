import type { Poly2 } from "./type";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { create } from "./create";

/**
 * Reverse the direction of points in the given polygon, rotating the opposite direction.
 *
 * @param {Poly2} polygon - the polygon to reverse
 * @returns {Poly2} a new polygon
 * @alias module:modeling/geometries/poly2.reverse
 */
export const reverse = (polygon: Poly2): Poly2 => {
	const points = JsArray.reverse(JsArray.slice(polygon.points)); //polygon.points.slice().reverse();
	return create(points);
};
