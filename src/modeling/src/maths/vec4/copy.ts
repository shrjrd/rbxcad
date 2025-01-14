/**
 * Create a copy of the given vector.
 *
 * @param {vec4} out - receiving vector
 * @param {vec4} vector - source vector
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.copy
 */
const copy = (out: Vec4, vector: Vec4): Vec4 | _Plane => {
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	out[3] = vector[3];
	return out;
};

export default copy;
