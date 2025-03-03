import type { Vec2, Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as vec3 from "../../maths/vec3/index";
import { create } from "./create";

/**
 * Create a slice from the given vertices.
 *
 * @param {Array} vertices - list of vertices, where each vertex is either 2D or 3D
 * @returns {Slice} a new slice
 * @alias module:modeling/geometries/slice.fromVertices
 *
 * @example
 * const vertices = [
 *   [0,  0, 3],
 *   [0, 10, 3],
 *   [0, 10, 6]
 * ]
 * const slice = fromVertices(vertices)
 */
export const fromVertices = (vertices: Vec3[] | Vec2[]) => {
	if (!JsArray.isArray(vertices)) throw "the given vertices must be an array";
	if (vertices.size() < 3) throw "the given vertices must contain THREE or more vertices";

	// Convert from 2D points to 3D vertices if needed
	const cloned = vertices.map((vertex) => {
		if (vertex.size() === 3) {
			return vertex as Vec3;
		} else {
			return vec3.fromVec2(vec3.create(), vertex);
		}
	});
	// create a slice with one contour containing all vertices
	return create([cloned]);
};
