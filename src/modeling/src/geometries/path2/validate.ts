import type { Path2 } from "../types";
import { Number } from "@rbxts/luau-polyfill";

import * as vec2 from "../../maths/vec2/index";
import { isA } from "./isA";

/**
 * Determine if the given object is a valid path2.
 * Checks for valid data points, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/path2.validate
 */
export const validate = (object: Path2) => {
	if (!isA(object)) {
		throw "invalid path2 structure";
	}

	// check for duplicate points
	if (object.points.size() > 1) {
		for (let i = 0; i < object.points.size(); i++) {
			if (vec2.equals(object.points[i], object.points[(i + 1) % object.points.size()])) {
				throw `path2 has duplicate point ${object.points[i]}`;
			}
		}
	}

	// check for infinity, nan
	object.points.forEach((point) => {
		if (!point.every(Number.isFinite)) {
			throw `path2 invalid point ${point}`;
		}
	});

	// check transforms
	if (!object.transforms.every(Number.isFinite)) {
		throw `path2 invalid transforms ${object.transforms}`;
	}
};
