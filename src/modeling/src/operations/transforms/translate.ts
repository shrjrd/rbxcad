import { Array, Error } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import mat4 from "../../maths/mat4";
import flatten from "../../utils/flatten";

/**
 * Translate the given objects using the given options.
 * @param {Array} offset - offset (vector) of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translate
 *
 * @example
 * const newsphere = translate([5, 0, 10], sphere())
 */
const translate = (offset: number[], ...objects: object[]) => {
	if (!Array.isArray(offset)) throw new Error("offset must be an array");

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	// adjust the offset if necessary
	offset = table.clone(offset) as Vec3; //offset.slice(); // don't modify the original
	while (offset.size() < 3) offset.push(0);

	const matrix = mat4.fromTranslation(mat4.create(), offset as Vec3);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

/**
 * Translate the given objects along the X axis using the given options.
 * @param {Number} offset - X offset of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateX
 */
const translateX = (offset: number, ...objects: object[]) => translate([offset, 0, 0], objects);

/**
 * Translate the given objects along the Y axis using the given options.
 * @param {Number} offset - Y offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateY
 */
const translateY = (offset: number, ...objects: object[]) => translate([0, offset, 0], objects);

/**
 * Translate the given objects along the Z axis using the given options.
 * @param {Number} offset - Z offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateZ
 */
const translateZ = (offset: number, ...objects: object[]) => translate([0, 0, offset], objects);

export default {
	translate,
	translateX,
	translateY,
	translateZ,
};

export { translate, translateX, translateY, translateZ };
