import vec2 from "../vec2";
import copy from "./copy";
import fromValues from "./fromValues";

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to reverse
 * @returns {line2} out
 * @alias module:modeling/maths/line2.reverse
 */
const reverse = (out: Line2, line: Line2): Line2 => {
	const normal = vec2.negate(vec2.create(), line);
	const distance = -line[2];
	return copy(out, fromValues(normal[0], normal[1], distance));
};

export default reverse;
