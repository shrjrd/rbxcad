import type { Vec3 } from "../../maths/types";
import type { Slice } from "./type";

/**
 * Produces an array of edges from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {Slice} slice - the slice
 * @returns {Array} an array of edges, each edge contains an array of two vertices (3D)
 * @alias module:modeling/geometries/slice.toEdges
 *
 * @example
 * let sharedEdges = toEdges(slice)
 */
export const toEdges = (slice: Slice) => {
	const edges: Vec3[][] = [];
	slice.contours.forEach((contour) => {
		contour.forEach((vertex, i) => {
			const _next = contour[(i + 1) % contour.size()];
			edges.push([vertex, _next]);
		});
	});
	return edges;
};
