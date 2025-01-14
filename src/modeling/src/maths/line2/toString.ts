/**
 * Return a string representing the given line.
 *
 * @param {line2} line - line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line2.toString
 */
const toString = (line: Line2): string =>
	`line2: (${string.format("%.7f", line[0])}, ${string.format("%.7f", line[1])}, ${string.format("%.7f", line[2])})`;

export default toString;
