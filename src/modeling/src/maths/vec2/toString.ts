import type { Vec2 } from "../types";
/**
 * Convert the given vector to a representative string.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/vec2.toString
 */
export const toString = (vector: Vec2): string =>
	`[${string.format("%.7f", vector[0])}, ${string.format("%.7f", vector[1])}]`;
