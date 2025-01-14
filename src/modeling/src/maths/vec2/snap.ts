/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to snap
 * @param {Number} epsilon - epsilon of precision, less than 0
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.snap
 */
const snap = (out: Vec2, vector: Vec2, epsilon: number): Vec2 => {
	out[0] = math.round(vector[0] / epsilon) * epsilon + 0;
	out[1] = math.round(vector[1] / epsilon) * epsilon + 0;
	return out;
};

export default snap;
