import type { Vec2 } from "../types";
/**
 * Create a vector from a single scalar value.
 *
 * @param {Vec2} out - receiving vector
 * @param {number} scalar - the scalar value
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.fromScalar
 */
export const fromScalar = (out: Vec2, scalar: number) => {
	out[0] = scalar;
	out[1] = scalar;
	return out;
};
