import type { Poly3 } from "./type";
import * as vec3 from "../../maths/vec3/index";
import { create } from "./create";

/**
 * Create a deep clone of the given polygon
 *
 * @param {Poly3} [out] - receiving polygon
 * @param {Poly3} polygon - polygon to clone
 * @returns {Poly3} a new polygon
 * @alias module:modeling/geometries/poly3.clone
 */
export const clone = (...params: Poly3[]) => {
	let out;
	let poly3;
	if (params.size() === 1) {
		out = create();
		poly3 = params[0];
	} else {
		out = params[0];
		poly3 = params[1];
	}
	// deep clone of vertices
	out.vertices = poly3.vertices.map((vec) => vec3.clone(vec));
	return out;
};
