import flatten from "../utils/flatten";
import measureBoundingBox from "./measureBoundingBox";

/**
 * Measure the dimensions of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the dimensions for each geometry, i.e. [width, depth, height]
 * @alias module:modeling/measurements.measureDimensions
 *
 * @example
 * let dimensions = measureDimensions(sphere())
 */
const measureDimensions = (...geometries: object[]) => {
	geometries = flatten(geometries);

	if (geometries.size() === 0) {
		//warn("wrong number of arguments");
		return [0, 0, 0];
	}

	const results = geometries.map((geometry) => {
		const boundingBox = measureBoundingBox(geometry) as BoundingBox;
		return [
			boundingBox[1][0] - boundingBox[0][0],
			boundingBox[1][1] - boundingBox[0][1],
			boundingBox[1][2] - boundingBox[0][2],
		];
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureDimensions;
