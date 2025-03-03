import type { Path2 } from "../types";
import { applyTransforms } from "./applyTransforms";

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * @param {Path2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/path2.toPoints
 *
 * @example
 * let sharedPoints = toPoints(geometry)
 */
export const toPoints = (geometry: Path2) => applyTransforms(geometry).points;
