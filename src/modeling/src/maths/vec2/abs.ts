/**
 * Calculates the absolute coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector of reference
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.abs
 */
const abs = (out: Vec2, vector: Vec2) => {
	out[0] = math.abs(vector[0]);
	out[1] = math.abs(vector[1]);
	return out;
};

export default abs;
