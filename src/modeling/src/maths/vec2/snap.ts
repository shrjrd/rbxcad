import type { Vec2 } from "../types";
/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to snap
 * @param {number} epsilon - epsilon of precision, less than 0
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.snap
 */
export const snap = (out: Vec2, vector: Vec2, epsilon: number) => {
	out[0] = math.round(vector[0] / epsilon) * epsilon + 0;
	out[1] = math.round(vector[1] / epsilon) * epsilon + 0;
	return out;
};
