import type { Vec2 } from "../types";
/**
 * Calculates the squared distance between the given vectors.
 *
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {number} squared distance
 * @alias module:modeling/maths/vec2.squaredDistance
 */
export const squaredDistance = (a: Vec2, b: Vec2) => {
	const x = b[0] - a[0];
	const y = b[1] - a[1];
	return x * x + y * y;
};
