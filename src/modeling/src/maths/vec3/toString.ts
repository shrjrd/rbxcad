import type { Vec3 } from "./type";
/**
 * Convert the given vector to a representative string.
 * @param {Vec3} vec - vector of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/vec3.toString
 */
//export const toString = (vec: Vec3) => `[${vec[0].toFixed(7)}, ${vec[1].toFixed(7)}, ${vec[2].toFixed(7)}]`;
export const toString = (vec: Vec3) =>
	`[${string.format("%.7f", vec[0])}, ${string.format("%.7f", vec[1])}, ${string.format("%.7f", vec[2])}]`;
