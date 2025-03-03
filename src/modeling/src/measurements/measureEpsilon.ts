import type { BoundingBox } from "./types";
import type { Geometry, Slice } from "../geometries/types";
import type { RecursiveArray } from "../utils/recursiveArray";
import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import * as slice from "../geometries/slice/index";
import { flatten } from "../utils/flatten";
import { calculateEpsilonFromBounds } from "./calculateEpsilonFromBounds";
import { measureBoundingBox } from "./measureBoundingBox";

/**
 * Measure the epsilon of the given geometries.
 * Epsilon values are used in various functions to determine minimum distances between vertices, planes, etc.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the epsilon, or a list of epsilons for each geometry
 * @alias module:modeling/measurements.measureEpsilon
 *
 * @example
 * let epsilon = measureEpsilon(sphere())
 */
export const measureEpsilon = (...geometries: RecursiveArray<Geometry | Slice>) => {
	geometries = flatten(geometries);

	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (geometries.size() === 0) return 0;

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 2);
		if (geom2.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 2);
		if (geom3.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 3);
		if (slice.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry) as BoundingBox, 3);
		return 0;
	});
	return results.size() === 1 ? results[0] : results;
};
