import type { Mat4 } from "../types";

/**
 * Return a string representing the given matrix.
 *
 * @param {Mat4} mat - matrix of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/mat4.toString
 */
//export const toString = (mat: Mat4) => mat.map((n: number) => n.toFixed(7)).toString();
export const toString = (mat: Mat4): string => `[${mat.map((n: number) => string.format("%.7f", n)).join(", ")}]`;
