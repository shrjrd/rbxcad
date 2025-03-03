/**
 * Represents a 3D geometry consisting of a list of contours, where each contour consists of a list of planar vertices.
 * @see {@link slice} for data structure information.
 * @module modeling/geometries/slice
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const slice = geometries.slice.create([[[0,0,0], [4,0,0], [4,3,12]]])
 */
export { calculatePlane } from "./calculatePlane";
export { clone } from "./clone";
export { create } from "./create";
export { equals } from "./equals";
export { fromGeom2 } from "./fromGeom2";
export { fromVertices } from "./fromVertices";
export { isA } from "./isA";
export { reverse } from "./reverse";
export { toEdges } from "./toEdges";
export { toPolygons } from "./toPolygons";
export { toString } from "./toString";
export { toVertices } from "./toVertices";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Slice } from "./type";
