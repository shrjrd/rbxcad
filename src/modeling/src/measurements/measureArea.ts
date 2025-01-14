import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";
import poly3 from "../geometries/poly3";
import flatten from "../utils/flatten";

const cache = new WeakMap();

/*
 * Measure the area of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an area
 *
 * @param {path2} geometry - geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfPath2 = (geometry: Path2) => 0;

/*
 * Measure the area of the given geometry.
 * For a counter clockwise rotating geometry (about Z) the area is positive, otherwise negative.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @param {geom2} geometry - 2D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom2 = (geometry: Geom2) => {
	let area = cache.get(geometry) as number;
	if (area) return area;

	const sides = geom2.toSides(geometry);
	area = sides.reduce((area, side) => area + (side[0][0] * side[1][1] - side[0][1] * side[1][0]), 0);
	area *= 0.5;

	cache.set(geometry, area);

	return area;
};

/*
 * Measure the area of the given geometry.
 *
 * @param {geom3} geometry - 3D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom3 = (geometry: Geom3) => {
	let area = cache.get(geometry) as number;
	if (area) return area;

	const polygons = geom3.toPolygons(geometry);
	area = polygons.reduce((area, polygon) => area + poly3.measureArea(polygon), 0);

	cache.set(geometry, area);

	return area;
};

/**
 * Measure the area of the given geometries.
 * @param {...Objects} geometries - the geometries to measure
 * @return {Number|Array} the area, or a list of areas for each geometry
 * @alias module:modeling/measurements.measureArea
 *
 * @example
 * let area = measureArea(sphere())
 */
const measureArea = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) {
		//throw new Error('wrong number of arguments')
		//warn("wrong number of arguments");
		return 0;
	}

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureAreaOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureAreaOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureAreaOfGeom3(geometry as Geom3);
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureArea;
