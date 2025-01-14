import { Array, Error } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import mat4 from "../../maths/mat4";
import flatten from "../../utils/flatten";

/**
 * Rotate the given objects using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newsphere = rotate([TAU / 8, 0, 0], sphere())
 */
const rotate = (angles: number[], ...objects: object[]) => {
	if (!Array.isArray(angles)) throw new Error("angles must be an array");

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	// adjust the angles if necessary
	angles = table.clone(angles) as Vec3; //angles.slice(); // don't modify the original
	while (angles.size() < 3) angles.push(0);

	const yaw = angles[2];
	const pitch = angles[1];
	const roll = angles[0];

	const matrix = mat4.fromTaitBryanRotation(mat4.create(), yaw, pitch, roll);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

/**
 * Rotate the given objects about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateX
 */
const rotateX = (angle: number, ...objects: object[]) => rotate([angle, 0, 0], objects);

/**
 * Rotate the given objects about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateY
 */
const rotateY = (angle: number, ...objects: object[]) => rotate([0, angle, 0], objects);

/**
 * Rotate the given objects about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateZ
 */
const rotateZ = (angle: number, ...objects: object[]) => rotate([0, 0, angle], objects);

export default {
	rotate,
	rotateX,
	rotateY,
	rotateZ,
};

export { rotate, rotateX, rotateY, rotateZ };
