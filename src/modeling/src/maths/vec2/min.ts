/**
 * Returns the minimum coordinates of two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.min
 */
const min = (out: Vec2, a: Vec2, b: Vec2): Vec2 => {
	out[0] = math.min(a[0], b[0]);
	out[1] = math.min(a[1], b[1]);
	return out;
};

export default min;
