import { Array } from "@rbxts/luau-polyfill";

import vec3 from "../../../maths/vec3";
import create from "./create";

/**
 * Create a slice from the given sides (see geom2).
 *
 * @param {Array} sides - list of sides from geom2
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.fromSides
 *
 * @example
 * const myshape = circle({radius: 10})
 * const slice = fromSides(geom2.toSides(myshape))
 */
const fromSides = (sides: [Vec2, Vec2][]) => {
	if (!Array.isArray(sides)) error("the given sides must be an array");

	// create a list of edges from the sides
	const edges: [Vec3, Vec3][] = [];
	sides.forEach((side) => {
		edges.push([vec3.fromVec2(vec3.create(), side[0]), vec3.fromVec2(vec3.create(), side[1])]);
	});
	return create(edges);
};

export default fromSides;
