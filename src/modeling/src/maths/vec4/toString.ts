import type { Vec4 } from "./type";
/**
 * Convert the given vector to a representative string.
 *
 * @param {Vec4} vec - vector to convert
 * @returns {string} representative string
 * @alias module:modeling/maths/vec4.toString
 */
export const toString = (vec: Vec4) =>
	//`(${vec[0].toFixed(9)}, ${vec[1].toFixed(9)}, ${vec[2].toFixed(9)}, ${vec[3].toFixed(9)})`;
	`(${string.format("%.9f", vec[0])}, ${string.format("%.9f", vec[1])}, ${string.format("%.9f", vec[2])}, ${string.format("%.9f", vec[3])})`;
