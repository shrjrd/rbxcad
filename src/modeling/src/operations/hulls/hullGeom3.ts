import geom3 from "../../geometries/geom3";
import flatten from "../../utils/flatten";
import hullPoints3 from "./hullPoints3";
import toUniquePoints from "./toUniquePoints";

/*
 * Create a convex hull of the given geom3 geometries.
 *
 * NOTE: The given geometries must be valid geom3 geometries.
 *
 * @param {...geometries} geometries - list of geom3 geometries
 * @returns {geom3} new geometry
 */
const hullGeom3 = (...geometries: object[]) => {
	geometries = flatten(geometries);

	// extract the unique vertices from the geometries
	const unique = toUniquePoints(geometries) as Vec3[];

	if (unique.size() === 0) return geom3.create();

	return geom3.create(hullPoints3(unique));
};

export default hullGeom3;
