import geom3 from "../../geometries/geom3";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import fromFakePolygons from "./fromFakePolygons";
import intersectGeom3 from "./intersectGeom3";
import to3DWalls from "./to3DWalls";

/*
 * Return a new 2D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of 2D geometries
 * @returns {geom2} new 2D geometry
 */
const intersect = (...geometries: Geom2[]) => {
	geometries = flatten(geometries);
	const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry));

	const newgeom3 = intersectGeom3(...newgeometries);
	const epsilon = measureEpsilon(newgeom3) as number;

	return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3));
};

export default intersect;
