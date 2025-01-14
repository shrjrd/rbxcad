import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";
import poly3 from "../geometries/poly3";
import flatten from "../utils/flatten";

const cache = new WeakMap();

/*
 * Measure the volume of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an volume
 *
 * @param {Path2} geometry - geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfPath2 = (geometry: Path2) => 0;

/*
 * Measure the volume of the given geometry.
 * NOTE: 2D geometry are infinitely thin and do not have an volume
 *
 * @param {Geom2} geometry - 2D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom2 = (geometry: Geom2) => 0;

/*
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom3 = (geometry: Geom3) => {
	let volume = cache.get(geometry) as number;
	if (volume) return volume;

	const polygons = geom3.toPolygons(geometry);
	volume = polygons.reduce((volume, polygon) => volume + poly3.measureSignedVolume(polygon), 0);

	cache.set(geometry, volume);

	return volume;
};

/**
 * Measure the volume of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number|Array} the volume, or a list of volumes for each geometry
 * @alias module:modeling/measurements.measureVolume
 *
 * @example
 * let volume = measureVolume(sphere())
 */
const measureVolume = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) {
		//throw new Error('wrong number of arguments')
		//warn("wrong number of arguments");
		return 0;
	}

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureVolumeOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureVolumeOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureVolumeOfGeom3(geometry as Geom3);
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureVolume;
