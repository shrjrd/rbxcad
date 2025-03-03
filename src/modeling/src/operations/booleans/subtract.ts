import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3 } from "../../geometries/types";
import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import { areAllShapesTheSameType } from "../../utils/areAllShapesTheSameType";
import { coalesce } from "../../utils/coalesce";
import { subtractGeom2 } from "./subtractGeom2";
import { subtractGeom3 } from "./subtractGeom3";

/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom2|Geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: 5}), cuboid({size: 5, center: [3,3,3]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
export const subtract = <T extends Geometry>(...geometries: RecursiveArray<T>) => {
	geometries = coalesce(geometries);

	if (geometries.size() === 0) return undefined;
	if (!areAllShapesTheSameType(geometries as Geometry[])) {
		throw "subtract arguments must be the same geometry type";
	}

	const geometry = geometries[0];
	// if (path.isA(geometry)) return subtractPath(matrix, geometries)
	if (geom2.isA(geometry)) return subtractGeom2(geometries as unknown as Geom2[]);
	if (geom3.isA(geometry)) return subtractGeom3(geometries as unknown as Geom3[]);
	throw "subtract unsupported geometry type";
};
