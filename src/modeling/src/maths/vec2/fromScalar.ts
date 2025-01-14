/**
 * Create a vector from a single scalar value.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} scalar - the scalar value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromScalar
 */
const fromScalar = (out: Vec2, scalar: number): Vec2 => {
	out[0] = scalar;
	out[1] = scalar;
	return out;
};

export default fromScalar;
