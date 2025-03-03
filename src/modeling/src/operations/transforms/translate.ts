import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import * as mat4 from "../../maths/mat4/index";

/**
 * Translate the given objects using the given options.
 * @param {Array} offset - offset (vector) of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translate
 *
 * @example
 * const newSphere = translate([5, 0, 10], sphere())
 */
export const translate = <T extends Geometry>(offset: number[], ...objects: RecursiveArray<T>): T | T[] => {
	if (!JsArray.isArray(offset)) throw "offset must be an array";

	// adjust the offset if necessary
	offset = JsArray.slice(offset); //offset.slice(); // don't modify the original
	while (offset.size() < 3) offset.push(0);

	const matrix = mat4.fromTranslation(mat4.create(), offset as Vec3);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		// handle recursive arrays
		if (JsArray.isArray(object)) return translate(offset, ...object);
		return object;
	});
	return results.size() === 1 ? (results[0] as T) : (results as T[]);
};

/**
 * Translate the given objects along the X axis using the given options.
 * @param {number} offset - X offset of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateX
 */
export const translateX = <T extends Geometry>(offset: number, ...objects: RecursiveArray<T>): T | T[] =>
	translate([offset, 0, 0], ...objects);

/**
 * Translate the given objects along the Y axis using the given options.
 * @param {number} offset - Y offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateY
 */
export const translateY = <T extends Geometry>(offset: number, ...objects: RecursiveArray<T>): T | T[] =>
	translate([0, offset, 0], ...objects);

/**
 * Translate the given objects along the Z axis using the given options.
 * @param {number} offset - Z offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateZ
 */
export const translateZ = <T extends Geometry>(offset: number, ...objects: RecursiveArray<T>): T | T[] =>
	translate([0, 0, offset], ...objects);
