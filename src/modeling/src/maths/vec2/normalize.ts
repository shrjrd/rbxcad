/**
 * Normalize the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to normalize
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normalize
 */
const normalize = (out: Vec2, vector: Vec2): Vec2 => {
	const x = vector[0];
	const y = vector[1];
	let len = x * x + y * y;
	if (len > 0) {
		len = 1 / math.sqrt(len);
	}
	out[0] = x * len;
	out[1] = y * len;
	return out;
};

// old this.dividedBy(this.length())

export default normalize;
