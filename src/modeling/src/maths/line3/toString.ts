/**
 * Return a string representing the given line.
 *
 * @param {line3} line - line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line3.toString
 */
const toString = (line: Line3): string => {
	const point = line[0];
	const direction = line[1];
	return `line3: point: (${string.format("%.7f", point[0])}, ${string.format("%.7f", point[1])}, ${string.format("%.7f", point[2])}) direction: (${string.format("%.7f", direction[0])}, ${string.format("%.7f", direction[1])}, ${string.format("%.7f", direction[2])})`;
};

export default toString;
