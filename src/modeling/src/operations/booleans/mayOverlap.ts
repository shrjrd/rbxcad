import { EPS } from "../../maths/constants";
import measureBoundingBox from "../../measurements/measureBoundingBox";

/**
 * Determine if the given geometries overlap by comparing min and max bounds.
 * NOTE: This is used in union for performance gains.
 * @param {geom3} geometry1 - geometry for comparison
 * @param {geom3} geometry2 - geometry for comparison
 * @returns {boolean} true if the geometries overlap
 */
const mayOverlap = (geometry1: Geom3, geometry2: Geom3) => {
	// FIXME accessing the data structure of the geometry should not be allowed
	if (geometry1.polygons.size() === 0 || geometry2.polygons.size() === 0) {
		return false;
	}

	const bounds1 = measureBoundingBox(geometry1) as BoundingBox;
	const min1 = bounds1[0];
	const max1 = bounds1[1];

	const bounds2 = measureBoundingBox(geometry2) as BoundingBox;
	const min2 = bounds2[0];
	const max2 = bounds2[1];

	if (min2[0] - max1[0] > EPS) return false;
	if (min1[0] - max2[0] > EPS) return false;
	if (min2[1] - max1[1] > EPS) return false;
	if (min1[1] - max2[1] > EPS) return false;
	if (min2[2] - max1[2] > EPS) return false;
	if (min1[2] - max2[2] > EPS) return false;
	return true;
};

export default mayOverlap;
