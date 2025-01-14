import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import areAllShapesTheSameType from "../../utils/areAllShapesTheSameType";
import flatten from "../../utils/flatten";
import intersectGeom2 from "./intersectGeom2";
import intersectGeom3 from "./intersectGeom3";

/**
 * Return a new geometry representing space in both the first geometry and
 * all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.intersect
 *
 * @example
 * let myshape = intersect(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+
 * |       |
 * |   A   |
 * |    +--+----+   =   +--+
 * +----+--+    |       +--+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const intersect = (...geometries: (Geom2 | Geom3)[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) error("wrong number of arguments");

	if (!areAllShapesTheSameType(geometries)) {
		error("only intersect of the types are supported");
	}

	const geometry = geometries[0];
	// if (path.isA(geometry)) return pathintersect(matrix, geometries)
	if (geom2.isA(geometry)) return intersectGeom2(...(geometries as Geom2[]));
	if (geom3.isA(geometry)) return intersectGeom3(...(geometries as Geom3[]));
	return geometry;
};

export default intersect;
