import type { Vec2 } from "../types";
/**
 * Calculates the length of the given vector.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {number} length
 * @alias module:modeling/maths/vec2.length
 */
export const length = (vector: Vec2) => math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
