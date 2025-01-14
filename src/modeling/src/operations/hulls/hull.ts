import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import areAllShapesTheSameType from "../../utils/areAllShapesTheSameType";
import flatten from "../../utils/flatten";
import hullGeom2 from "./hullGeom2";
import hullGeom3 from "./hullGeom3";
import hullPath2 from "./hullPath2";

/**
 * Create a convex hull of the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {geom2|geom3} new geometry
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
const hull = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw error("wrong number of arguments");

	if (!areAllShapesTheSameType(geometries as Geometry[])) {
		throw error("only hulls of the same type are supported");
	}

	const geometry = geometries[0];
	if (path2.isA(geometry)) return hullPath2(geometries);
	if (geom2.isA(geometry)) return hullGeom2(geometries);
	if (geom3.isA(geometry)) return hullGeom3(geometries);

	// FIXME should this throw an error for unknown geometries?
	return geometry;
};

export default hull;
