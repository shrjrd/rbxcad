import type { Vec2 } from "../types";
/**
 * Create a copy of the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - source vector
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.copy
 */
export const copy = (out: Vec2, vector: Vec2) => {
	out[0] = vector[0];
	out[1] = vector[1];
	return out;
};
