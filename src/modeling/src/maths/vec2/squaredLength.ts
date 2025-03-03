import type { Vec2 } from "../types";
/**
 * Calculates the squared length of the given vector.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {number} squared length
 * @alias module:modeling/maths/vec2.squaredLength
 */
export const squaredLength = (vector: Vec2) => {
	const x = vector[0];
	const y = vector[1];
	return x * x + y * y;
};
