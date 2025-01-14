import { geom2, geom3, path2 } from "../geometries";
import flatten from "../utils/flatten";
import calculateEpsilonFromBounds from "./calculateEpsilonFromBounds";
import measureBoundingBox from "./measureBoundingBox";

/*
 * Measure the epsilon of the given (path2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfPath2 = (geometry: Path2) =>
	calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 2);

/*
 * Measure the epsilon of the given (geom2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom2 = (geometry: Geom2) =>
	calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 2);

/*
 * Measure the epsilon of the given (geom3) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom3 = (geometry: Geom3) =>
	calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 3);

/**
 * Measure the epsilon of the given geometries.
 * Epsilon values are used in various functions to determine minimum distances between points, planes, etc.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number|Array} the epsilon, or a list of epsilons for each geometry
 * @alias module:modeling/measurements.measureEpsilon
 *
 * @example
 * let epsilon = measureEpsilon(sphere())
 */
const measureEpsilon = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) {
		//throw new Error('wrong number of arguments')
		//warn("wrong number of arguments");
		return 0;
	}

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureEpsilonOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureEpsilonOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureEpsilonOfGeom3(geometry as Geom3);
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureEpsilon;
