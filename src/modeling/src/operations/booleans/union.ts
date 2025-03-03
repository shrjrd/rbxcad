import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3 } from "../../geometries/types";
import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import { areAllShapesTheSameType } from "../../utils/areAllShapesTheSameType";
import { coalesce } from "../../utils/coalesce";
import { unionGeom2 } from "./unionGeom2";
import { unionGeom3 } from "./unionGeom3";

/**
 * Return a new geometry representing the total space in the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom2|Geom3} a new geometry
 * @alias module:modeling/booleans.union
 *
 * @example
 * let myshape = union(cube({size: 5}), cube({size: 5, center: [3,3,3]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |       +----+
 * +----+--+    |       +----+       |
 *      |   B   |            |       |
 *      |       |            |       |
 *      +-------+            +-------+
 */
export const union = <T extends Geometry>(...geometries: RecursiveArray<T>) => {
	geometries = coalesce(geometries);

	if (geometries.size() === 0) return undefined;
	if (!areAllShapesTheSameType(geometries as Geometry[])) {
		throw "union arguments must be the same geometry type";
	}

	const geometry = geometries[0];
	// if (path.isA(geometry)) return unionPath(matrix, geometries)
	if (geom2.isA(geometry)) return unionGeom2(geometries as unknown as Geom2[]);
	if (geom3.isA(geometry)) return unionGeom3(geometries as unknown as Geom3[]);
	throw "union unsupported geometry type";
};
