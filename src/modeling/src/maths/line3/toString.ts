import type { Line3 } from "./type";
/**
 * Return a string representing the given line.
 *
 * @param {Line3} line - line of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/line3.toString
 */
export const toString = (line: Line3) => {
	const point = line[0];
	const direction = line[1];
	//return `line3: point: (${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(7)}) direction: (${direction[0].toFixed(7)}, ${direction[1].toFixed(7)}, ${direction[2].toFixed(7)})`;
	return `line3: point: (${string.format("%.7f", point[0])}, ${string.format("%.7f", point[1])}, ${string.format("%.7f", point[2])}) direction: (${string.format("%.7f", direction[0])}, ${string.format("%.7f", direction[1])}, ${string.format("%.7f", direction[2])})`;
};
