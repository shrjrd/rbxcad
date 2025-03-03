import type { Vec4 } from "./type";
import { create } from "./create";

/**
 * Create a clone of the given vector.
 *
 * @param {Vec4} vector - source vector
 * @returns {Vec4} a new vector
 * @alias module:modeling/maths/vec4.clone
 */
export const clone = (vector: Vec4) => {
	const out = create();
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	out[3] = vector[3];
	return out;
};
