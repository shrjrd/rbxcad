import type { Line2 } from "../types";
import * as vec2 from "../vec2/index";

/**
 * Return the origin of the given line.
 * The origin is the point on the line which is closest to the origin [0, 0].
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
export const origin = (line: Line2) => vec2.scale(vec2.create(), line, line[2]);
