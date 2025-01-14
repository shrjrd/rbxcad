import vec3 from "../../../maths/vec3";
import create from "./create";

/**
 * Create a deep clone of the given slice.
 *
 * @param {slice} [out] - receiving slice
 * @param {slice} slice - slice to clone
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.clone
 */
const clone = (...params: Slice[]) => {
	let out;
	let slice;
	if (params.size() === 1) {
		out = create();
		slice = params[0];
	} else {
		out = params[0];
		slice = params[1];
	}
	// deep clone of edges
	out.edges = slice.edges.map((edge) => [vec3.clone(edge[0]), vec3.clone(edge[1])]);
	return out;
};

export default clone;
