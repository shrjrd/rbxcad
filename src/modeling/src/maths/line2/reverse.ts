import type { Line2 } from "./type";
import * as vec2 from "../vec2/index";
import { copy } from "./copy";
import { fromValues } from "./fromValues";

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to reverse
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.reverse
 */
export const reverse = (out: Line2, line: Line2) => {
	const normal = vec2.negate(vec2.create(), line);
	const distance = -line[2];
	return copy(out, fromValues(normal[0], normal[1], distance));
};
