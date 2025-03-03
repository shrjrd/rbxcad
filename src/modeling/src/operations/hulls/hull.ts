import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import { areAllShapesTheSameType } from "../../utils/areAllShapesTheSameType";
import { coalesce } from "../../utils/coalesce";
import { hullGeom2 } from "./hullGeom2";
import { hullGeom3 } from "./hullGeom3";
import { hullPath2 } from "./hullPath2";

/**
 * Create a convex hull of the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 * @param {...Object} geometries - list of geometries from which to create a hull
 * @returns {Geom2|Geom3|Path2} new geometry
 * @alias module:modeling/hulls.hull
 *
 * @example
 * let myshape = hull(rectangle({center: [-5,-5]}), ellipse({center: [5,5]}))
 *
 * @example
 * +-------+           +-------+
 * |       |           |        \
 * |   A   |           |         \
 * |       |           |          \
 * +-------+           +           \
 *                  =   \           \
 *       +-------+       \           +
 *       |       |        \          |
 *       |   B   |         \         |
 *       |       |          \        |
 *       +-------+           +-------+
 */
export const hull = <T extends Geom2 | Geom3 | Path2>(...geometries: RecursiveArray<T>) => {
	geometries = coalesce(geometries);

	if (geometries.size() === 0) return undefined;

	if (!areAllShapesTheSameType(geometries as Geometry[])) {
		throw "only hulls of the same type are supported";
	}

	const geometry = geometries[0];
	if (path2.isA(geometry)) return hullPath2(geometries as unknown as Path2[]);
	if (geom2.isA(geometry)) return hullGeom2(geometries as unknown as Geom2[]);
	if (geom3.isA(geometry)) return hullGeom3(geometries as unknown as Geom3[]);

	// FIXME should this throw an error for unknown geometries?
	return geometry;
};
