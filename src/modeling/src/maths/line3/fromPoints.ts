import type { Line3, Vec3 } from "../types";
import * as vec3 from "../vec3/index";
import { fromPointAndDirection } from "./fromPointAndDirection";

/**
 * Create a line that passes through the given points.
 *
 * @param {Line3} out - receiving line
 * @param {Vec3} point1 - start point of the line segment
 * @param {Vec3} point2 - end point of the line segment
 * @returns {Line3} out
 * @alias module:modeling/maths/line3.fromPoints
 */
export const fromPoints = (out: Line3, point1: Vec3, point2: Vec3) => {
	const direction = vec3.subtract(vec3.create(), point2, point1);
	return fromPointAndDirection(out, point1, direction);
};
