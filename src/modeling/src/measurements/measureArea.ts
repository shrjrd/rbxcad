import type { Path2, Geom2, Geom3, Slice } from "../geometries/types";
import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry } from "../geometries/types";
import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import * as poly3 from "../geometries/poly3/index";
import * as slice from "../geometries/slice/index";
import { flatten } from "../utils/flatten";

const cache = new WeakMap<Geometry | Slice, number>();

/**
 * Measure the area of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an area
 *
 * @param {Path2} geometry - geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfPath2 = (_: Path2) => 0;

/**
 * Measure the area of the given geometry.
 * For a counterclockwise rotating geometry (about Z) the area is positive, otherwise negative.
 *
 * @see https://paulbourke.net/geometry/polygonmesh/
 * @param {Geom2} geometry - 2D geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfGeom2 = (geometry: Geom2): number => {
	let area = cache.get(geometry);
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	if (area !== undefined) return area;

	const sides = geom2.toSides(geometry);
	area = sides.reduce((area, side) => area + (side[0][0] * side[1][1] - side[0][1] * side[1][0]), 0);
	area *= 0.5;

	cache.set(geometry, area);
	return area;
};

/**
 * Measure the area of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfGeom3 = (geometry: Geom3) => {
	let area = cache.get(geometry);
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	if (area !== undefined) return area;

	const polygons = geom3.toPolygons(geometry);
	area = polygons.reduce((area, polygon) => area + poly3.measureArea(polygon), 0);

	cache.set(geometry, area);
	return area;
};

/**
 * Measure the area of the given geometry.
 *
 * @param {Slice} geometry - 3D slice geometry to measure
 * @returns {number} area of the geometry
 */
const measureAreaOfSlice = (geometry: Slice) => {
	let area = cache.get(geometry)!;
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	if (area !== undefined) return area;

	// add the area of all contours
	area = 0;
	geometry.contours.forEach((contour) => {
		area += poly3.measureArea(poly3.create(contour));
	});

	cache.set(geometry, area);
	return area;
};

/**
 * Measure the area of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the area, or a list of areas for each geometry
 * @alias module:modeling/measurements.measureArea
 *
 * @example
 * let area = measureArea(sphere())
 */
export const measureArea = (...geometries: RecursiveArray<Geometry | Slice>) => {
	geometries = flatten(geometries);

	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (geometries.size() === 0) return 0;

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureAreaOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureAreaOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureAreaOfGeom3(geometry as Geom3);
		if (slice.isA(geometry)) return measureAreaOfSlice(geometry as Slice);
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};
