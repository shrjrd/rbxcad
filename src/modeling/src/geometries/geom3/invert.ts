import type { Geom3 } from "../types";
import * as poly3 from "../poly3/index";
import { create } from "./create";
import { toPolygons } from "./toPolygons";

/**
 * Invert the given geometry, transposing solid and empty space.
 * @param {Geom3} geometry - the geometry to invert
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geometries/geom3.invert
 */
export const invert = (geometry: Geom3) => {
	const polygons = toPolygons(geometry);
	const newPolygons = polygons.map((polygon) => poly3.invert(polygon));
	return create(newPolygons);
};
