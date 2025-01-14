import { Array } from "@rbxts/luau-polyfill";

import create from "./create";
import toSides from "./toSides";

/**
 * Reverses the given geometry so that the sides are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {geom2} geometry - the geometry to reverse
 * @returns {geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newgeometry = reverse(geometry)
 */
const reverse = (geometry: Geom2): Geom2 => {
	const oldsides = toSides(geometry);

	const newsides: [Vec2, Vec2][] = oldsides.map((side) => [side[1], side[0]]);
	Array.reverse(newsides); //newsides.reverse(); // is this required?
	return create(newsides);
};

export default reverse;
