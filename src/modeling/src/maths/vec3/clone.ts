import create from "./create";

/**
 * Create a clone of the given vector.
 *
 * @param {vec3} vector - vector to clone
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.clone
 */
const clone = (vector: Vec3) => {
	const out = create();
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	return out;
};

export default clone;
