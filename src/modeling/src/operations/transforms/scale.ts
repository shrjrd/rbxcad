import { Array, Error } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import mat4 from "../../maths/mat4";
import flatten from "../../utils/flatten";

/**
 * Scale the given objects using the given options.
 * @param {Array} factors - X, Y, Z factors by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scale
 *
 * @example
 * let myshape = scale([5, 0, 10], sphere())
 */
const scale = (factors: number[], ...objects: object[]) => {
	if (!Array.isArray(factors)) throw new Error("factors must be an array");

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	// adjust the factors if necessary
	factors = table.clone(factors); //factors.slice(); // don't modify the original
	while (factors.size() < 3) factors.push(1);

	if (factors[0] <= 0 || factors[1] <= 0 || factors[2] <= 0) throw new Error("factors must be positive");

	const matrix = mat4.fromScaling(mat4.create(), factors as Vec3);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

/**
 * Scale the given objects about the X axis using the given options.
 * @param {Number} factor - X factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleX
 */
const scaleX = (factor: number, ...objects: object[]) => scale([factor, 1, 1], objects);

/**
 * Scale the given objects about the Y axis using the given options.
 * @param {Number} factor - Y factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleY
 */
const scaleY = (factor: number, ...objects: object[]) => scale([1, factor, 1], objects);

/**
 * Scale the given objects about the Z axis using the given options.
 * @param {Number} factor - Z factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleZ
 */
const scaleZ = (factor: number, ...objects: object[]) => scale([1, 1, factor], objects);

export default {
	scale,
	scaleX,
	scaleY,
	scaleZ,
};

export { scale, scaleX, scaleY, scaleZ };
