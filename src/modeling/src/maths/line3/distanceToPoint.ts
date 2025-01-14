import vec3 from "../vec3";
import closestPoint from "./closestPoint";

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line3.distanceToPoint
 */
const distanceToPoint = (line: Line3, point: Vec3): number => {
	const closest = closestPoint(line, point);
	const distancevector = vec3.subtract(vec3.create(), point, closest);
	return vec3.length(distancevector);
};

export default distanceToPoint;
