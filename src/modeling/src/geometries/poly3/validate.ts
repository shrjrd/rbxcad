import type { Poly3 } from "./type";
import type { Vec3 } from "../../maths/types";
import { Number } from "@rbxts/luau-polyfill";

const Vec3ToString = (v: Vec3) => `[${v[0]},${v[1]},${v[2]}]`;

import { NEPS } from "../../maths/constants";
import { signedDistanceToPoint } from "../../maths/plane/index";
import * as vec3 from "../../maths/vec3/index";
import { isA } from "./isA";
import { isConvex } from "./isConvex";
import { measureArea } from "./measureArea";
import { plane } from "./plane";

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate vertices.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */
export const validate = (object: Poly3) => {
	if (!isA(object)) {
		throw "invalid poly3 structure";
	}

	// check for empty polygon
	if (object.vertices.size() < 3) {
		throw `poly3 not enough vertices ${object.vertices.size()}`;
	}
	// check area
	if (measureArea(object) <= 0) {
		throw "poly3 area must be greater than zero";
	}

	// check for duplicate vertices
	for (let i = 0; i < object.vertices.size(); i++) {
		if (vec3.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.size()])) {
			throw `poly3 has duplicate vertex ${Vec3ToString(object.vertices[i])}`;
		}
	}

	// check convexity
	if (!isConvex(object)) {
		throw "poly3 must be convex";
	}

	// check for infinity, nan
	object.vertices.forEach((vertex) => {
		if (!vertex.every(Number.isFinite)) {
			throw `poly3 invalid vertex ${Vec3ToString(vertex)}`;
		}
	});

	// check that vertices are co-planar
	if (object.vertices.size() > 3) {
		const normal = plane(object);
		object.vertices.forEach((vertex) => {
			const dist = math.abs(signedDistanceToPoint(normal, vertex));
			if (dist > NEPS) {
				throw `poly3 must be coplanar: vertex ${Vec3ToString(vertex)} distance ${dist}`;
			}
		});
	}
};
