/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * The outline is always closed between the first and last points.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * let myShape = geometries.geom2.create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
export { clone } from "./clone";
export { create } from "./create";
export { fromCompactBinary } from "./fromCompactBinary";
export { fromSides } from "./fromSides";
export { isA } from "./isA";
export { reverse } from "./reverse";
export { toCompactBinary } from "./toCompactBinary";
export { toOutlines } from "./toOutlines";
export { toPoints } from "./toPoints";
export { toSides } from "./toSides";
export { toString } from "./toString";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Geom2 } from "./type";
