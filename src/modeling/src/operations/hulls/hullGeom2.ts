import geom2 from "../../geometries/geom2";
import flatten from "../../utils/flatten";
import hullPoints2 from "./hullPoints2";
import toUniquePoints from "./toUniquePoints";

/*
 * Create a convex hull of the given geom2 geometries.
 *
 * NOTE: The given geometries must be valid geom2 geometries.
 *
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
const hullGeom2 = (...geometries: object[]) => {
	geometries = flatten(geometries);

	// extract the unique points from the geometries
	const unique = toUniquePoints(geometries) as Vec2[];

	const hullPoints = hullPoints2(unique);

	// NOTE: more than three points are required to create a new geometry
	if (hullPoints.size() < 3) return geom2.create();

	// assemble a new geometry from the list of points
	return geom2.fromPoints(hullPoints);
};

export default hullGeom2;
