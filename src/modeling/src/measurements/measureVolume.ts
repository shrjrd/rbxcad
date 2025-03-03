import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry, Geom3, Slice } from "../geometries/types";
import * as geom3 from "../geometries/geom3/index";
import * as poly3 from "../geometries/poly3/index";
import { flatten } from "../utils/flatten";

const cache = new WeakMap<Geometry, number>();

/**
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {number} volume of the geometry
 */
const measureVolumeOfGeom3 = (geometry: Geom3) => {
	let volume = cache.get(geometry);
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	if (volume !== undefined) return volume;

	const polygons = geom3.toPolygons(geometry);
	volume = polygons.reduce((volume, polygon) => volume + poly3.measureSignedVolume(polygon), 0);

	cache.set(geometry, volume);

	return volume;
};

/**
 * Measure the volume of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the volume, or a list of volumes for each geometry
 * @alias module:modeling/measurements.measureVolume
 *
 * @example
 * let volume = measureVolume(sphere())
 */
export const measureVolume = (...geometries: RecursiveArray<Geometry | Slice>) => {
	geometries = flatten(geometries);

	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (geometries.size() === 0) return 0;

	const results = geometries.map((geometry) => {
		if (geom3.isA(geometry)) return measureVolumeOfGeom3(geometry as Geom3);
		// 2D geometry, paths, and slices are infinitely thin and do not have a volume
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};
