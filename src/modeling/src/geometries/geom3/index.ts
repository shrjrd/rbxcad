/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometries/geom3
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const myShape = geometries.geom3.fromPoints([
 *   [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]],
 *   [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]],
 *   [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]
 *   [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]],
 *   [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]],
 *   [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]
 * ])
 */
export { clone } from "./clone";
export { create } from "./create";
export { fromCompactBinary } from "./fromCompactBinary";
export { fromPoints } from "./fromPoints";
export { fromPointsConvex } from "./fromPointsConvex";
export { invert } from "./invert";
export { isA } from "./isA";
export { toCompactBinary } from "./toCompactBinary";
export { toPoints } from "./toPoints";
export { toPolygons } from "./toPolygons";
export { toString } from "./toString";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Geom3 } from "./type";
