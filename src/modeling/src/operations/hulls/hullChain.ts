import flatten from "../../utils/flatten";
import union from "../booleans/union";
import hull from "./hull";

/**
 * Create a chain of hulled geometries from the given geometries.
 * Essentially hull A+B, B+C, C+D, etc., then union the results.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 *
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {geom2|geom3} new geometry
 * @alias module:modeling/hulls.hullChain
 *
 * @example
 * let newshape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))
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
const hullChain = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() < 2) throw error("wrong number of arguments");

	const hulls = [];
	for (let i = 1; i < geometries.size(); i++) {
		hulls.push(hull(geometries[i - 1], geometries[i]));
	}
	return union(hulls as unknown as Geom2 | Geom3);
};

export default hullChain;
