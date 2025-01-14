import vec2 from "../vec2";

/**
 * Return the origin of the given line.
 * The origin is the point on the line which is closest to the origin [0, 0].
 *
 * @param {line2} line - line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
const origin = (line: Line2): Vec2 => vec2.scale(vec2.create(), line, line[2]);

export default origin;
