import type { Line3, Vec3 } from "../types";
import * as vec3 from "../vec3/index";
import { closestPoint } from "./closestPoint";

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {Line3} line - line of reference
 * @param {Vec3} point - point of reference
 * @return {number} distance between line and point
 * @alias module:modeling/maths/line3.distanceToPoint
 */
export const distanceToPoint = (line: Line3, point: Vec3) => {
	const closest = closestPoint(line, point);
	const distanceVector = vec3.subtract(vec3.create(), point, closest);
	return vec3.length(distanceVector);
};
