/**
 * Computes the cross product (3D) of two vectors.
 *
 * @param {vec3} out - receiving vector (3D)
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec2.cross
 */
const cross = (out: Vec3 | Vec2, a: Vec2, b: Vec2): Vec3 => {
	out[0] = 0;
	out[1] = 0;
	out[2] = a[0] * b[1] - a[1] * b[0];
	return out as Vec3;
};

export default cross;
