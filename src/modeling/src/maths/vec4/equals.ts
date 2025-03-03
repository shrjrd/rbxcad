import type { Vec4 } from "./type";
/**
 * Compare the given vectors for equality.
 *
 * @param {Vec4} a - first vector
 * @param {Vec4} b - second vector
 * @return {Boolean} true if vectors are equal
 * @alias module:modeling/maths/vec4.equals
 */
export const equals = (a: Vec4, b: Vec4) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
