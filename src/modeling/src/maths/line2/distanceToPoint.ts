import type { Line2, Vec2 } from "../types";
import * as vec2 from "../vec2/index";

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @return {number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
export const distanceToPoint = (line: Line2, point: Vec2) => {
	let distance = vec2.dot(point, line);
	distance = math.abs(distance - line[2]);
	return distance;
};
