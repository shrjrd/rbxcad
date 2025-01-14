import { Error } from "@rbxts/luau-polyfill";

import flatten from "../utils/flatten";
import measureVolume from "./measureVolume";

/**
 * Measure the total (aggregate) volume for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
const measureAggregateVolume = (...geometries: object[]): number => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw new Error("measureAggregateVolume: no geometries supplied");
	const volumes = measureVolume(geometries) as number | number[];
	if (geometries.size() === 1) {
		return volumes as number;
	}
	const result = 0;
	return (volumes as number[]).reduce((result, volume) => result + volume, result);
};

export default measureAggregateVolume;
