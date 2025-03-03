import type { Vec2 } from "../types";
/**
 * Returns the minimum coordinates of two vectors.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.min
 */
export const min = (out: Vec2, a: Vec2, b: Vec2) => {
	out[0] = math.min(a[0], b[0]);
	out[1] = math.min(a[1], b[1]);
	return out;
};
