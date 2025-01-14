import geom3 from "../../geometries/geom3";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import fromFakePolygons from "./fromFakePolygons";
import to3DWalls from "./to3DWalls";
import unionGeom3 from "./unionGeom3";

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {geom2} new 2D geometry
 */
const union = (...geometries: Geom2[]) => {
	geometries = flatten(geometries);
	const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry));

	const newgeom3 = unionGeom3(...newgeometries);
	const epsilon = measureEpsilon(newgeom3) as number;

	return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3));
};

export default union;
