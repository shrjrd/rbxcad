import type { Slice } from "./type";
import type { Vec3 } from "../../maths/types";
import * as plane from "../../maths/plane/index";
import * as vec3 from "../../maths/vec3/index";

/**
 * Calculate the plane of the given slice.
 * NOTE: The slice (and all vertices) are assumed to be planar from the beginning.
 * @param {Slice} slice - the slice
 * @returns {Plane} the plane of the slice
 * @alias module:modeling/geometries/slice.calculatePlane
 *
 * @example
 * let myPlane = calculatePlane(slice)
 */
export const calculatePlane = (slice: Slice) => {
	if (slice.contours.size() < 1) {
		throw "slices must have at least one contour to calculate a plane";
	}

	// find the middle of the slice, which will lie on the plane by definition
	const middle = vec3.create();
	let n = 0; // number of vertices
	slice.contours.forEach((contour) => {
		contour.forEach((vertex) => {
			vec3.add(middle, middle, vertex);
			n++;
		});
	});
	vec3.scale(middle, middle, 1 / n);

	// find the farthest edge from the middle, which will be on an outside edge
	let farthestContour: Vec3[] = [];
	let farthestBefore: Vec3 = undefined!;
	let farthestVertex: Vec3 = undefined!;
	let distance = 0;
	slice.contours.forEach((contour) => {
		let prev = contour[contour.size() - 1];
		contour.forEach((vertex) => {
			// make sure that the farthest edge is not a self-edge
			if (!vec3.equals(prev, vertex)) {
				const d = vec3.squaredDistance(middle, vertex);
				if (d > distance) {
					farthestContour = contour;
					farthestBefore = prev;
					farthestVertex = vertex;
					distance = d;
				}
			}
			prev = vertex;
		});
	});

	// find the after vertex
	let farthestAfter: Vec3 = undefined!;
	let prev = farthestContour[farthestContour.size() - 1];
	for (let i = 0; i < farthestContour.size(); i++) {
		const vertex = farthestContour[i];
		if (!vec3.equals(prev, vertex) && vec3.equals(prev, farthestVertex)) {
			farthestAfter = vertex;
			break;
		}
		prev = vertex;
	}

	return plane.fromPoints(plane.create(), farthestBefore, farthestVertex, farthestAfter);
};
