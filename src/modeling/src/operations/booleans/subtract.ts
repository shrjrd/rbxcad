import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import areAllShapesTheSameType from "../../utils/areAllShapesTheSameType";
import flatten from "../../utils/flatten";
import subtractGeom2 from "./subtractGeom2";
import subtractGeom3 from "./subtractGeom3";

/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: [5,5,5]}), cuboid({size: [5,5,5], center: [5,5,5]}))
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
const subtract = (...geometries: (Geom2 | Geom3)[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw error("wrong number of arguments");

	if (!areAllShapesTheSameType(geometries)) {
		throw error("only subtract of the types are supported");
	}

	const geometry = geometries[0];
	// if (path.isA(geometry)) return pathsubtract(matrix, geometries)
	if (geom2.isA(geometry)) return subtractGeom2(...(geometries as Geom2[]));
	if (geom3.isA(geometry)) return subtractGeom3(...(geometries as Geom3[]));
	return geometry;
};

export default subtract;
