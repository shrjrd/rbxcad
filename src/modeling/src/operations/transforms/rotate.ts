import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import * as mat4 from "../../maths/mat4/index";

/**
 * Rotate the given objects using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newSphere = rotate([TAU / 8, 0, 0], sphere())
 */
export const rotate = <T extends Geometry>(angles: number[], ...objects: RecursiveArray<T>): Geometry | Geometry[] => {
	if (!JsArray.isArray(angles)) throw "angles must be an array";

	// adjust the angles if necessary
	angles = JsArray.slice(angles); //angles.slice(); // don't modify the original
	while (angles.size() < 3) angles.push(0);

	const yaw = angles[2] as number;
	const pitch = angles[1] as number;
	const roll = angles[0] as number;

	const matrix = mat4.fromTaitBryanRotation(mat4.create(), yaw, pitch, roll);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		// handle recursive arrays
		if (JsArray.isArray(object)) return rotate(angles, ...object);
		return object;
	});
	return results.size() === 1 ? (results[0] as Geometry) : (results as Geometry[]);
};

/**
 * Rotate the given objects about the X axis, using the given options.
 * @param {number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateX
 */
export const rotateX = <T extends Geometry>(angle: number, ...objects: RecursiveArray<T>) =>
	rotate([angle, 0, 0], ...objects);

/**
 * Rotate the given objects about the Y axis, using the given options.
 * @param {number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateY
 */
export const rotateY = <T extends Geometry>(angle: number, ...objects: RecursiveArray<T>) =>
	rotate([0, angle, 0], ...objects);

/**
 * Rotate the given objects about the Z axis, using the given options.
 * @param {number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateZ
 */
export const rotateZ = <T extends Geometry>(angle: number, ...objects: RecursiveArray<T>) =>
	rotate([0, 0, angle], ...objects);
