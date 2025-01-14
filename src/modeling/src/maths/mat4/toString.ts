/**
 * Return a string representing the given matrix.
 *
 * @param {mat4} mat - matrix of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/mat4.toString
 */
//const toString = (mat: Mat4) => mat.map((n: number) => n.toFixed(7)).toString();
const toString = (mat: Mat4): string => `[${mat.map((n: number) => string.format("%.7f", n)).join(", ")}]`;

export default toString;
