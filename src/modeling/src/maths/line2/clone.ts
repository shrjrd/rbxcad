import type { Line2 } from "./type";
import { create } from "./create";

/**
 * Create a clone of the given line.
 *
 * @param {Line2} line - line to clone
 * @returns {Line2} a new unbounded line
 * @alias module:modeling/maths/line2.clone
 */
export const clone = (line: Line2) => {
	const out = create();
	out[0] = line[0];
	out[1] = line[1];
	out[2] = line[2];
	return out;
};
