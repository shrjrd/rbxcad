import type { Vec2 } from "../types";
/**
 * Subtracts the coordinates of two vectors (A-B).
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.subtract
 */
export const subtract = (out: Vec2, a: Vec2, b: Vec2) => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	return out;
};
