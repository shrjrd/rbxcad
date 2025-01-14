/**
 * Create a new vector from the given scalar value.
 *
 * @param {vec4} out - receiving vector
 * @param  {Number} scalar
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.fromScalar
 */
const fromScalar = (out: Vec4, scalar: number): Vec4 => {
	out[0] = scalar;
	out[1] = scalar;
	out[2] = scalar;
	out[3] = scalar;
	return out;
};

export default fromScalar;
