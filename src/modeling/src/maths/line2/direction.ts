import vec2 from "../vec2";

/**
 * Return the direction of the given line.
 *
 * @param {line2} line - line of reference
 * @return {vec2} a vector in the direction of the line
 * @alias module:modeling/maths/line2.direction
 */
const direction = (line: Line2): Vec2 => {
	const vector = vec2.normal(vec2.create(), line);
	vec2.negate(vector, vector);
	return vector;
};

export default direction;
