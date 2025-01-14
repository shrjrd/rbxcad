import { Error } from "@rbxts/luau-polyfill";

import { geom2, geom3, path2 } from "../geometries";
import flatten from "../utils/flatten";
import calculateEpsilonFromBounds from "./calculateEpsilonFromBounds";
import measureAggregateBoundingBox from "./measureAggregateBoundingBox";

/**
 * Measure the aggregated Epsilon for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number} the aggregated Epsilon for the whole group of geometries
 * @alias module:modeling/measurements.measureAggregateEpsilon
 *
 * @example
 * let groupEpsilon = measureAggregateEpsilon(sphere(),cube())
 */
const measureAggregateEpsilon = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw new Error("measureAggregateEpsilon: no geometries supplied");
	const bounds = measureAggregateBoundingBox(geometries) as BoundingBox;

	let dimensions = 0;
	dimensions = geometries.reduce((dimensions, geometry) => {
		if (path2.isA(geometry) || geom2.isA(geometry)) return math.max(dimensions, 2);
		if (geom3.isA(geometry)) return math.max(dimensions, 3);
		return 0;
	}, dimensions);
	return calculateEpsilonFromBounds(bounds, dimensions);
};

export default measureAggregateEpsilon;
