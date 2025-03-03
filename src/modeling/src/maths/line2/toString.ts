import type { Line2 } from "./type";

/**
 * Return a string representing the given line.
 *
 * @param {Line2} line - line of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/line2.toString
 */
//export const toString = (line: Line2) => `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`;
export const toString = (line: Line2) =>
	`line2: (${string.format("%.7f", line[0])}, ${string.format("%.7f", line[1])}, ${string.format("%.7f", line[2])})`;
