/**
 * Represents a 2D polygon consisting of a list of ordered points.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const p1 = geometries.poly2.create([[0,0], [4,0], [4,3]])
 */
export { arePointsInside } from "./arePointsInside";
export { clone } from "./clone";
export { create } from "./create";
export { isA } from "./isA";
export { isConvex } from "./isConvex";
export { isSimple } from "./isSimple";
export { measureArea } from "./measureArea";
export { measureBoundingBox } from "./measureBoundingBox";
export { reverse } from "./reverse";
export { toPoints } from "./toPoints";
export { toString } from "./toString";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Poly2 } from "./type";
