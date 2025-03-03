import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry } from "../geometries/types";
import { flatten } from "../utils/flatten";
import { measureArea } from "./measureArea";

/**
 * Measure the total (aggregate) area for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
export const measureAggregateArea = (...geometries: RecursiveArray<Geometry>): number => {
	geometries = flatten(geometries);
	const areas = measureArea(geometries);
	if (geometries.size() === 1) {
		return areas as number;
	}
	const result = 0;
	return (areas as number[]).reduce((result, area) => result + area, result);
};
