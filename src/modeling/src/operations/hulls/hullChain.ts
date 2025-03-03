import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import { areAllShapesTheSameType } from "../../utils/areAllShapesTheSameType";
import { coalesce } from "../../utils/coalesce";
import { union } from "../booleans/union";
import { hull } from "./hull";

/**
 * Create a chain of hulled geometries from the given geometries.
 * Essentially hull A+B, B+C, C+D, etc., then union the results.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 *
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {Geom2|Geom3|Path2} new geometry
 * @alias module:modeling/hulls.hullChain
 *
 * @example
 * let newShape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))
 *
 * @example
 * +-------+   +-------+     +-------+   +------+
 * |       |   |       |     |        \ /       |
 * |   A   |   |   C   |     |         |        |
 * |       |   |       |     |                  |
 * +-------+   +-------+     +                  +
 *                       =   \                 /
 *       +-------+            \               /
 *       |       |             \             /
 *       |   B   |              \           /
 *       |       |               \         /
 *       +-------+                +-------+
 */
export const hullChain = <T extends Geom2 | Geom3 | Path2>(...geometries: RecursiveArray<T>) => {
	geometries = coalesce(geometries);

	if (geometries.size() === 0) return undefined!;
	if (geometries.size() === 1) return geometries[0] as T;

	if (!areAllShapesTheSameType(geometries as Geometry[])) {
		throw "only hulls of the same type are supported";
	}

	const hulls = [];
	for (let i = 1; i < geometries.size(); i++) {
		hulls.push(hull(geometries[i - 1], geometries[i]));
	}
	return union(hulls as T[]) as Geom3 | Geom2 | Path2;
};
