const Number_MAX_VALUE = 1.7976931348623157e308;

import vec3max from "../maths/vec3/max";
import vec3min from "../maths/vec3/min";
import flatten from "../utils/flatten";
import measureBoundingBox from "./measureBoundingBox";

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
 */
const measureAggregateBoundingBox = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw error("measureAggregateBoundingBox: no geometries supplied");
	const bounds = measureBoundingBox(geometries) as BoundingBox[];
	if (geometries.size() === 1) {
		return bounds;
	}
	const result: BoundingBox = [
		[Number_MAX_VALUE, Number_MAX_VALUE, Number_MAX_VALUE],
		[-Number_MAX_VALUE, -Number_MAX_VALUE, -Number_MAX_VALUE],
	];
	return bounds.reduce((result, item) => {
		result = [vec3min(result[0], result[0], item[0]), vec3max(result[1], result[1], item[1])];
		return result;
	}, result);
};

export default measureAggregateBoundingBox;
