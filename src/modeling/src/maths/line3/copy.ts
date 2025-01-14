import vec3 from "../vec3";

/**
 * Copy the given line into the receiving line.
 *
 * @param {line3} out - receiving line
 * @param {line3} line - line to copy
 * @returns {line3} out
 * @alias module:modeling/maths/line3.copy
 */
const copy = (out: Line3, line: Line3) => {
	vec3.copy(out[0], line[0]);
	vec3.copy(out[1], line[1]);
	return out;
};

export default copy;
