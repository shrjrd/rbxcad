import type { Line2, Mat4 } from "../types";
import * as vec2 from "../vec2/index";
import { direction } from "./direction";
import { fromPoints } from "./fromPoints";
import { origin } from "./origin";

/**
 * Transforms the given line using the given matrix.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to transform
 * @param {Mat4} matrix - matrix to transform with
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.transform
 */
export const transform = (out: Line2, line: Line2, matrix: Mat4) => {
	const org = origin(line);
	const dir = direction(line);

	vec2.transform(org, org, matrix);
	vec2.transform(dir, dir, matrix);

	return fromPoints(out, org, dir);
};
