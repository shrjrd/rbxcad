import type { Geom3 } from "../types";
import * as poly3 from "../poly3/index";
import { toPolygons } from "./toPolygons";

/**
 * Return the given geometry as a list of points, after applying transforms.
 * The returned array should not be modified as the points are shared with the geometry.
 * @param {Geom3} geometry - the geometry
 * @return {Array} list of points, where each sub-array represents a polygon
 * @alias module:modeling/geometries/geom3.toPoints
 */
export const toPoints = (geometry: Geom3) => {
	const polygons = toPolygons(geometry);
	return polygons.map((polygon) => poly3.toVertices(polygon));
};
