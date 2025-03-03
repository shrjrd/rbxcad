import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { Mat4 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";

/**
 * Transform the given objects using the given matrix.
 * @param {Mat4} matrix - a transformation matrix
 * @param {...Object} objects - the objects to transform
 * @return {Object|Array} the transformed object, or a list of transformed objects
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newSphere = transform(mat4.rotateX(TAU / 8), sphere())
 */
export const transform = <T extends Geometry>(matrix: Mat4, ...objects: RecursiveArray<T>): Geometry | Geometry[] => {
	// TODO how to check that the matrix is REAL?

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		// handle recursive arrays
		if (JsArray.isArray(object)) return transform(matrix, ...object);
		return object;
	});
	return results.size() === 1 ? (results[0] as T) : (results as T[]);
};
