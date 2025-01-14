import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import areAllShapesTheSameType from "../../utils/areAllShapesTheSameType";
import flatten from "../../utils/flatten";
import unionGeom2 from "./unionGeom2";
import unionGeom3 from "./unionGeom3";

/**
 * Return a new geometry representing the total space in the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.union
 *
 * @example
 * let myshape = union(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
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
const union = (...geometries: (Geom2 | Geom3)[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) error("wrong number of arguments");

	if (!areAllShapesTheSameType(geometries)) {
		error("only unions of the same type are supported");
	}

	const geometry = geometries[0];
	// if (path.isA(geometry)) return pathunion(matrix, geometries)
	if (geom2.isA(geometry)) return unionGeom2(...(geometries as Geom2[]));
	if (geom3.isA(geometry)) return unionGeom3(...(geometries as Geom3[]));
	return geometry;
};

export default union;
