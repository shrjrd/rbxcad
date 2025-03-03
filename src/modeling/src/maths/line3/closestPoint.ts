import type { Line3, Vec3 } from "../types";
import * as vec3 from "../vec3/index";

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {Line3} line - line of reference
 * @param {Vec3} point - point of reference
 * @returns {Vec3} a point
 * @alias module:modeling/maths/line3.closestPoint
 */
export const closestPoint = (line: Line3, point: Vec3) => {
	const lPoint = line[0];
	const lDirection = line[1];

	const a = vec3.dot(vec3.subtract(vec3.create(), point, lPoint), lDirection);
	const b = vec3.dot(lDirection, lDirection);
	const t = a / b;

	const closestPoint = vec3.scale(vec3.create(), lDirection, t);
	vec3.add(closestPoint, closestPoint, lPoint);
	return closestPoint;
};
