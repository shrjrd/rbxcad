import type { Vec3 } from "./type";
/**
 * Calculates the absolute coordinates of the give vector.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector of reference
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.abs
 */
export const abs = (out: Vec3, vector: Vec3) => {
	out[0] = math.abs(vector[0]);
	out[1] = math.abs(vector[1]);
	out[2] = math.abs(vector[2]);
	return out;
};
