import { Error } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";

/**
 * Transform the given objects using the given matrix.
 * @param {mat4} matrix - a transformation matrix
 * @param {...Object} objects - the objects to transform
 * @return {Object|Array} the transformed object, or a list of transformed objects
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newsphere = transform(mat4.rotateX(TAU / 8), sphere())
 */
const transform = (matrix: Mat4, ...objects: object[]) => {
	// TODO how to check that the matrix is REAL?

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

export default transform;
