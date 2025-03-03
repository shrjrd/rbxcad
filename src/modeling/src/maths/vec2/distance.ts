import type { Vec2 } from "../types";
/**
 * Calculates the distance between two vectors.
 *
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {number} distance
 * @alias module:modeling/maths/vec2.distance
 */
export const distance = (a: Vec2, b: Vec2) => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	return math.sqrt(x * x + y * y);
};
