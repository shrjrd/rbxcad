import type { Geometry } from "../geometries/types";
import type { RecursiveArray } from "../utils/recursiveArray";
import type { BoundingBox } from "./types";
import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import { flatten } from "../utils/flatten";
import { calculateEpsilonFromBounds } from "./calculateEpsilonFromBounds";
import { measureAggregateBoundingBox } from "./measureAggregateBoundingBox";

/**
 * Measure the aggregated Epsilon for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number} the aggregated Epsilon for the whole group of geometries
 * @alias module:modeling/measurements.measureAggregateEpsilon
 *
 * @example
 * let groupEpsilon = measureAggregateEpsilon(sphere(),cube())
 */
export const measureAggregateEpsilon = (...geometries: RecursiveArray<Geometry>) => {
	geometries = flatten(geometries);
	const bounds = measureAggregateBoundingBox(geometries) as BoundingBox;

	let dimensions = 0;
	dimensions = geometries.reduce((dimensions, geometry) => {
		if (path2.isA(geometry) || geom2.isA(geometry)) return math.max(dimensions, 2);
		if (geom3.isA(geometry)) return math.max(dimensions, 3);
		return 0;
	}, dimensions);
	return calculateEpsilonFromBounds(bounds, dimensions);
};
