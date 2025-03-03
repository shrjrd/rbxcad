import type { BoundingBox } from "./types";
import type { Geometry, Slice } from "../geometries/types";
import type { RecursiveArray } from "../utils/recursiveArray";
import { flatten } from "../utils/flatten";
import { measureBoundingBox } from "./measureBoundingBox";

/**
 * Measure the center of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center vertex for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenter
 *
 * @example
 * let center = measureCenter(sphere())
 */
export const measureCenter = (...geometries: RecursiveArray<Geometry | Slice>) => {
	geometries = flatten(geometries);

	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (geometries.size() === 0) return [0, 0, 0];

	const results = geometries.map((geometry) => {
		const bounds = measureBoundingBox(geometry) as BoundingBox;
		return [
			bounds[0][0] + (bounds[1][0] - bounds[0][0]) / 2,
			bounds[0][1] + (bounds[1][1] - bounds[0][1]) / 2,
			bounds[0][2] + (bounds[1][2] - bounds[0][2]) / 2,
		];
	});
	return results.size() === 1 ? results[0] : results;
};
