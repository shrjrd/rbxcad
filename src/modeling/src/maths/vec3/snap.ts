/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to snap
 * @param {Number} epsilon - epsilon of precision, less than 0
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.snap
 */
const snap = (out: Vec3, vector: Vec3, epsilon: number) => {
	out[0] = math.round(vector[0] / epsilon) * epsilon + 0;
	out[1] = math.round(vector[1] / epsilon) * epsilon + 0;
	out[2] = math.round(vector[2] / epsilon) * epsilon + 0;
	return out;
};

export default snap;
