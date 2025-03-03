import type { Vec3 } from "../../maths/types";
import type { Slice } from "./type";

/**
 * Produces an array of vertices from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {Slice} slice - the slice
 * @returns {Array} an array of 3D vertices
 * @alias module:modeling/geometries/slice.toVertices
 *
 * @example
 * let sharedVertices = toVertices(slice)
 */
export const toVertices = (slice: Slice) => {
	const vertices: Vec3[] = [];
	slice.contours.forEach((contour) => {
		contour.forEach((vertex) => {
			vertices.push(vertex);
		});
	});
	return vertices;
};
