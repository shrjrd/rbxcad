/**
 * Convert the given vector to a representative string.
 *
 * @param {vec4} vec - vector to convert
 * @returns {String} representative string
 * @alias module:modeling/maths/vec4.toString
 */
const toString = (vec: Vec4): string =>
	//`(${vec[0].toFixed(9)}, ${vec[1].toFixed(9)}, ${vec[2].toFixed(9)}, ${vec[3].toFixed(9)})`;
	`(${string.format("%.9f", vec[0])}, ${string.format("%.9f", vec[1])}, ${string.format("%.9f", vec[2])}, ${string.format("%.9f", vec[3])})`;

export default toString;
