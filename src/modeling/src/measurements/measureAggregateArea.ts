import { Error } from "@rbxts/luau-polyfill";

import flatten from "../utils/flatten";
import measureArea from "./measureArea";

/**
 * Measure the total (aggregate) area for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
const measureAggregateArea = (...geometries: object[]): number => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw new Error("measureAggregateArea: no geometries supplied");
	const areas = measureArea(geometries) as number[] | number;
	if (geometries.size() === 1) {
		return areas as number;
	}
	const result = 0;
	return (areas as number[]).reduce((result, area) => result + area, result);
};

export default measureAggregateArea;
