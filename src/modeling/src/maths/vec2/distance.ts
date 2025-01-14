/**
 * Calculates the distance between two vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec2.distance
 */
const distance = (a: Vec2, b: Vec2): number => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	return math.sqrt(x * x + y * y);
};

export default distance;
