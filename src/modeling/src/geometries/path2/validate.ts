import { Error, Number } from "@rbxts/luau-polyfill";

import vec2 from "../../maths/vec2";
import isA from "./isA";

/**
 * Determine if the given object is a valid path2.
 * Checks for valid data points, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/path2.validate
 */

const vec2ToString = (v: Vec2) => {
	return `${v[0]},${v[1]}`;
};

const mat4ToString = (m: Mat4) => {
	return `${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]},${m[6]},${m[7]},${m[8]},${m[9]},${m[10]},${m[11]},${m[12]},${m[13]},${m[14]},${m[15]}`;
};

const validate = (object: Path2) => {
	if (!isA(object)) {
		throw new Error("invalid path2 structure");
	}

	// check for duplicate points
	if (object.points.size() > 1) {
		for (let i = 0; i < object.points.size(); i++) {
			if (vec2.equals(object.points[i], object.points[(i + 1) % object.points.size()])) {
				throw new Error("path2 duplicate points %s".format(vec2ToString(object.points[i])));
			}
		}
	}

	// check for infinity, nan
	object.points.forEach((point) => {
		if (!point.every(Number.isFinite)) {
			throw new Error("path2 invalid point %s".format(vec2ToString(point)));
		}
	});

	// check transforms
	if (!object.transforms.every(Number.isFinite)) {
		throw new Error("path2 invalid transforms %s".format(mat4ToString(object.transforms)));
	}
};

export default validate;
