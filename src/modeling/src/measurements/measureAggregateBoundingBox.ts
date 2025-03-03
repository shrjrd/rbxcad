import type { RecursiveArray } from "../utils/recursiveArray";
import type { BoundingBox } from "./types";
import type { Geometry } from "../geometries/types";
const Number_MAX_VALUE = 1.7976931348623157e308;
import * as vec3 from "../maths/vec3/index";
import { flatten } from "../utils/flatten";
import { measureBoundingBox } from "./measureBoundingBox";

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
 */
export const measureAggregateBoundingBox = (...geometries: RecursiveArray<Geometry>) => {
	geometries = flatten(geometries);
	const bounds = measureBoundingBox(geometries) as BoundingBox[];
	if (geometries.size() === 1) {
		return bounds;
	}
	const result: BoundingBox = [
		[Number_MAX_VALUE, Number_MAX_VALUE, Number_MAX_VALUE],
		[-Number_MAX_VALUE, -Number_MAX_VALUE, -Number_MAX_VALUE],
	];
	return bounds.reduce((result, item) => {
		result = [vec3.min(result[0], result[0], item[0]), vec3.max(result[1], result[1], item[1])];
		return result;
	}, result);
};
