import vec2 from "../vec2";
import direction from "./direction";
import fromPoints from "./fromPoints";
import origin from "./origin";

/**
 * Transforms the given line using the given matrix.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line2} out
 * @alias module:modeling/maths/line2.transform
 */
const transform = (out: Line2, line: Line2, matrix: Mat4): Line2 => {
	const org = origin(line);
	const dir = direction(line);

	vec2.transform(org, org, matrix);
	vec2.transform(dir, dir, matrix);

	return fromPoints(out, org, dir);
};

export default transform;
