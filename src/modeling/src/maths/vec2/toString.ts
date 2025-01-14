/**
 * Convert the given vector to a representative string.
 *
 * @param {vec2} vector - vector of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/vec2.toString
 */
//const toString = (vector: Vec2): string => `[${vector[0].toFixed(7)}, ${vector[1].toFixed(7)}]`;
const toString = (vector: Vec2): string => `[${string.format("%.7f", vector[0])}, ${string.format("%.7f", vector[1])}]`;

export default toString;
