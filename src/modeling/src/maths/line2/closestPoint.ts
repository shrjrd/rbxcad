import vec2 from "../vec2";
import direction from "./direction";
import origin from "./origin";

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @returns {vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
const closestPoint = (line: Line2, point: Vec2) => {
	const orig = origin(line);
	const dir = direction(line);

	const v = vec2.subtract(vec2.create(), point, orig);
	const dist = vec2.dot(v, dir);
	vec2.scale(v, dir, dist);
	vec2.add(v, v, orig);
	return v;
};

export default closestPoint;
