import { Array } from "@rbxts/luau-polyfill";

import create from "./create";

/**
 * Flip the give polygon, rotating the opposite direction.
 *
 * @param {poly2} polygon - the polygon to flip
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.flip
 */
const flip = (polygon: Poly2): Poly2 => {
	const vertices = Array.reverse(Array.slice(polygon.vertices)); //polygon.vertices.slice().reverse();
	return create(vertices);
};

export default flip;
