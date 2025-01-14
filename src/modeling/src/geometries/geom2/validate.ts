import { Error, Number } from "@rbxts/luau-polyfill";

import vec2 from "../../maths/vec2";
import isA from "./isA";
import toOutlines from "./toOutlines";

/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */

const vec2ToString = (v: Vec2) => {
	return `${v[0]},${v[1]}`;
};

const mat4ToString = (m: Mat4) => {
	return `${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]},${m[6]},${m[7]},${m[8]},${m[9]},${m[10]},${m[11]},${m[12]},${m[13]},${m[14]},${m[15]}`;
};

const validate = (object: Geom2) => {
	if (!isA(object)) {
		throw new Error("invalid geom2 structure");
	}

	// check for closedness
	toOutlines(object);

	// check for self-edges
	object.sides.forEach((side) => {
		if (vec2.equals(side[0], side[1])) {
			throw new Error("geom2 self-edge %s".format(vec2ToString(side[1])));
		}
	});

	// check transforms
	if (!object.transforms.every(Number.isFinite)) {
		throw new Error("geom2 invalid transforms %s".format(mat4ToString(object.transforms)));
	}
};

export default validate;
