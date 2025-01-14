/**
 * Calculates the absolute coordinates of the give vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.abs
 */
const abs = (out: Vec3, vector: Vec3) => {
	out[0] = math.abs(vector[0]);
	out[1] = math.abs(vector[1]);
	out[2] = math.abs(vector[2]);
	return out;
};

export default abs;
