/**
 * Negates the coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to negate
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.negate
 */
const negate = (out: Vec2, vector: Vec2): Vec2 => {
	out[0] = -vector[0];
	out[1] = -vector[1];
	return out;
};

export default negate;
