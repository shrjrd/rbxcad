import { Error, Number } from "@rbxts/luau-polyfill";

import { NEPS } from "../../maths/constants";
import signedDistanceToPoint from "../../maths/plane/signedDistanceToPoint";
import vec3 from "../../maths/vec3";
import isA from "./isA";
import isConvex from "./isConvex";
import measureArea from "./measureArea";
import plane from "./plane";

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */

const vec3ToString = (v: Vec3) => {
	return `${v[0]},${v[1]},${v[2]}`;
};

const mat4ToString = (m: Mat4) => {
	return `${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]},${m[6]},${m[7]},${m[8]},${m[9]},${m[10]},${m[11]},${m[12]},${m[13]},${m[14]},${m[15]}`;
};

const validate = (object: Poly3) => {
	if (!isA(object)) {
		throw new Error("invalid poly3 structure");
	}

	// check for empty polygon
	if (object.vertices.size() < 3) {
		throw new Error("poly3 not enough vertices %s".format(tostring(object.vertices.size())));
	}
	// check area
	if (measureArea(object) <= 0) {
		throw new Error("poly3 area must be greater than zero");
	}

	// check for duplicate points
	for (let i = 0; i < object.vertices.size(); i++) {
		if (vec3.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.size()])) {
			throw new Error("poly3 duplicate vertex %s".format(vec3ToString(object.vertices[i])));
		}
	}

	// check convexity
	if (!isConvex(object)) {
		throw new Error("poly3 must be convex");
	}

	// check for infinity, nan
	object.vertices.forEach((vertex) => {
		if (!vertex.every(Number.isFinite)) {
			throw new Error("poly3 invalid vertex %s".format(vec3ToString(vertex)));
		}
	});

	// check that points are co-planar
	if (object.vertices.size() > 3) {
		const normal = plane(object);
		object.vertices.forEach((vertex) => {
			const dist = math.abs(signedDistanceToPoint(normal, vertex));
			if (dist > NEPS) {
				throw new Error(
					"poly3 must be coplanar: vertex %s distance %s".format(vec3ToString(vertex), tostring(dist)),
				);
			}
		});
	}
};

export default validate;
