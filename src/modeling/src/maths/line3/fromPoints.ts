import vec3 from "../vec3";
import fromPointAndDirection from "./fromPointAndDirection";

/**
 * Create a line that passes through the given points.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point1 - start point of the line segment
 * @param {vec3} point2 - end point of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPoints
 */
const fromPoints = (out: Line3, point1: Vec3, point2: Vec3): Line3 => {
	const direction = vec3.subtract(vec3.create(), point2, point1);
	return fromPointAndDirection(out, point1, direction);
};

export default fromPoints;
