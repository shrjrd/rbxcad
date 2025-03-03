import type { Vec3 } from "./type";
/**
 * Returns the minimum coordinates of the given vectors.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.min
 */
export const min = (out: Vec3, a: Vec3, b: Vec3) => {
	out[0] = math.min(a[0], b[0]);
	out[1] = math.min(a[1], b[1]);
	out[2] = math.min(a[2], b[2]);
	return out;
};
