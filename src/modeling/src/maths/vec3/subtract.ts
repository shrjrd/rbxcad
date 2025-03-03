import type { Vec3 } from "./type";
/**
 * Subtracts the coordinates of two vectors (A-B).
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - minuend vector
 * @param {Vec3} b - subtrahend vector
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.subtract
 */
export const subtract = (out: Vec3, a: Vec3, b: Vec3) => {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	return out;
};
