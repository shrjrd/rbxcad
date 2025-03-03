/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 * @see {@link poly3} for data structure information.
 * @module modeling/geometries/poly3
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const polygon = geometries.poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 */
export { clone } from "./clone";
export { create } from "./create";
export { fromVerticesAndPlane } from "./fromVerticesAndPlane";
export { invert } from "./invert";
export { isA } from "./isA";
export { isConvex } from "./isConvex";
export { measureArea } from "./measureArea";
export { measureBoundingBox } from "./measureBoundingBox";
export { measureBoundingSphere } from "./measureBoundingSphere";
export { measureSignedVolume } from "./measureSignedVolume";
export { plane } from "./plane";
export { toString } from "./toString";
export { toVertices } from "./toVertices";
export { transform } from "./transform";
export { validate } from "./validate";

export type { Poly3 } from "./type";
