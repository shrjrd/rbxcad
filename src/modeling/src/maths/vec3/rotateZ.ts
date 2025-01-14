/**
 * Rotate the given vector around the given origin, Z axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation in radians
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateZ
 */
const rotateZ = (out: Vec3, vector: Vec3, origin: Vec3, radians: number) => {
	const p = [];
	const r = [];
	// Translate point to the origin
	p[0] = vector[0] - origin[0];
	p[1] = vector[1] - origin[1];

	// perform rotation
	r[0] = p[0] * math.cos(radians) - p[1] * math.sin(radians);
	r[1] = p[0] * math.sin(radians) + p[1] * math.cos(radians);

	// translate to correct position
	out[0] = r[0] + origin[0];
	out[1] = r[1] + origin[1];
	out[2] = vector[2];

	return out;
};

export default rotateZ;
