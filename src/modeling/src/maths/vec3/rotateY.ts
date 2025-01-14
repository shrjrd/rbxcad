/**
 * Rotate the given vector around the given origin, Y axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateY
 */
const rotateY = (out: Vec3, vector: Vec3, origin: Vec3, radians: number) => {
	const p = [];
	const r = [];

	// translate point to the origin
	p[0] = vector[0] - origin[0];
	p[1] = vector[1] - origin[1];
	p[2] = vector[2] - origin[2];

	// perform rotation
	r[0] = p[2] * math.sin(radians) + p[0] * math.cos(radians);
	r[1] = p[1];
	r[2] = p[2] * math.cos(radians) - p[0] * math.sin(radians);

	// translate to correct position
	out[0] = r[0] + origin[0];
	out[1] = r[1] + origin[1];
	out[2] = r[2] + origin[2];

	return out;
};

export default rotateY;
