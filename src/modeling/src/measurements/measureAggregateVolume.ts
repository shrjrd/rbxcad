import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry } from "../geometries/types";
import { flatten } from "../utils/flatten";
import { measureVolume } from "./measureVolume";

/**
 * Measure the total (aggregate) volume for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
export const measureAggregateVolume = (...geometries: RecursiveArray<Geometry>) => {
	geometries = flatten(geometries);
	const volumes = measureVolume(geometries) as number[];
	if (geometries.size() === 1) {
		return volumes;
	}
	const result = 0;
	return volumes.reduce((result: number, volume: number) => result + volume, result);
};
