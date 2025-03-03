import type { Line2, Vec2 } from "../types";
import * as vec2 from "../vec2/index";
import { direction } from "./direction";
import { origin } from "./origin";

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @returns {Vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
export const closestPoint = (line: Line2, point: Vec2) => {
	const orig = origin(line);
	const dir = direction(line);

	const v = vec2.subtract(vec2.create(), point, orig);
	const dist = vec2.dot(v, dir);
	vec2.scale(v, dir, dist);
	vec2.add(v, v, orig);
	return v;
};
