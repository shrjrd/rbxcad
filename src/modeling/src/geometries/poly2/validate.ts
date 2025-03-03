import type { Vec2 } from "../../maths/types";
import type { Poly2 } from "./type";
import { Number } from "@rbxts/luau-polyfill";

const Vec2ToString = (v: Vec2) => `[${v[0]},${v[1]}]`;

import * as vec2 from "../../maths/vec2/index";
import { isA } from "./isA";
import { measureArea } from "./measureArea";

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly2.validate
 */
export const validate = (object: Poly2) => {
	if (!isA(object)) {
		throw "invalid poly2 structure";
	}

	// check for empty polygon
	if (object.points.size() < 3) {
		throw `poly2 not enough points ${object.points.size()}`;
	}
	// check area
	if (measureArea(object) <= 0) {
		throw "poly2 area must be greater than zero";
	}

	// check for duplicate points
	for (let i = 0; i < object.points.size(); i++) {
		if (vec2.equals(object.points[i], object.points[(i + 1) % object.points.size()])) {
			throw `poly2 duplicate point at ${i}: ${Vec2ToString(object.points[i])}`;
		}
	}

	// check for infinity, nan
	object.points.forEach((point) => {
		if (point.size() !== 2) {
			throw `poly2 invalid point ${Vec2ToString(point)}`;
		}
		if (!point.every(Number.isFinite)) {
			throw `poly2 invalid point ${Vec2ToString(point)}`;
		}
	});
};
