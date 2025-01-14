import geom3 from "../../geometries/geom3";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import fromFakePolygons from "./fromFakePolygons";
import subtractGeom3 from "./subtractGeom3";
import to3DWalls from "./to3DWalls";

/**
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
const subtract = (...geometries: Geom2[]) => {
	geometries = flatten(geometries);
	const newgeometries = geometries.map((geometry: Geom2) => to3DWalls({ z0: -1, z1: 1 }, geometry));

	const newgeom3 = subtractGeom3(...newgeometries);
	const epsilon = measureEpsilon(newgeom3) as number;

	return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3));
};

export default subtract;
