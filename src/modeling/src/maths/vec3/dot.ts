import type { Vec3 } from "../types";
/**
 * Calculates the dot product of two vectors.
 *
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {number} dot product
 * @alias module:modeling/maths/vec3.dot
 */
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
