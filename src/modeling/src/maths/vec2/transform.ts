/**
 * Transforms the given vector using the given matrix.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.transform
 */
const transform = (out: Vec2, vector: Vec2, matrix: Mat4): Vec2 => {
	const x = vector[0];
	const y = vector[1];
	out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
	out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
	return out;
};

export default transform;
