import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import * as mat4 from "../../maths/mat4/index";

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
export const scale = <T extends Geometry>(factors: number[], ...objects: RecursiveArray<T>): Geometry | Geometry[] => {
	if (!JsArray.isArray(factors)) throw "factors must be an array";

	// adjust the factors if necessary
	factors = JsArray.slice(factors); //factors.slice(); // don't modify the original
	while (factors.size() < 3) factors.push(1);

	if (factors[0] <= 0 || (factors[1] as number) <= 0 || (factors[2] as number) <= 0) throw "factors must be positive";

	const matrix = mat4.fromScaling(mat4.create(), factors as Vec3);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		// handle recursive arrays
		if (JsArray.isArray(object)) return scale(factors, ...object);
		return object;
	});
	return results.size() === 1 ? (results[0] as T) : (results as T[]);
};

/**
 * Scale the given objects about the X axis using the given options.
 * @param {number} factor - X factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleX
 */
export const scaleX = <T extends Geometry>(factor: number, ...objects: RecursiveArray<T>): Geometry | Geometry[] =>
	scale([factor, 1, 1], ...objects);

/**
 * Scale the given objects about the Y axis using the given options.
 * @param {number} factor - Y factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleY
 */
export const scaleY = <T extends Geometry>(factor: number, ...objects: RecursiveArray<T>): Geometry | Geometry[] =>
	scale([1, factor, 1], ...objects);

/**
 * Scale the given objects about the Z axis using the given options.
 * @param {number} factor - Z factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleZ
 */
export const scaleZ = <T extends Geometry>(factor: number, ...objects: RecursiveArray<T>): Geometry | Geometry[] =>
	scale([1, 1, factor], ...objects);
