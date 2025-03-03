import type { Line3 } from "./type";
/**
 * Return the direction of the given line.
 *
 * @param {Line3} line - line for reference
 * @return {Vec3} the relative vector in the direction of the line
 * @alias module:modeling/maths/line3.direction
 */
export const direction = (line: Line3) => line[1];
