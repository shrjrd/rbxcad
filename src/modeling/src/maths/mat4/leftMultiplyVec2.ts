import fromValues from "../vec2/fromValues";

/*
 * Multiply the input matrix by a Vector2 (interpreted as 2 column, 1 row)
 * (result = v*M)
 * Fourth element is set to 1
 * @param {vec2} vector the input vector
 * @param {mat4} matrix the input matrix
 * @returns {vec2} output
 */
const leftMultiplyVec2 = (vector: Vec2, matrix: Mat4) => {
	const [v0, v1] = vector;
	const v2 = 0;
	const v3 = 1;
	let x = v0 * matrix[0] + v1 * matrix[4] + v2 * matrix[8] + v3 * matrix[12];
	let y = v0 * matrix[1] + v1 * matrix[5] + v2 * matrix[9] + v3 * matrix[13];
	const w = v0 * matrix[3] + v1 * matrix[7] + v2 * matrix[11] + v3 * matrix[15];

	// scale such that fourth element becomes 1:
	if (w !== 1) {
		const invw = 1.0 / w;
		x *= invw;
		y *= invw;
	}
	return fromValues(x, y);
};

export default leftMultiplyVec2;
