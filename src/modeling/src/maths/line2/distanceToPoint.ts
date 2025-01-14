import vec2 from "../vec2";

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
const distanceToPoint = (line: Line2, point: Vec2) => {
	let distance = vec2.dot(point, line);
	distance = math.abs(distance - line[2]);
	return distance;
};

export default distanceToPoint;
