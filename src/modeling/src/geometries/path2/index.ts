/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * let myShape = geometries.path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]])
 */
export { appendArc } from "./appendArc";
export { appendBezier } from "./appendBezier";
export { appendPoints } from "./appendPoints";
export { clone } from "./clone";
export { close } from "./close";
export { concat } from "./concat";
export { create } from "./create";
export { equals } from "./equals";
export { fromCompactBinary } from "./fromCompactBinary";
export { fromPoints } from "./fromPoints";
export { isA } from "./isA";
export { reverse } from "./reverse";
export { toCompactBinary } from "./toCompactBinary";
export { toPoints } from "./toPoints";
export { toString } from "./toString";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Path2 } from "./type";
