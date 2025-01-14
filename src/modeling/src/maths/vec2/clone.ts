import create from "./create";

/**
 * Create a clone of the given vector.
 *
 * @param {vec2} vector - vector to clone
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.clone
 */
const clone = (vector: Vec2): Vec2 => {
	const out = create();
	out[0] = vector[0];
	out[1] = vector[1];
	return out;
};

export default clone;
