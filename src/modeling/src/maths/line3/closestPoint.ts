import vec3 from "../vec3";

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @returns {vec3} a point
 * @alias module:modeling/maths/line3.closestPoint
 */
const closestPoint = (line: Line3, point: Vec3) => {
	const lpoint = line[0];
	const ldirection = line[1];

	const a = vec3.dot(vec3.subtract(vec3.create(), point, lpoint), ldirection);
	const b = vec3.dot(ldirection, ldirection);
	const t = a / b;

	const closestpoint = vec3.scale(vec3.create(), ldirection, t);
	vec3.add(closestpoint, closestpoint, lpoint);
	return closestpoint;
};

export default closestPoint;
