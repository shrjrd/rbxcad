/**
 * Scales the coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to scale
 * @param {Number} amount - amount to scale
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.scale
 */
const scale = (out: Vec2, vector: Vec2, amount: number): Vec2 => {
	out[0] = vector[0] * amount;
	out[1] = vector[1] * amount;
	return out;
};

export default scale;
