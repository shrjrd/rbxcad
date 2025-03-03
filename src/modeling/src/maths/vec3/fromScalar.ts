import type { Vec3 } from "../types";
/**
 * Creates a vector from a single scalar value.
 * All components of the resulting vector have the given value.
 *
 * @param {Vec3} out - receiving vector
 * @param {number} scalar
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.fromScalar
 */
export const fromScalar = (out: Vec3, scalar: number) => {
	out[0] = scalar;
	out[1] = scalar;
	out[2] = scalar;
	return out;
};
