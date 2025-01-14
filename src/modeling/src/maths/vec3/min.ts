/**
 * Returns the minimum coordinates of the given vectors.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.min
 */
const min = (out: Vec3, a: Vec3, b: Vec3) => {
	out[0] = math.min(a[0], b[0]);
	out[1] = math.min(a[1], b[1]);
	out[2] = math.min(a[2], b[2]);
	return out;
};

export default min;
