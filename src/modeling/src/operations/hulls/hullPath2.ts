import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";
import hullPoints2 from "./hullPoints2";
import toUniquePoints from "./toUniquePoints";

/*
 * Create a convex hull of the given path2 geometries.
 *
 * NOTE: The given geometries must be valid path2 geometry.
 *
 * @param {...geometries} geometries - list of path2 geometries
 * @returns {path2} new geometry
 */
const hullPath2 = (...geometries: object[]) => {
	geometries = flatten(geometries);

	// extract the unique points from the geometries
	const unique = toUniquePoints(geometries) as Vec2[];

	const hullPoints = hullPoints2(unique);

	// assemble a new geometry from the list of points
	return path2.fromPoints({ closed: true }, hullPoints);
};

export default hullPath2;
