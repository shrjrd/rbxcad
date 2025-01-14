import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import vec2 from "../../maths/vec2";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import snapPolygons from "./snapPolygons";

const snapPath2 = (geometry: Path2) => {
	const epsilon = measureEpsilon(geometry) as number;
	const points = path2.toPoints(geometry);
	const newpoints = points.map((point) => vec2.snap(vec2.create(), point, epsilon));
	// snap can produce duplicate points, remove those
	return path2.create(newpoints);
};

const snapGeom2 = (geometry: Geom2) => {
	const epsilon = measureEpsilon(geometry) as number;
	const sides = geom2.toSides(geometry);
	let newsides: [Vec2, Vec2][] = sides.map((side) => [
		vec2.snap(vec2.create(), side[0], epsilon),
		vec2.snap(vec2.create(), side[1], epsilon),
	]);
	// snap can produce sides with zero (0) length, remove those
	newsides = newsides.filter((side) => !vec2.equals(side[0], side[1]));
	return geom2.create(newsides);
};

const snapGeom3 = (geometry: Geom3) => {
	const epsilon = measureEpsilon(geometry) as number;
	const polygons = geom3.toPolygons(geometry);
	const newpolygons = snapPolygons(epsilon, polygons);
	return geom3.create(newpolygons);
};

/**
 * Snap the given geometries to the overall precision (epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
const snap = (...geometries: object[]): object | object[] => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw error("wrong number of arguments");

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return snapPath2(geometry as Path2);
		if (geom2.isA(geometry)) return snapGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return snapGeom3(geometry as Geom3);
		return geometry;
	});
	return results.size() === 1 ? results[0] : results;
};

export default snap;
