import type { Vec3 } from "../../maths/types";
import type { Poly3 } from "./type";
import * as plane from "../../maths/plane/index";
import * as vec3 from "../../maths/vec3/index";

/**
 * Check whether the given polygon is convex.
 * @param {Poly3} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly3.isConvex
 */
export const isConvex = (polygon: Poly3) => areVerticesConvex(polygon.vertices);

const areVerticesConvex = (vertices: Vec3[]) => {
	const numVertices = vertices.size();
	if (numVertices > 2) {
		// note: plane ~= normal vertex
		const normal = plane.fromPoints(plane.create(), ...vertices);
		let prevPrevPos = vertices[numVertices - 2];
		let prevPos = vertices[numVertices - 1];
		for (let i = 0; i < numVertices; i++) {
			const pos = vertices[i];
			if (!isConvexVertex(prevPrevPos, prevPos, pos, normal)) {
				return false;
			}
			prevPrevPos = prevPos;
			prevPos = pos;
		}
	}
	return true;
};

// calculate whether three vertices form a convex corner
//  prevVertex, vertex, nextVertex: the 3 coordinates (Vector3D instances)
//  normal: the normal vector of the plane
const isConvexVertex = (prevVertex: Vec3, vertex: Vec3, nextVertex: Vec3, normal: Vec3) => {
	const crossProduct = vec3.cross(
		vec3.create(),
		vec3.subtract(vec3.create(), vertex, prevVertex),
		vec3.subtract(vec3.create(), nextVertex, vertex),
	);
	const crossDotNormal = vec3.dot(crossProduct, normal);
	return crossDotNormal >= 0;
};
