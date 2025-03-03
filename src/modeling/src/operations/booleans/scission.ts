import type { Geom3 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom3 from "../../geometries/geom3/index";
import { scissionGeom3 } from "./scissionGeom3";

/**
 * Scission (divide) the given geometry into the component pieces.
 *
 * NOTE: Currently only 3D geometries are supported.
 *
 * @param {...Object} objects - list of geometries
 * @returns {Array} list of pieces from each geometry
 * @alias module:modeling/booleans.scission
 *
 * @example
 * let figure = use('./my.stl')
 * let pieces = scission(figure)
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   +---+            | A +---+
 * |   |    +---+   =   |   |    +---+
 * +---+    |   |       +---+    |   |
 *      +---+   |            +---+   |
 *      |       |            |    B  |
 *      +-------+            +-------+
 */
export const scission = (...objects: RecursiveArray<Geom3>) => {
	const results = objects.map((object) => {
		// if (path2.isA(object)) return path2.transform(matrix, object)
		// if (geom2.isA(object)) return geom2.transform(matrix, object)
		if (geom3.isA(object)) return scissionGeom3(object as Geom3);
		if (JsArray.isArray(object)) return scission(...object);
		return object;
	}) as Array<Geom3> | RecursiveArray<Geom3>;
	return results.size() === 1 ? results[0] : results;
};
