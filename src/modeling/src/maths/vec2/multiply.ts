/**
 * Multiplies the coordinates of two vectors (A*B).
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.multiply
 */
const multiply = (out: Vec2, a: Vec2, b: Vec2): Vec2 => {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return out;
};

export default multiply;
