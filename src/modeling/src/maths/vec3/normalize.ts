/**
 * Normalize the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to normalize
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.normalize
 */
const normalize = (out: Vec3, vector: Vec3) => {
	const x = vector[0];
	const y = vector[1];
	const z = vector[2];
	let len = x * x + y * y + z * z;
	if (len > 0) {
		len = 1 / math.sqrt(len);
	}
	out[0] = x * len;
	out[1] = y * len;
	out[2] = z * len;
	return out;
};

export default normalize;
