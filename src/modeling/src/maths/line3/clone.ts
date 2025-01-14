import vec3 from "../vec3";
import create from "./create";

/**
 * Create a clone of the given line.
 *
 * @param {line3} line - line to clone
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.clone
 */
const clone = (line: Line3) => {
	const out = create();
	vec3.copy(out[0], line[0]);
	vec3.copy(out[1], line[1]);
	return out;
};

export default clone;
