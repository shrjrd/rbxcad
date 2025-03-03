import type { Geom3 } from "../types";
import { applyTransforms } from "./applyTransforms";

/**
 * Produces an array of polygons from the given geometry, after applying transforms.
 * The returned array should not be modified as the polygons are shared with the geometry.
 * @param {Geom3} geometry - the geometry
 * @returns {Array} an array of polygons
 * @alias module:modeling/geometries/geom3.toPolygons
 *
 * @example
 * let sharedPolygons = toPolygons(geometry)
 */
export const toPolygons = (geometry: Geom3) => applyTransforms(geometry).polygons;
