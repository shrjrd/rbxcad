/**
 * Calculates the squared distance between two vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} squared distance
 * @alias module:modeling/maths/vec3.squaredDistance
 */
const squaredDistance = (a: Vec3, b: Vec3) => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	const z = b[2] - a[2];
	return x * x + y * y + z * z;
};

export default squaredDistance;
