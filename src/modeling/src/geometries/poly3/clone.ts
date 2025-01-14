import vec3 from "../../maths/vec3";
import create from "./create";

/**
 * Create a deep clone of the given polygon
 *
 * @param {poly3} [out] - receiving polygon
 * @param {poly3} polygon - polygon to clone
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.clone
 */
const clone = (...params: unknown[]): Poly3 => {
	let out: Poly3;
	let poly3: Poly3;
	if (params.size() === 1) {
		out = create();
		poly3 = params[0] as Poly3;
	} else {
		out = params[0] as Poly3;
		poly3 = params[1] as Poly3;
	}
	// deep clone of vertices
	out.vertices = poly3.vertices.map((vec: Vec3) => vec3.clone(vec));
	return out;
};

export default clone;
