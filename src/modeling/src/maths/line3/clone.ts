import type { Line3 } from "./type";
import * as vec3 from "../vec3/index";
import { create } from "./create";

/**
 * Create a clone of the given line.
 *
 * @param {Line3} line - line to clone
 * @returns {Line3} a new unbounded line
 * @alias module:modeling/maths/line3.clone
 */
export const clone = (line: Line3) => {
	const out = create();
	vec3.copy(out[0], line[0]);
	vec3.copy(out[1], line[1]);
	return out;
};
